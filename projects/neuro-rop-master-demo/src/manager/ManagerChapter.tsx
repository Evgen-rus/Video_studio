import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SfxLayer} from '../shared/SfxLayer';
import {ManagerRoleTransition} from './ManagerRoleTransition';
import {ManagerCompanionScene, ManagerConfirmedScene, ManagerContextScene, ManagerQuickHelpScene, ManagerTasksScene} from './ManagerScenes';
import {MANAGER_CHAPTER_FRAMES, MANAGER_SHOTS, MANAGER_SFX} from './timeline';

export {MANAGER_CHAPTER_FRAMES};

export const NeuroRopManager: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
    <Sequence from={MANAGER_SHOTS[0].from} durationInFrames={MANAGER_SHOTS[0].duration}><ManagerRoleTransition /></Sequence>
    <Sequence from={MANAGER_SHOTS[1].from} durationInFrames={MANAGER_SHOTS[1].duration}><ManagerTasksScene /></Sequence>
    <Sequence from={MANAGER_SHOTS[2].from} durationInFrames={MANAGER_SHOTS[2].duration}><ManagerConfirmedScene /></Sequence>
    <Sequence from={MANAGER_SHOTS[3].from} durationInFrames={MANAGER_SHOTS[3].duration}><ManagerContextScene /></Sequence>
    <Sequence from={MANAGER_SHOTS[4].from} durationInFrames={MANAGER_SHOTS[4].duration}><ManagerQuickHelpScene /></Sequence>
    <Sequence from={MANAGER_SHOTS[5].from} durationInFrames={MANAGER_SHOTS[5].duration}><ManagerCompanionScene /></Sequence>
    <Sequence from={MANAGER_SHOTS[6].from} durationInFrames={MANAGER_SHOTS[6].duration}><ManagerCompanionScene hold /></Sequence>
    <SfxLayer cues={MANAGER_SFX} />
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 110px rgba(18,43,77,.08)'}} />
  </AbsoluteFill>
);
