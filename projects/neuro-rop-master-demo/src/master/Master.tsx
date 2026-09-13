import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {NeuroRopAdmin, ADMIN_CHAPTER_FRAMES} from '../admin/AdminChapter';
import {NeuroRopManager, MANAGER_CHAPTER_FRAMES} from '../manager/ManagerChapter';
import {NeuroRopOutro, OUTRO_FRAMES} from '../outro/OutroChapter';
import {RopChapter, ROP_CHAPTER_FRAMES} from '../rop/RopChapter';
import {SfxLayer} from '../shared/SfxLayer';
import {MasterRoleBridge} from './MasterRoleBridge';
import {MASTER_BRIDGE_FRAMES, MASTER_SFX} from './timeline';

export const MASTER_CHAPTER_FRAMES = ROP_CHAPTER_FRAMES + MASTER_BRIDGE_FRAMES + MANAGER_CHAPTER_FRAMES + MASTER_BRIDGE_FRAMES + ADMIN_CHAPTER_FRAMES + MASTER_BRIDGE_FRAMES + OUTRO_FRAMES;

export const NeuroRopMaster: React.FC = () => {
  const managerBridge = ROP_CHAPTER_FRAMES;
  const manager = managerBridge + MASTER_BRIDGE_FRAMES;
  const adminBridge = manager + MANAGER_CHAPTER_FRAMES;
  const admin = adminBridge + MASTER_BRIDGE_FRAMES;
  const outroBridge = admin + ADMIN_CHAPTER_FRAMES;

  return (
    <AbsoluteFill style={{backgroundColor: '#edf2f8'}}>
      <Sequence from={0} durationInFrames={ROP_CHAPTER_FRAMES}><RopChapter /></Sequence>
      <Sequence from={managerBridge} durationInFrames={MASTER_BRIDGE_FRAMES}>
        <MasterRoleBridge src="screens/05-manager-tasks-before.jpg" title="Для менеджера" subtitle="ситуация · следующий шаг · дожим" />
      </Sequence>
      <Sequence from={manager} durationInFrames={MANAGER_CHAPTER_FRAMES}><NeuroRopManager /></Sequence>
      <Sequence from={adminBridge} durationInFrames={MASTER_BRIDGE_FRAMES}>
        <MasterRoleBridge src="screens/11-admin-ai-spend.jpg" title="Для руководителя" subtitle="расходы AI · проверяемые сигналы" />
      </Sequence>
      <Sequence from={admin} durationInFrames={ADMIN_CHAPTER_FRAMES}><NeuroRopAdmin /></Sequence>
      <Sequence from={outroBridge} durationInFrames={MASTER_BRIDGE_FRAMES}>
        <MasterRoleBridge src="screens/01-rop-dashboard.jpg" title="Один контур" subtitle="роль · решение · контроль" />
      </Sequence>
      <Sequence from={outroBridge + MASTER_BRIDGE_FRAMES} durationInFrames={OUTRO_FRAMES}><NeuroRopOutro /></Sequence>
      <SfxLayer cues={MASTER_SFX} />
      <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 110px rgba(18,43,77,.08)'}} />
    </AbsoluteFill>
  );
};
