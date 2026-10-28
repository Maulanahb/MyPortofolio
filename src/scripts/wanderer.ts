/**
 * ==========================================================================
 * DYNAMIC RANDOM WANDERER ENGINE (wanderer.ts)
 * Menggerakkan ikon vektor melayang secara acak ke kanan, kiri, atas, & bawah
 * di seluruh layar dengan fisika inersia halus & pantulan batas viewport.
 * ==========================================================================
 */

import { prefersReducedMotion } from './motion';

interface Wanderer {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetVx: number;
  targetVy: number;
  rot: number;
  vRot: number;
  width: number;
  height: number;
  nextDirectionChange: number;
}

let wanderers: Wanderer[] = [];
let animFrameId: number | null = null;
let mouseX = -9999;
let mouseY = -9999;

export function initBackgroundWanderers(): void {
  // Hormati preferensi reduced-motion
  if (prefersReducedMotion()) {
    return;
  }

  const container = document.querySelector('.bg-floating-canvas') as HTMLElement | null;
  if (!container) return;

  const items = container.querySelectorAll<HTMLElement>('.float-item');
  if (!items.length) return;

  const vpW = window.innerWidth;
  const vpH = window.innerHeight;

  // Inisialisasi posisi awal tersebar merata di layar
  wanderers = Array.from(items).map((el, i) => {
    const rect = el.getBoundingClientRect();
    const width = rect.width || 36;
    const height = rect.height || 36;

    // Distribusi grid awal agar tidak menumpuk
    const cols = 4;
    const rows = 3;
    const col = i % cols;
    const row = Math.floor(i / cols);

    const cellW = (vpW - width - 60) / cols;
    const cellH = (vpH - height - 60) / rows;

    const startX = 30 + col * cellW + Math.random() * (cellW * 0.7);
    const startY = 30 + row * cellH + Math.random() * (cellH * 0.7);

    // Kecepatan & arah acak awal (-0.45 s/d 0.45 px/frame)
    const initialAngle = Math.random() * Math.PI * 2;
    const initialSpeed = 0.35 + Math.random() * 0.4;
    const vx = Math.cos(initialAngle) * initialSpeed;
    const vy = Math.sin(initialAngle) * initialSpeed;

    return {
      el,
      x: startX,
      y: startY,
      vx,
      vy,
      targetVx: vx,
      targetVy: vy,
      rot: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 0.35, // rotasi lambat halus
      width,
      height,
      nextDirectionChange: performance.now() + 1500 + Math.random() * 3000
    };
  });

  // Track posisi kursor untuk dorongan interaktif lembut
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  // Handle resize agar tidak keluar batas
  window.addEventListener('resize', () => {
    const curW = window.innerWidth;
    const curH = window.innerHeight;
    wanderers.forEach(w => {
      w.x = Math.max(10, Math.min(w.x, curW - w.width - 10));
      w.y = Math.max(10, Math.min(w.y, curH - w.height - 10));
    });
  }, { passive: true });

  // Jalankan animasi loop 60-120fps GPU composited
  if (animFrameId) cancelAnimationFrame(animFrameId);
  let lastTime = performance.now();

  function loop(now: number): void {
    const dt = Math.min((now - lastTime) / 16.667, 2.5); // delta time normalizer
    lastTime = now;

    const curW = window.innerWidth;
    const curH = window.innerHeight;

    for (let i = 0; i < wanderers.length; i++) {
      const w = wanderers[i];

      // 1. Acak arah baru secara berkala (kanan, kiri, atas, bawah, diagonal)
      if (now >= w.nextDirectionChange) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.45;
        w.targetVx = Math.cos(angle) * speed;
        w.targetVy = Math.sin(angle) * speed;
        w.vRot = (Math.random() - 0.5) * 0.35;
        w.nextDirectionChange = now + 2000 + Math.random() * 4000;
      }

      // 2. Inersia halus menuju target kecepatan
      w.vx += (w.targetVx - w.vx) * 0.025 * dt;
      w.vy += (w.targetVy - w.vy) * 0.025 * dt;

      // 3. Reaksi dorongan lembut dari mouse cursor
      if (mouseX > 0) {
        const dx = (w.x + w.width / 2) - mouseX;
        const dy = (w.y + w.height / 2) - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 1) {
          const pushForce = ((120 - dist) / 120) * 0.8 * dt;
          w.vx += (dx / dist) * pushForce;
          w.vy += (dy / dist) * pushForce;
        }
      }

      // 4. Update koordinat posisi
      w.x += w.vx * dt;
      w.y += w.vy * dt;
      w.rot += w.vRot * dt;

      // 5. Pantulan lembut saat mencapai batas layar
      const pad = 12;
      if (w.x < pad) {
        w.x = pad;
        w.vx = Math.abs(w.vx) * 0.85;
        w.targetVx = Math.abs(w.targetVx);
      } else if (w.x > curW - w.width - pad) {
        w.x = curW - w.width - pad;
        w.vx = -Math.abs(w.vx) * 0.85;
        w.targetVx = -Math.abs(w.targetVx);
      }

      if (w.y < pad) {
        w.y = pad;
        w.vy = Math.abs(w.vy) * 0.85;
        w.targetVy = Math.abs(w.targetVy);
      } else if (w.y > curH - w.height - pad) {
        w.y = curH - w.height - pad;
        w.vy = -Math.abs(w.vy) * 0.85;
        w.targetVy = -Math.abs(w.targetVy);
      }

      // 6. Terapkan GPU translate3d
      w.el.style.transform = `translate3d(${w.x.toFixed(1)}px, ${w.y.toFixed(1)}px, 0) rotate(${w.rot.toFixed(1)}deg)`;
    }

    animFrameId = requestAnimationFrame(loop);
  }

  animFrameId = requestAnimationFrame(loop);
}

