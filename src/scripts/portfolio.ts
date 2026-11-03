/**
 * ==========================================================================
 * CLIENT-SIDE INTERACTION RUNTIME (portfolio.ts)
 * Menangani palet warna, dialog modal, command palette (Ctrl+K), & upload foto.
 * ==========================================================================
 */

import { PROJECTS, SITE_CONFIG } from '../data/projects';
import { initBackgroundWanderers } from './wanderer';
import { initMangaUIFX } from './manga-fx';
import { prefersReducedMotion } from './motion';
import { initLiveDemo, switchCuciinSlide, fitProjectPreviews } from './live-demo';
import { techIconIds } from '../data/tech-icon-ids';

// State
const overlayStack: HTMLElement[] = [];
let priorFocus: HTMLElement | null = null;
let toastTimer: number | null = null;
let photoObjectUrl: string | null = null;

// Notifikasi Toast
export function notify(msg: string): void {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('visible');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

// Dialog Management
export function openOverlay(el: HTMLElement, focusEl?: HTMLElement | null): void {
  priorFocus = document.activeElement as HTMLElement;
  el.classList.add('open');
  overlayStack.push(el);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    (focusEl || el.querySelector<HTMLElement>('button, input, [tabindex]'))?.focus();
  });
}

export function closeOverlay(el: HTMLElement): void {
  el.classList.remove('open');
  const idx = overlayStack.indexOf(el);
  if (idx > -1) overlayStack.splice(idx, 1);

  if (!overlayStack.length) {
    document.body.style.overflow = '';
  }
  priorFocus?.focus?.();
}

