import type {SfxCue} from '../shared/types';

export const MASTER_BRIDGE_FRAMES = 60;

export const MASTER_BGM_CUE_FRAMES = [
  107, 143, 179, 215, 314, 608, 775, 1092,
  1354, 1530, 1740, 1916, 2096, 2340,
  2494, 2611, 2743, 2824, 2938,
] as const;

export const MASTER_SFX: SfxCue[] = [
  {id: 'manager-bridge', from: 1332 + 22, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.07},
  {id: 'admin-bridge', from: 1332 + 60 + 1080 + 22, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.07},
  {id: 'outro-bridge', from: 1332 + 60 + 1080 + 60 + 270 + 22, duration: 16, src: 'audio/sfx-filter.mp3', volume: 0.06},
];
