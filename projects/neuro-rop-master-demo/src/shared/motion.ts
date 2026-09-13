import {Easing, interpolate} from 'remotion';

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const segment = (
  frame: number,
  from: number,
  to: number,
  ease: (value: number) => number = Easing.bezier(0.33, 0, 0.15, 1),
) => interpolate(frame, [from, to], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: ease,
});

export const fadeInOut = (frame: number, inEnd: number, outStart: number, outEnd: number) =>
  interpolate(frame, [0, inEnd, outStart, outEnd], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.33, 0, 0.15, 1),
  });

export const easeOut = Easing.bezier(0.2, 0.8, 0.2, 1);
export const easeInOut = Easing.bezier(0.33, 0, 0.15, 1);
