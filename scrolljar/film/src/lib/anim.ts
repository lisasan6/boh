import {useCurrentFrame} from 'remotion';

export const FPS = 24;
export const SHOT = 96; // 4 seconds a shot

// The drawings change on twos: 12 drawings a second, like the old shorts.
export const useTwos = () => Math.floor(useCurrentFrame() / 2) * 2;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// 0 before a, 1 after b, eased in between
export const ramp = (t: number, a: number, b: number) => {
  const x = clamp((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
export const sin = (t: number, period: number, phase = 0) =>
  Math.sin(((t / period) + phase) * Math.PI * 2);
// a hop: 0 on the ground, 1 at the top, period in frames
export const hop = (t: number, period: number, phase = 0) =>
  Math.abs(Math.sin(((t / period) + phase) * Math.PI));
// squash on landing, stretch in the air, for something that hops with hop()
export const squash = (t: number, period: number, phase = 0, amount = 0.18) => {
  const h = hop(t, period, phase);
  const s = h < 0.25 ? -(0.25 - h) * 4 * amount : h * amount * 0.6;
  return {sx: 1 - s * 0.8, sy: 1 + s};
};

// deterministic noise, never Math.random()
export const hash = (n: number, salt = 0) => {
  let x = (Math.floor(n) * 374761393 + salt * 668265263) | 0;
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
};
export const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
