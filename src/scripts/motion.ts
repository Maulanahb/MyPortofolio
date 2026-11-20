/**
 * ==========================================================================
 * INTERACTIVE MOTION & WORKBENCH RUNTIME (motion.ts)
 * Menangani pointer spotlight, tab role hero, simulasi arsitektur SVG,
 * View Transitions filter proyek, jembatan skill-ke-proyek, & physics modal.
 * ==========================================================================
 */

import { PROJECTS, SKILL_CONTEXT_NOTES } from '../data/projects';
import {
  computeMagnetOffset,
  createSparkBurst,
  stepSparkParticles,
  interpolateCountUp,
  scrambleTextFrame,
  nextRotatingIndex,
  stepDamped2D,
  type SparkParticle
} from './reactbits-math';

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* --------------------------------------------------------------------------
   1. DISCRETE OVERLAY DISPLAY PROBE (modern-web-guidance Firefox fallback)
   -------------------------------------------------------------------------- */
let supportsDisplayTransition: boolean | undefined;

export function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    supportsDisplayTransition = false;
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
}

export function animateOpenOverlay(el: HTMLElement): void {
  el.removeAttribute('data-closing');
  el.classList.add('open');
}

export async function animateCloseOverlay(el: HTMLElement): Promise<void> {
  if (prefersReducedMotion() || canTransitionDisplay()) {
    el.removeAttribute('data-closing');
    el.classList.remove('open');
    return;
  }

  el.setAttribute('data-closing', '');
  const dialog = el.querySelector<HTMLElement>('.dialog');
  const animations = [
    ...el.getAnimations(),
    ...(dialog ? dialog.getAnimations() : [])
  ];

  if (animations.length > 0) {
    await Promise.race([
      Promise.allSettled(animations.map(a => a.finished)),
      new Promise<void>(resolve => window.setTimeout(resolve, 420))
    ]);
  }

  if (el.hasAttribute('data-closing')) {
    el.removeAttribute('data-closing');
    el.classList.remove('open');
  }
}

/* --------------------------------------------------------------------------
   2. ACCESSIBLE TABLIST KEYBOARD HELPER (fallback untuk non-focusgroup browsers)
   -------------------------------------------------------------------------- */
function bindTabKeyboard(
  tablist: HTMLElement,
  tabs: HTMLButtonElement[],
  onActivate: (tab: HTMLButtonElement) => void
): void {
  tablist.addEventListener('keydown', (e: KeyboardEvent) => {
    const current = (e.target as HTMLElement | null)?.closest('button[role="tab"]') as HTMLButtonElement | null;
    if (!current) return;
    const idx = tabs.indexOf(current);
    if (idx === -1) return;

    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIdx = (idx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIdx = (idx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextTab = tabs[nextIdx];
    nextTab.focus();
    onActivate(nextTab);
  });
}

/* --------------------------------------------------------------------------
   3. SHARED POINTER SURFACE SPOTLIGHT (Compositor-Friendly CSS Vars)
   -------------------------------------------------------------------------- */
export function initPointerSpotlight(): void {
  if (prefersReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let activeCard: HTMLElement | null = null;
  let activeRect: DOMRect | null = null;
  let lastX = 0;
  let lastY = 0;
  let rafId = 0;

  const invalidateRect = () => {
    activeRect = null;
  };
  window.addEventListener('scroll', invalidateRect, { passive: true });
  window.addEventListener('resize', invalidateRect, { passive: true });

  const commitPosition = () => {
    rafId = 0;
    if (!activeCard) return;
    if (!activeRect) {
      activeRect = activeCard.getBoundingClientRect();
    }
    const x = Math.round(lastX - activeRect.left);
    const y = Math.round(lastY - activeRect.top);
    activeCard.style.setProperty('--mx', `${x}px`);
    activeCard.style.setProperty('--my', `${y}px`);
  };

  document.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-spotlight]');
      if (!target) {
        activeCard = null;
        activeRect = null;
        return;
      }
      if (target !== activeCard) {
        activeCard = target;
        activeRect = null;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(commitPosition);
      }
    },
    { passive: true }
  );
}

/* --------------------------------------------------------------------------
   4. HERO INTERACTIVE ROLE & PROOF DOCK
   -------------------------------------------------------------------------- */
export function initHeroRoleDock(): void {
  const tablist = document.querySelector<HTMLElement>('.hero-role-tabs');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[data-role-tab]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[id^="hero-role-panel-"]'));

  const positionFocus = () => {
    const selected = tabs.find(tab => tab.getAttribute('aria-selected') === 'true');
    if (!selected || !tablist.hasAttribute('data-true-focus')) return;
    tablist.style.setProperty('--tf-x', `${selected.offsetLeft}px`);
    tablist.style.setProperty('--tf-y', `${selected.offsetTop}px`);
    tablist.style.setProperty('--tf-width', `${selected.offsetWidth}px`);
    tablist.style.setProperty('--tf-height', `${selected.offsetHeight}px`);
    tablist.dataset.focusReady = 'true';
  };

  const selectRole = (selectedTab: HTMLButtonElement) => {
    const roleId = selectedTab.dataset.roleTab;
    if (!roleId) return;

    tabs.forEach(tab => {
      const active = tab === selectedTab;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      tab.toggleAttribute('focusgroupstart', active);
    });

    panels.forEach(panel => {
      const match = panel.id === `hero-role-panel-${roleId}`;
      panel.dataset.panelActive = match ? 'true' : 'false';
      panel.setAttribute('aria-hidden', String(!match));
      panel.inert = !match;
      if (match) {
        panel.removeAttribute('hidden');
        panel.setAttribute('tabindex', '0');
      } else {
        panel.removeAttribute('tabindex');
      }
    });

    positionFocus();
    tablist.dispatchEvent(
      new CustomEvent('hero-role-change', {
        bubbles: true,
        detail: { roleId }
      })
    );
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => selectRole(tab));
  });

  // Ensure initial panel inert state aligns cleanly before interactions
  const initialRoleId = tabs.find(t => t.getAttribute('aria-selected') === 'true')?.dataset.roleTab;
  if (initialRoleId) {
    panels.forEach(panel => {
      const match = panel.id === `hero-role-panel-${initialRoleId}`;
      panel.dataset.panelActive = match ? 'true' : 'false';
      panel.setAttribute('aria-hidden', String(!match));
      panel.inert = !match;
    });
  }

  bindTabKeyboard(tablist, tabs, selectRole);
  tabs.forEach(tab => { tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1; });
  positionFocus();
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(positionFocus);
    observer.observe(tablist);
    tabs.forEach(tab => observer.observe(tab));
  } else {
    window.addEventListener('resize', positionFocus, { passive: true });
  }
}

