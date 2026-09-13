import type {SfxCue} from '../shared/types';

export const MASTER_BRIDGE_FRAMES = 60;

export const MASTER_SFX: SfxCue[] = [
  {id: 'manager-bridge', from: 1332 + 22, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.07},
  {id: 'admin-bridge', from: 1332 + 60 + 1080 + 22, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.07},
  {id: 'outro-bridge', from: 1332 + 60 + 1080 + 60 + 270 + 22, duration: 16, src: 'audio/sfx-filter.mp3', volume: 0.06},
];