export function showProjectDetail(key: string): void {
  const project = PROJECTS.find(p => p.id === key);
  const projectOverlay = document.getElementById('project-overlay');
  if (!project || !projectOverlay) return;

  const detailCategory = document.getElementById('detail-category');
  const detailName = document.getElementById('detail-name');
  const detailType = document.getElementById('detail-type');
  const detailRole = document.getElementById('detail-role');
  const detailArtifacts = document.getElementById('detail-artifacts');
  const detailProblem = document.getElementById('detail-problem');
  const detailApproach = document.getElementById('detail-approach');
  const detailProcessAnalysis = document.getElementById('detail-process-analysis');
  const detailProcessDesign = document.getElementById('detail-process-design');
  const detailProcessImpl = document.getElementById('detail-process-impl');
  const detailImpactList = document.getElementById('detail-impact-list');
  const detailHighlights = document.getElementById('detail-highlights');
  const detailStack = document.getElementById('detail-stack');
  const detailBrandBar = document.getElementById('detail-brand-bar');
  const detailPreview = document.getElementById('detail-preview');
  const detailPreviewBadge = document.getElementById('detail-preview-badge');

  if (detailCategory) detailCategory.textContent = project.category;
  if (detailName) detailName.textContent = project.title;
  if (detailType) detailType.textContent = project.projectType;
  if (detailRole) detailRole.textContent = project.role;
  if (detailProblem) detailProblem.textContent = project.problem;
  if (detailApproach) detailApproach.textContent = project.approach;
  if (detailProcessAnalysis) detailProcessAnalysis.textContent = project.process.analysis;
  if (detailProcessDesign) detailProcessDesign.textContent = project.process.design;
  if (detailProcessImpl) detailProcessImpl.textContent = project.process.implementation;
  if (detailPreviewBadge) detailPreviewBadge.textContent = project.badge;
  if (detailBrandBar && project.brandColor) {
    detailBrandBar.style.backgroundColor = project.brandColor;
  }

  if (detailArtifacts) {
    detailArtifacts.replaceChildren(
      ...(project.artifacts || []).map(art => {
        const pill = document.createElement('span');
        pill.className = 'artifact-pill mono';
        pill.textContent = '📄 ' + art;
        return pill;
      })
    );
  }

  if (detailPreview) {
    const sourceArt = document.querySelector(`.project-art[data-art="${key}"]`);
    detailPreview.replaceChildren();
    if (sourceArt) {
      const clonedArt = sourceArt.cloneNode(true) as HTMLElement;
      clonedArt.removeAttribute('data-art');
      detailPreview.appendChild(clonedArt);

      const cuciinApp = clonedArt.querySelector<HTMLElement>('.app-cuciin');
      if (cuciinApp) {
        switchCuciinSlide(cuciinApp, 0);
      }
      requestAnimationFrame(() => {
        fitProjectPreviews();
      });
    }
  }

  if (detailImpactList) {
    detailImpactList.replaceChildren(
      ...(project.impactMetrics || []).map(metric => {
        const li = document.createElement('li');
        li.textContent = metric;
        return li;
      })
    );
  }

  if (detailHighlights) {
    detailHighlights.replaceChildren(
      ...(project.highlights || []).map(item => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      })
    );
  }

  if (detailStack) {
    detailStack.replaceChildren(
      ...project.stack.map(tech => {
        const tag = document.createElement('span');
        tag.className = 'tag mono';

        for (const id of techIconIds(tech)) {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('class', 'tag-icon');
          svg.setAttribute('data-icon', id);
          svg.setAttribute('viewBox', '0 0 24 24');
          svg.setAttribute('aria-hidden', 'true');
          svg.setAttribute('focusable', 'false');

          const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
          use.setAttribute('href', `#tech-${id}`);
          svg.appendChild(use);
          tag.appendChild(svg);
        }

        const label = document.createElement('span');
        label.className = 'tag-label';
        label.textContent = tech;
        tag.appendChild(label);

        return tag;
      })
    );
  }

  const detailRepo = document.getElementById('detail-repo') as HTMLAnchorElement | null;
  if (detailRepo) {
    if (project.repoUrl) {
      detailRepo.href = project.repoUrl;
      detailRepo.style.display = 'inline-flex';
    } else {
      detailRepo.style.display = 'none';
    }
  }

  const detailDemoUrl = document.getElementById('detail-demo-url') as HTMLAnchorElement | null;
  if (detailDemoUrl) {
    if (project.demoUrl) {
      detailDemoUrl.href = project.demoUrl;
      detailDemoUrl.style.display = 'inline-flex';
    } else {
      detailDemoUrl.style.display = 'none';
    }
  }

  const detailFigmaUrl = document.getElementById('detail-figma-url') as HTMLAnchorElement | null;
  if (detailFigmaUrl) {
    if (project.figmaUrl) {
      detailFigmaUrl.href = project.figmaUrl;
      detailFigmaUrl.style.display = 'inline-flex';
    } else {
      detailFigmaUrl.style.display = 'none';
    }
  }

  const closeBtn = projectOverlay.querySelector('[data-close]') as HTMLElement;
  openOverlay(projectOverlay, closeBtn);
}

// Theme Palette & Auto Transition Engine
export const PALETTES = [
  { id: 'morioh', name: 'MORIOH POP' },
  { id: 'golden', name: 'GOLDEN WIND' },
  { id: 'ocean', name: 'STONE OCEAN' },
  { id: 'sbr', name: 'STEEL BALL RUN' }
] as const;

let currentPaletteIdx = 0;
let autoPaletteTimer: number | null = null;
const AUTO_CYCLE_INTERVAL = 8500; // 8.5 detik pergantian transisi halus otomatis

export function setPalette(paletteId: string, showNotification = false): void {
  const normalizedId = paletteId;
  document.body.dataset.palette = normalizedId;
  localStorage.setItem('porto_palette', normalizedId);

  const matchIdx = PALETTES.findIndex(p => p.id === normalizedId);
  if (matchIdx !== -1) currentPaletteIdx = matchIdx;

  const label = PALETTES[currentPaletteIdx]?.name || normalizedId.toUpperCase();
  const labelEl = document.getElementById('palette-label');
  if (labelEl) {
    labelEl.textContent = label;
  }

  if (showNotification) {
    notify('Tema: ' + label);
  }
}

export function cyclePalette(manual = false): void {
  currentPaletteIdx = (currentPaletteIdx + 1) % PALETTES.length;
  setPalette(PALETTES[currentPaletteIdx].id, manual);
}

