import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SfxLayer} from '../shared/SfxLayer';
import {AdminRoleTransition} from './AdminRoleTransition';
import {AdminEventScene, AdminSpendScene} from './AdminScenes';
import {ADMIN_CHAPTER_FRAMES, ADMIN_SHOTS, ADMIN_SFX} from './timeline';

export {ADMIN_CHAPTER_FRAMES};

export const NeuroRopAdmin: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
    <Sequence from={ADMIN_SHOTS[0].from} durationInFrames={ADMIN_SHOTS[0].duration}><AdminRoleTransition /></Sequence>
    <Sequence from={ADMIN_SHOTS[1].from} durationInFrames={ADMIN_SHOTS[1].duration}><AdminSpendScene /></Sequence>
    <Sequence from={ADMIN_SHOTS[2].from} durationInFrames={ADMIN_SHOTS[2].duration}><AdminEventScene /></Sequence>
    <SfxLayer cues={ADMIN_SFX} />
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 110px rgba(18,43,77,.08)'}} />
  </AbsoluteFill>
);
