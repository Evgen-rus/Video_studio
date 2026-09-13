import React from 'react';
import {Composition} from 'remotion';
import {NeuroRopAdmin, ADMIN_CHAPTER_FRAMES} from './admin/AdminChapter';
import {NeuroRopMaster, MASTER_CHAPTER_FRAMES} from './master/Master';
import {NeuroRopManager, MANAGER_CHAPTER_FRAMES} from './manager/ManagerChapter';
import {NeuroRopOutro, OUTRO_FRAMES} from './outro/OutroChapter';
import {RopChapter, ROP_CHAPTER_FRAMES} from './rop/RopChapter';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="RopChapterPreview"
      component={RopChapter}
      durationInFrames={ROP_CHAPTER_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="NeuroRopROP"
      component={RopChapter}
      durationInFrames={ROP_CHAPTER_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="NeuroRopManager"
      component={NeuroRopManager}
      durationInFrames={MANAGER_CHAPTER_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="NeuroRopAdmin"
      component={NeuroRopAdmin}
      durationInFrames={ADMIN_CHAPTER_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="NeuroRopOutro"
      component={NeuroRopOutro}
      durationInFrames={OUTRO_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="NeuroRopMaster"
      component={NeuroRopMaster}
      durationInFrames={MASTER_CHAPTER_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
