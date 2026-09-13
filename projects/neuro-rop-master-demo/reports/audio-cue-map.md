# NeuroROP master — audio cue map

Дата: 2026-09-13  
Master: 3042 frames, 30 fps, nominal 101.40 s. Read-only map; no audio assets/code changed.

## Chapter layout

| Global frames | Time | Chapter | Audio intent |
|---:|---:|---|---|
| 0–1331 | 0.00–44.40 | РОП | UI clicks/filter locks for dashboard → attention → saved snapshots → control |
| 1332–1391 | 44.40–46.40 | Bridge | Manager role transition, light click |
| 1392–2471 | 46.40–82.40 | Менеджер | task open, confirmation, manual context, quick help, copy |
| 2472–2531 | 82.40–84.40 | Bridge | Руководитель role transition, light click |
| 2532–2801 | 84.40–93.40 | Руководитель | spend KPI and event-detail filter |
| 2802–2861 | 93.40–95.40 | Bridge | Outro/one-contour transition, light filter cue |
| 2862–3041 | 95.40–101.40 | Outro | role-card convergence and final wordmark |

## Current cues (global frame / time)

All cues are short `SfxLayer` one-shots; source files are `audio/sfx-click.mp3` or `audio/sfx-filter.mp3`. Volumes are intentionally low.

### РОП

- `cursor-kpi` 107 / 3.57s, click, 0.13
- `cursor-filter` 143 / 4.77s, click, 0.11
- `cursor-deal` 179 / 5.97s, click, 0.11
- `cursor-quality` 215 / 7.17s, click, 0.12
- `spotlight-lock` 314 / 10.47s, filter, 0.10
- `timeline-stop` 608 / 20.27s, filter, 0.09
- `daily-hidden-cut` 775 / 25.83s, filter, 0.10
- `control-focus` 1092 / 36.40s, click, 0.10

### Manager

Global offset 1392 frames (46.40s):

- `open-demo-deal` 1530 / 51.00s, click, 0.12
- `confirm-situation` 1740 / 58.00s, filter, 0.09
- `add-context` 1916 / 63.87s, click, 0.10 — manual text/voice context UI, not auto-submit
- `quick-help` 2096 / 69.87s, filter, 0.11
- `copy-text` 2340 / 78.00s, click, 0.08 — copy action only; no send cue

### Руководитель

Global offset 2532 frames (84.40s):

- `spend-kpi` 2611 / 87.03s, click, 0.08
- `event-detail` 2743 / 91.43s, filter, 0.08

### Bridges and outro

- `manager-bridge` 1354 / 45.13s, click, 0.07
- `admin-bridge` 2494 / 83.13s, click, 0.07
- `outro-bridge` 2824 / 94.13s, filter, 0.06
- `outro-converge` local frame 76, global 2938 / 97.93s, filter, 0.07

## BGM requirements for a future music pass

Current master is SFX-only; no BGM/music import or track is present. If BGM is later requested, use one low-level, edit-friendly bed with clean intro/outro and duck it under UI cues and spoken/product copy. Keep bridges and final wordmark free of masking transients; do not imply live CRM/AI activity through notification-heavy music.

FINDINGS: Cue coverage matches visible role transitions and UI actions; manual-context and copy-only semantics have distinct cues; no BGM exists.  
CHANGES: none.  
FILES: report only.  
RISKS: future BGM must be ducked around UI cues and final copy; current MP4 audio is AAC mux output despite SFX-only source design.  
VERIFICATION: inspected `src/rop/timeline.ts`, `src/manager/timeline.ts`, `src/admin/timeline.ts`, `src/master/timeline.ts`, `src/outro/Outro.tsx`; frame/time positions calculated at 30 fps.
