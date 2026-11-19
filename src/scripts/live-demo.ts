/**
 * ==========================================================================
 * EDITORIAL POSTER SHOWCASE RUNTIME (live-demo.ts)
 * Mengelola pengalih layar statis CUCI.IN (Dashboard Admin <-> Lacak Nota),
 * efek tilt 3D + spotlight kursor yang hemat GPU, klik buka studi kasus,
 * dan penyesuaian lebar pratinjau di dalam modal.
 * ==========================================================================
 */

import { computePosterTilt } from './reactbits-math';

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
  cards.forEach((card) => {
    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    const applyTilt = () => {
      rafId = 0;
      const rect = card.getBoundingClientRect();
      const tilt = computePosterTilt(lastX - rect.left, lastY - rect.top, rect.width, rect.height, 3.2);
      card.style.setProperty('--tilt-x', `${tilt.rotateX}deg`);
      card.style.setProperty('--tilt-y', `${tilt.rotateY}deg`);
      card.style.setProperty('--spot-x', `${tilt.px}%`);
      card.style.setProperty('--spot-y', `${tilt.py}%`);
    };

    card.addEventListener('pointermove', (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      lastX = e.clientX;
      lastY = e.clientY;
      card.classList.add('is-tilting');
      if (!rafId) rafId = window.requestAnimationFrame(applyTilt);
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      card.classList.remove('is-tilting');
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--spot-x', '50%');
      card.style.setProperty('--spot-y', '50%');
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
