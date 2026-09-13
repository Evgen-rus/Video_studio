import {Brand, Click, Filter, Focus, NeuroRopPromo, Overview, Spotlight} from './NeuroRopPromo';
import {SHOTS, SFX_CUES, TOTAL_FRAMES} from './timeline';

const components = {overview: Overview, spotlight: Spotlight, click: Click, filter: Filter, focus: Focus, brand: Brand};

export const WORKBENCH = {
  name: 'НейроРОП · Фокус на следующем шаге',
  fps: 30,
  width: 1920,
  height: 1080,
  total: TOTAL_FRAMES,
  background: '#eef3fa',
  shots: SHOTS.map((shot) => ({...shot, component: components[shot.id as keyof typeof components]})),
  transitions: [],
  captions: [],
  overlays: [],
  sfx: SFX_CUES,
  bgm: [],
  order: ['transitions', 'captions', 'overlays'],
  original: NeuroRopPromo,
};
