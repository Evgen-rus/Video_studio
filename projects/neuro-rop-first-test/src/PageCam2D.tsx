import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export type CamKey2D = {
  frame: number;
  cx: number;
  cy: number;
  zoom: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  persp?: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Camera math from the selected spotlight/type-and-filter demos, scoped to a 1920px page. */
export const PageCam2D: React.FC<{
  src: string;
  pageH: number;
  keys: CamKey2D[];
  children?: React.ReactNode;
  bg?: string;
  blur?: number;
  clipPath?: string;
  ease?: (t: number) => number;
}> = ({src, pageH, keys, children, bg = '#eef3fa', blur = 0, clipPath, ease = Easing.bezier(0.33, 0, 0.15, 1)}) => {
  const frame = useCurrentFrame();
  let a = keys[0];
  let b = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) {
    if (frame >= keys[i].frame && frame <= keys[i + 1].frame) {
      a = keys[i];
      b = keys[i + 1];
      break;
    }
  }
  const t = a.frame === b.frame ? 1 : interpolate(frame, [a.frame, b.frame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const cx = lerp(a.cx, b.cx, t);
  const cy = lerp(a.cy, b.cy, t);
  const zoom = lerp(a.zoom, b.zoom, t);
  const rotX = lerp(a.rotX ?? 0, b.rotX ?? 0, t);
  const rotY = lerp(a.rotY ?? 0, b.rotY ?? 0, t);
  const rotZ = lerp(a.rotZ ?? 0, b.rotZ ?? 0, t);
  const persp = lerp(a.persp ?? 1400, b.persp ?? 1400, t);
  const has3D = keys.some((k) => k.rotX !== undefined || k.rotY !== undefined || k.rotZ !== undefined || k.persp !== undefined);
  const image = <Img src={staticFile(src)} style={{position: 'absolute', width: 1920, height: pageH, left: 0, top: 0}} />;

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: bg}}>
      {has3D ? (
        <div style={{position: 'absolute', inset: 0, perspective: `${persp * zoom}px`, perspectiveOrigin: '960px 540px'}}>
          <div style={{position: 'absolute', width: 1920, height: pageH, zoom, transform: `translate(${960 / zoom - cx}px, ${540 / zoom - cy}px) rotateY(${rotY}deg) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`, transformOrigin: `${cx}px ${cy}px`, transformStyle: 'preserve-3d', filter: blur > 0 ? `blur(${blur}px)` : undefined, clipPath}}>
            {image}
            {children}
          </div>
        </div>
      ) : (
        <div style={{position: 'absolute', width: 1920, height: pageH, transform: `translate(${960 - cx * zoom}px, ${540 - cy * zoom}px) scale(${zoom})`, transformOrigin: '0 0', filter: blur > 0 ? `blur(${blur}px)` : undefined, clipPath}}>
          {image}
          {children}
        </div>
      )}
    </AbsoluteFill>
  );
};
