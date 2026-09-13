import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import type {Rect} from './types';

export const ScreenMarker: React.FC<{
  rect: Rect;
  color?: string;
  opacity?: number;
  pulse?: boolean;
  inset?: number;
}> = ({rect, color = '#2d77ee', opacity = 1, pulse = false, inset = -8}) => {
  const frame = useCurrentFrame();
  const pulseValue = pulse ? 0.78 + Math.sin(frame / 6) * 0.22 : 1;
  return (
    <div style={{position: 'absolute', left: rect.x + inset, top: rect.y + inset, width: rect.w - inset * 2, height: rect.h - inset * 2, border: `3px solid ${color}`, borderRadius: 16, boxShadow: `0 0 0 1px rgba(255,255,255,.85), 0 0 26px ${color}55`, opacity: opacity * pulseValue, pointerEvents: 'none'}} />
  );
};

export const CursorPointer: React.FC<{x: number; y: number; zoom?: number; opacity?: number; pressed?: boolean}> = ({x, y, zoom = 1, opacity = 1, pressed = false}) => (
  <svg viewBox="0 0 36 44" style={{position: 'absolute', left: x, top: y, width: 42, height: 52, transformOrigin: '3px 2px', transform: `translate(-3px, -2px) scale(${(pressed ? 0.88 : 1) / zoom})`, opacity, filter: 'drop-shadow(0 5px 8px rgba(12,36,68,.35))', zIndex: 20, pointerEvents: 'none'}}>
    <path d="M3 2 31 25 19 27 25 40 17 43 11 29 3 37Z" fill="white" stroke="#122b4d" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

export const CursorRipple: React.FC<{x: number; y: number; zoom?: number; start: number; color?: string}> = ({x, y, zoom = 1, start, color = '#2d77ee'}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (frame < start || frame > start + 12) return null;
  const radius = 16 + t * 72;
  return <div style={{position: 'absolute', left: x - radius, top: y - radius, width: radius * 2, height: radius * 2, border: `3px solid ${color}`, borderRadius: '50%', opacity: 1 - t, transform: `scale(${1 / zoom})`, transformOrigin: 'center', boxShadow: `0 0 20px ${color}66`, pointerEvents: 'none', zIndex: 19}} />;
};

export const Caption: React.FC<{children: React.ReactNode; left?: number; top?: number; color?: string; opacity?: number; align?: 'left' | 'center' | 'right'}> = ({children, left = 96, top = 84, color = '#122b4d', opacity = 1, align = 'left'}) => (
  <div style={{position: 'absolute', left, top, color, opacity, textAlign: align, fontFamily: 'Arial, sans-serif', fontSize: 25, fontWeight: 700, lineHeight: 1.18, letterSpacing: 0.3, textShadow: '0 1px 5px rgba(255,255,255,.7)', pointerEvents: 'none', zIndex: 50}}>{children}</div>
);

export const ProgressLine: React.FC<{width?: number; progress: number; color?: string; left?: number; top?: number; opacity?: number}> = ({width = 280, progress, color = '#2874e8', left = 96, top = 160, opacity = 1}) => (
  <div style={{position: 'absolute', left, top, width, height: 3, borderRadius: 3, background: 'rgba(30,70,120,.16)', opacity, overflow: 'hidden', pointerEvents: 'none'}}>
    <div style={{width: `${Math.max(0, Math.min(1, progress)) * 100}%`, height: '100%', background: color, transformOrigin: 'left center'}} />
  </div>
);
