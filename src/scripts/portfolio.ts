/**
 * ==========================================================================
 * CLIENT-SIDE INTERACTION RUNTIME (portfolio.ts)
 * Menangani palet warna, dialog modal, command palette (Ctrl+K), & upload foto.
 * ==========================================================================
 */

import { PROJECTS, SITE_CONFIG } from '../data/projects';
import {
  prefersReducedMotion,
  animateOpenOverlay,
  animateCloseOverlay,
  initPointerSpotlight,
  initHeroRoleDock,
  initArchitectureWorkbench,
  initProjectFilterAndSkillBridge,
  initAmbientBackdrop
} from './motion';
import { techIconIds } from '../data/tech-icon-ids';

// State
const overlayStack: HTMLElement[] = [];
let priorFocus: HTMLElement | null = null;
let toastTimer: number | null = null;
let fitPreviewsCached: (() => void) | null = null;
let toggleAmbientMotion: (() => boolean) | null = null;

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
  animateOpenOverlay(el);
  if (!overlayStack.includes(el)) {
    overlayStack.push(el);
  }
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    (focusEl || el.querySelector<HTMLElement>('button, input, [tabindex]'))?.focus();
  });
}

export function closeOverlay(el: HTMLElement): void {
  const idx = overlayStack.indexOf(el);
  if (idx > -1) overlayStack.splice(idx, 1);

  if (!overlayStack.length) {
    document.body.style.overflow = '';
  }

  void animateCloseOverlay(el);
  if (priorFocus && !overlayStack.length) {
    priorFocus.focus?.();
  }
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
        pill.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
        const txt = document.createElement('span');
        txt.textContent = art;
        pill.appendChild(txt);
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
      import('./live-demo').then(({ switchCuciinSlide, fitProjectPreviews }) => {
        if (cuciinApp) {
          switchCuciinSlide(cuciinApp, 0);
        }
        requestAnimationFrame(() => {
          fitProjectPreviews();
        });
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

// Theme Palette Engine (Apple Daylight / Framer Obsidian / Graphite Studio)
export const PALETTES = [
  { id: 'daylight', name: 'Daylight', themeColor: '#f5f5f7' },
  { id: 'obsidian', name: 'Obsidian', themeColor: '#09090b' },
  { id: 'graphite', name: 'Graphite', themeColor: '#eae9e4' }
] as const;

let currentPaletteIdx = 0;

export function setPalette(paletteId: string, showNotification = false): void {
  const validPalette = PALETTES.find(p => p.id === paletteId) || PALETTES[0];
  document.documentElement.dataset.palette = validPalette.id;
  document.body.dataset.palette = validPalette.id;
  localStorage.setItem('porto_palette', validPalette.id);

  currentPaletteIdx = PALETTES.findIndex(p => p.id === validPalette.id);

  const labelEl = document.getElementById('palette-label');
  if (labelEl) {
    labelEl.textContent = validPalette.name;
  }

  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.content = validPalette.themeColor;
  }

  if (showNotification) {
    notify(`Tampilan: ${validPalette.name}`);
  }
}

export function cyclePalette(manual = false): void {
  currentPaletteIdx = (currentPaletteIdx + 1) % PALETTES.length;
  setPalette(PALETTES[currentPaletteIdx].id, manual);
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

// Sticky Frosted Navbar & Scroll Spy
export function initStickyAdaptiveNavbar(): void {
  const header = document.getElementById('site-header');
  const nav = document.getElementById('nav');
  if (!header || !nav) return;

  const navLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[data-nav]'));
  const sectionIds = navLinks.map(link => link.dataset.nav).filter(Boolean) as string[];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter((sec): sec is HTMLElement => Boolean(sec));

  let ticking = false;
  const ENTER_THRESHOLD = 40;
  const EXIT_THRESHOLD = 20;

  const updateHeaderState = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const isCurrentlyScrolled = header.classList.contains('is-scrolled');

    if (!isCurrentlyScrolled && scrollY > ENTER_THRESHOLD) {
      header.classList.add('is-scrolled');
      header.setAttribute('data-scrolled', 'true');
    } else if (isCurrentlyScrolled && scrollY <= EXIT_THRESHOLD) {
      header.classList.remove('is-scrolled');
      header.setAttribute('data-scrolled', 'false');
    }

    const scrollPos = scrollY + 150;
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

  updateHeaderState();
}

// Command Palette Definition
interface CommandItem {
  label: string;
  meta: string;
  action: () => void;
}

const COMMANDS: CommandItem[] = [
  { label: 'Ganti mode tema berikutnya (Daylight / Obsidian / Graphite)', meta: 'Tema', action: () => cyclePalette(true) },
  { label: 'Aktifkan Tema Daylight (Light Mode)', meta: 'Tema', action: () => setPalette('daylight', true) },
  { label: 'Aktifkan Tema Obsidian (Dark Mode)', meta: 'Tema', action: () => setPalette('obsidian', true) },
  { label: 'Aktifkan Tema Graphite (Warm Titanium)', meta: 'Tema', action: () => setPalette('graphite', true) },
  {
    label: 'Jeda / Putar Gerak Latar',
    meta: 'Atmosfer',
    action: () => {
      const nextPaused = toggleAmbientMotion?.();
      if (typeof nextPaused === 'boolean') {
        notify(nextPaused ? 'Gerak latar dijeda' : 'Gerak latar diaktifkan');
      }
    }
  },
  { label: 'Alur Kerja Proyek', meta: 'Navigasi', action: () => goToSection('#arsitektur') },
  { label: 'Tentang Saya & Status', meta: 'Navigasi', action: () => goToSection('#tentang') },
  { label: 'Tech Stack & Keahlian', meta: 'Navigasi', action: () => goToSection('#keahlian') },
  { label: 'Proyek Pilihan', meta: 'Navigasi', action: () => goToSection('#pekerjaan') },
  { label: 'Pengalaman Proyek', meta: 'Navigasi', action: () => goToSection('#pengalaman') },
  { label: 'Pendidikan & Sertifikasi', meta: 'Navigasi', action: () => goToSection('#pendidikan') },
  { label: 'Kontak', meta: 'Navigasi', action: () => goToSection('#kontak') },
  { label: 'Unduh CV (PDF)', meta: 'Dokumen', action: () => window.open(SITE_CONFIG.cvUrl, '_blank') },
  { label: 'CUCI.IN · Kasir Laundry', meta: 'Proyek', action: () => showProjectDetail('cuciin') },
  { label: 'BAWANGHUB · AI Agritech', meta: 'Proyek', action: () => showProjectDetail('bawanghub') },
  { label: 'LAPANGKU · Booking Lapangan', meta: 'Proyek', action: () => showProjectDetail('lapangku') },
  { label: 'PORTAL LAB IVSS · Polinema', meta: 'Proyek', action: () => showProjectDetail('ivss') },
  { label: 'AI FINANCE (AIAAS) · Gemini', meta: 'Proyek', action: () => showProjectDetail('aiaas') }
];

export function renderCommands(search = ''): void {
  const commandResults = document.getElementById('command-results');
  const commandOverlay = document.getElementById('command-overlay');
  if (!commandResults || !commandOverlay) return;

  const query = search.trim().toLowerCase();
  const reduced = prefersReducedMotion();
  const matched = COMMANDS.filter(cmd => {
    if (reduced && cmd.meta === 'Atmosfer') return false;
    return (cmd.label + ' ' + cmd.meta).toLowerCase().includes(query);
  });

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
  // 1. Inisialisasi Mode Tampilan (Migrasi nilai lama ke Daylight + bind tombol switcher)
  let savedPalette = localStorage.getItem('porto_palette') || 'daylight';
  if (!PALETTES.some(p => p.id === savedPalette)) {
    savedPalette = 'daylight';
    localStorage.setItem('porto_palette', 'daylight');
  }
  setPalette(savedPalette, false);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => cyclePalette(true));
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

  // 4. Mobile Menu & Navigation (Adaptive Island & Scroll Spy)
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

  // 9. Interactive Limited Live Demo for Project Previews (Code-split async chunk)
  import('./live-demo').then(m => {
    m.initLiveDemo();
    fitPreviewsCached = m.fitProjectPreviews;
  });

  // 10. Interactive Motion & Workbench Runtime (Spotlight, Role Dock, Signal Pipeline, Project Filters)
  toggleAmbientMotion = initAmbientBackdrop();
  initPointerSpotlight();
  initHeroRoleDock();
  initArchitectureWorkbench();
  initProjectFilterAndSkillBridge(showProjectDetail, () => {
    fitPreviewsCached?.();
  });

  // 11. Project Details Accordion (Slide-down toggle for PERAN, PROSES & DAMPAK)
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
        if (toggleText) toggleText.textContent = 'Rincian Proses';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        targetEl.classList.add('is-expanded');
        if (toggleText) toggleText.textContent = 'Tutup Rincian';
      }
    });
  });
}

