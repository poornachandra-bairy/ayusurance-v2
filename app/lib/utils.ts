export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export const phase = (p: number, s: number, e: number): number =>
  clamp((p - s) / (e - s), 0, 1);

export const ease = (t: number): number =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

export const easeIO = ease;
