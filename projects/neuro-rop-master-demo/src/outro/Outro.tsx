import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {SfxLayer} from '../shared/SfxLayer';

export const OUTRO_FRAMES = 180;

type OutroRole = {
  label: string;
  src: string;
  left: number;
  top: number;
  endLeft: number;
  endTop: number;
};

const OUTRO_ROLES: OutroRole[] = [
  {label: 'РОП', src: 'screens/01-rop-dashboard.jpg', left: 120, top: 334, endLeft: 725, endTop: 356},
  {label: 'Менеджер', src: 'screens/05-manager-tasks-before.jpg', left: 740, top: 204, endLeft: 725, endTop: 356},
  {label: 'Руководитель', src: 'screens/11-admin-ai-spend.jpg', left: 1360, top: 334, endLeft: 725, endTop: 356},
];

export const OutroRoleCard: React.FC<{role: OutroRole; index: number; key?: string}> = ({role, index}) => {
  const frame = useCurrentFrame();
  const enterStart = index * 6;
  const enter = interpolate(frame, [enterStart, enterStart + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });
  const converge = interpolate(frame, [76, 116], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });
  const fade = interpolate(frame, [0, 14, 84, 120, 151], [0, 1, 1, 0.3, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const left = interpolate(converge, [0, 1], [role.left, role.endLeft]);
  const top = interpolate(converge, [0, 1], [role.top, role.endTop]);
  const scale = interpolate(converge, [0, 1], [1, 0.56]);
  return (
    <div style={{
      position: 'absolute', left, top, width: 500, height: 282, overflow: 'hidden', borderRadius: 18,
      background: '#fff', border: '1px solid rgba(255,255,255,.55)',
      boxShadow: '0 20px 55px rgba(0,20,50,.28)', opacity: fade * enter,
      transform: `scale(${scale})`, transformOrigin: 'center center',
    }}>
      <Img src={staticFile(role.src)} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      <div style={{position: 'absolute', left: 20, bottom: 16, padding: '8px 13px', borderRadius: 9, color: '#fff', background: 'rgba(18,43,77,.88)', fontFamily: 'Arial, sans-serif', fontSize: 23, fontWeight: 700, letterSpacing: 0.2}}>{role.label}</div>
    </div>
  );
};

export const NeuroRopOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const wordmark = interpolate(frame, [92, 124], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });
  const copy = interpolate(frame, [110, 138], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, #244c7c 0%, #122b4d 52%, #09192c 100%)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(76,139,235,.1), transparent 42%, rgba(45,119,238,.14))'}} />
      {OUTRO_ROLES.map((role, index) => <OutroRoleCard key={role.label} role={role} index={index} />)}
      <div style={{position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center', opacity: wordmark, transform: `translateY(${(1 - wordmark) * 16}px) scale(${0.94 + wordmark * 0.06})`, color: '#fff', fontFamily: 'Arial, sans-serif'}}>
        <div style={{fontSize: 88, lineHeight: 1, fontWeight: 800, letterSpacing: -2}}>НейроРОП</div>
        <div style={{width: 190, height: 4, margin: '22px auto 0', borderRadius: 4, background: '#62a0ff', transform: `scaleX(${wordmark})`}} />
      </div>
      <div style={{position: 'absolute', left: 120, right: 120, bottom: 132, textAlign: 'center', opacity: copy, color: '#fff', fontFamily: 'Arial, sans-serif'}}>
        <div style={{fontSize: 34, lineHeight: 1.15, fontWeight: 700}}>Контроль для РОПа. Следующий шаг для менеджера.</div>
        <div style={{marginTop: 17, fontSize: 22, lineHeight: 1.2, fontWeight: 500, opacity: 0.72}}>Работа команды — в одном контуре.</div>
      </div>
      <SfxLayer cues={[{id: 'outro-converge', from: 76, duration: 18, src: 'audio/sfx-filter.mp3', volume: 0.07}]} />
      <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 140px rgba(0,0,0,.25)', pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
