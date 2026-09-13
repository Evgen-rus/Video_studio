import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export type MasterRoleBridgeProps = {
  src: string;
  title: string;
  subtitle: string;
};

export const MasterRoleBridge: React.FC<MasterRoleBridgeProps> = ({src, title, subtitle}) => {
  const frame = useCurrentFrame();
  const inT = interpolate(frame, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const outT = interpolate(frame, [46, 60], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.33, 0, 0.15, 1)});
  const line = interpolate(frame, [12, 31], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  return (
    <AbsoluteFill style={{backgroundColor: '#122b4d', overflow: 'hidden'}}>
      <Img src={staticFile(src)} style={{position: 'absolute', inset: -24, width: 1968, height: 1128, objectFit: 'cover', filter: 'blur(10px)', opacity: 0.16 * inT}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 42%, rgba(62,125,226,.33), rgba(18,43,77,.97) 68%)', opacity: inT * outT}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', color: '#fff', opacity: inT * outT, transform: `translateY(${(1 - inT) * 14}px)`, fontFamily: 'Arial, sans-serif'}}>
        <div style={{fontSize: 29, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.62}}>Neuro РОП</div>
        <div style={{marginTop: 15, fontSize: 78, fontWeight: 800, letterSpacing: -2}}>{title}</div>
        <div style={{marginTop: 17, fontSize: 26, fontWeight: 500, opacity: 0.82}}>{subtitle}</div>
        <div style={{width: 220, height: 4, margin: '25px auto 0', borderRadius: 4, background: '#4e8cf0', transformOrigin: 'center', transform: `scaleX(${line})`}} />
      </div>
    </AbsoluteFill>
  );
};
