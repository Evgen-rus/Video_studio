import type {SfxCue} from '../shared/types';

export const ROP_CHAPTER_FRAMES = 1332;

export type RopShot = {id: string; label: string; from: number; duration: number};

export const ROP_SHOTS: RopShot[] = [
  {id: 'role-transition', label: 'Для РОПа', from: 0, duration: 72},
  {id: 'cursor-tour', label: 'Обзор портфеля', from: 72, duration: 180},
  {id: 'spotlight', label: 'Один проблемный объект', from: 252, duration: 240},
  {id: 'timeline-travel', label: 'Сохранённые срезы', from: 492, duration: 180},
  {id: 'daily-control', label: 'Ежедневный контроль', from: 672, duration: 270},
  {id: 'rop-control', label: 'Контроль РОП', from: 942, duration: 300},
  {id: 'close', label: 'Фокус на следующем шаге', from: 1242, duration: 90},
];

export const ROP_SFX: SfxCue[] = [
  {id: 'cursor-kpi', from: 72 + 35, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.13},
  {id: 'cursor-filter', from: 72 + 71, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.11},
  {id: 'cursor-deal', from: 72 + 107, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.11},
  {id: 'cursor-quality', from: 72 + 143, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.12},
  {id: 'spotlight-lock', from: 252 + 62, duration: 20, src: 'audio/sfx-filter.mp3', volume: 0.1},
  {id: 'timeline-stop', from: 492 + 116, duration: 22, src: 'audio/sfx-filter.mp3', volume: 0.09},
  {id: 'daily-hidden-cut', from: 672 + 103, duration: 18, src: 'audio/sfx-filter.mp3', volume: 0.1},
  {id: 'control-focus', from: 942 + 150, duration: 18, src: 'audio/sfx-click.mp3', volume: 0.1},
];
