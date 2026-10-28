/**
 * ==========================================================================
 * MANGA & JOJO UI FX ENGINE (manga-fx.ts)
 * Efek hover interaktif memunculkan teks efek suara Jepang JoJo & splash
 * (DUARR, ドドド, ゴゴゴ, ズキュウウン...) hanya pada momen yang disengaja:
 * kartu proyek dan tombol CTA utama.
 * ==========================================================================
 */

import { prefersReducedMotion } from './motion';

// Daftar Sound Effects Komik & JoJo Klasik
const MANGA_SFX_LIST = [
  { text: 'ゴゴゴ...', sub: 'MENACING', color: '#f3dc55' },
  { text: 'ドドド!!', sub: 'DODODO', color: '#ef7aa8' },
  { text: 'ズキュウウン!', sub: 'ZUKYUUUN!', color: '#c6b5f7' },
  { text: 'バァァァン!!', sub: 'BAAAAN!', color: '#ffdc59' },
  { text: 'ドン!!', sub: 'DON!!', color: '#ff5c5c' },
  { text: 'ズガガガ!', sub: 'ZUGAGAGA!', color: '#67e8f9' },
  { text: 'DUARR!!', sub: 'IMPACT', color: '#fb923c' },
  { text: 'BAM!!', sub: 'ACTION', color: '#a7f3d0' },
  { text: 'POW!!', sub: 'HIT', color: '#fbcfe8' },
  { text: 'WRYYYY!!', sub: 'VAMPIRE VIBE', color: '#fef08a' },
  { text: 'ORA ORA!!', sub: 'STAND RUSH', color: '#fed7aa' },
  { text: '何?!', sub: 'NANI?!', color: '#e0e7ff' }
];

// Hanya elemen deliberat: kartu/panel utama dan tombol CTA.
const HOVER_SELECTORS = [
  '.project-card',
  '.hero-actions .button',
  '.contact-buttons .button',
  '.photo-frame',
  '.strip-panel',
  '.about-badge'
];

const CLICK_SELECTORS = [
  '.hero-actions .button',
  '.contact-buttons .button',
  '.button.dark',
  '.button.yellow',
  '.project-card'
];

const HOVER_COOLDOWN = 180; // jeda minimal antar popup ketika berpindah elemen
let lastHoverTime = 0;

function findTarget(target: EventTarget | null, selectors: string[]): Element | null {
  if (!(target instanceof Element)) return null;
  return target.closest(selectors.join(','));
}

/**
 * Posisi popup mengikuti kursor (bukan tepi elemen) dan dijepit ke viewport,
 * supaya tetap dekat pointer walau targetnya kartu tinggi.
 */
function popupPosition(e: MouseEvent, offsetY: number): { x: number; y: number } {
  const jitterX = (Math.random() - 0.5) * 24;
  const jitterY = (Math.random() - 0.5) * 14;
  return {
    x: Math.max(40, Math.min(window.innerWidth - 40, e.clientX + jitterX)),
    y: Math.max(96, Math.min(window.innerHeight - 40, e.clientY - offsetY + jitterY))
  };
}

/**
 * Memunculkan popup efek suara komik (JoJo SFX / Splash) di posisi x, y
 */
export function spawnMangaSFX(x: number, y: number, customText?: string, customColor?: string): void {
  if (prefersReducedMotion()) return;

  const container = document.getElementById('manga-fx-container');
  if (!container) return;

  const choice = MANGA_SFX_LIST[Math.floor(Math.random() * MANGA_SFX_LIST.length)];
  const text = customText || choice.text;
  const bg = customColor || choice.color;
  const rot = (Math.random() - 0.5) * 26; // -13deg s/d 13deg

  const pop = document.createElement('div');
  pop.className = 'manga-pop-sfx';
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;
  pop.style.setProperty('--pop-rot', `${rot.toFixed(1)}deg`);
  pop.style.setProperty('--pop-bg', bg);

  pop.innerHTML = `
    <span class="pop-text display">${text}</span>
    <span class="pop-sub mono">${choice.sub}</span>
    <span class="pop-spark s1" aria-hidden="true">✦</span>
    <span class="pop-spark s2" aria-hidden="true">✦</span>
  `;

  container.appendChild(pop);

  // Hapus otomatis setelah animasi selesai (720ms)
  window.setTimeout(() => {
    pop.remove();
  }, 730);
}

/**
 * Inisialisasi event listener untuk Hover SFX pada elemen deliberat
 */
export function initMangaUIFX(): void {
  if (prefersReducedMotion()) return;

  document.addEventListener('mouseover', (e: MouseEvent) => {
    const interactiveEl = findTarget(e.target, HOVER_SELECTORS);
    if (!interactiveEl) return;

    // Abaikan pergerakan di dalam elemen yang sama (mis. dari kartu ke anak-anaknya).
    if (e.relatedTarget instanceof Node && interactiveEl.contains(e.relatedTarget)) return;

    const now = performance.now();
    if (now - lastHoverTime < HOVER_COOLDOWN) return;
    lastHoverTime = now;

    const { x, y } = popupPosition(e, 28);
    spawnMangaSFX(x, y);
  }, { passive: true });

  // Click SFX Trigger (DUARR / BAAAAN!) hanya pada CTA & kartu proyek
  document.addEventListener('click', (e: MouseEvent) => {
    const btn = findTarget(e.target, CLICK_SELECTORS);
    if (!btn) return;

    const { x, y } = popupPosition(e, 30);
    spawnMangaSFX(x, y, 'DUARR!!', '#fb923c');
  }, { passive: true });
}
