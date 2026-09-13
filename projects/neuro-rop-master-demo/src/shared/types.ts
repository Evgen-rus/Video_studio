export type Rect = {x: number; y: number; w: number; h: number};

export type CameraKey = {
  frame: number;
  cx: number;
  cy: number;
  zoom: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  perspective?: number;
};

export type CameraState = Required<Omit<CameraKey, 'frame'>>;

export type SfxCue = {
  id: string;
  from: number;
  duration: number;
  src: string;
  volume: number;
};
