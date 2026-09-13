import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Caption, ProgressLine, ScreenMarker} from '../shared/Overlays';
import {ScreenshotCamera} from '../shared/ScreenCamera';
import {CursorTour, TourStop} from '../shared/CursorTour';
import {HiddenCut} from '../shared/HiddenCut';
import {TimelineTravel} from '../shared/TimelineTravel';
import {SpotlightHero} from '../shared/SpotlightHero';
import {CAPTURES, ROP_RECTS} from './assets';

export const RopSpotlightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const after = interpolate(frame, [162, 180], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <AbsoluteFill style={{opacity: 1 - after}}>
        <SpotlightHero src={CAPTURES.dashboard} target={ROP_RECTS.dashboardDeal} />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: after}}>
        <SpotlightHero src={CAPTURES.attention} target={ROP_RECTS.dashboardDeal} />
      </AbsoluteFill>
      <Caption top={82} opacity={1 - after}>Портфель под контролем</Caption>
      <Caption top={82} opacity={after} color="#1668e8">Требуют внимания · 1</Caption>
    </AbsoluteFill>
  );
};

const CURSOR_STOPS: TourStop[] = [
  {frame: 0, cx: 960, cy: 540, zoom: 0.84, cursorX: 380, cursorY: 70},
  {frame: 35, cx: 630, cy: 105, zoom: 1.32, cursorX: 680, cursorY: 54},
  {frame: 71, cx: 530, cy: 130, zoom: 1.32, cursorX: 640, cursorY: 132},
  {frame: 107, cx: 640, cy: 390, zoom: 1.25, cursorX: 340, cursorY: 395},
  {frame: 143, cx: 1490, cy: 510, zoom: 1.24, cursorX: 1510, cursorY: 512},
  {frame: 180, cx: 1490, cy: 510, zoom: 1.24, cursorX: 1510, cursorY: 512},
];

export const RopCursorScene: React.FC = () => (
  <CursorTour
    src={CAPTURES.dashboard}
    stops={CURSOR_STOPS}
    caption={<><Caption top={82}>Обзор портфеля → внимание → контроль</Caption><ProgressLine progress={1} width={350} top={153} opacity={0.72} /></>}
  />
);

export const RopTimelineScene: React.FC = () => (
  <TimelineTravel
    milestones={[
      {label: 'Дашборд', caption: 'Все сделки', src: CAPTURES.dashboard},
      {label: '15:45', caption: 'срез команды', src: CAPTURES.daily1545},
      {label: '23:00', caption: 'дневной итог', src: CAPTURES.daily2300},
      {label: 'Контроль РОП', caption: 'задачи и сроки', src: CAPTURES.control},
    ]}
    caption={<Caption top={82}>Сохранённые срезы, а не live-анализ</Caption>}
  />
);

export const RopDailyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const labelOpacity = interpolate(frame, [8, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <HiddenCut fromSrc={CAPTURES.daily1545} toSrc={CAPTURES.daily2300} cut={103} trailBlur={0} cardBlur={0} />
      <Caption top={82} opacity={labelOpacity}>Ежедневный контроль</Caption>
      <div style={{position: 'absolute', right: 92, top: 78, color: '#527094', fontFamily: 'Arial, sans-serif', fontSize: 21, fontWeight: 700, opacity: 0.9}}>{frame < 103 ? '15:45' : '23:00'}</div>
    </AbsoluteFill>
  );
};

export const RopControlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const marker = interpolate(frame, [44, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const keys = [
    {frame: 0, cx: 960, cy: 540, zoom: 0.84},
    {frame: 66, cx: 1020, cy: 520, zoom: 0.9},
    {frame: 138, cx: 1510, cy: 790, zoom: 1.16, rotX: 2, rotY: -4, rotZ: 0, perspective: 1400},
    {frame: 300, cx: 1510, cy: 790, zoom: 1.16, rotX: 2, rotY: -4, rotZ: 0, perspective: 1400},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={CAPTURES.control} keys={keys}>
        <ScreenMarker rect={ROP_RECTS.controlTasks} color="#2d77ee" opacity={marker * 0.82} />
        <ScreenMarker rect={ROP_RECTS.controlFocus} color="#e8a42c" opacity={marker} pulse />
      </ScreenshotCamera>
      <Caption top={82}>Контроль РОП</Caption>
      <div style={{position: 'absolute', left: 96, top: 164, width: 340, color: '#122b4d', fontFamily: 'Arial, sans-serif', fontSize: 28, fontWeight: 700, lineHeight: 1.15, opacity: marker}}>
        Просрочки<br /><span style={{color: '#1668e8'}}>и следующий шаг</span>
      </div>
      <ProgressLine progress={marker} top={242} width={310} opacity={marker} />
    </AbsoluteFill>
  );
};

export const RopCloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = interpolate(frame, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  return (
    <AbsoluteFill style={{backgroundColor: '#122b4d'}}>
      <ScreenshotCamera src={CAPTURES.control} keys={[{frame: 0, cx: 1510, cy: 790, zoom: 1.05}, {frame: 90, cx: 1510, cy: 790, zoom: 1.05}]} opacity={0.32} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(18,43,77,.95), rgba(18,43,77,.55))'}} />
      <div style={{position: 'absolute', left: 170, top: 360, color: '#fff', opacity: inT, fontFamily: 'Arial, sans-serif'}}>
        <div style={{fontSize: 28, fontWeight: 700, letterSpacing: 1, opacity: 0.72}}>Neuro РОП</div>
        <div style={{marginTop: 18, fontSize: 82, fontWeight: 800, letterSpacing: -2}}>Фокус на следующем шаге</div>
        <div style={{marginTop: 22, fontSize: 28, opacity: 0.78}}>Для РОПа</div>
        <div style={{width: 260, height: 4, marginTop: 30, borderRadius: 3, background: '#4e8cf0', transformOrigin: 'left center', transform: `scaleX(${interpolate(frame, [16, 38], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)})})`}} />
      </div>
    </AbsoluteFill>
  );
};
