import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ADMIN_CAPTURES} from './assets';

export const AdminRoleTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = interpolate(frame, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const outT = interpolate(frame, [31, 45], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.33, 0, 0.15, 1)});
  return (
    <AbsoluteFill style={{backgroundColor: '#122b4d', overflow: 'hidden'}}>
      <Img src={staticFile(ADMIN_CAPTURES.spend)} style={{position: 'absolute', inset: -24, width: 1968, height: 1128, objectFit: 'cover', filter: 'blur(9px)', opacity: 0.18 * inT}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 42%, rgba(62,125,226,.35), rgba(18,43,77,.96) 68%)', opacity: inT * outT}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 370, textAlign: 'center', color: '#fff', opacity: inT * outT, transform: `translateY(${(1 - inT) * 16}px)`}}>
        <div style={{fontFamily: 'Arial, sans-serif', fontSize: 32, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.68}}>Neuro РОП</div>
        <div style={{marginTop: 16, fontFamily: 'Arial, sans-serif', fontSize: 94, fontWeight: 800, letterSpacing: -3}}>Для руководителя</div>
        <div style={{marginTop: 18, fontFamily: 'Arial, sans-serif', fontSize: 28, fontWeight: 500, opacity: 0.82}}>расходы AI · проверяемые сигналы</div>
        <div style={{width: 230, height: 4, margin: '26px auto 0', borderRadius: 4, background: '#4e8cf0', transformOrigin: 'center', transform: `scaleX(${interpolate(frame, [11, 27], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)})})`}} />
      </div>
    </AbsoluteFill>
  );
};
