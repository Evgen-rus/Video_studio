import type {Rect} from '../shared/types';

export const CAPTURES = {
  dashboard: 'screens/01-rop-dashboard.jpg',
  attention: 'screens/02-rop-attention.jpg',
  daily1545: 'screens/03-rop-daily-1545.jpg',
  daily2300: 'screens/04-rop-daily-2300.jpg',
  control: 'screens/10-rop-control.jpg',
} as const;

// Coordinates are in the checked 1920x1080 Capture Pack viewport.
export const ROP_RECTS: Record<string, Rect> = {
  dashboardDeal: {x: 121, y: 342, w: 1098, h: 108},
  dashboardKpis: {x: 860, y: 54, w: 780, h: 54},
  dashboardFilters: {x: 112, y: 109, w: 760, h: 44},
  dashboardQuality: {x: 1265, y: 443, w: 570, h: 128},
  dailyHeader: {x: 98, y: 11, w: 770, h: 58},
  dailyManager: {x: 100, y: 364, w: 1750, h: 82},
  controlTasks: {x: 117, y: 307, w: 1100, h: 355},
  controlFocus: {x: 1267, y: 725, w: 575, h: 220},
};
