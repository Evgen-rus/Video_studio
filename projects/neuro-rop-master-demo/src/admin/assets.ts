import type {Rect} from '../shared/types';

export const ADMIN_CAPTURES = {
  spend: 'screens/11-admin-ai-spend.jpg',
  event: 'screens/12-admin-event-detail.jpg',
} as const;

// Coordinates are in the checked 1920x1080 Capture Pack viewport.
export const ADMIN_RECTS: Record<string, Rect> = {
  spendToday: {x: 302, y: 24, w: 210, h: 70},
  spendOperations: {x: 100, y: 386, w: 885, h: 121},
  spendJournalRow: {x: 120, y: 787, w: 1720, h: 70},
  eventDetails: {x: 118, y: 851, w: 1690, h: 215},
};
