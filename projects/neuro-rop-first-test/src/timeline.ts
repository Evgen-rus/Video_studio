export const TOTAL_FRAMES = 261;

export type Shot = {
  id: string;
  label: string;
  from: number;
  duration: number;
};

export type SfxCue = {
  id: string;
  from: number;
  duration: number;
  src: string;
  volume: number;
};

// Single source of truth for both the Remotion render and workbench manifest.
export const SHOTS: Shot[] = [
  {id: 'overview', label: 'S1 · Обзор dashboard', from: 0, duration: 21},
  {id: 'spotlight', label: 'S2 · Требуют внимания', from: 21, duration: 66},
  {id: 'click', label: 'S3 · Клик по фильтру', from: 87, duration: 14},
  {id: 'filter', label: 'S4 · Фильтр и карточка', from: 101, duration: 57},
  {id: 'focus', label: 'S5 · Контроль качества', from: 158, duration: 63},
  {id: 'brand', label: 'S6 · Wordmark', from: 221, duration: 40},
];

export const SFX_CUES: SfxCue[] = [
  {id: 'attention-lock', from: 43, duration: 24, src: 'audio/sfx-lock.mp3', volume: 0.16},
  {id: 'filter-click', from: 94, duration: 20, src: 'audio/sfx-click.mp3', volume: 0.2},
  {id: 'filter-sweep', from: 112, duration: 24, src: 'audio/sfx-filter.mp3', volume: 0.13},
  {id: 'focus-push', from: 168, duration: 26, src: 'audio/sfx-focus.mp3', volume: 0.12},
  {id: 'brand-touch', from: 241, duration: 18, src: 'audio/sfx-lock.mp3', volume: 0.09},
];
