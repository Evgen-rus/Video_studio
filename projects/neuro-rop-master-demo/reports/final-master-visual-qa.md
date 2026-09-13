# NeuroROP master — final visual QA

Дата: 2026-09-13  
Scope: `out/neuro-rop-master-demo.mp4` and `out/qa/master-*.png`; read-only.

## Verdict

Visual content is coherent and sanitized. The previously reported duration mismatch is resolved: current source composition and delivered MP4 both contain 3042 video frames at 30 fps (101.40 s nominal).

## Findings

- **Resolved:** current `src/rop/timeline.ts` sets `ROP_CHAPTER_FRAMES = 1332`; `Master.tsx` therefore computes `1332 + 60 + 1080 + 60 + 270 + 60 + 180 = 3042` frames. `npm.cmd run list` and `ffprobe` both confirm 3042 frames at 30 fps. The 101.461333 s container duration is consistent with the 101.40 s nominal frame duration plus mux/audio timing metadata; no P1 remains.
- Chapter bridges are visually present: ROP → Manager, Manager → Руководитель, and admin → Outro. `master-outro-role-cards.png` clearly shows three labeled role cards; `master-outro-final.png` has exact final copy: «Контроль для РОПа. Следующий шаг для менеджера.» / «Работа команды — в одном контуре.»
- ROP causal chain is legible in `master-rop-attention`, `master-rop-daily`, and `master-rop-control`: dashboard/attention → saved 15:45 snapshot → ROP control.
- Manager proof is legible in `master-manager-tasks`, `master-manager-quick-help`, and `master-manager-companion`; companion explicitly states «только копирование» and «без автоотправки». No send completion is implied.
- Admin frames show fictional spend and transparent token detail. Labels use `Демо-модель`, `DEMO` deal data, and no real contacts/secrets.
- **P2 readability:** quick-help uses a large title overlay crossing the message panel; message remains readable but the overlay competes with UI. Outro role cards are intentionally small in the convergence frame, while labels remain legible.
- **P3:** `master-outro-cards.png` is a transition state with small UI thumbnails; use the final hold for exact-copy/product proof.
- No BGM/music asset is wired in source. Audio components are `SfxLayer` cues only (click/filter), including master bridges and outro.

## Source/timing check

- Master chapter: ROP 1332, bridge 60, Manager 1080, bridge 60, Admin 270, bridge 60, Outro 180.
- Master SFX only: `manager-bridge`, `admin-bridge`, `outro-bridge`; chapter-local SFX remain click/filter cues. No BGM import or music track found.

## Changes

None. Read-only QA; no code modified.

## Risks

- No current P1 technical risk. P2 quick-help overlay can reduce UI readability during motion.

## Verification

- `ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate,nb_frames,codec_name ...` → video 1920×1080, 30 fps, 3042 frames, 101.461333 s; audio AAC present.
- Reviewed all available master stills: `master-rop-attention`, `master-rop-daily`, `master-rop-control`, `master-manager-tasks`, `master-manager-quick-help`, `master-manager-companion`, `master-admin-spend`, `master-admin-event`, `master-outro-cards`, `master-outro-role-cards`, `master-outro-final`.
- Reviewed `src/master/Master.tsx`, `src/master/timeline.ts`, `src/outro/Outro.tsx`; no BGM path found.

FINDINGS: Visual chain, bridges, exact outro copy, copy-only semantics, sanitization, and SFX-only design pass. Previous duration P1 is resolved; remaining issue is P2 quick-help overlay competition.  
CHANGES: none.  
FILES: report only.  
RISKS: no technical duration risk in current source/artifact; P2 quick-help overlay remains.  
VERIFICATION: `npm.cmd run list` and ffprobe both confirm 3042 frames / 30 fps / 1920×1080; 11 representative stills reviewed.