/** Short, cancellable scrambles with the original text retained for assistive technology. */
export function initDecryptedText(): void {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = new WeakMap<HTMLElement, string>();
  const running = new Map<HTMLElement, { frame: number; finish: () => void }>();
  const decrypt = (el: HTMLElement, duration: number) => {
    running.get(el)?.finish();
    const target = targets.get(el) ?? el.textContent ?? '';
    targets.set(el, target);
    if (media.matches || !target) return;

    const source = document.createElement('span');
    source.className = 'rb-decrypt-source';
    source.textContent = target;
    const display = document.createElement('span');
    display.className = 'rb-decrypt-display';
    display.setAttribute('aria-hidden', 'true');
    el.classList.add('rb-decrypting');
    el.replaceChildren(source, display);
    const state = {
      frame: 0,
      finish: () => {
        cancelAnimationFrame(state.frame);
        el.textContent = target;
        el.classList.remove('rb-decrypting');
        running.delete(el);
      }
    };
    running.set(el, state);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      if (media.matches || progress >= 1) return state.finish();
      display.textContent = scrambleTextFrame(target, progress);
      state.frame = requestAnimationFrame(tick);
    };
    display.textContent = scrambleTextFrame(target, 0);
    state.frame = requestAnimationFrame(tick);
  };

  if (typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        decrypt(entry.target as HTMLElement, 320);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll<HTMLElement>('[data-decrypt]').forEach(el => observer.observe(el));
  }

  // Hover & keyboard focus tactical shimmer on monospace step/chip labels
  document.querySelectorAll<HTMLElement>('[data-decrypt-hover]').forEach(el => {
    const triggerHoverDecrypt = () => {
      if (!running.has(el)) decrypt(el, 220);
    };
    el.addEventListener('pointerenter', triggerHoverDecrypt);
    el.addEventListener('focusin', triggerHoverDecrypt);
  });

  document.addEventListener('hero-role-change', event => {
    const { roleId } = (event as CustomEvent<{ roleId: string }>).detail;
    const summary = document.getElementById(`hero-role-panel-${roleId}`)?.querySelector<HTMLElement>('[data-role-summary]');
    if (summary) decrypt(summary, 240);
  });

  document.addEventListener('hf-stage-change', event => {
    const { stageIdx } = (event as CustomEvent<{ stageIdx: number }>).detail;
    const panel = document.getElementById(`hf-wb-${stageIdx}`);
    const target = panel?.querySelector<HTMLElement>('[data-decrypt-stage]');
    if (target && panel) {
      const rect = panel.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        decrypt(target, 260);
      }
    }
  });

  media.addEventListener('change', () => {
    if (media.matches) [...running.values()].forEach(state => state.finish());
  });
}

/**
 * React Bits RotatingText port: cycles overlapping subtitle roles inside a locked single-cell stack.
 */
export function initRotatingText(): void {
  const containers = Array.from(document.querySelectorAll<HTMLElement>('[data-rotating-text]'));
  if (!containers.length) return;

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intervalMs = 2800;

  containers.forEach(container => {
    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-rotating-item]'));
    if (items.length <= 1) return;

    let activeIdx = Math.max(0, items.findIndex(item => item.classList.contains('is-active')));
    let timerId = 0;
    let inViewport = true;

    const syncItems = (nextIdx: number, previousIdx: number) => {
      items.forEach((item, idx) => {
        item.classList.toggle('is-active', idx === nextIdx);
        item.classList.toggle('is-exiting', idx === previousIdx && idx !== nextIdx);
      });
      if (previousIdx !== nextIdx) {
        window.setTimeout(() => {
          items[previousIdx]?.classList.remove('is-exiting');
        }, 360);
      }
    };

    const advance = () => {
      if (!inViewport || document.hidden) return;
      const previousIdx = activeIdx;
      activeIdx = nextRotatingIndex(activeIdx, items.length);
      syncItems(activeIdx, previousIdx);
    };

    const stop = () => {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = 0;
      }
    };

    const start = () => {
      stop();
      if (media.matches || !inViewport || document.hidden) return;
      timerId = window.setInterval(advance, intervalMs);
    };

    syncItems(activeIdx, activeIdx);

    if (typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (!entry) return;
          inViewport = entry.isIntersecting;
          if (inViewport && !document.hidden) start();
          else stop();
        },
        { threshold: 0.1 }
      );
      observer.observe(container);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (inViewport) start();
    });

    media.addEventListener('change', () => {
      if (media.matches) stop();
      else start();
    });

    start();
  });
}

/** Word float fallback, staggered list entries, and viewport-aware timeline nodes. */
export function initEditorialMotion(): void {
  if (typeof IntersectionObserver !== 'function') return;
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lists = document.querySelectorAll<HTMLElement>('[data-animated-list]');
  const floats = document.querySelectorAll<HTMLElement>('[data-scroll-float]');
  const supportsView = window.CSS?.supports('(animation-timeline: view()) and (animation-range: entry)');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-entered');
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  lists.forEach(el => reveal.observe(el));
  if (!supportsView) floats.forEach(el => reveal.observe(el));

  const nodes = document.querySelectorAll<HTMLElement>('[data-timeline-node]');
  const active = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-timeline-active', entry.isIntersecting));
  }, { rootMargin: '-15% 0px -35% 0px', threshold: 0.1 });
  nodes.forEach(el => active.observe(el));

  // Pause offscreen gradient text background-position animation to avoid unnecessary main-thread paints
  const gradients = document.querySelectorAll<HTMLElement>('.rb-gradient-text');
  if (gradients.length) {
    const gradObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        (entry.target as HTMLElement).dataset.gradientPaused = entry.isIntersecting ? 'false' : 'true';
      });
    }, { threshold: 0.01 });
    gradients.forEach(el => gradObserver.observe(el));
  }

  const syncMotion = () => {
    document.documentElement.toggleAttribute('data-editorial-motion', !media.matches);
    if (media.matches) {
      lists.forEach(el => el.classList.add('is-entered'));
      floats.forEach(el => el.classList.add('is-entered'));
    }
  };
  syncMotion();
  media.addEventListener('change', syncMotion);
}

/* --------------------------------------------------------------------------
   5. PROJECT CATEGORY FILTERS (VIEW TRANSITIONS) & SKILL BRIDGE
   -------------------------------------------------------------------------- */
