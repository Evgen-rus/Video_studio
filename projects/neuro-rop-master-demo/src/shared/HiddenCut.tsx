import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const HiddenCut: React.FC<{fromSrc: string; toSrc: string; cut?: number; caption?: React.ReactNode; trailBlur?: number; cardBlur?: number}> = ({fromSrc, toSrc, cut = 103, caption, trailBlur = 14, cardBlur = 8}) => {
  const frame = useCurrentFrame();
  const start = cut - 9;
  const end = cut + 9;
  const xAt = (f: number) => interpolate(f, [start, end], [-2250, 2650], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.3, 0, 0.7, 1)});
  const x = xAt(frame);
  const velocity = xAt(frame + 0.5) - xAt(frame - 0.5);
  const sweeping = frame > start - 2 && frame < end + 3;
  const shove = frame < cut ? interpolate(frame, [start, cut], [0, -34], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad)}) : interpolate(frame, [cut, cut + 14], [34, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const activeSrc = frame < cut ? fromSrc : toSrc;
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${shove}px)`}}><Img src={staticFile(activeSrc)} style={{position: 'absolute', inset: 0, width: 1920, height: 1080, display: 'block'}} /></div>
      {sweeping && [4, 3, 2, 1].map((i) => <div key={i} style={{position: 'absolute', left: xAt(frame - i * 0.55), top: 90, width: 1600, height: 900, transform: `scale(1.6) skewX(${-velocity * 0.018}deg)`, transformOrigin: 'center', opacity: [0, 0.35, 0.22, 0.13, 0.07][i], filter: `blur(${trailBlur}px)`, borderRadius: 18, overflow: 'hidden'}}><Img src={staticFile(fromSrc)} style={{width: '100%', height: '100%', display: 'block'}} /></div>)}
      {sweeping ? <div style={{position: 'absolute', left: x, top: 90, width: 1600, height: 900, transform: `scale(1.6) skewX(${-velocity * 0.018}deg)`, transformOrigin: 'center', filter: `blur(${cardBlur}px)`, boxShadow: '0 16px 48px rgba(18,43,77,.2)', borderRadius: 18, overflow: 'hidden'}}><Img src={staticFile(fromSrc)} style={{width: '100%', height: '100%', display: 'block'}} /></div> : null}
      {caption}
    </AbsoluteFill>
  );
};
