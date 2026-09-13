import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import type {CameraKey, CameraState, Rect} from './types';
import {mix} from './motion';

export const FRAME_WIDTH = 1920;
export const FRAME_HEIGHT = 1080;

const cameraAt = (frame: number, keys: CameraKey[]): CameraState => {
  if (keys.length === 0) {
    return {cx: 960, cy: 540, zoom: 1, rotX: 0, rotY: 0, rotZ: 0, perspective: 1400};
  }
  let a = keys[0];
  let b = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i += 1) {
    if (frame >= keys[i].frame && frame <= keys[i + 1].frame) {
      a = keys[i];
      b = keys[i + 1];
      break;
    }
  }
  const t = a.frame === b.frame ? 1 : interpolate(frame, [a.frame, b.frame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.33, 0, 0.15, 1),
  });
  return {
    cx: mix(a.cx, b.cx, t),
    cy: mix(a.cy, b.cy, t),
    zoom: mix(a.zoom, b.zoom, t),
    rotX: mix(a.rotX ?? 0, b.rotX ?? 0, t),
    rotY: mix(a.rotY ?? 0, b.rotY ?? 0, t),
    rotZ: mix(a.rotZ ?? 0, b.rotZ ?? 0, t),
    perspective: mix(a.perspective ?? 1400, b.perspective ?? 1400, t),
  };
};

export const ScreenshotImage: React.FC<{src: string; style?: React.CSSProperties}> = ({src, style}) => (
  <Img src={staticFile(src)} style={{position: 'absolute', left: 0, top: 0, width: FRAME_WIDTH, height: FRAME_HEIGHT, display: 'block', ...style}} />
);

export const ScreenshotCamera: React.FC<{
  src: string;
  keys: CameraKey[];
  children?: React.ReactNode;
  background?: string;
  opacity?: number;
  blur?: number;
}> = ({src, keys, children, background = '#edf2f8', opacity = 1, blur = 0}) => {
  const frame = useCurrentFrame();
  const state = cameraAt(frame, keys);
  const has3d = Math.abs(state.rotX) + Math.abs(state.rotY) + Math.abs(state.rotZ) > 0.001;
  const worldTransform = `translate(${FRAME_WIDTH / 2}px, ${FRAME_HEIGHT / 2}px) scale(${state.zoom}) rotateX(${state.rotX}deg) rotateY(${state.rotY}deg) rotateZ(${state.rotZ}deg) translate(${-state.cx}px, ${-state.cy}px)`;

  return (
    <AbsoluteFill style={{backgroundColor: background, overflow: 'hidden', opacity}}>
      <div style={{position: 'absolute', inset: 0, perspective: has3d ? `${state.perspective}px` : undefined, perspectiveOrigin: '50% 50%'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: FRAME_WIDTH, height: FRAME_HEIGHT, transformOrigin: '0 0', transform: worldTransform, transformStyle: 'preserve-3d', filter: blur ? `blur(${blur}px)` : undefined}}>
          <ScreenshotImage src={src} />
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ScreenshotCrop: React.FC<{
  src: string;
  rect: Rect;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({src, rect, children, style}) => (
  <div style={{position: 'absolute', left: rect.x, top: rect.y, width: rect.w, height: rect.h, overflow: 'hidden', ...style}}>
    <ScreenshotImage src={src} style={{left: -rect.x, top: -rect.y}} />
    {children}
  </div>
);
