/**
 * ==========================================================================
 * INTERACTIVE MOTION & WORKBENCH RUNTIME (motion.ts)
 * Menangani pointer spotlight, tab role hero, simulasi arsitektur SVG,
 * View Transitions filter proyek, jembatan skill-ke-proyek, & physics modal.
 * ==========================================================================
 */

import { PROJECTS, SKILL_CONTEXT_NOTES } from '../data/projects';

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
  let lastX = 0;
  let lastY = 0;
  let rafId = 0;

  const commitPosition = () => {
    rafId = 0;
    if (!activeCard) return;
    const rect = activeCard.getBoundingClientRect();
    const x = Math.round(lastX - rect.left);
    const y = Math.round(lastY - rect.top);
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
        return;
      }
      activeCard = target;
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

  const selectRole = (selectedTab: HTMLButtonElement) => {
    const roleId = selectedTab.dataset.roleTab;
    if (!roleId) return;

    tabs.forEach(tab => {
      const active = tab === selectedTab;
      tab.setAttribute('aria-selected', String(active));
      tab.toggleAttribute('focusgroupstart', active);
    });

    panels.forEach(panel => {
      const match = panel.id === `hero-role-panel-${roleId}`;
      if (match) {
        panel.removeAttribute('hidden');
        panel.setAttribute('tabindex', '0');
      } else {
        panel.setAttribute('hidden', 'until-found');
        panel.removeAttribute('tabindex');
      }
    });
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => selectRole(tab));
  });

  panels.forEach(panel => {
    panel.addEventListener('beforematch', () => {
      const roleId = panel.id.replace('hero-role-panel-', '');
      const tab = tabs.find(t => t.dataset.roleTab === roleId);
      if (tab) selectRole(tab);
    });
  });

  bindTabKeyboard(tablist, tabs, selectRole);
}

/* --------------------------------------------------------------------------
   5. SIGNAL-PULSE ARCHITECTURE WORKBENCH (#arsitektur)
   -------------------------------------------------------------------------- */
const RBAC_MATRIX: Record<string, Array<{ text: string; allowed: boolean }>> = {
  admin: [
    { text: '✓ users (Kelola Akun + Proteksi Self-Disable)', allowed: true },
    { text: '✓ financial_reports (Index Komposit PostgreSQL)', allowed: true },
    { text: '✓ orders & complaints (Audit Penuh)', allowed: true }
  ],
  kasir: [
    { text: '✓ laundry_orders (Buat Nota & Update 4 Tahap)', allowed: true },
    { text: '✓ payments (Catat Pelunasan & Cetak Struk)', allowed: true },
    { text: '✕ users & financial_reports (Dibatasi Owner)', allowed: false }
  ],
  pelanggan: [
    { text: '✓ public_tracking (Cek Status via Nomor Nota Tanpa Login)', allowed: true },
    { text: '✓ complaints (Ajukan Keluhan Terkait Nota)', allowed: true },
    { text: '✕ panel_admin & kasir_pos (Ditolak RBAC)', allowed: false }
  ]
};

const AI_JSON_PRESETS = [
  {
    raw_input: 'Beli kopi 25rb kemarin',
    type: 'expense',
    amount: 25000,
    category: 'Konsumsi',
    relative_date: 'yesterday',
    proxy: 'server-side-validated'
  },
  {
    raw_input: 'Bayar listrik 320rb',
    type: 'expense',
    amount: 320000,
    category: 'Utilitas & Tagihan',
    relative_date: 'today',
    proxy: 'server-side-validated'
  },
  {
    raw_input: 'Terima proyek 3.5jt',
    type: 'income',
    amount: 3500000,
    category: 'Honor Proyek',
    relative_date: 'today',
    proxy: 'server-side-validated'
  }
];

