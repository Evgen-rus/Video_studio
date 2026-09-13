import type {Rect} from '../shared/types';

export const MANAGER_CAPTURES = {
  tasks: 'screens/05-manager-tasks-before.jpg',
  confirmed: 'screens/06-manager-confirmed-after.jpg',
  context: 'screens/07-manager-add-context.jpg',
  quickHelp: 'screens/08-manager-quick-help.jpg',
  companion: 'screens/09-manager-companion.jpg',
} as const;

// Coordinates are in the checked 1920x1080 Capture Pack viewport.
export const MANAGER_RECTS: Record<string, Rect> = {
  todayTask: {x: 122, y: 342, w: 1114, h: 91},
  dealSituationBefore: {x: 1284, y: 322, w: 560, h: 141},
  dealSituationAfter: {x: 1284, y: 322, w: 560, h: 141},
  contextText: {x: 579, y: 360, w: 763, h: 182},
  contextVoice: {x: 580, y: 582, w: 367, h: 127},
  quickMessage: {x: 449, y: 321, w: 719, h: 144},
  quickCopyAction: {x: 448, y: 545, w: 188, h: 40},
  companionText: {x: 438, y: 257, w: 1285, h: 47},
  companionCopy: {x: 438, y: 315, w: 132, h: 42},
};