export function initProjectFilterAndSkillBridge(
  onOpenProject: (key: string) => void,
  onLayoutChange?: () => void
): void {
  const projectsGrid = document.getElementById('projects-grid');
  const filterTablist = document.querySelector<HTMLElement>('.projects-filter-tabs');
  const filterTabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-project-filter]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card[data-project-id]'));

  const skillPillBar = document.getElementById('project-skill-filter-pill');
  const skillPillLabel = document.getElementById('project-skill-filter-label');
  const skillPillReset = document.getElementById('project-skill-filter-reset');

  const skillChips = Array.from(
    document.querySelectorAll<HTMLButtonElement>('.skill-chip[data-skill-id], .logo-loop-chip[data-skill-id]')
  );
  const bridgeBar = document.getElementById('skill-bridge-bar');
  const bridgeTitle = document.getElementById('skill-bridge-title');
  const bridgeSummary = document.getElementById('skill-bridge-summary');
  const bridgeProjects = document.getElementById('skill-bridge-projects');
  const bridgeFilterBtn = document.getElementById('skill-bridge-filter-btn') as HTMLButtonElement | null;
  const bridgeClearBtn = document.getElementById('skill-bridge-clear');

  let activeCategory = 'all';
  let activeSkillFilter: { id: string; name: string } | null = null;
  let inspectedSkill: { id: string; name: string } | null = null;

  const updateGrid = () => {
    let visibleCount = 0;
    const isFiltered = activeCategory !== 'all' || activeSkillFilter !== null;

    cards.forEach(card => {
      const domains = (card.dataset.domains || '').split(',').filter(Boolean);
      const skillIds = (card.dataset.skillIds || '').split(',').filter(Boolean);

      const categoryMatch = activeCategory === 'all' || domains.includes(activeCategory);
      const skillMatch = !activeSkillFilter || skillIds.includes(activeSkillFilter.id);
      const visible = categoryMatch && skillMatch;

      card.hidden = !visible;
      card.classList.toggle('is-filtered-match', Boolean(visible && activeSkillFilter));
      if (visible) visibleCount += 1;
    });

    if (projectsGrid) {
      projectsGrid.dataset.filtered = String(isFiltered);
      projectsGrid.dataset.visibleCount = String(visibleCount);
    }
    onLayoutChange?.();

    filterTabs.forEach(tab => {
      const isSelected = !activeSkillFilter && tab.dataset.projectFilter === activeCategory;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.toggleAttribute('focusgroupstart', isSelected);
    });

    if (skillPillBar && skillPillLabel) {
      if (activeSkillFilter) {
        skillPillLabel.textContent = `Stack: ${activeSkillFilter.name} (${visibleCount})`;
        skillPillBar.removeAttribute('hidden');
      } else {
        skillPillBar.setAttribute('hidden', '');
      }
    }
  };

  const applyFilterTransition = (runUpdate: () => void) => {
    const canVT =
      typeof document.startViewTransition === 'function' &&
      !prefersReducedMotion();

    if (canVT) {
      document.startViewTransition(() => {
        runUpdate();
      });
    } else {
      runUpdate();
    }
  };

  const selectCategory = (tab: HTMLButtonElement) => {
    const filter = tab.dataset.projectFilter || 'all';
    applyFilterTransition(() => {
      activeSkillFilter = null;
      activeCategory = filter;
      updateGrid();
    });
  };

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => selectCategory(tab));
  });

  if (filterTablist) {
    bindTabKeyboard(filterTablist, filterTabs, selectCategory);
  }

  skillPillReset?.addEventListener('click', () => {
    applyFilterTransition(() => {
      activeSkillFilter = null;
      activeCategory = 'all';
      updateGrid();
    });
  });

  // Skill-to-Project Bridge in #keahlian
  const closeSkillBridge = () => {
    inspectedSkill = null;
    skillChips.forEach(chip => chip.setAttribute('aria-pressed', 'false'));
    bridgeBar?.setAttribute('hidden', '');
  };

  skillChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const skillId = chip.dataset.skillId || '';
      const skillName = chip.dataset.skillName || '';
      if (!skillId) return;

      if (inspectedSkill?.id === skillId) {
        closeSkillBridge();
        return;
      }

      inspectedSkill = { id: skillId, name: skillName };
      skillChips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.skillId === skillId)));

      const matchedProjects = PROJECTS.filter(p => p.skillIds.includes(skillId));

      if (bridgeTitle) bridgeTitle.textContent = skillName;
      if (bridgeSummary && bridgeProjects && bridgeFilterBtn) {
        bridgeProjects.replaceChildren();
        if (matchedProjects.length > 0) {
          bridgeSummary.textContent = `Dipakai langsung pada ${matchedProjects.length} studi kasus proyek:`;
          matchedProjects.forEach(proj => {
            const pBtn = document.createElement('button');
            pBtn.type = 'button';
            pBtn.className = 'skill-bridge-proj-chip mono';
            pBtn.textContent = `${proj.title} ↗`;
            pBtn.addEventListener('click', () => onOpenProject(proj.id));
            bridgeProjects.appendChild(pBtn);
          });
          bridgeFilterBtn.removeAttribute('hidden');
        } else {
          bridgeSummary.textContent =
            SKILL_CONTEXT_NOTES[skillId] ||
            'Kompetensi pendukung di perkuliahan D-IV Sistem Informasi Bisnis Polinema.';
          bridgeFilterBtn.setAttribute('hidden', '');
        }
      }

      bridgeBar?.removeAttribute('hidden');
    });
  });

  bridgeFilterBtn?.addEventListener('click', () => {
    if (!inspectedSkill) return;
    const targetSkill = inspectedSkill;
    applyFilterTransition(() => {
      activeCategory = 'all';
      activeSkillFilter = targetSkill;
      updateGrid();
    });
    const projectSection = document.getElementById('pekerjaan');
    projectSection?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  bridgeClearBtn?.addEventListener('click', closeSkillBridge);
}

/* --------------------------------------------------------------------------
   7. FULL-PAGE BACKGROUND CHARCOAL UI CURSOR GRID (Zero Idle CPU)
   -------------------------------------------------------------------------- */
export const CURSOR_GRID_GAP = 28;
export const CURSOR_GRID_RADIUS = 140;

const CROSS_HALF_ARM_REST = 2.6;
const CROSS_HALF_ARM_GROWTH = 3.2;
const CROSS_STROKE_REST = 1.05;
const CROSS_STROKE_GROWTH = 0.85;
const HEAT_UP_RATE = 20;
const COOL_DOWN_RATE = 3.4;
const ANGLE_TRACK_RATE = 18;
const ANGLE_RELAX_RATE = 4.2;
const SETTLE_EPSILON = 0.004;
const QUARTER_TURN = Math.PI * 0.5;

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface CursorGridLayout {
  cols: number;
  rows: number;
  startX: number;
  startY: number;
}

export interface CursorGridStepResult {
  activeCount: number;
  maxHeat: number;
  moving: boolean;
}

export function computeCursorGridLayout(
  width: number,
  height: number,
  gap = CURSOR_GRID_GAP
): CursorGridLayout {
  const safeGap = Math.max(8, gap);
  const cols = Math.max(1, Math.floor(Math.max(0, width) / safeGap) + 1);
  const rows = Math.max(1, Math.floor(Math.max(0, height) / safeGap) + 1);
  const startX = (width - (cols - 1) * safeGap) * 0.5;
  const startY = (height - (rows - 1) * safeGap) * 0.5;
  return { cols, rows, startX, startY };
}

export function parseCssRgba(rawValue: string, fallback: RgbaColor): RgbaColor {
  const val = rawValue.trim();
  if (!val) return fallback;

  if (val.startsWith('#')) {
    const hex = val.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      const a = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
      if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
        return { r, g, b, a };
      }
    } else if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
      if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
        return { r, g, b, a };
      }
    }
    return fallback;
  }

  const rgbMatch = val.match(
    /^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i
  );
  if (rgbMatch) {
    const r = Number(rgbMatch[1]);
    const g = Number(rgbMatch[2]);
    const b = Number(rgbMatch[3]);
    let a = 1;
    if (rgbMatch[4] !== undefined) {
      a = rgbMatch[4].endsWith('%') ? parseFloat(rgbMatch[4]) / 100 : Number(rgbMatch[4]);
    }
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b) && !Number.isNaN(a)) {
      return { r, g, b, a };
    }
  }

  return fallback;
}