export function initArchitectureWorkbench(): void {
  const playerCard = document.querySelector<HTMLElement>('[data-hf-player]');
  if (!playerCard) return;

  const DURATION = 9000;
  const STEP_STARTS = [0, 3000, 6000];

  const playBtn = document.getElementById('hf-play-toggle');
  const pauseIcon = document.getElementById('hf-icon-pause');
  const playIcon = document.getElementById('hf-icon-play');
  const playLabel = document.getElementById('hf-play-label');
  const timecodeEl = document.getElementById('hf-timecode');
  const scrubber = document.getElementById('hf-scrubber') as HTMLInputElement | null;
  const progressEl = document.getElementById('hf-scrubber-progress');
  const tablist = playerCard.querySelector<HTMLElement>('.hf-steps-tabs');

  const nodes = Array.from(playerCard.querySelectorAll<HTMLElement>('[data-hf-node]'));
  const connectors = Array.from(playerCard.querySelectorAll<HTMLElement>('[data-hf-connector]'));
  const tabs = Array.from(playerCard.querySelectorAll<HTMLButtonElement>('[data-hf-step]'));
  const panels = [0, 1, 2].map(i => document.getElementById(`hf-wb-${i}`)).filter((el): el is HTMLElement => Boolean(el));

  const reduced = prefersReducedMotion();
  let currentTime = 0;
  let activeStageIdx = 0;
  let userPaused = reduced;
  let inViewport = true;
  let lastFrame = performance.now();
  let rafId = 0;

  const isRunning = () => !userPaused && inViewport && !reduced;

  const syncPlayControls = () => {
    const runningNow = isRunning();
    playerCard.dataset.playing = String(runningNow);
    if (playBtn) playBtn.setAttribute('aria-pressed', String(!userPaused));
    if (pauseIcon) pauseIcon.style.display = userPaused ? 'none' : 'block';
    if (playIcon) playIcon.style.display = userPaused ? 'block' : 'none';
    if (playLabel) playLabel.textContent = userPaused ? 'Putar' : 'Jeda';
  };

  const syncWorkbenchPanel = (stageIdx: number) => {
    panels.forEach((panel, idx) => {
      if (idx === stageIdx) {
        panel.removeAttribute('hidden');
        panel.setAttribute('tabindex', '0');
      } else {
        panel.setAttribute('hidden', 'until-found');
        panel.removeAttribute('tabindex');
      }
    });
  };

  const renderFrame = (ms: number) => {
    const clamped = Math.max(0, Math.min(DURATION, ms));
    currentTime = clamped;
    const progress = clamped / DURATION;

    if (progressEl) progressEl.style.setProperty('--hf-progress', progress.toFixed(4));
    if (scrubber && document.activeElement !== scrubber) {
      scrubber.value = String(Math.round(clamped));
    }
    if (timecodeEl) {
      timecodeEl.textContent = `${(clamped / 1000).toFixed(1).padStart(4, '0')}s / 09.0s`;
    }

    let nextIdx = 0;
    if (clamped >= STEP_STARTS[2]) nextIdx = 2;
    else if (clamped >= STEP_STARTS[1]) nextIdx = 1;

    nodes.forEach((node, idx) => {
      node.classList.toggle('is-active', idx === nextIdx);
      node.classList.toggle('is-passed', idx < nextIdx);
    });

    connectors.forEach((conn, idx) => {
      conn.classList.toggle('is-active', nextIdx > idx);
      conn.classList.toggle('is-pulsing', nextIdx === idx && isRunning());
    });

    tabs.forEach((tab, idx) => {
      const active = idx === nextIdx;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.toggleAttribute('focusgroupstart', active);
    });

    if (nextIdx !== activeStageIdx) {
      activeStageIdx = nextIdx;
      syncWorkbenchPanel(nextIdx);
    }
  };

  const tick = (now: number) => {
    if (!isRunning()) {
      rafId = 0;
      return;
    }
    const delta = Math.min(now - lastFrame, 100);
    lastFrame = now;
    renderFrame((currentTime + delta) % DURATION);
    rafId = window.requestAnimationFrame(tick);
  };

  const startLoop = () => {
    syncPlayControls();
    connectors.forEach((conn, idx) => {
      conn.classList.toggle('is-pulsing', activeStageIdx === idx && isRunning());
    });
    if (isRunning() && !rafId) {
      lastFrame = performance.now();
      rafId = window.requestAnimationFrame(tick);
    }
  };

  const jumpToStage = (idx: number, pauseOnInteract = false) => {
    if (pauseOnInteract) userPaused = true;
    renderFrame(STEP_STARTS[idx] ?? 0);
    startLoop();
  };

  playBtn?.addEventListener('click', () => {
    userPaused = !userPaused;
    startLoop();
  });

  scrubber?.addEventListener('input', () => {
    userPaused = true;
    renderFrame(Number(scrubber.value));
    startLoop();
  });

  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => jumpToStage(idx, true));
    node.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        jumpToStage(idx, true);
      }
    });
  });

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => jumpToStage(idx, true));
  });

  if (tablist) {
    bindTabKeyboard(tablist, tabs, tab => {
      const idx = tabs.indexOf(tab);
      if (idx >= 0) jumpToStage(idx, true);
    });
  }

  panels.forEach((panel, idx) => {
    panel.addEventListener('beforematch', () => jumpToStage(idx, true));
  });

  // Auto-pause loop saat keluar viewport (hemat GPU & baterai)
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (!entry) return;
        inViewport = entry.isIntersecting;
        startLoop();
      },
      { threshold: 0.1 }
    );
    io.observe(playerCard);
  }

  // Interactive Workbench Sub-controls: Panel 0 RBAC Matrix
  const rbacButtons = Array.from(playerCard.querySelectorAll<HTMLButtonElement>('[data-rbac-role]'));
  const rbacOutput = document.getElementById('hf-rbac-output');
  rbacButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.rbacRole || 'admin';
      const rows = RBAC_MATRIX[role] || RBAC_MATRIX.admin;

      rbacButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-selected', active);
        b.setAttribute('aria-pressed', String(active));
      });

      if (rbacOutput) {
        rbacOutput.replaceChildren(
          ...rows.map(item => {
            const span = document.createElement('span');
            span.className = `hf-perm ${item.allowed ? 'is-allow' : 'is-deny'}`;
            span.textContent = item.text;
            return span;
          })
        );
      }
      userPaused = true;
      startLoop();
    });
  });

  // Panel 1 AI JSON Preset Switcher
  const aiButtons = Array.from(playerCard.querySelectorAll<HTMLButtonElement>('[data-ai-preset]'));
  const aiOutput = document.getElementById('hf-ai-json-output')?.querySelector('code');
  aiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.aiPreset || 0);
      const payload = AI_JSON_PRESETS[idx] || AI_JSON_PRESETS[0];

      aiButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-selected', active);
        b.setAttribute('aria-pressed', String(active));
      });

      if (aiOutput) {
        aiOutput.textContent = JSON.stringify(payload, null, 2);
      }
      userPaused = true;
      startLoop();
    });
  });

  // Panel 2 SQL Query Strategy Toggle
  const sqlButtons = Array.from(playerCard.querySelectorAll<HTMLButtonElement>('[data-sql-mode]'));
  const sqlLabel = document.getElementById('hf-sql-label');
  const sqlBadge = document.getElementById('hf-sql-badge');
  const sqlBar = document.getElementById('hf-sql-bar');
  const sqlDesc = document.getElementById('hf-sql-desc');

  sqlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.sqlMode || 'matview';
      sqlButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-selected', active);
        b.setAttribute('aria-pressed', String(active));
      });

      if (mode === 'matview') {
        if (sqlLabel) sqlLabel.textContent = 'Materialized View PostgreSQL (Precomputed)';
        if (sqlBadge) sqlBadge.textContent = 'Ringan Saat Read';
        if (sqlBar) sqlBar.style.transform = 'scaleX(0.32)';
        if (sqlDesc) {
          sqlDesc.textContent =
            'Data agregasi statistik Portal IVSS disiapkan lebih awal sehingga halaman dashboard tidak melakukan scan berulang.';
        }
      } else {
        if (sqlLabel) sqlLabel.textContent = 'Standard Aggregation Query (COUNT/JOIN On-Demand)';
        if (sqlBadge) sqlBadge.textContent = 'Hitung Ulang Setiap Request';
        if (sqlBar) sqlBar.style.transform = 'scaleX(0.92)';
        if (sqlDesc) {
          sqlDesc.textContent =
            'Setiap admin membuka dashboard, PostgreSQL menghitung ulang relasi tabel berita dan log aktivitas dari awal.';
        }
      }
      userPaused = true;
      startLoop();
    });
  });

  syncWorkbenchPanel(0);
  renderFrame(0);
  startLoop();
}

/* --------------------------------------------------------------------------
   6. PROJECT CATEGORY FILTERS (VIEW TRANSITIONS) & SKILL BRIDGE
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

  const skillChips = Array.from(document.querySelectorAll<HTMLButtonElement>('.skill-chip[data-skill-id]'));
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
      skillChips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));

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
