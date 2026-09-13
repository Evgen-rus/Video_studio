import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SfxLayer} from '../shared/SfxLayer';
import {RoleTransition} from './RoleTransition';
import {RopCloseScene, RopControlScene, RopCursorScene, RopDailyScene, RopSpotlightScene, RopTimelineScene} from './RopScenes';
import {ROP_CHAPTER_FRAMES, ROP_SFX, ROP_SHOTS} from './timeline';

export {ROP_CHAPTER_FRAMES};

export const RopChapter: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
    <Sequence from={ROP_SHOTS[0].from} durationInFrames={ROP_SHOTS[0].duration}><RoleTransition /></Sequence>
    <Sequence from={ROP_SHOTS[1].from} durationInFrames={ROP_SHOTS[1].duration}><RopCursorScene /></Sequence>
    <Sequence from={ROP_SHOTS[2].from} durationInFrames={ROP_SHOTS[2].duration}><RopSpotlightScene /></Sequence>
    <Sequence from={ROP_SHOTS[3].from} durationInFrames={ROP_SHOTS[3].duration}><RopTimelineScene /></Sequence>
    <Sequence from={ROP_SHOTS[4].from} durationInFrames={ROP_SHOTS[4].duration}><RopDailyScene /></Sequence>
    <Sequence from={ROP_SHOTS[5].from} durationInFrames={ROP_SHOTS[5].duration}><RopControlScene /></Sequence>
    <Sequence from={ROP_SHOTS[6].from} durationInFrames={ROP_SHOTS[6].duration}><RopCloseScene /></Sequence>
    <SfxLayer cues={ROP_SFX} />
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 110px rgba(18,43,77,.08)'}} />
  </AbsoluteFill>
);
