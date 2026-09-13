import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {Caption, CursorPointer, CursorRipple, ProgressLine, ScreenMarker} from '../shared/Overlays';
import {HiddenCut} from '../shared/HiddenCut';
import {ScreenshotCamera} from '../shared/ScreenCamera';
import {SpotlightHero} from '../shared/SpotlightHero';
import {MANAGER_CAPTURES, MANAGER_RECTS} from './assets';

export const ManagerTasksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraKeys = [
    {frame: 0, cx: 960, cy: 540, zoom: 0.82},
    {frame: 62, cx: 960, cy: 540, zoom: 0.82},
    {frame: 112, cx: 670, cy: 389, zoom: 1.14, rotX: 2, rotY: -3, rotZ: 0, perspective: 1400},
    {frame: 210, cx: 670, cy: 389, zoom: 1.14, rotX: 2, rotY: -3, rotZ: 0, perspective: 1400},
  ];
  const marker = interpolate(frame, [54, 76], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const cursorT = interpolate(frame, [46, 79], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const cursorX = interpolate(cursorT, [0, 1], [640, 315]);
  const cursorY = interpolate(cursorT, [0, 1], [126, 386]);
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={MANAGER_CAPTURES.tasks} keys={cameraKeys}>
        <ScreenMarker rect={MANAGER_RECTS.todayTask} color="#2d77ee" opacity={marker} pulse />
        <CursorRipple x={cursorX} y={cursorY} zoom={1.14} start={80} color="#2d77ee" />
        <CursorPointer x={cursorX} y={cursorY} zoom={frame >= 79 ? 1.14 : 0.82} pressed={frame >= 79 && frame < 86} />
      </ScreenshotCamera>
      <Caption top={82}>Мои задачи · сегодня</Caption>
      <ProgressLine progress={marker} width={290} top={155} opacity={0.72} />
    </AbsoluteFill>
  );
};

export const ManagerConfirmedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const after = interpolate(frame, [82, 104], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const cameraKeys = [
    {frame: 0, cx: 960, cy: 540, zoom: 0.82},
    {frame: 60, cx: 960, cy: 540, zoom: 0.82},
    {frame: 112, cx: 1540, cy: 390, zoom: 1.14, rotX: 2, rotY: -3, rotZ: 0, perspective: 1400},
    {frame: 180, cx: 1540, cy: 390, zoom: 1.14, rotX: 2, rotY: -3, rotZ: 0, perspective: 1400},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <AbsoluteFill style={{opacity: 1 - after}}>
        <ScreenshotCamera src={MANAGER_CAPTURES.tasks} keys={cameraKeys}>
          <ScreenMarker rect={MANAGER_RECTS.dealSituationBefore} color="#e8a42c" opacity={0.88} />
        </ScreenshotCamera>
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: after}}>
        <ScreenshotCamera src={MANAGER_CAPTURES.confirmed} keys={cameraKeys}>
          <ScreenMarker rect={MANAGER_RECTS.dealSituationAfter} color="#1d9b66" opacity={0.9} pulse />
        </ScreenshotCamera>
      </AbsoluteFill>
      <Sequence from={78} durationInFrames={37}>
        <HiddenCut fromSrc={MANAGER_CAPTURES.tasks} toSrc={MANAGER_CAPTURES.confirmed} cut={18} />
      </Sequence>
      <Caption top={82} opacity={1 - after}>DEMO-сделка · открыть ситуацию</Caption>
      <Caption top={82} color="#1d9b66" opacity={after}>DEMO-сделка · ситуация подтверждена</Caption>
    </AbsoluteFill>
  );
};

export const ManagerContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const marker = interpolate(frame, [30, 58], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const cameraKeys = [
    {frame: 0, cx: 960, cy: 540, zoom: 0.86},
    {frame: 32, cx: 960, cy: 540, zoom: 0.94},
    {frame: 180, cx: 960, cy: 540, zoom: 0.94},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={MANAGER_CAPTURES.context} keys={cameraKeys}>
        <ScreenMarker rect={MANAGER_RECTS.contextText} color="#2d77ee" opacity={marker * 0.9} />
        <ScreenMarker rect={MANAGER_RECTS.contextVoice} color="#e8a42c" opacity={marker} pulse />
      </ScreenshotCamera>
      <Caption top={82}>Дополнить текущую ситуацию</Caption>
      <div style={{position: 'absolute', left: 96, top: 160, color: '#122b4d', fontFamily: 'Arial, sans-serif', fontSize: 26, fontWeight: 700, lineHeight: 1.18, opacity: marker}}>ручной дополнительный контекст</div>
      <ProgressLine progress={marker} width={330} top={231} opacity={marker * 0.78} color="#e8a42c" />
    </AbsoluteFill>
  );
};

export const ManagerQuickHelpScene: React.FC = () => (
  <SpotlightHero
    src={MANAGER_CAPTURES.quickHelp}
    target={MANAGER_RECTS.quickMessage}
    accent="#2d77ee"
    compactNote
    caption={<Caption top={82}>Дожим · следующий шаг</Caption>}
  />
);

export const ManagerCompanionScene: React.FC<{hold?: boolean}> = ({hold = false}) => {
  const frame = useCurrentFrame();
  const marker = hold ? 0.75 : interpolate(frame, [26, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const cameraKeys = [
    {frame: 0, cx: 960, cy: 540, zoom: hold ? 0.86 : 0.86},
    {frame: hold ? 60 : 48, cx: 1040, cy: 320, zoom: hold ? 0.98 : 1.08},
    {frame: hold ? 60 : 120, cx: 1040, cy: 320, zoom: hold ? 0.98 : 1.08},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={MANAGER_CAPTURES.companion} keys={cameraKeys}>
        <ScreenMarker rect={MANAGER_RECTS.companionText} color="#2d77ee" opacity={marker * 0.82} />
        <ScreenMarker rect={MANAGER_RECTS.companionCopy} color="#e8a42c" opacity={marker} pulse />
      </ScreenshotCamera>
      <Caption top={82}>Сопроводительный текст · только копирование</Caption>
      <div style={{position: 'absolute', left: 96, top: 162, width: 330, color: '#122b4d', fontFamily: 'Arial, sans-serif', fontSize: 26, fontWeight: 700, lineHeight: 1.18, opacity: marker}}>готовый текст<br /><span style={{color: '#1668e8'}}>без автоотправки</span></div>
      {!hold ? <ProgressLine progress={marker} width={330} top={235} opacity={marker * 0.78} color="#e8a42c" /> : null}
    </AbsoluteFill>
  );
};
