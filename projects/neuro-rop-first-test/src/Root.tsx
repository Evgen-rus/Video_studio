import React from 'react';
import {Composition} from 'remotion';
import {NeuroRopPromo, durationInFrames} from './NeuroRopPromo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="NeuroRopPromo"
    component={NeuroRopPromo}
    durationInFrames={durationInFrames}
    fps={30}
    width={1920}
    height={1080}
  />
);