export function startAutoPaletteCycle(): void {
  if (autoPaletteTimer) clearInterval(autoPaletteTimer);

  autoPaletteTimer = window.setInterval(() => {
    cyclePalette(false);
  }, AUTO_CYCLE_INTERVAL);
}

// Navigasi Smooth
export function goToSection(hash: string): void {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }
  toggleMobileMenu(false);
  document.getElementById('header-inner')?.classList.remove('is-expanded');
}

// Mobile Menu Drawer
export function toggleMobileMenu(force?: boolean): void {
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menu-toggle');
  if (!nav || !menuToggle) return;

  const isOpen = typeof force === 'boolean' ? force : !nav.classList.contains('open');
  nav.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

// Sticky Adaptive Island Navbar & Scroll Spy
export function initStickyAdaptiveNavbar(): void {
  const header = document.getElementById('site-header');
  const headerInner = document.getElementById('header-inner');
  const nav = document.getElementById('nav');
  if (!header || !nav) return;

  const navLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[data-nav]'));
  const sectionIds = navLinks.map(link => link.dataset.nav).filter(Boolean) as string[];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter((sec): sec is HTMLElement => Boolean(sec));

  let ticking = false;

  // Hysteresis window to prevent boundary jitter during rapid scrolling:
  // Activate dynamic island pill past top navbar height (~80-100px).
  // Deactivate and return smoothly to full original header layout when near top.
  const ENTER_THRESHOLD = 85;
  const EXIT_THRESHOLD = 55;

  const updateHeaderState = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const isCurrentlyScrolled = header.classList.contains('is-scrolled');

    if (!isCurrentlyScrolled && scrollY > ENTER_THRESHOLD) {
      header.classList.add('is-scrolled');
      header.setAttribute('data-scrolled', 'true');
      if (nav.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    } else if (isCurrentlyScrolled && scrollY <= EXIT_THRESHOLD) {
      header.classList.remove('is-scrolled');
      header.setAttribute('data-scrolled', 'false');
      headerInner?.classList.remove('is-expanded');
      if (nav.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    }

    // 2. Scroll Spy: highlight active nav link
    const scrollPos = scrollY + 140;
    let currentId = '';

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
        break;
      }
    }

    navLinks.forEach(link => {
      const match = Boolean(currentId) && link.dataset.nav === currentId;
      link.classList.toggle('active', match);
      link.setAttribute('aria-current', match ? 'true' : 'false');
    });

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial trigger on page load
  updateHeaderState();

  // Mobile / Touch toggle & Draggable interaction for compact Dynamic Island
  if (headerInner) {
    let isDragging = false;
    let didDrag = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let currentWidth = 44;
    let currentHeight = 44;
    const DRAG_THRESHOLD = 8;

    // Restore saved position from localStorage if exists
    try {
      const saved = localStorage.getItem('maul_island_pos');
      if (saved) {
        const { x, y } = JSON.parse(saved);
        if (typeof x === 'number' && typeof y === 'number') {
          const clampedX = Math.max(12, Math.min(window.innerWidth - 60, x));
          const clampedY = Math.max(12, Math.min(window.innerHeight - 60, y));
          headerInner.style.setProperty('--island-x', `${clampedX}px`);
          headerInner.style.setProperty('--island-y', `${clampedY}px`);
          if (clampedX > window.innerWidth / 2) {
            headerInner.classList.add('dock-right');
          } else {
            headerInner.classList.remove('dock-right');
          }
        }
      }
    } catch {}

    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
        isDragging = true;
        didDrag = true;
        try {
          headerInner.setPointerCapture?.(e.pointerId);
        } catch {}
        headerInner.classList.add('is-dragging');
        headerInner.classList.remove('is-expanded');
      }

      if (isDragging) {
        const newX = Math.max(12, Math.min(window.innerWidth - currentWidth - 12, initialLeft + dx));
        const newY = Math.max(12, Math.min(window.innerHeight - currentHeight - 12, initialTop + dy));

        headerInner.style.setProperty('--island-x', `${newX}px`);
        headerInner.style.setProperty('--island-y', `${newY}px`);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      if (isDragging) {
        try {
          headerInner.releasePointerCapture?.(e.pointerId);
        } catch {}

        headerInner.classList.remove('is-dragging');
        const finalRect = headerInner.getBoundingClientRect();
        const finalX = Math.max(12, Math.min(window.innerWidth - currentWidth - 12, finalRect.left));
        const finalY = Math.max(12, Math.min(window.innerHeight - currentHeight - 12, finalRect.top));

        headerInner.style.setProperty('--island-x', `${finalX}px`);
        headerInner.style.setProperty('--island-y', `${finalY}px`);

        if (finalX > window.innerWidth / 2) {
          headerInner.classList.add('dock-right');
        } else {
          headerInner.classList.remove('dock-right');
        }

        try {
          localStorage.setItem('maul_island_pos', JSON.stringify({ x: finalX, y: finalY }));
        } catch {}

        setTimeout(() => {
          isDragging = false;
          didDrag = false;
        }, 120);
      } else {
        isDragging = false;
        didDrag = false;
      }
    };

    // Prevent native browser link drag
    headerInner.addEventListener('dragstart', (e: DragEvent) => {
      e.preventDefault();
    });

    headerInner.addEventListener('pointerdown', (e: PointerEvent) => {
      // Only drag when in scrolled state
      if (!header.classList.contains('is-scrolled')) return;
      // Don't drag if user clicked inside navigation link
      if ((e.target as HTMLElement).closest('.nav')) return;

      const rect = headerInner.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = rect.left;
      initialTop = rect.top;
      currentWidth = 44;
      currentHeight = 44;
      isDragging = false;
      didDrag = false;

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    });

    // Double click to reset position to default left
    headerInner.addEventListener('dblclick', (e: MouseEvent) => {
      if (!header.classList.contains('is-scrolled')) return;
      e.preventDefault();
      e.stopPropagation();
      try {
        localStorage.removeItem('maul_island_pos');
      } catch {}
      headerInner.style.removeProperty('--island-x');
      headerInner.style.removeProperty('--island-y');
      headerInner.classList.remove('dock-right');
      notify('Posisi logo dinamis direset ke kiri');
    });

    headerInner.addEventListener('click', (e: MouseEvent) => {
      if (!header.classList.contains('is-scrolled')) return;

      // If user actually dragged the badge, suppress click
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If user tapped a nav link, allow standard anchor navigation and close expanded pill
      const navAnchor = target.closest<HTMLAnchorElement>('.nav a');
      if (navAnchor) {
        headerInner.classList.remove('is-expanded');
        return;
      }

      // If user clicked inside the open navigation container, keep it open
      if (target.closest('.nav')) {
        return;
      }

      // User clicked the badge: toggle menu!
      e.preventDefault();
      e.stopPropagation();
      headerInner.classList.toggle('is-expanded');
    });

    // Close expanded island pill when clicking outside
    document.addEventListener('click', (e: MouseEvent) => {
      if (!headerInner.classList.contains('is-expanded')) return;
      const target = e.target as HTMLElement | null;
      if (target && !headerInner.contains(target)) {
        headerInner.classList.remove('is-expanded');
      }
    });

    // Close on Escape & blur active element to collapse :focus-within
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (headerInner.classList.contains('is-expanded')) {
          headerInner.classList.remove('is-expanded');
        }
        if (headerInner.contains(document.activeElement)) {
          (document.activeElement as HTMLElement)?.blur();
        }
      }
    });
  }
}