export function shortestSymmetricAngleDiff(
  from: number,
  to: number,
  symmetryStep = QUARTER_TURN
): number {
  let diff = (to - from) % symmetryStep;
  if (diff < 0) diff += symmetryStep;
  if (diff > symmetryStep * 0.5) diff -= symmetryStep;
  return diff;
}

export function stepCursorGridState(
  cellsX: Float32Array,
  cellsY: Float32Array,
  heats: Float32Array,
  angles: Float32Array,
  count: number,
  pointerX: number,
  pointerY: number,
  radius: number,
  dtSeconds: number
): CursorGridStepResult {
  const dt = Math.max(0.001, Math.min(0.05, dtSeconds));
  const hasPointer = pointerX > -9000 && pointerY > -9000;
  const radiusSq = radius * radius;
  const alphaUp = 1 - Math.exp(-HEAT_UP_RATE * dt);
  const alphaDown = 1 - Math.exp(-COOL_DOWN_RATE * dt);
  const alphaAngleHot = 1 - Math.exp(-ANGLE_TRACK_RATE * dt);
  const alphaAngleCool = 1 - Math.exp(-ANGLE_RELAX_RATE * dt);

  let activeCount = 0;
  let maxHeat = 0;
  let moving = false;

  for (let i = 0; i < count; i++) {
    const cx = cellsX[i];
    const cy = cellsY[i];
    let targetHeat = 0;
    let targetAngle = 0;

    if (hasPointer) {
      const dx = pointerX - cx;
      const dy = pointerY - cy;
      const distSq = dx * dx + dy * dy;
      if (distSq < radiusSq) {
        const dist = Math.sqrt(distSq);
        const falloff = 1 - dist / radius;
        targetHeat = Math.pow(falloff, 1.3);
        if (distSq >= 1) {
          targetAngle = Math.atan2(dy, dx);
        } else {
          targetAngle = angles[i];
        }
      }
    }

    const prevHeat = heats[i];
    let nextHeat = prevHeat;
    if (targetHeat > prevHeat) {
      nextHeat = prevHeat + (targetHeat - prevHeat) * alphaUp;
    } else if (prevHeat > targetHeat) {
      nextHeat = prevHeat + (targetHeat - prevHeat) * alphaDown;
    }

    if (targetHeat === 0 && nextHeat < SETTLE_EPSILON) {
      nextHeat = 0;
    } else if (targetHeat > 0 && Math.abs(targetHeat - nextHeat) < 0.0015) {
      nextHeat = targetHeat;
    }

    const prevAngle = angles[i];
    let nextAngle = prevAngle;
    const isTrackingPointer = targetHeat > 0.02;
    const diff = shortestSymmetricAngleDiff(prevAngle, isTrackingPointer ? targetAngle : 0);

    if (isTrackingPointer) {
      if (Math.abs(diff) < 0.004) {
        nextAngle = prevAngle + diff;
      } else {
        nextAngle = prevAngle + diff * alphaAngleHot;
      }
    } else if (nextHeat === 0 && Math.abs(diff) < 0.02) {
      nextAngle = 0;
    } else if (Math.abs(diff) >= 0.004) {
      nextAngle = prevAngle + diff * alphaAngleCool;
    } else {
      nextAngle = 0;
    }

    heats[i] = nextHeat;
    angles[i] = nextAngle;

    if (nextHeat > 0) {
      activeCount += 1;
      if (nextHeat > maxHeat) maxHeat = nextHeat;
    }

    const heatDelta = Math.abs(targetHeat - nextHeat);
    const remainingAngle = isTrackingPointer
      ? Math.abs(shortestSymmetricAngleDiff(nextAngle, targetAngle))
      : nextAngle === 0
        ? 0
        : Math.abs(shortestSymmetricAngleDiff(nextAngle, 0));

    if (heatDelta > 0.0015 || (targetHeat === 0 && nextHeat > 0) || remainingAngle > 0.004) {
      moving = true;
    }
  }

  return { activeCount, maxHeat, moving };
}

function readCursorGridColors(): { rest: RgbaColor; accent: RgbaColor } {
  const styles = window.getComputedStyle(document.body);
  const restRaw = styles.getPropertyValue('--bg-dot-color');
  const accentRaw = styles.getPropertyValue('--accent');
  return {
    rest: parseCssRgba(restRaw, { r: 29, g: 29, b: 31, a: 0.24 }),
    accent: parseCssRgba(accentRaw, { r: 0, g: 102, b: 204, a: 1 })
  };
}

/**
 * Menginisialisasi Full-Page Background Charcoal UI `CursorGrid` (`#page-swarm-canvas`).
 * Merender kisi micro-cross (`gap: 28px`) di belakang seluruh kartu konten; sel dalam radius
 * `140px` kursor mouse menyala ke warna `--accent`, membesar, dan berputar menghadap kursor,
 * lalu mendingin perlahan setelah kursor lewat hingga berhenti total (`0% Idle CPU`).
 */
