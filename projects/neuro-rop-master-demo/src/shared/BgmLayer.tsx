import React from 'react';
import {Audio, interpolate, staticFile} from 'remotion';

export type BgmLayerProps = {
  durationInFrames: number;
  cueFrames: readonly number[];
  src?: string;
  baseVolume?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
};

const duckVolume = (frame: number, cueFrame: number): number => interpolate(
  frame,
  [cueFrame - 20, cueFrame - 8, cueFrame + 12, cueFrame + 28],
  [1, 0.78, 0.78, 1],
  {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
);

export const BgmLayer: React.FC<BgmLayerProps> = ({
  durationInFrames,
  cueFrames,
  src = 'audio/neuro-rop-bgm.mp3',
  baseVolume = 0.12,
  fadeInFrames = 45,
  fadeOutFrames = 72,
}) => (
  <Audio
    src={staticFile(src)}
    volume={(frame: number) => {
      const fadeIn = interpolate(frame, [0, fadeInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const fadeOut = interpolate(frame, [durationInFrames - fadeOutFrames, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const duck = cueFrames.reduce((level, cueFrame) => Math.min(level, duckVolume(frame, cueFrame)), 1);
      return baseVolume * fadeIn * fadeOut * duck;
    }}
  />
);