// Command Palette Definition
interface CommandItem {
  label: string;
  meta: string;
  action: () => void;
}

const COMMANDS: CommandItem[] = [
  { label: 'Ganti siklus tema warna berikutnya', meta: 'Tema Warna', action: () => cyclePalette(true) },
  { label: 'Aktifkan Tema Steel Ball Run (Vintage Sepia)', meta: 'Tema Warna', action: () => setPalette('sbr', true) },
  { label: 'Aktifkan Tema Morioh Pop (Default Pop)', meta: 'Tema Warna', action: () => setPalette('morioh', true) },
  { label: 'Aktifkan Tema Golden Wind (Warm Gold)', meta: 'Tema Warna', action: () => setPalette('golden', true) },
  { label: 'Aktifkan Tema Stone Ocean (Cool Cyan)', meta: 'Tema Warna', action: () => setPalette('ocean', true) },
  { label: 'Ke tentang saya & tujuan magang', meta: 'Navigasi', action: () => goToSection('#tentang') },
  { label: 'Ke keahlian lintas bidang SI (Skills)', meta: 'Navigasi', action: () => goToSection('#keahlian') },
  { label: 'Ke proyek unggulan SI', meta: 'Navigasi', action: () => goToSection('#pekerjaan') },
  { label: 'Ke pengalaman & organisasi', meta: 'Navigasi', action: () => goToSection('#pengalaman') },
  { label: 'Ke pendidikan, sertifikasi & prestasi', meta: 'Navigasi', action: () => goToSection('#pendidikan') },
  { label: 'Ke kontak & form pesan', meta: 'Navigasi', action: () => goToSection('#kontak') },
  { label: 'Unduh CV Maulana (PDF)', meta: 'Dokumen', action: () => window.open(SITE_CONFIG.cvUrl, '_blank') },
  { label: 'Buka Studi Kasus: CUCI.IN (POS Laundry)', meta: 'Proyek', action: () => showProjectDetail('cuciin') },
  { label: 'Buka Studi Kasus: BAWANGHUB (AI Agritech)', meta: 'Proyek', action: () => showProjectDetail('bawanghub') },
  { label: 'Buka Studi Kasus: LAPANGKU (Mobile GOR)', meta: 'Proyek', action: () => showProjectDetail('lapangku') },
  { label: 'Buka Studi Kasus: PBL-IVSS (Lab Polinema)', meta: 'Proyek', action: () => showProjectDetail('ivss') },
  { label: 'Buka Studi Kasus: AIAAS (AI Finansial)', meta: 'Proyek', action: () => showProjectDetail('aiaas') }
];

