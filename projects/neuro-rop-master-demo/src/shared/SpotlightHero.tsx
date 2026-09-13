import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ScreenshotCamera, ScreenshotCrop} from './ScreenCamera';
import {ScreenMarker} from './Overlays';
import type {Rect} from './types';

export const SpotlightHero: React.FC<{
  src: string;
  target: Rect;
  accent?: string;
  caption?: React.ReactNode;
  compactNote?: boolean;
}> = ({src, target, accent = '#e8a42c', caption, compactNote = false}) => {
  const frame = useCurrentFrame();
  const targetX = target.x + target.w / 2;
  const targetY = target.y + target.h / 2;
  const keys = [
    {frame: 0, cx: 960, cy: 540, zoom: 0.82},
    {frame: 40, cx: 960, cy: 540, zoom: 0.82},
    {frame: 62, cx: targetX - 35, cy: targetY, zoom: 1.48, rotX: 5, rotY: 18, rotZ: 1, perspective: 1250},
    {frame: 220, cx: targetX - 35, cy: targetY, zoom: 1.48, rotX: 5, rotY: 18, rotZ: 1, perspective: 1250},
  ];
  const spotX = interpolate(frame, [0, 8, 22, 34, 48, 62], [28, 28, 67, 42, 50, 50], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.3, 1)});
  const spotY = interpolate(frame, [0, 8, 22, 34, 48, 62], [30, 30, 45, 61, 66, 50], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.3, 1)});
  const spotOn = interpolate(frame, [2, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pool = interpolate(frame, [26, 42, 62], [620, 430, 360], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.3, 1)});
  const vignette = interpolate(frame, [26, 42, 62], [0.08, 0.25, 0.38], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rise = interpolate(frame, [62, 74], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 1.25, 0.3, 1)});
  const reseat = interpolate(frame, [175, 202], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.3, 1.05)});
  const lift = rise * (1 - reseat);
  const bob = Math.sin(((frame - 74) / 46) * Math.PI * 2) * 3.5 * lift;
  const beam1 = interpolate(frame, [78, 98], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const beam2 = interpolate(frame, [108, 134], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.4, 1)});
  const beamOn = frame >= 77 && frame <= 137;
  const markerOpacity = Math.min(1, rise * 2) * (1 - reseat) + interpolate(frame, [198, 204, 210], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * 0.75;
  const noteIn = interpolate(frame, [84, 98], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.75, 0.3, 1)});
  const noteOut = interpolate(frame, [170, 190], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={src} keys={keys}>
        <div style={{position: 'absolute', left: target.x - 3, top: target.y - 3, width: target.w + 6, height: target.h + 6, borderRadius: 18, background: 'rgba(255,255,255,.72)', boxShadow: `0 ${10 * lift}px ${18 + 32 * lift}px rgba(17,46,83,${0.08 + 0.2 * lift})`, opacity: Math.min(1, rise * 2) * (1 - reseat)}} />
        <ScreenshotCrop src={src} rect={target} style={{transform: `translateZ(${100 * lift + bob}px) translateY(${-10 * lift}px) scale(${1 + 0.018 * lift})`, transformOrigin: 'center', boxShadow: `0 ${8 * lift}px ${12 + 42 * lift}px rgba(17,46,83,${0.12 + 0.18 * lift})`, borderRadius: 16, opacity: 1}}>
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(255,255,255,.38), transparent 42%)', opacity: lift, pointerEvents: 'none'}} />
          {beamOn && lift > 0.4 ? (
            <svg width={target.w + 10} height={target.h + 10} viewBox={`0 0 ${target.w + 10} ${target.h + 10}`} style={{position: 'absolute', left: -5, top: -5, overflow: 'visible', pointerEvents: 'none', opacity: beam1 > 0 ? 1 : 0.62, filter: `drop-shadow(0 0 6px ${accent}) drop-shadow(0 0 18px rgba(255,240,210,.42))`}}>
              <rect x={2} y={2} width={target.w + 6} height={target.h + 6} rx={16} fill="none" stroke={accent} strokeWidth={beam1 > 0 ? 5 : 3.5} strokeLinecap="round" pathLength={1} strokeDasharray="0.14 1" strokeDashoffset={-(beam1 > 0 ? beam1 : beam2)} />
              <rect x={2} y={2} width={target.w + 6} height={target.h + 6} rx={16} fill="none" stroke="rgba(255,248,232,.98)" strokeWidth={beam1 > 0 ? 2.5 : 1.75} strokeLinecap="round" pathLength={1} strokeDasharray="0.14 1" strokeDashoffset={-(beam1 > 0 ? beam1 : beam2)} />
            </svg>
          ) : null}
        </ScreenshotCrop>
        {markerOpacity > 0.02 ? <ScreenMarker rect={target} color={accent} opacity={markerOpacity} pulse /> : null}
        {!compactNote && frame >= 84 && frame <= 190 ? (
          <div style={{position: 'absolute', left: Math.max(60, target.x - (compactNote ? 255 : 300)), top: target.y - (compactNote ? 52 : 64), width: compactNote ? 220 : 255, transform: `translateZ(${80 + Math.sin((frame - 84) / 40) * 3}px) translateY(${(1 - noteIn) * 18}px)`, opacity: noteIn * noteOut * (compactNote ? 0.84 : 1), color: '#122b4d', fontFamily: 'Georgia, serif', fontSize: compactNote ? 25 : 31, fontWeight: 600, lineHeight: 1.12, textAlign: 'right', pointerEvents: 'none'}}>
            <span>Фокус на</span><br /><span style={{color: '#1668e8'}}>следующем шаге</span>
          </div>
        ) : null}
      </ScreenshotCamera>
      <AbsoluteFill style={{pointerEvents: 'none', opacity: spotOn, background: `radial-gradient(${pool}px ${pool * 0.78}px at ${spotX}% ${spotY}%, rgba(255,246,226,.35), rgba(255,246,226,.08) 46%, rgba(15,38,68,${vignette}) 100%)`}} />
      {caption}
    </AbsoluteFill>
  );
};