export function initPageSwarm(): void {
  const canvas = document.getElementById('page-swarm-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const finePointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let colors = readCursorGridColors();

  let cellCount = 0;
  let cellsX = new Float32Array(0);
  let cellsY = new Float32Array(0);
  let heats = new Float32Array(0);
  let angles = new Float32Array(0);

  let pointerX = -9999;
  let pointerY = -9999;
  let rafId: number | null = null;
  let lastFrameTime = 0;

  const offscreenRestCanvas = document.createElement('canvas');
  const offscreenRestCtx = offscreenRestCanvas.getContext('2d');
  let restBufferReady = false;

  const updateDatasetState = (state: 'active' | 'settled' | 'static', activeCount: number) => {
    canvas.dataset.swarmPool = String(cellCount);
    canvas.dataset.swarmActive = String(activeCount);
    canvas.dataset.swarmState = state;
  };

  const rebuildRestBuffer = () => {
    if (!offscreenRestCtx || width <= 0 || height <= 0) {
      restBufferReady = false;
      return;
    }
    const bufW = Math.round(width * dpr);
    const bufH = Math.round(height * dpr);
    if (offscreenRestCanvas.width !== bufW || offscreenRestCanvas.height !== bufH) {
      offscreenRestCanvas.width = bufW;
      offscreenRestCanvas.height = bufH;
    }
    offscreenRestCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    offscreenRestCtx.clearRect(0, 0, width, height);
    offscreenRestCtx.lineCap = 'round';
    offscreenRestCtx.beginPath();
    offscreenRestCtx.strokeStyle = `rgba(${colors.rest.r}, ${colors.rest.g}, ${colors.rest.b}, ${colors.rest.a})`;
    offscreenRestCtx.lineWidth = CROSS_STROKE_REST;

    for (let i = 0; i < cellCount; i++) {
      const cx = cellsX[i];
      const cy = cellsY[i];
      offscreenRestCtx.moveTo(cx - CROSS_HALF_ARM_REST, cy);
      offscreenRestCtx.lineTo(cx + CROSS_HALF_ARM_REST, cy);
      offscreenRestCtx.moveTo(cx, cy - CROSS_HALF_ARM_REST);
      offscreenRestCtx.lineTo(cx, cy + CROSS_HALF_ARM_REST);
    }
    offscreenRestCtx.stroke();
    restBufferReady = true;
  };

  const renderGridFrame = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';

    const { rest, accent } = colors;

    // 1. Blit seluruh sel istirahat dari offscreen buffer (1 operasi GPU/2D cepat)
    if (restBufferReady) {
      ctx.drawImage(offscreenRestCanvas, 0, 0, width, height);
    } else {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rest.r}, ${rest.g}, ${rest.b}, ${rest.a})`;
      ctx.lineWidth = CROSS_STROKE_REST;
      for (let i = 0; i < cellCount; i++) {
        if (heats[i] > 0) continue;
        const cx = cellsX[i];
        const cy = cellsY[i];
        ctx.moveTo(cx - CROSS_HALF_ARM_REST, cy);
        ctx.lineTo(cx + CROSS_HALF_ARM_REST, cy);
        ctx.moveTo(cx, cy - CROSS_HALF_ARM_REST);
        ctx.lineTo(cx, cy + CROSS_HALF_ARM_REST);
      }
      ctx.stroke();
    }

    // 2. Gambar hanya sel aktif/mendingin yang menyala, membesar, dan berputar menghadap kursor
    const erasePad = CROSS_HALF_ARM_REST + 1.4;
    for (let i = 0; i < cellCount; i++) {
      const h = heats[i];
      if (h <= 0) continue;

      const cx = cellsX[i];
      const cy = cellsY[i];
      if (restBufferReady) {
        ctx.clearRect(cx - erasePad, cy - erasePad, erasePad * 2, erasePad * 2);
      }

      const arm = CROSS_HALF_ARM_REST + h * CROSS_HALF_ARM_GROWTH;
      const angle = angles[i];
      const ca = Math.cos(angle) * arm;
      const sa = Math.sin(angle) * arm;

      const r = Math.round(rest.r + (accent.r - rest.r) * h);
      const g = Math.round(rest.g + (accent.g - rest.g) * h);
      const b = Math.round(rest.b + (accent.b - rest.b) * h);
      const a = Math.min(0.95, rest.a + (0.92 - rest.a) * h);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
      ctx.lineWidth = CROSS_STROKE_REST + h * CROSS_STROKE_GROWTH;
      ctx.moveTo(cx - ca, cy - sa);
      ctx.lineTo(cx + ca, cy + sa);
      ctx.moveTo(cx + sa, cy - ca);
      ctx.lineTo(cx - sa, cy + ca);
      ctx.stroke();
    }
  };

  const allocateGridCells = () => {
    const layout = computeCursorGridLayout(width, height, CURSOR_GRID_GAP);
    cellCount = layout.cols * layout.rows;
    cellsX = new Float32Array(cellCount);
    cellsY = new Float32Array(cellCount);
    heats = new Float32Array(cellCount);
    angles = new Float32Array(cellCount);

    let idx = 0;
    for (let row = 0; row < layout.rows; row++) {
      const y = layout.startY + row * CURSOR_GRID_GAP;
      for (let col = 0; col < layout.cols; col++) {
        cellsX[idx] = layout.startX + col * CURSOR_GRID_GAP;
        cellsY[idx] = y;
        idx += 1;
      }
    }
  };

  const syncCanvasDimensions = (): boolean => {
    const nextW = Math.max(320, Math.round(window.innerWidth || document.documentElement.clientWidth || 1280));
    const nextH = Math.max(240, Math.round(window.innerHeight || document.documentElement.clientHeight || 800));
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
    const nextBufW = Math.round(nextW * nextDpr);
    const nextBufH = Math.round(nextH * nextDpr);

    if (
      nextW === width &&
      nextH === height &&
      canvas.width === nextBufW &&
      canvas.height === nextBufH
    ) {
      return false;
    }

    width = nextW;
    height = nextH;
    dpr = nextDpr;
    canvas.width = nextBufW;
    canvas.height = nextBufH;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    allocateGridCells();
    rebuildRestBuffer();
    return true;
  };

  const settleImmediately = (state: 'settled' | 'static') => {
    heats.fill(0);
    angles.fill(0);
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    renderGridFrame();
    updateDatasetState(state, 0);
  };

  const stepFrame = (now: number) => {
    if (document.hidden || reducedMotionMq.matches || !finePointerMq.matches) {
      settleImmediately(reducedMotionMq.matches || !finePointerMq.matches ? 'static' : 'settled');
      return;
    }

    const dtSeconds = lastFrameTime > 0 ? (now - lastFrameTime) / 1000 : 0.016;
    lastFrameTime = now;

    const step = stepCursorGridState(
      cellsX,
      cellsY,
      heats,
      angles,
      cellCount,
      pointerX,
      pointerY,
      CURSOR_GRID_RADIUS,
      dtSeconds
    );

    renderGridFrame();

    if (!step.moving) {
      rafId = null;
      lastFrameTime = 0;
      updateDatasetState('settled', step.activeCount);
      return;
    }

    updateDatasetState('active', step.activeCount);
    rafId = window.requestAnimationFrame(stepFrame);
  };

  const scheduleAnimation = () => {
    if (reducedMotionMq.matches || !finePointerMq.matches || document.hidden) return;
    if (rafId === null) {
      lastFrameTime = performance.now();
      rafId = window.requestAnimationFrame(stepFrame);
    }
  };

  syncCanvasDimensions();
  settleImmediately(reducedMotionMq.matches || !finePointerMq.matches ? 'static' : 'settled');

  // Reaksi hanya untuk pointer mouse desktop (touch & reduced-motion tetap statis)
  window.addEventListener(
    'pointermove',
    (ev: PointerEvent) => {
      if (ev.pointerType === 'touch' || !finePointerMq.matches || reducedMotionMq.matches || document.hidden) {
        return;
      }
      pointerX = ev.clientX;
      pointerY = ev.clientY;
      updateDatasetState('active', Number(canvas.dataset.swarmActive || 0));
      scheduleAnimation();
    },
    { passive: true }
  );

  const handlePointerExit = () => {
    pointerX = -9999;
    pointerY = -9999;
    if (rafId === null && !reducedMotionMq.matches && finePointerMq.matches && Number(canvas.dataset.swarmActive || 0) > 0) {
      scheduleAnimation();
    }
  };

  document.addEventListener('pointerleave', handlePointerExit, { passive: true });
  window.addEventListener('blur', handlePointerExit, { passive: true });

  // Sinkronisasi warna tema Daylight / Obsidian
  let paletteRaf: number | null = null;
  const paletteObserver = new MutationObserver(() => {
    colors = readCursorGridColors();
    rebuildRestBuffer();
    if (rafId === null) renderGridFrame();
    if (paletteRaf !== null) cancelAnimationFrame(paletteRaf);
    paletteRaf = requestAnimationFrame(() => {
      paletteRaf = null;
      colors = readCursorGridColors();
      rebuildRestBuffer();
      if (rafId === null) renderGridFrame();
    });
  });
  paletteObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-palette']
  });

  // Sinkronisasi ukuran viewport & lifecycle tab
  window.addEventListener(
    'resize',
    () => {
      if (syncCanvasDimensions()) {
        renderGridFrame();
        const isStatic = reducedMotionMq.matches || !finePointerMq.matches;
        updateDatasetState(isStatic ? 'static' : 'settled', 0);
      }
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pointerX = -9999;
      pointerY = -9999;
      settleImmediately(reducedMotionMq.matches || !finePointerMq.matches ? 'static' : 'settled');
    }
  });

  const handleEnvironmentChange = () => {
    pointerX = -9999;
    pointerY = -9999;
    settleImmediately(reducedMotionMq.matches || !finePointerMq.matches ? 'static' : 'settled');
  };

  reducedMotionMq.addEventListener('change', handleEnvironmentChange);
  finePointerMq.addEventListener('change', handleEnvironmentChange);
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE 2-STAGE 3D WEBGL LANYARD CONTROLLER (ReactBits Three.js Port)
   Dynamically loads pure-Three.js rigid-body + 4-link woven strap engine with
   LCP DOM fallback, reduced-motion fallback, 0% Idle CPU settle, and Stage 2
   scroll-triggered mini hanging pass on desktop (> 1050px).
   -------------------------------------------------------------------------- */
export function initInteractiveLanyard(onNotify?: (msg: string) => void): void {
  const heroPanel = document.getElementById('photo-panel');
  const heroThreeStage = document.getElementById('hero-lanyard-three');
  const heroFront = document.getElementById('hero-lanyard-front');
  const heroBack = document.getElementById('hero-lanyard-back');
  const heroFlipBtns = document.querySelectorAll<HTMLButtonElement>('[data-hero-flip]');

  const floatingEl = document.getElementById('floating-lanyard');
  const floatingThreeStage = document.getElementById('floating-lanyard-three');
  const floatingCloseBtn = document.getElementById('floating-lanyard-close');

  if (!heroPanel || !heroFront || !heroBack) return;

  type LanyardModule = typeof import('./three-lanyard');
  type LanyardHandle = import('./three-lanyard').ThreeLanyardHandle;

  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopMq = window.matchMedia('(min-width: 1051px)');
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  let modulePromise: Promise<LanyardModule> | null = null;
  let heroHandle: LanyardHandle | null = null;
  let floatingHandle: LanyardHandle | null = null;
  let dismissedByUser = false;
  let isHeroPastViewport = false;
  let destroyed = false;

  const loadEngine = (): Promise<LanyardModule> => {
    if (!modulePromise) {
      modulePromise = import('./three-lanyard');
    }
    return modulePromise;
  };

  const syncFlipState = (flipped: boolean) => {
    heroPanel.dataset.lanyardFlipped = flipped ? 'true' : 'false';
    heroFront.inert = flipped;
    heroBack.inert = !flipped;
    heroFlipBtns.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(flipped));
    });
  };

  const mountHeroThree = async () => {
    if (!heroThreeStage || heroHandle || destroyed) return;
    try {
      const { mountThreeLanyard } = await loadEngine();
      if (heroHandle || destroyed) return;
      const handle = mountThreeLanyard(heroThreeStage, {
        variant: 'hero',
        frontImage: '/foto-profil.webp',
        orientation: 'portrait',
        finish: 'holographic',
        foilIntensity: 0.35,
        cornerRadius: 0.3,
        size: 0.64,
        anchor: 'center',
        strapLength: 0.42,
        strapWidth: 0.65,
        metal: 'silver',
        gravity: 1,
        damping: 0.55,
        elasticity: 0.5,
        breeze: 0.25,
        interactive: true,
        intro: true,
        onReady: () => {
          heroPanel.dataset.lanyardReady = 'true';
        },
        onNotify,
        onDragChange: (dragging) => {
          heroPanel.dataset.dragging = dragging ? 'true' : 'false';
        },
        onFlipChange: (flipped) => {
          syncFlipState(flipped);
        }
      });
      if (!handle) {
        heroPanel.dataset.lanyardReady = 'pending';
        return;
      }
      heroHandle = handle;
      heroHandle.setVisible(!isHeroPastViewport);
    } catch {
      heroPanel.dataset.lanyardReady = 'pending';
    }
  };

  const mountFloatingThree = async () => {
    if (!floatingEl || !floatingThreeStage || floatingHandle || destroyed) return;
    try {
      const { mountThreeLanyard } = await loadEngine();
      if (floatingHandle || destroyed) return;
      const handle = mountThreeLanyard(floatingThreeStage, {
        variant: 'mini',
        frontImage: '/foto-profil.webp',
        orientation: 'portrait',
        finish: 'holographic',
        foilIntensity: 0.28,
        cornerRadius: 0.34,
        size: 0.58,
        anchor: 'center',
        strapLength: 0.5,
        strapWidth: 0.56,
        metal: 'silver',
        gravity: 1,
        damping: 0.5,
        elasticity: 0.52,
        breeze: 0.3,
        interactive: true,
        intro: true,
        onReady: () => {
          floatingEl.dataset.lanyardReady = 'true';
        },
        onNotify,
        onDragChange: (dragging) => {
          floatingEl.dataset.dragging = dragging ? 'true' : 'false';
        },
        onFlipChange: (flipped) => {
          floatingEl.dataset.lanyardFlipped = flipped ? 'true' : 'false';
        }
      });
      if (!handle) {
        floatingEl.dataset.lanyardReady = 'pending';
        return;
      }
      floatingHandle = handle;
      const isHanging = floatingEl.dataset.hanging === 'true';
      floatingHandle.setVisible(isHanging);
      if (isHanging) {
        floatingHandle.reenter();
      }
    } catch {
      floatingEl.dataset.lanyardReady = 'pending';
    }
  };

  const syncFloatingVisibility = () => {
    if (!floatingEl) return;
    const shouldShow = desktopMq.matches && !dismissedByUser && isHeroPastViewport;
    const wasHanging = floatingEl.dataset.hanging === 'true';

    floatingEl.dataset.hanging = shouldShow ? 'true' : 'false';
    floatingEl.inert = !shouldShow;
    heroHandle?.setVisible(!isHeroPastViewport);

    if (shouldShow) {
      if (!floatingHandle) {
        void mountFloatingThree();
      } else {
        floatingHandle.setVisible(true);
        if (!wasHanging) {
          floatingHandle.reenter();
        }
      }
    } else {
      floatingHandle?.setVisible(false);
      floatingEl.dataset.dragging = 'false';
    }
  };

  heroFlipBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (heroHandle && heroPanel.dataset.lanyardReady === 'true') {
        heroHandle.flip();
      } else {
        syncFlipState(heroPanel.dataset.lanyardFlipped !== 'true');
      }
    });
  });

  void mountHeroThree();

  if (floatingEl) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isHeroPastViewport = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        syncFloatingVisibility();
      },
      { threshold: 0 }
    );
    observer.observe(heroPanel);

    desktopMq.addEventListener('change', syncFloatingVisibility);

    floatingCloseBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissedByUser = true;
      syncFloatingVisibility();
    });

    let prevScrollY = window.scrollY;
    let scrollNudgeRaf = 0;
    const applyScrollNudge = () => {
      scrollNudgeRaf = 0;
      const curScrollY = window.scrollY;
      const delta = curScrollY - prevScrollY;
      prevScrollY = curScrollY;
      if (
        floatingEl.dataset.hanging === 'true' &&
        floatingEl.dataset.dragging !== 'true' &&
        !reducedMotionMq.matches &&
        Math.abs(delta) > 1.5
      ) {
        floatingHandle?.nudge(
          clamp(-delta * 0.0028, -0.32, 0.28),
          clamp(Math.abs(delta) * 0.0032, 0, 0.26),
          clamp(-delta * 0.004, -0.42, 0.42)
        );
      }
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!scrollNudgeRaf) {
          scrollNudgeRaf = window.requestAnimationFrame(applyScrollNudge);
        }
      },
      { passive: true }
    );
  }

  // Sinkronisasi warna kartu & tali WebGL saat tema Daylight / Obsidian berganti
  let paletteRaf: number | null = null;
  const paletteObserver = new MutationObserver(() => {
    heroHandle?.refreshPalette();
    floatingHandle?.refreshPalette();
    if (paletteRaf !== null) cancelAnimationFrame(paletteRaf);
    paletteRaf = requestAnimationFrame(() => {
      paletteRaf = null;
      heroHandle?.refreshPalette();
      floatingHandle?.refreshPalette();
    });
  });
  paletteObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-palette']
  });

  document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const email = btn.dataset.copyEmail;
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        onNotify?.(`Email disalin: ${email}`);
      } catch {
        onNotify?.(`Email: ${email}`);
      }
    });
  });

  reducedMotionMq.addEventListener('change', () => {
    if (!heroHandle) void mountHeroThree();
    syncFloatingVisibility();
  });

  window.addEventListener('pagehide', () => {
    destroyed = true;
    heroHandle?.destroy();
    floatingHandle?.destroy();
  });
}

/* --------------------------------------------------------------------------
   9. REACT BITS VANILLA PORTS (Magnet, ClickSpark, AnimatedContent, CountUp)
   -------------------------------------------------------------------------- */

/**
 * Attaches gentle cursor attraction (--mag-x / --mag-y) on desktop fine pointers.
 */
export function initMagnetElements(): void {
  const finePointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-magnet]'));
  if (!elements.length) return;

  const rectCache = new WeakMap<HTMLElement, DOMRect>();
  const clearCache = () => {
    elements.forEach((el) => rectCache.delete(el));
  };
  window.addEventListener('scroll', clearCache, { passive: true });
  window.addEventListener('resize', clearCache, { passive: true });

  const stopControllers: Array<() => void> = [];

  elements.forEach((el) => {
    let rafId = 0;
    let lastTime = 0;
    let hovering = false;
    let curX = 0;
    let curY = 0;
    let targetX = 0;
    let targetY = 0;

    const resetImmediate = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastTime = 0;
      hovering = false;
      curX = 0;
      curY = 0;
      targetX = 0;
      targetY = 0;
      el.classList.remove('is-magnet-active');
      el.style.removeProperty('--mag-x');
      el.style.removeProperty('--mag-y');
    };
    stopControllers.push(resetImmediate);

    const tick = (now: number) => {
      const dt = lastTime > 0 ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;

      const step = stepDamped2D(curX, curY, targetX, targetY, hovering ? 14 : 9, dt, 0.04);
      curX = step.x;
      curY = step.y;

      if (curX === 0 && curY === 0) {
        el.style.removeProperty('--mag-x');
        el.style.removeProperty('--mag-y');
      } else {
        el.style.setProperty('--mag-x', `${curX.toFixed(2)}px`);
        el.style.setProperty('--mag-y', `${curY.toFixed(2)}px`);
      }

      if (step.settled) {
        rafId = 0;
        lastTime = 0;
        if (!hovering) {
          el.classList.remove('is-magnet-active');
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

    el.addEventListener('pointerenter', (ev: PointerEvent) => {
      if (ev.pointerType === 'touch' || !finePointerMq.matches || reducedMotionMq.matches) return;
      hovering = true;
      rectCache.set(el, el.getBoundingClientRect());
      el.classList.add('is-magnet-active');
    }, { passive: true });

    el.addEventListener('pointermove', (ev: PointerEvent) => {
      if (ev.pointerType === 'touch' || !finePointerMq.matches || reducedMotionMq.matches) {
        resetImmediate();
        return;
      }
      hovering = true;
      let rect = rectCache.get(el);
      if (!rect) {
        rect = el.getBoundingClientRect();
        rectCache.set(el, rect);
      }
      const dx = ev.clientX - (rect.left + rect.width / 2);
      const dy = ev.clientY - (rect.top + rect.height / 2);
      const offset = computeMagnetOffset(dx, dy, 6.5, 5, true);
      targetX = offset.x;
      targetY = offset.y;
      el.classList.add('is-magnet-active');
      ensureLoop();
    }, { passive: true });

    const releaseMagnet = () => {
      hovering = false;
      rectCache.delete(el);
      targetX = 0;
      targetY = 0;
      ensureLoop();
    };

    el.addEventListener('pointerleave', releaseMagnet, { passive: true });
    el.addEventListener('blur', releaseMagnet);
  });

  const handleCapabilityChange = () => {
    if (reducedMotionMq.matches || !finePointerMq.matches) {
      stopControllers.forEach((fn) => fn());
    }
  };
  reducedMotionMq.addEventListener('change', handleCapabilityChange);
  finePointerMq.addEventListener('change', handleCapabilityChange);
}

/**
 * Renders transient radial click bursts on [data-spark] elements using a shared
 * fixed canvas that runs animation frames ONLY while sparks are alive (0% Idle CPU).
 */
export function initClickSpark(): void {
  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!document.body) return;

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let sparks: SparkParticle[] = [];
  let rafId: number | null = null;
  let lastTime = 0;
  let sparkColor = '#0066cc';

  const ensureCanvas = (): boolean => {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'rb-click-spark-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.cssText =
        'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:450;';
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
    }
    if (!ctx || !canvas) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    return true;
  };

  const stopLoop = () => {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    sparks = [];
    if (ctx && canvas) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  };

  const renderFrame = (now: number) => {
    if (reducedMotionMq.matches || document.hidden || !ctx || !canvas) {
      stopLoop();
      return;
    }

    const dtMs = lastTime > 0 ? Math.min(48, now - lastTime) : 16;
    lastTime = now;

    const result = stepSparkParticles(sparks, dtMs);
    sparks = result.active;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = sparkColor;
    ctx.lineCap = 'round';
    ctx.lineWidth = 1.75;

    for (let i = 0; i < sparks.length; i++) {
      const p = sparks[i];
      const progress = p.life / p.durationMs;
      const alpha = Math.max(0, 1 - progress);
      const len = 8 * (1 - progress * 0.65);
      const ex = p.x + Math.cos(p.angle) * len;
      const ey = p.y + Math.sin(p.angle) * len;

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    if (result.anyAlive) {
      rafId = window.requestAnimationFrame(renderFrame);
    } else {
      stopLoop();
    }
  };

  document.addEventListener('click', (ev: MouseEvent) => {
    if (reducedMotionMq.matches || document.hidden) return;
    const target = (ev.target as Element | null)?.closest<HTMLElement>('[data-spark]');
    if (!target || !ensureCanvas()) return;

    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim();
    if (accent) sparkColor = accent;

    const rect = target.getBoundingClientRect();
    const hasCoords = ev.clientX !== 0 || ev.clientY !== 0;
    const cx = hasCoords ? ev.clientX : rect.left + rect.width / 2;
    const cy = hasCoords ? ev.clientY : rect.top + rect.height / 2;

    sparks.push(...createSparkBurst(cx, cy, 8, 92, 340));
    if (rafId === null) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(renderFrame);
    }
  });

  reducedMotionMq.addEventListener('change', () => {
    if (reducedMotionMq.matches) stopLoop();
  });
}

/**
 * Observes [data-reveal] containers ONLY as a progressive enhancement fallback
 * when CSS scroll-driven `animation-timeline: view()` is unsupported.
 */
export function initAnimatedContent(): void {
  if (prefersReducedMotion()) return;
  const supportsViewTimeline =
    typeof window.CSS?.supports === 'function' &&
    window.CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  if (supportsViewTimeline) return;

  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!targets.length || typeof IntersectionObserver !== 'function') return;

  document.documentElement.dataset.revealFallback = 'true';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -28px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * Animates factual counters [data-countup-target] once when entering viewport.
 */
export function initCountUp(): void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-countup-target]'));
  if (!elements.length) return;

  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const formatText = (el: HTMLElement, value: number) => {
    const prefix = el.dataset.countupPrefix || '';
    const suffix = el.dataset.countupSuffix || '';
    return `${prefix}${value}${suffix}`;
  };

  if (reducedMotionMq.matches || typeof IntersectionObserver !== 'function') {
    elements.forEach((el) => {
      const target = Number(el.dataset.countupTarget);
      if (Number.isFinite(target)) el.textContent = formatText(el, target);
    });
    return;
  }

  const DURATION_MS = 680;
  const runCounter = (el: HTMLElement) => {
    const target = Number(el.dataset.countupTarget);
    const start = Number(el.dataset.countupStart ?? '0');
    if (!Number.isFinite(target) || !Number.isFinite(start)) return;

    const startTime = performance.now();
    const tick = (now: number) => {
      if (reducedMotionMq.matches) {
        el.textContent = formatText(el, target);
        return;
      }
      const progress = Math.min(1, (now - startTime) / DURATION_MS);
      el.textContent = formatText(el, interpolateCountUp(start, target, progress));
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        el.textContent = formatText(el, target);
      }
    };
    window.requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        runCounter(el);
      });
    },
    { threshold: 0.35 }
  );

  elements.forEach((el) => observer.observe(el));
}