export function renderCommands(search = ''): void {
  const commandResults = document.getElementById('command-results');
  const commandOverlay = document.getElementById('command-overlay');
  if (!commandResults || !commandOverlay) return;

  const query = search.trim().toLowerCase();
  const matched = COMMANDS.filter(cmd => 
    (cmd.label + ' ' + cmd.meta).toLowerCase().includes(query)
  );

  commandResults.replaceChildren();

  matched.forEach(cmd => {
    const btn = document.createElement('button');
    btn.className = 'command-item';
    btn.type = 'button';

    const label = document.createElement('span');
    label.textContent = cmd.label;

    const meta = document.createElement('small');
    meta.className = 'mono';
    meta.textContent = cmd.meta;

    btn.append(label, meta);
    btn.addEventListener('click', () => {
      closeOverlay(commandOverlay);
      cmd.action();
    });

    commandResults.append(btn);
  });

  if (!matched.length) {
    const empty = document.createElement('div');
    empty.className = 'command-empty';
    empty.textContent = 'Tidak ada perintah atau bagian yang cocok.';
    commandResults.append(empty);
  }
}

export function showCommands(): void {
  const commandOverlay = document.getElementById('command-overlay');
  const commandInput = document.getElementById('command-search') as HTMLInputElement | null;
  if (!commandOverlay || !commandInput) return;

  commandInput.value = '';
  renderCommands();
  openOverlay(commandOverlay, commandInput);
}

