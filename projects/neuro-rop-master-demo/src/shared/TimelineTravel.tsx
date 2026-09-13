import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';

export type TimelineMilestone = {label: string; caption: string; src: string};

export const TimelineTravel: React.FC<{milestones: TimelineMilestone[]; caption?: React.ReactNode}> = ({milestones, caption}) => {
  const frame = useCurrentFrame();
  const gap = 1180;
  const origin = 720;
  const axisY = 710;
  const lastX = origin + (milestones.length - 1) * gap;
  const travelEnd = 116;
  const camT = interpolate(frame, [12, travelEnd], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const eased = interpolate(camT, [0, 0.15, 0.88, 1], [0, 0.055, 0.9, 1], {easing: Easing.inOut(Easing.quad)});
  const camX = eased * (lastX - origin);
  const zoom = interpolate(frame, [travelEnd, 128], [1, 1.23], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${zoom})`, transformOrigin: '50% 62%'}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: lastX + 980, height: 1080, transform: `translateX(${-camX}px)`}}>
          <div style={{position: 'absolute', left: 180, top: axisY - 3, width: lastX + 700, height: 6, borderRadius: 3, background: '#4c76a8'}} />
          {Array.from({length: milestones.length * 5 + 3}).map((_, i) => <div key={i} style={{position: 'absolute', left: origin + i * (gap / 5) - 2, top: axisY - 11, width: 4, height: 22, borderRadius: 2, background: '#7892b5', opacity: 0.7}} />)}
          {milestones.map((milestone, i) => {
            const x = origin + i * gap;
            const pop = Math.max(12, Math.round(12 + (travelEnd - 12) * (i / Math.max(1, milestones.length - 1))) - 6);
            const cardProgress = spring({frame: frame - pop, fps: 30, config: {damping: 11, stiffness: 160, mass: 0.9}, durationInFrames: 26});
            if (frame < pop) return <div key={milestone.label} />;
            return (
              <div key={milestone.label} style={{position: 'absolute', left: x, top: 0}}>
                <div style={{position: 'absolute', left: -3, top: axisY - 29, width: 6, height: 58, borderRadius: 3, background: '#122b4d'}} />
                <div style={{position: 'absolute', left: -205, top: axisY + 44, width: 410, textAlign: 'center', color: '#122b4d', fontFamily: 'Arial, sans-serif', fontSize: 34, fontWeight: 800}}>{milestone.label}</div>
                <div style={{position: 'absolute', left: -210, top: axisY - 40 - 240, width: 420, height: 240, borderRadius: 18, overflow: 'hidden', background: '#fff', boxShadow: '0 18px 40px rgba(18,43,77,.18)', transformOrigin: '50% 100%', transform: `scaleY(${cardProgress}) scaleX(${0.64 + 0.36 * cardProgress})`, opacity: Math.min(1, cardProgress * 2)}}>
                  <Img src={staticFile(milestone.src)} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
                  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px 14px', background: 'linear-gradient(transparent, rgba(18,43,77,.78))', color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 18, fontWeight: 700}}>{milestone.caption}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {caption}
    </AbsoluteFill>
  );
};
