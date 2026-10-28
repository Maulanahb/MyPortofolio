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
import { initLiveDemo } from './live-demo';
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
    (focusEl || el.querySelector('button, input, [tabindex]'))?.focus();
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
  const detailProblem = document.getElementById('detail-problem');
  const detailApproach = document.getElementById('detail-approach');
  const detailHighlights = document.getElementById('detail-highlights');
  const detailStack = document.getElementById('detail-stack');
  const detailBrandBar = document.getElementById('detail-brand-bar');
  const detailPreview = document.getElementById('detail-preview');
  const detailPreviewBadge = document.getElementById('detail-preview-badge');

  if (detailCategory) detailCategory.textContent = project.category;
  if (detailName) detailName.textContent = project.title;
  if (detailProblem) detailProblem.textContent = project.problem;
  if (detailApproach) detailApproach.textContent = project.approach;
  if (detailPreviewBadge) detailPreviewBadge.textContent = project.badge;
  if (detailBrandBar && project.brandColor) {
    detailBrandBar.style.backgroundColor = project.brandColor;
  }

  if (detailPreview) {
    const sourceArt = document.querySelector(`.project-art[data-art="${key}"]`);
    detailPreview.replaceChildren();
    if (sourceArt) {
      const clonedArt = sourceArt.cloneNode(true) as HTMLElement;
      clonedArt.removeAttribute('data-art');
      detailPreview.appendChild(clonedArt);
    }
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

  const closeBtn = projectOverlay.querySelector('[data-close]') as HTMLElement;
  openOverlay(projectOverlay, closeBtn);
}

// Theme Palette & Auto Transition Engine
export const PALETTES = [
  { id: 'morioh', name: 'MORIOH POP' },
  { id: 'golden', name: 'GOLDEN WIND' },
  { id: 'ocean', name: 'STONE OCEAN' }
] as const;

let currentPaletteIdx = 0;
let autoPaletteTimer: number | null = null;
const AUTO_CYCLE_INTERVAL = 8500; // 8.5 detik pergantian transisi halus otomatis

export function setPalette(paletteId: string, showNotification = false): void {
  document.body.dataset.palette = paletteId;
  localStorage.setItem('porto_palette', paletteId);

  const matchIdx = PALETTES.findIndex(p => p.id === paletteId);
  if (matchIdx !== -1) currentPaletteIdx = matchIdx;

  const label = PALETTES[currentPaletteIdx]?.name || paletteId.toUpperCase();
  const labelEl = document.getElementById('palette-label');
  if (labelEl) {
    labelEl.textContent = label;
  }

  if (showNotification) {
    notify('Tema otomatis: ' + label);
  }
}

export function cyclePalette(manual = false): void {
  currentPaletteIdx = (currentPaletteIdx + 1) % PALETTES.length;
  setPalette(PALETTES[currentPaletteIdx].id, manual);
}

export function startAutoPaletteCycle(): void {
  if (autoPaletteTimer) clearInterval(autoPaletteTimer);

  // Siklus warna otomatis tidak dijalankan saat pengguna meminta reduced-motion.
  if (prefersReducedMotion()) return;

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

// Command Palette Definition
interface CommandItem {
  label: string;
  meta: string;
  action: () => void;
}

const COMMANDS: CommandItem[] = [
  { label: 'Ke proyek unggulan', meta: 'Navigasi', action: () => goToSection('#pekerjaan') },
  { label: 'Ke proses & metodologi', meta: 'Navigasi', action: () => goToSection('#pendekatan') },
  { label: 'Ke tentang saya & toolkit', meta: 'Navigasi', action: () => goToSection('#tentang') },
  { label: 'Ke kontak & kolaborasi', meta: 'Navigasi', action: () => goToSection('#kontak') },
  { label: 'Lompat ke tema warna berikutnya', meta: 'Transisi Otomatis', action: () => cyclePalette(true) },
  { label: 'Buka Studi Kasus: BAWANGHUB', meta: 'Proyek', action: () => showProjectDetail('bawanghub') },
  { label: 'Buka Studi Kasus: LAPANGKU', meta: 'Proyek', action: () => showProjectDetail('lapangku') },
  { label: 'Buka Studi Kasus: PBL-IVSS', meta: 'Proyek', action: () => showProjectDetail('ivss') },
  { label: 'Buka Studi Kasus: CUCI.IN', meta: 'Proyek', action: () => showProjectDetail('cuciin') }
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

  // 1. Inisialisasi Palet & Siklus Transisi Otomatis
  // Palet tetap dipulihkan; siklus otomatis hanya berjalan bila motion tidak dikurangi.
  const savedPalette = localStorage.getItem('porto_palette') || 'morioh';
  setPalette(savedPalette, false);

  if (!reduceMotion) {
    startAutoPaletteCycle();

    // 2. Ikon vektor bergerak acak di background (Wanderer Engine)
    initBackgroundWanderers();

    // 3. Manga & JoJo Hover SFX
    initMangaUIFX();
  }

  const paletteIndicator = document.getElementById('palette-indicator');
  if (paletteIndicator) {
    paletteIndicator.addEventListener('click', () => {
      cyclePalette(true);
      // reset timer interval setelah interaksi manual
      startAutoPaletteCycle();
    });
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

  // 5. Mobile Menu & Navigation
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle) menuToggle.addEventListener('click', () => toggleMobileMenu());
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 6. Contact Buttons
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

  // 7. Global Shortcuts (Ctrl+K, Escape, Tab trap)
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (!commandOverlay?.classList.contains('open')) showCommands();
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
        ...topOverlay.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
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
}

