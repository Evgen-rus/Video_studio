import type {SfxCue} from '../shared/types';

export const ADMIN_CHAPTER_FRAMES = 270;

export type AdminShot = {id: string; label: string; from: number; duration: number};

export const ADMIN_SHOTS: AdminShot[] = [
  {id: 'role-transition', label: 'Для руководителя', from: 0, duration: 45},
  {id: 'spend', label: 'Расходы AI', from: 45, duration: 120},
  {id: 'event', label: 'Детализация вызова', from: 165, duration: 105},
];

export const ADMIN_SFX: SfxCue[] = [
  {id: 'spend-kpi', from: 45 + 34, duration: 16, src: 'audio/sfx-click.mp3', volume: 0.08},
  {id: 'event-detail', from: 165 + 46, duration: 18, src: 'audio/sfx-filter.mp3', volume: 0.08},
];
