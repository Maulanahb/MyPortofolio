/**
 * ==========================================================================
 * EDITORIAL POSTER SHOWCASE RUNTIME (live-demo.ts)
 * Mengelola pengalih layar statis CUCI.IN (Dashboard Admin <-> Lacak Nota),
 * efek tilt 3D + spotlight kursor yang hemat GPU, klik buka studi kasus,
 * dan penyesuaian lebar pratinjau di dalam modal.
 * ==========================================================================
 */

import { computePosterTilt, stepDamped2D } from './reactbits-math';

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

/**
 * Mengikat tombol pengalih layar ("Dashboard Admin" / "Lacak Cucian")
 * di dalam poster CUCI.IN maupun salinannya di modal studi kasus.
 */
export function initCuciinSwitchers(scope: ParentNode = document): void {
  const posters: HTMLElement[] = [];
  if (scope instanceof HTMLElement && scope.matches('.poster-cuciin')) {
    posters.push(scope);
  }
  posters.push(...Array.from(scope.querySelectorAll<HTMLElement>('.poster-cuciin')));

  posters.forEach((poster) => {
    if (poster.dataset.switcherBound === 'true') return;
    poster.dataset.switcherBound = 'true';

    const tabs = Array.from(poster.querySelectorAll<HTMLButtonElement>('[data-cuciin-view]'));
    const panels = Array.from(poster.querySelectorAll<HTMLElement>('[data-cuciin-panel]'));
    if (!tabs.length || !panels.length) return;

    const activateView = (viewKey: string) => {
      poster.dataset.activeScreen = viewKey;
      tabs.forEach((btn) => {
        const active = btn.dataset.cuciinView === viewKey;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
        btn.setAttribute('aria-pressed', String(active));
      });
      panels.forEach((panel) => {
        const match = panel.dataset.cuciinPanel === viewKey;
        panel.hidden = !match;
        panel.classList.toggle('is-active', match);
      });
    };

    tabs.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetView = btn.dataset.cuciinView;
        if (targetView) activateView(targetView);
      });
    });

    activateView(poster.dataset.activeScreen || tabs[0].dataset.cuciinView || 'dashboard');
  });
}

/**
 * Memastikan pratinjau poster yang disalin ke modal studi kasus tetap pas
 * di layar sempit tanpa menimbulkan gulir horizontal.
 */
export function fitProjectPreviews(): void {
  const modalPreview = document.getElementById('detail-preview');
  if (!modalPreview) return;

  const clonedPoster = modalPreview.querySelector<HTMLElement>('.project-art');
  if (!clonedPoster) return;

  clonedPoster.style.transform = '';
  clonedPoster.style.transformOrigin = '';
  clonedPoster.style.width = '';
}

function initPosterTiltAndSpotlight(): void {
  if (prefersReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = Array.from(document.querySelectorAll<HTMLElement>('#projects-grid .project-card'));
  if (!cards.length) return;

  const rectCache = new WeakMap<HTMLElement, DOMRect>();
  const clearRectCache = () => {
    cards.forEach((card) => rectCache.delete(card));
  };
  window.addEventListener('scroll', clearRectCache, { passive: true });
  window.addEventListener('resize', clearRectCache, { passive: true });

  cards.forEach((card) => {
    let rafId = 0;
    let lastTime = 0;
    let hovering = false;

    let rx = 0;
    let ry = 0;
    let sx = 50;
    let sy = 50;

    let targetRx = 0;
    let targetRy = 0;
    let targetSx = 50;
    let targetSy = 50;

    const getCardRect = () => {
      let rect = rectCache.get(card);
      if (!rect) {
        rect = card.getBoundingClientRect();
        rectCache.set(card, rect);
      }
      return rect;
    };

    const tick = (now: number) => {
      const dt = lastTime > 0 ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;

      const lambda = hovering ? 12 : 8;
      const tiltStep = stepDamped2D(rx, ry, targetRx, targetRy, lambda, dt, 0.01);
      const spotStep = stepDamped2D(sx, sy, targetSx, targetSy, lambda, dt, 0.12);

      rx = tiltStep.x;
      ry = tiltStep.y;
      sx = spotStep.x;
      sy = spotStep.y;

      card.style.setProperty('--tilt-x', `${rx.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${ry.toFixed(2)}deg`);
      card.style.setProperty('--spot-x', `${sx.toFixed(1)}%`);
      card.style.setProperty('--spot-y', `${sy.toFixed(1)}%`);

      if (tiltStep.settled && spotStep.settled) {
        rafId = 0;
        lastTime = 0;
        if (!hovering) {
          card.classList.remove('is-tilting');
        }
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (!rafId) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    card.addEventListener('pointerenter', (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      hovering = true;
      rectCache.set(card, card.getBoundingClientRect());
      card.classList.add('is-tilting');
    }, { passive: true });

    card.addEventListener('pointermove', (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      hovering = true;
      const rect = getCardRect();
      const tilt = computePosterTilt(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height, 2.6);
      targetRx = tilt.rotateX;
      targetRy = tilt.rotateY;
      targetSx = tilt.px;
      targetSy = tilt.py;
      card.classList.add('is-tilting');
      ensureLoop();
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      hovering = false;
      rectCache.delete(card);
      targetRx = 0;
      targetRy = 0;
      targetSx = 50;
      targetSy = 50;
      ensureLoop();
    }, { passive: true });
  });
}

/**
 * Inisialisasi seluruh perilaku interaktif pada section #pekerjaan.
 */
export function initLiveDemo(onOpenProject?: (projectId: string) => void): void {
  initCuciinSwitchers(document);
  initPosterTiltAndSpotlight();

  if (onOpenProject) {
    document.querySelectorAll<HTMLElement>('#projects-grid .project-art[data-art]').forEach((poster) => {
      poster.addEventListener('click', (e) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest('[data-cuciin-view], button, a')) return;
        const projectId = poster.dataset.art;
        if (projectId) onOpenProject(projectId);
      });
    });
  }

  let resizeTimer: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(fitProjectPreviews, 120);
  }, { passive: true });
}