// Inisialisasi Utama saat DOM Siap
export function initPortfolioApp(): void {
  const reduceMotion = prefersReducedMotion();

  // 1. Inisialisasi Palet & Mulai Auto-Cycle Transisi Warna Otomatis
  let savedPalette = localStorage.getItem('porto_palette') || 'morioh';
  if (savedPalette === 'dark' || !PALETTES.some(p => p.id === savedPalette)) {
    savedPalette = 'morioh';
    localStorage.setItem('porto_palette', 'morioh');
  }
  setPalette(savedPalette, false);
  startAutoPaletteCycle();

  if (!reduceMotion) {
    // 2. Ikon vektor bergerak acak di background (Wanderer Engine)
    initBackgroundWanderers();

    // 3. Manga & JoJo Hover SFX
    initMangaUIFX();
  }

  // 2. Modals & Project Click Bindings
  document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = (btn as HTMLElement).dataset.project;
      if (key) showProjectDetail(key);
    });
  });

  const projectOverlay = document.getElementById('project-overlay');
  if (projectOverlay) {
    projectOverlay.querySelector('[data-close]')?.addEventListener('click', () => {
      closeOverlay(projectOverlay);
    });
    projectOverlay.addEventListener('mousedown', e => {
      if (e.target === projectOverlay) closeOverlay(projectOverlay);
    });
    const demoJumpBtn = document.getElementById('detail-demo-jump');
    demoJumpBtn?.addEventListener('click', () => {
      const previewWrap = projectOverlay.querySelector<HTMLElement>('.dialog-preview-wrap');
      previewWrap?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      notify('Klik menu, tab, atau kartu di dalam pratinjau aplikasi untuk mencoba demo interaktif!');
    });
  }

  // 3. Command Palette
  const commandOverlay = document.getElementById('command-overlay');
  const commandInput = document.getElementById('command-search') as HTMLInputElement | null;
  const commandBtn = document.getElementById('command-button');

  if (commandBtn) commandBtn.addEventListener('click', showCommands);
  if (commandInput) {
    commandInput.addEventListener('input', () => renderCommands(commandInput.value));
    commandInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const firstBtn = document.getElementById('command-results')?.querySelector('button');
        if (firstBtn) {
          e.preventDefault();
          firstBtn.click();
        }
      }
    });
  }
  if (commandOverlay) {
    commandOverlay.addEventListener('mousedown', e => {
      if (e.target === commandOverlay) closeOverlay(commandOverlay);
    });
  }

  // 4. Photo Upload Panel
  const profilePhoto = document.getElementById('profile-photo') as HTMLImageElement | null;
  const photoFrame = document.getElementById('photo-frame');
  const photoUpload = document.getElementById('photo-upload') as HTMLInputElement | null;
  const photoUploadLabel = document.getElementById('photo-upload-label');

  if (profilePhoto && photoFrame) {
    profilePhoto.addEventListener('load', () => photoFrame.classList.add('has-photo'));
    profilePhoto.addEventListener('error', () => photoFrame.classList.remove('has-photo'));
    if (profilePhoto.complete && profilePhoto.naturalWidth) {
      photoFrame.classList.add('has-photo');
    }
  }

  if (photoUpload && profilePhoto) {
    photoUpload.addEventListener('change', () => {
      const file = photoUpload.files?.[0];
      if (!file) return;

      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        notify('Pilih format gambar yang valid (JPG, PNG, WebP, GIF).');
        return;
      }

      if (file.size > 12 * 1024 * 1024) {
        notify('Ukuran file foto maksimal 12 MB.');
        return;
      }

      if (photoObjectUrl) URL.revokeObjectURL(photoObjectUrl);
      photoObjectUrl = URL.createObjectURL(file);
      profilePhoto.src = photoObjectUrl;
      if (photoUploadLabel) photoUploadLabel.textContent = 'GANTI LAGI';
      notify('Foto profil diperbarui! Simpan sebagai public/foto-profil.jpg agar permanen.');
    });
  }

  // 5. Mobile Menu & Navigation (Adaptive Island & Scroll Spy)
  initStickyAdaptiveNavbar();
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle) menuToggle.addEventListener('click', () => toggleMobileMenu());
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
      document.getElementById('header-inner')?.classList.remove('is-expanded');
    });
  });

  // Close mobile drawer when clicking outside
  document.addEventListener('click', (e: MouseEvent) => {
    if (!nav?.classList.contains('open')) return;
    const target = e.target as HTMLElement | null;
    if (target && !nav.contains(target) && !menuToggle?.contains(target)) {
      toggleMobileMenu(false);
    }
  });

  // Close mobile drawer on Escape key for accessibility
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  // Close mobile drawer and collapse island pill if resized to desktop viewport
  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 860) {
        if (nav?.classList.contains('open')) {
          toggleMobileMenu(false);
        }
        document.getElementById('header-inner')?.classList.remove('is-expanded');
      }
    },
    { passive: true }
  );

  // 6. Contact Buttons & Simple Contact Form
  const emailBtn = document.getElementById('email-button');
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      if (SITE_CONFIG.email) {
        window.location.href = 'mailto:' + SITE_CONFIG.email;
      } else {
        notify('Lengkapi email pada src/data/projects.ts.');
      }
    });
  }

  const githubBtn = document.getElementById('github-button');
  if (githubBtn) {
    githubBtn.addEventListener('click', () => {
      if (SITE_CONFIG.github) {
        window.open(SITE_CONFIG.github, '_blank', 'noopener,noreferrer');
      } else {
        notify('Lengkapi github pada src/data/projects.ts.');
      }
    });
  }

  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const contactStatus = document.getElementById('contact-form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
      const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
      const subjectSelect = document.getElementById('contact-subject') as HTMLSelectElement | null;
      const msgInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;

      const name = nameInput?.value.trim() || '';
      const senderEmail = emailInput?.value.trim() || '';
      const subject = subjectSelect?.value || 'Diskusi Portofolio SI';
      const message = msgInput?.value.trim() || '';

      if (!name || !senderEmail || !message) {
        if (contactStatus) {
          contactStatus.textContent = '⚠ Mohon lengkapi nama, email balasan, dan isi pesan Anda.';
          contactStatus.className = 'form-status mono error';
        }
        notify('Lengkapi nama, email, dan pesan terlebih dahulu.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(senderEmail)) {
        if (contactStatus) {
          contactStatus.textContent = '⚠ Format alamat email balasan belum valid.';
          contactStatus.className = 'form-status mono error';
        }
        notify('Masukkan format email yang valid.');
        return;
      }

      const mailSubject = encodeURIComponent(`[Portofolio SI] ${subject} dari ${name}`);
      const mailBody = encodeURIComponent(
        `Halo Maulana,\n\nNama / Instansi: ${name}\nEmail Balasan: ${senderEmail}\nKeperluan: ${subject}\n\nPesan:\n${message}\n`
      );

      if (contactStatus) {
        contactStatus.textContent = `✓ Siap dikirim ke ${SITE_CONFIG.email}! Membuka aplikasi email Anda...`;
        contactStatus.className = 'form-status mono success';
      }
      notify(`Pesan dari ${name} siap dikirim!`);
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=${mailSubject}&body=${mailBody}`;
      contactForm.reset();
    });
  }

  // 7. Global Shortcuts (Ctrl+K, Escape, Tab trap)
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (!commandOverlay?.classList.contains('open')) showCommands();
      return;
    }

    // Shortcut 'T' untuk ganti tema warna secara manual (hanya saat tidak mengetik)
    if (
      (e.key === 't' || e.key === 'T') &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName || '')
    ) {
      cyclePalette(true);
      return;
    }

    if (e.key === 'Escape') {
      if (overlayStack.length) {
        closeOverlay(overlayStack[overlayStack.length - 1]);
      } else {
        toggleMobileMenu(false);
      }
    }

    if (e.key === 'Tab' && overlayStack.length) {
      const topOverlay = overlayStack[overlayStack.length - 1];
      const focusable = [
        ...topOverlay.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
      ].filter(el => el.offsetParent !== null);

      if (focusable.length) {
        if (e.shiftKey && document.activeElement === focusable[0]) {
          focusable[focusable.length - 1].focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
          focusable[0].focus();
          e.preventDefault();
        }
      }
    }
  });

  // 8. Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 9. Interactive Limited Live Demo for Project Previews
  initLiveDemo();

  // 10. Project Details Accordion (Slide-down toggle for PERAN, PROSES & DAMPAK)
  document.querySelectorAll<HTMLButtonElement>('.project-details-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const targetEl = targetId ? document.getElementById(targetId) : null;
      const toggleText = btn.querySelector('.toggle-text');

      if (!targetEl) return;

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        targetEl.classList.remove('is-expanded');
        if (toggleText) toggleText.textContent = 'LIHAT RINCIAN PROSES';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        targetEl.classList.add('is-expanded');
        if (toggleText) toggleText.textContent = 'TUTUP RINCIAN PROSES';
      }
    });
  });
}

