import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Caption, ProgressLine, ScreenMarker} from '../shared/Overlays';
import {ScreenshotCamera} from '../shared/ScreenCamera';
import {ADMIN_CAPTURES, ADMIN_RECTS} from './assets';

export const AdminSpendScene: React.FC = () => {
  const frame = useCurrentFrame();
  const marker = interpolate(frame, [24, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const cameraKeys = [
    {frame: 0, cx: 960, cy: 540, zoom: 0.82},
    {frame: 36, cx: 960, cy: 540, zoom: 0.82},
    {frame: 78, cx: 960, cy: 430, zoom: 0.98},
    {frame: 120, cx: 960, cy: 430, zoom: 0.98},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={ADMIN_CAPTURES.spend} keys={cameraKeys}>
        <ScreenMarker rect={ADMIN_RECTS.spendToday} color="#2d77ee" opacity={marker} pulse />
        <ScreenMarker rect={ADMIN_RECTS.spendOperations} color="#e8a42c" opacity={marker * 0.78} />
        <ScreenMarker rect={ADMIN_RECTS.spendJournalRow} color="#2d77ee" opacity={Math.max(0, marker - 0.25) * 0.7} />
      </ScreenshotCamera>
      <Caption top={82}>Расходы AI</Caption>
      <div style={{position: 'absolute', left: 96, top: 160, color: '#122b4d', fontFamily: 'Arial, sans-serif', fontSize: 26, fontWeight: 700, lineHeight: 1.16, opacity: marker}}>проверяемые сигналы<br /><span style={{color: '#1668e8'}}>по вызовам и моделям</span></div>
      <ProgressLine progress={marker} width={330} top={230} opacity={marker * 0.74} />
    </AbsoluteFill>
  );
};

export const AdminEventScene: React.FC = () => {
  const frame = useCurrentFrame();
  const marker = interpolate(frame, [28, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const cameraKeys = [
    {frame: 0, cx: 960, cy: 540, zoom: 0.84},
    {frame: 38, cx: 960, cy: 730, zoom: 0.96},
    {frame: 105, cx: 960, cy: 820, zoom: 1.08, rotX: 1, rotY: -2, rotZ: 0, perspective: 1400},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <ScreenshotCamera src={ADMIN_CAPTURES.event} keys={cameraKeys}>
        <ScreenMarker rect={ADMIN_RECTS.eventDetails} color="#e8a42c" opacity={marker} pulse />
      </ScreenshotCamera>
      <Caption top={82}>Детализация вызова</Caption>
      <div style={{position: 'absolute', left: 96, top: 160, color: '#122b4d', fontFamily: 'Arial, sans-serif', fontSize: 26, fontWeight: 700, lineHeight: 1.16, opacity: marker}}>одна фиктивная запись<br /><span style={{color: '#1668e8'}}>с прозрачными токенами</span></div>
      <ProgressLine progress={marker} width={330} top={230} opacity={marker * 0.74} color="#e8a42c" />
    </AbsoluteFill>
  );
};
