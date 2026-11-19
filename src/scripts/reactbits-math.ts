/**
 * Pure math & particle state helpers for React Bits vanilla ports
 * (Magnet, ClickSpark, CountUp, DecryptedText). Zero DOM dependencies so they run
 * identically in browser runtime and Node automated unit tests.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  life: number;
  durationMs: number;
}

export interface SparkStepResult {
  active: SparkParticle[];
  anyAlive: boolean;
}

function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Computes bounded magnetic offset toward pointer delta from element center.
 */
export function computeMagnetOffset(
  dx: number,
  dy: number,
  maxDistance: number,
  strength = 4,
  active = true
): Point2D {
  if (
    !active ||
    !Number.isFinite(dx) ||
    !Number.isFinite(dy) ||
    !Number.isFinite(maxDistance) ||
    !Number.isFinite(strength) ||
    maxDistance <= 0 ||
    strength <= 0
  ) {
    return { x: 0, y: 0 };
  }

  const rawX = clampValue(dx / strength, -maxDistance, maxDistance);
  const rawY = clampValue(dy / strength, -maxDistance, maxDistance);
  return {
    x: Object.is(rawX, -0) ? 0 : rawX,
    y: Object.is(rawY, -0) ? 0 : rawY
  };
}

/**
 * Generates radial spark rays evenly around the interaction origin.
 */
export function createSparkBurst(
  x: number,
  y: number,
  count = 8,
  speed = 92,
  durationMs = 340
): SparkParticle[] {
  const safeCount = Math.max(1, Math.floor(count));
  const sparks: SparkParticle[] = [];

  for (let i = 0; i < safeCount; i++) {
    const angle = (i * Math.PI * 2) / safeCount;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      angle,
      life: 0,
      durationMs
    });
  }

  return sparks;
}

/**
 * Advances active sparks by dtMs and prunes expired particles so loop halts cleanly.
 */
export function stepSparkParticles(particles: SparkParticle[], dtMs: number): SparkStepResult {
  const dtSec = Math.max(0, dtMs) / 1000;
  const active: SparkParticle[] = [];

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const nextLife = p.life + Math.max(0, dtMs);
    if (nextLife >= p.durationMs) continue;

    // Gentle quadratic drag matching crisp burst falloff
    const damping = Math.max(0.25, 1 - nextLife / p.durationMs);
    active.push({
      x: p.x + p.vx * dtSec * damping,
      y: p.y + p.vy * dtSec * damping,
      vx: p.vx,
      vy: p.vy,
      angle: p.angle,
      life: nextLife,
      durationMs: p.durationMs
    });
  }

  return {
    active,
    anyAlive: active.length > 0
  };
}

/**
 * Standard decelerating cubic curve for numeric CountUp animations.
 */
export function easeOutCubic(progress: number): number {
  const t = clampValue(progress, 0, 1);
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Interpolates rounded integer value between start and target using easeOutCubic.
 */
export function interpolateCountUp(start: number, target: number, progress: number): number {
  if (!Number.isFinite(start) || !Number.isFinite(target)) return 0;
  if (progress <= 0) return Math.round(start);
  if (progress >= 1 || start === target) return Math.round(target);

  const eased = easeOutCubic(progress);
  return Math.round(start + (target - start) * eased);
}

const DEFAULT_DECRYPT_CHARS = '01ABCDEF#/_·+*';

/** Locks a growing prefix to the target; unrevealed characters cycle deterministically. */
export function scrambleTextFrame(
  target: string,
  progress: number,
  seed = 0,
  charset = DEFAULT_DECRYPT_CHARS
): string {
  const clamped = Number.isNaN(progress) ? 0 : Math.min(1, Math.max(0, progress));
  if (!target || clamped >= 1) return target;
  const chars = Array.from(target);
  const pool = Array.from(charset || DEFAULT_DECRYPT_CHARS);
  const revealedCount = Math.floor(clamped * chars.length);
  const safeSeed = Number.isFinite(seed) ? Math.trunc(seed) : 0;
  return chars.map((ch, idx) => {
    if (/\s/u.test(ch) || idx < revealedCount) return ch;
    const pick = Math.abs(idx * 7 + safeSeed * 13 + Math.floor(clamped * 20)) % pool.length;
    return pool[pick];
  }).join('');
}

/**
 * Advances RotatingText word index cyclically, returning 0 on empty or invalid inputs.
 */
export function nextRotatingIndex(current: number, total: number): number {
  if (!Number.isFinite(total) || total <= 1) return 0;
  const count = Math.trunc(total);
  const safeCurrent = Number.isFinite(current) ? Math.trunc(current) : 0;
  return (((safeCurrent + 1) % count) + count) % count;
}

export type CanonicalPaletteId = 'daylight' | 'obsidian';

/**
 * Normalizes persisted palette values (including legacy 'graphite') to Daylight or Obsidian.
 */
export function normalizePaletteId(raw: string | null | undefined): CanonicalPaletteId {
  return raw === 'obsidian' ? 'obsidian' : 'daylight';
}

export interface PosterTiltResult {
  rotateX: number;
  rotateY: number;
  px: number;
  py: number;
}

function cleanZero(val: number): number {
  return Object.is(val, -0) || val === 0 ? 0 : val;
}

/**
 * Computes bounded 3D card tilt and normalized pointer percentage for poster cards.
 */
export function computePosterTilt(
  localX: number,
  localY: number,
  width: number,
  height: number,
  maxDeg = 4.5
): PosterTiltResult {
  if (
    !Number.isFinite(localX) ||
    !Number.isFinite(localY) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    !Number.isFinite(maxDeg) ||
    width <= 0 ||
    height <= 0
  ) {
    return { rotateX: 0, rotateY: 0, px: 50, py: 50 };
  }

  const nx = clampValue(localX / width, 0, 1);
  const ny = clampValue(localY / height, 0, 1);
  const rotateY = cleanZero(Number(((nx - 0.5) * 2 * maxDeg).toFixed(2)));
  const rotateX = cleanZero(Number(((0.5 - ny) * 2 * maxDeg).toFixed(2)));
  return {
    rotateX,
    rotateY,
    px: Math.round(nx * 100),
    py: Math.round(ny * 100)
  };
}
