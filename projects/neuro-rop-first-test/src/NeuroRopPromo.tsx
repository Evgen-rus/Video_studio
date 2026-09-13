import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {PageCam2D, CamKey2D} from './PageCam2D';
import {SHOTS, SFX_CUES, TOTAL_FRAMES} from './timeline';

const PAGE_H = 1080;
const BEFORE = 'textures/dashboard-before.png';
const AFTER = 'textures/dashboard-after.png';
const NAVY = '#122b4d';
const BLUE = '#1668e8';
const AMBER = '#e7a42b';

const BBOX = {
  attentionTab: {x: 259.01, y: 199.4, w: 188.69, h: 42},
  targetRow: {x: 123.6, y: 343.2, w: 1098.61, h: 107.6},
  quality: {x: 1275.61, y: 441.2, w: 552.17, h: 128},
  focus: {x: 1276.41, y: 776, w: 550.58, h: 228.9},
};

const center = (box: {x: number; y: number; w: number; h: number}) => ({x: box.x + box.w / 2, y: box.y + box.h / 2});
const ATTENTION_CENTER = center(BBOX.attentionTab);

const clamp = (frame: number, range: number[], values: number[], easing = Easing.bezier(0.33, 0, 0.15, 1)) => interpolate(frame, range, values, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

const PageLabel: React.FC<{children: React.ReactNode; left?: number; top?: number; color?: string; opacity?: number}> = ({children, left = 88, top = 86, color = NAVY, opacity = 1}) => (
  <div style={{position: 'absolute', left, top, color, fontFamily: 'Arial, sans-serif', fontSize: 22, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', opacity, textShadow: '0 1px 4px rgba(255,255,255,.55)'}}>{children}</div>
);

const Marker: React.FC<{box: {x: number; y: number; w: number; h: number}; color?: string; inset?: number; opacity?: number; radius?: number}> = ({box, color = AMBER, inset = -7, opacity = 1, radius = 14}) => (
  <div style={{position: 'absolute', left: box.x + inset, top: box.y + inset, width: box.w - inset * 2, height: box.h - inset * 2, border: `3px solid ${color}`, borderRadius: radius, boxShadow: `0 0 0 1px rgba(255,255,255,.8), 0 0 26px ${color}66`, opacity, pointerEvents: 'none'}} />
);

const DemoCursor: React.FC<{frame: number}> = ({frame}) => {
  const travel = clamp(frame, [0, 5], [0, 1], Easing.bezier(0.2, 0.8, 0.2, 1));
  const press = clamp(frame, [5, 7, 9], [1, 0.82, 1], Easing.inOut(Easing.quad));
  const opacity = 1 - clamp(frame, [10, 13], [0, 1]);
  return (
    <svg
      viewBox="0 0 36 44"
      style={{
        position: 'absolute',
        left: interpolate(travel, [0, 1], [1240, 950]),
        top: interpolate(travel, [0, 1], [350, 520]),
        width: 44,
        height: 54,
        scale: press,
        opacity,
        filter: 'drop-shadow(0 5px 8px rgba(12,36,68,.35))',
        zIndex: 20,
      }}
    >
      <path d="M3 2 31 25 19 27 25 40 17 43 11 29 3 37Z" fill="white" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
};

export const Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = clamp(frame, [0, 7], [0, 1]);
  return <AbsoluteFill style={{backgroundColor: '#eef3fa', opacity: fade}}><PageCam2D src={BEFORE} pageH={PAGE_H} keys={[{frame: 0, cx: 960, cy: 540, zoom: 1}, {frame: 20, cx: 960, cy: 540, zoom: 1.015}]} /></AbsoluteFill>;
};

export const Spotlight: React.FC = () => {
  const frame = useCurrentFrame();
  const camKeys: CamKey2D[] = [
    {frame: 0, cx: 960, cy: 540, zoom: 1, rotX: 0, rotY: 0, rotZ: 0, persp: 1400},
    {frame: 25, cx: 960, cy: 540, zoom: 1, rotX: 0, rotY: 0, rotZ: 0, persp: 1400},
    {frame: 43, cx: ATTENTION_CENTER.x - 12, cy: ATTENTION_CENTER.y, zoom: 2.15, rotX: 4, rotY: 10, rotZ: 1, persp: 1200},
    {frame: 66, cx: ATTENTION_CENTER.x - 12, cy: ATTENTION_CENTER.y, zoom: 2.15, rotX: 4, rotY: 10, rotZ: 1, persp: 1200},
  ];
  const spotX = clamp(frame, [2, 12, 22, 43], [27, 42, 20, 18.4], Easing.bezier(0.4, 0, 0.3, 1));
  const spotY = clamp(frame, [2, 12, 22, 43], [25, 34, 52, 20.4], Easing.bezier(0.4, 0, 0.3, 1));
  const spotOn = clamp(frame, [2, 10], [0, 1]);
  const pool = clamp(frame, [20, 32, 43], [620, 420, 315]);
  const vignette = clamp(frame, [22, 43], [0.05, 0.42]);
  const rise = clamp(frame, [30, 42], [0, 1], Easing.bezier(0.2, 1.25, 0.3, 1));
  const reseat = clamp(frame, [56, 66], [0, 1], Easing.bezier(0.4, 0, 0.3, 1.05));
  const lift = rise * (1 - reseat);
  const pulse = 0.82 + Math.sin(Math.max(0, frame - 42) / 9) * 0.18;
  const heroBox = BBOX.attentionTab;
  return (
    <AbsoluteFill style={{backgroundColor: '#eef3fa'}}>
      <PageCam2D src={BEFORE} pageH={PAGE_H} keys={camKeys} ease={Easing.bezier(0.35, 0, 0.2, 1)}>
        <div style={{position: 'absolute', left: heroBox.x - 4, top: heroBox.y - 4, width: heroBox.w + 8, height: heroBox.h + 8, borderRadius: 18, background: 'rgba(255,255,255,.45)', transform: `translateZ(${56 * lift}px) scale(${1 + .025 * lift})`, transformOrigin: 'center', boxShadow: `0 ${12 * lift}px ${28 + 28 * lift}px rgba(34,62,104,${.12 + .2 * lift})`, opacity: .9}}>
          <Marker box={{x: 4, y: 4, w: heroBox.w, h: heroBox.h}} color={AMBER} inset={-4} opacity={pulse} radius={18} />
        </div>
        {frame >= 36 ? <div style={{position: 'absolute', left: 70, top: 270, transform: `translateZ(${48 + 18 * lift}px) translateY(${(1 - rise) * 16}px)`, opacity: clamp(frame, [36, 44], [0, 1]) * (1 - clamp(frame, [59, 66], [0, 1])), color: NAVY, fontFamily: 'Arial, sans-serif', fontSize: 26, fontWeight: 700, lineHeight: 1.15, textAlign: 'right'}}>Фокус<br /><span style={{color: BLUE}}>на следующем шаге</span></div> : null}
      </PageCam2D>
      <AbsoluteFill style={{pointerEvents: 'none', opacity: spotOn, background: `radial-gradient(${pool}px ${pool * .72}px at ${spotX}% ${spotY}%, rgba(255,255,255,.36), rgba(255,255,255,.08) 46%, rgba(15,38,68,${vignette}) 100%)`}} />
      <PageLabel top={86} color={NAVY} opacity={clamp(frame, [10, 22], [0, .72])}>Портфель под контролем</PageLabel>
    </AbsoluteFill>
  );
};

export const Click: React.FC = () => {
  const frame = useCurrentFrame();
  const after = clamp(frame, [5, 11], [0, 1], Easing.bezier(0.2, 0.8, 0.2, 1));
  const keys: CamKey2D[] = [{frame: 0, cx: ATTENTION_CENTER.x - 12, cy: ATTENTION_CENTER.y, zoom: 2.15, rotX: 4, rotY: 10, rotZ: 1, persp: 1200}, {frame: 14, cx: ATTENTION_CENTER.x - 12, cy: ATTENTION_CENTER.y, zoom: 2.15, rotX: 4, rotY: 10, rotZ: 1, persp: 1200}];
  return (
    <AbsoluteFill style={{backgroundColor: '#eef3fa'}}>
      <AbsoluteFill style={{opacity: 1 - after}}><PageCam2D src={BEFORE} pageH={PAGE_H} keys={keys} /></AbsoluteFill>
      <AbsoluteFill style={{opacity: after}}><PageCam2D src={AFTER} pageH={PAGE_H} keys={keys} /></AbsoluteFill>
      {[0, 1].map((ring) => {
        const start = 5 + ring * 2;
        const t = clamp(frame, [start, start + 6], [0, 1], Easing.out(Easing.cubic));
        const r = 18 + t * (ring === 0 ? 70 : 105);
        return frame >= start && frame <= start + 6 ? <div key={ring} style={{position: 'absolute', left: 960 - r, top: 540 - r, width: r * 2, height: r * 2, border: `3px solid ${ring === 0 ? AMBER : BLUE}`, borderRadius: '50%', opacity: 1 - t, boxShadow: `0 0 20px ${ring === 0 ? AMBER : BLUE}88`, pointerEvents: 'none'}} /> : null;
      })}
      <DemoCursor frame={frame} />
      <PageLabel top={86} color={BLUE} opacity={clamp(frame, [4, 9], [0, 1])}>Требуют внимания · 1</PageLabel>
    </AbsoluteFill>
  );
};

export const Filter: React.FC = () => {
  const frame = useCurrentFrame();
  const ghost = clamp(frame, [0, 10], [1, 0], Easing.bezier(0.33, 0, 0.15, 1));
  const cam: CamKey2D[] = [
    {frame: 0, cx: 960, cy: 540, zoom: 1, rotX: 0, rotY: 0, rotZ: 0, persp: 1400},
    {frame: 22, cx: 700, cy: 395, zoom: 1.28, rotX: 2, rotY: 5, rotZ: 0, persp: 1300},
    {frame: 57, cx: 700, cy: 395, zoom: 1.28, rotX: 2, rotY: 5, rotZ: 0, persp: 1300},
  ];
  const sweepX = clamp(frame, [7, 27], [-120, 1920], Easing.bezier(0.25, 0.1, 0.25, 1));
  const targetFade = clamp(frame, [15, 24], [0, 1]);
  return (
    <AbsoluteFill style={{backgroundColor: '#eef3fa'}}>
      <PageCam2D src={AFTER} pageH={PAGE_H} keys={cam} />
      <AbsoluteFill style={{opacity: ghost}}><PageCam2D src={BEFORE} pageH={PAGE_H} keys={cam} bg="transparent" clipPath="inset(298px 660px 362px 94px)" /></AbsoluteFill>
      <div style={{position: 'absolute', left: sweepX - 26, top: 245, width: 52, height: 500, opacity: frame >= 7 && frame <= 29 ? .3 : 0, background: 'linear-gradient(90deg, transparent, rgba(22,104,232,.55), transparent)', filter: 'blur(12px)', pointerEvents: 'none'}} />
      <PageLabel left={104} top={260} color={BLUE} opacity={clamp(frame, [8, 17], [0, .9])}>Список сужается до одного фокуса</PageLabel>
      <AbsoluteFill style={{opacity: clamp(frame, [15, 24], [0, 1])}}><PageCam2D src={AFTER} pageH={PAGE_H} keys={cam}>
        <Marker box={BBOX.targetRow} color={BLUE} inset={-8} opacity={targetFade * (.78 + .22 * Math.sin(frame / 5))} radius={16} />
      </PageCam2D></AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Focus: React.FC = () => {
  const frame = useCurrentFrame();
  const cam: CamKey2D[] = [
    {frame: 0, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, rotZ: 0, persp: 1400},
    {frame: 20, cx: 1548, cy: 685, zoom: 1.2, rotX: 3, rotY: -5, rotZ: 0, persp: 1400},
    {frame: 63, cx: 1548, cy: 685, zoom: 1.2, rotX: 3, rotY: -5, rotZ: 0, persp: 1400},
  ];
  const markerOpacity = clamp(frame, [17, 28], [0, 1], Easing.bezier(0.25, 0.1, 0.25, 1));
  const labelOpacity = clamp(frame, [23, 34], [0, 1]);
  return (
    <AbsoluteFill style={{backgroundColor: '#eef3fa'}}>
      <PageCam2D src={AFTER} pageH={PAGE_H} keys={cam} ease={Easing.bezier(0.35, 0, 0.2, 1)}>
        <Marker box={BBOX.quality} color={BLUE} inset={-8} opacity={markerOpacity} radius={18} />
        <Marker box={BBOX.focus} color={AMBER} inset={-8} opacity={markerOpacity * .9} radius={18} />
      </PageCam2D>
      <div style={{position: 'absolute', left: 128, top: 100, width: 360, opacity: labelOpacity, color: NAVY, fontFamily: 'Arial, sans-serif', fontSize: 30, fontWeight: 700, lineHeight: 1.15}}>
        Контроль качества<br /><span style={{color: BLUE}}>и следующий шаг</span>
      </div>
      <div style={{position: 'absolute', left: 128, top: 182, width: 210, height: 2, background: BLUE, transformOrigin: 'left center', transform: `scaleX(${clamp(frame, [23, 34], [0, 1])})`, opacity: labelOpacity}} />
    </AbsoluteFill>
  );
};

export const Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = clamp(frame, [0, 12], [0, 1], Easing.bezier(0.2, 0.8, 0.2, 1));
  const line = clamp(frame, [7, 20], [0, 1], Easing.bezier(0.33, 0, 0.15, 1));
  return (
    <AbsoluteFill style={{backgroundColor: '#eef3fa', alignItems: 'center', justifyContent: 'center', color: NAVY}}>
      <div style={{opacity: inT, transform: `translateY(${(1 - inT) * 16}px)`, textAlign: 'center', fontFamily: 'Arial, sans-serif'}}>
        <div style={{fontSize: 112, lineHeight: 1, fontWeight: 800, letterSpacing: -4}}>Нейро<span style={{color: BLUE}}>РОП</span></div>
        <div style={{height: 4, width: 260, margin: '28px auto 24px', background: BLUE, transformOrigin: 'center', transform: `scaleX(${line})`, borderRadius: 4}} />
        <div style={{fontSize: 38, fontWeight: 500, letterSpacing: .6, opacity: .82}}>Фокус на следующем шаге.</div>
      </div>
    </AbsoluteFill>
  );
};

const Sound: React.FC = () => (
  <>
    {SFX_CUES.map((cue) => <Sequence key={cue.id} from={cue.from} durationInFrames={cue.duration}><Audio src={staticFile(cue.src)} volume={cue.volume} /></Sequence>)}
  </>
);

export const NeuroRopPromo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#eef3fa'}}>
    {SHOTS.map((shot) => {
      const component = shot.id === 'overview' ? <Overview /> : shot.id === 'spotlight' ? <Spotlight /> : shot.id === 'click' ? <Click /> : shot.id === 'filter' ? <Filter /> : shot.id === 'focus' ? <Focus /> : <Brand />;
      return <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration}>{component}</Sequence>;
    })}
    <Sound />
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 110px rgba(20,45,80,.08)'}} />
  </AbsoluteFill>
);

export const durationInFrames = TOTAL_FRAMES;
