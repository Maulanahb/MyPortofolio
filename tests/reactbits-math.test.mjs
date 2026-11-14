import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeMagnetOffset,
  createSparkBurst,
  stepSparkParticles,
  easeOutCubic,
  interpolateCountUp,
  scrambleTextFrame
} from '../src/scripts/reactbits-math.ts';

test('computeMagnetOffset returns zero on center or inactive pointer', () => {
  assert.deepEqual(computeMagnetOffset(0, 0, 12, 4), { x: 0, y: 0 });
  assert.deepEqual(computeMagnetOffset(20, -10, 12, 4, false), { x: 0, y: 0 });
  assert.deepEqual(computeMagnetOffset(Number.NaN, 5, 12, 4, true), { x: 0, y: 0 });
});

test('scrambleTextFrame preserves whitespace and deterministic character positions', () => {
  const target = 'AB CD\nEF\tGH';
  const frame = scrambleTextFrame(target, 0.2, 3);
  assert.equal(frame, scrambleTextFrame(target, 0.2, 3));
  for (const [idx, ch] of Array.from(target).entries()) {
    if (/\s/u.test(ch)) assert.equal(frame[idx], ch);
  }
  assert.notEqual(frame, target);
});

test('scrambleTextFrame progressively locks its prefix and finishes exactly', () => {
  const target = 'Analisis sistem';
  for (const progress of [0, 0.25, 0.5, 0.75, 1]) {
    const count = Math.floor(progress * target.length);
    assert.equal(scrambleTextFrame(target, progress).slice(0, count), target.slice(0, count));
  }
  assert.equal(scrambleTextFrame(target, 1), target);
  assert.equal(scrambleTextFrame(target, 2), target);
  assert.equal(scrambleTextFrame('', 0), '');
  assert.equal(scrambleTextFrame(target, -1), scrambleTextFrame(target, 0));
  assert.equal(scrambleTextFrame(target, Number.NaN), scrambleTextFrame(target, 0));
  assert.equal(scrambleTextFrame(target, 0.4, 0, ''), scrambleTextFrame(target, 0.4));
  assert.equal(scrambleTextFrame('😀 A', 0, 1, '🔒'), '🔒 🔒');
  assert.equal(scrambleTextFrame('😀 A', 1), '😀 A');
});

test('computeMagnetOffset scales and clamps within maxDistance', () => {
  const mild = computeMagnetOffset(16, -8, 10, 4, true);
  assert.deepEqual(mild, { x: 4, y: -2 });

  const clamped = computeMagnetOffset(120, -160, 10, 4, true);
  assert.deepEqual(clamped, { x: 10, y: -10 });
});

test('createSparkBurst & stepSparkParticles fan radially and settle cleanly to idle', () => {
  const sparks = createSparkBurst(100, 200, 8, 90, 320);
  assert.equal(sparks.length, 8);

  const mid = stepSparkParticles(sparks, 160);
  assert.equal(mid.anyAlive, true);
  assert.equal(mid.active.length, 8);
  assert.ok(mid.active.some(p => Math.abs(p.x - 100) > 1 || Math.abs(p.y - 200) > 1));

  const done = stepSparkParticles(mid.active, 200);
  assert.equal(done.anyAlive, false);
  assert.equal(done.active.length, 0);
});

test('easeOutCubic and interpolateCountUp progress monotonically and clamp at endpoints', () => {
  assert.equal(easeOutCubic(-0.5), 0);
  assert.equal(easeOutCubic(0), 0);
  assert.equal(easeOutCubic(1), 1);
  assert.equal(easeOutCubic(1.5), 1);

  assert.equal(interpolateCountUp(0, 5, 0), 0);
  assert.equal(interpolateCountUp(0, 5, 1), 5);
  const mid = interpolateCountUp(0, 5, 0.5);
  assert.ok(mid >= 0 && mid <= 5);
  assert.equal(interpolateCountUp(2020, 2024, 1.2), 2024);
  assert.equal(interpolateCountUp(3, 3, 0.5), 3);
});
