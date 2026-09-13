import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import type {SfxCue} from './types';

export const SfxLayer: React.FC<{cues: SfxCue[]}> = ({cues}) => (
  <>
    {cues.map((cue) => (
      <Sequence key={cue.id} from={cue.from} durationInFrames={cue.duration}>
        <Audio src={staticFile(cue.src)} volume={cue.volume} />
      </Sequence>
    ))}
  </>
);
