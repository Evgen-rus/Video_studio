import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ScreenshotCamera} from './ScreenCamera';
import {CursorPointer, CursorRipple} from './Overlays';
import type {CameraKey} from './types';
import {mix} from './motion';

export type TourStop = CameraKey & {cursorX: number; cursorY: number};

const stateAt = (frame: number, stops: TourStop[]) => {
  let a = stops[0];
  let b = stops[stops.length - 1];
  let index = 0;
  for (let i = 0; i < stops.length - 1; i += 1) {
    if (frame >= stops[i].frame && frame <= stops[i + 1].frame) {
      a = stops[i];
      b = stops[i + 1];
      index = i;
      break;
    }
  }
  const t = a.frame === b.frame ? 1 : interpolate(frame, [a.frame, b.frame], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  return {x: mix(a.cursorX, b.cursorX, t), y: mix(a.cursorY, b.cursorY, t), zoom: mix(a.zoom, b.zoom, t), segment: index};
};

export const CursorTour: React.FC<{src: string; stops: TourStop[]; caption?: React.ReactNode}> = ({src, stops, caption}) => {
  const frame = useCurrentFrame();
  const state = stateAt(frame, stops);
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={src} keys={stops}>
        <CursorRipple x={state.x} y={state.y} zoom={state.zoom} start={(stops[Math.min(state.segment + 1, stops.length - 1)]?.frame ?? 0) + 1} />
        <CursorPointer x={state.x} y={state.y} zoom={state.zoom} pressed={frame >= (stops[Math.min(state.segment + 1, stops.length - 1)]?.frame ?? 1000) && frame < (stops[Math.min(state.segment + 1, stops.length - 1)]?.frame ?? 1000) + 5} />
      </ScreenshotCamera>
      {caption}
    </AbsoluteFill>
  );
};
