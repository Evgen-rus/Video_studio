import React from 'react';
import {Composition} from 'remotion';
import {RopChapter, ROP_CHAPTER_FRAMES} from './rop/RopChapter';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="RopChapterPreview"
    component={RopChapter}
    durationInFrames={ROP_CHAPTER_FRAMES}
    fps={30}
    width={1920}
    height={1080}
  />
);
