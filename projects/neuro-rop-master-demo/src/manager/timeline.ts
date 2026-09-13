import type {SfxCue} from '../shared/types';

export const MANAGER_CHAPTER_FRAMES = 1080;

export type ManagerShot = {id: string; label: string; from: number; duration: number};

export const MANAGER_SHOTS: ManagerShot[] = [
  {id: 'role-transition', label: 'Для менеджера', from: 0, duration: 60},
  {id: 'tasks', label: 'Мои задачи · сегодня', from: 60, duration: 210},
  {id: 'confirmed', label: 'DEMO-сделка · ситуация подтверждена', from: 270, duration: 180},
  {id: 'context', label: 'Дополнить текущую ситуацию', from: 450, duration: 180},
  {id: 'quick-help', label: 'Дожим · следующий шаг', from: 630, duration: 270},
  {id: 'companion', label: 'Сопроводительный текст · копирование', from: 900, duration: 120},
  {id: 'hold', label: 'Спокойный hold', from: 1020, duration: 60},
];

export const MANAGER_SFX: SfxCue[] = [
  {id: 'open-demo-deal', from: 60 + 78, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.12},
  {id: 'confirm-situation', from: 270 + 78, duration: 18, src: 'audio/sfx-filter.mp3', volume: 0.09},
  {id: 'add-context', from: 450 + 74, duration: 18, src: 'audio/sfx-click.mp3', volume: 0.1},
  {id: 'quick-help', from: 630 + 74, duration: 18, src: 'audio/sfx-filter.mp3', volume: 0.11},
  {id: 'copy-text', from: 900 + 48, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.08},
];
