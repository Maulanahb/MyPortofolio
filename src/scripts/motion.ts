/**
 * ==========================================================================
 * MOTION PREFERENCES (motion.ts)
 * Satu sumber kebenaran untuk preferensi reduced-motion di sisi klien.
 * ==========================================================================
 */

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
