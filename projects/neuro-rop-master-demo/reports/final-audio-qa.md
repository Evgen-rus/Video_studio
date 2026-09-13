# Final audio pass — QA

Дата: 2026-09-13  
Scope: final BGM+SFX MP4, no-BGM comparison artifact, source `BgmLayer`/timelines; read-only.

## Verdict

Pass. Final audio contains BGM plus SFX, stays well below clipping, and source-level fade/ducking is present. No P1/P2 audio issue found.

## Measured values

| Artifact | Video | Audio | Duration |
|---|---|---|---:|
| `neuro-rop-master-demo-final.mp4` | H.264, 1920×1080, 30 fps, 3042 frames, 1,967,664 bps | AAC stereo, 48 kHz, 317,375 bps | 101.461333 s |
| `neuro-rop-master-demo-no-bgm.mp4` | H.264, 1920×1080, 30 fps, 3042 frames, 1,967,535 bps | AAC stereo, 48 kHz, 317,375 bps | 101.461333 s |

`ffmpeg -af volumedetect`:

- Final BGM+SFX: mean `-34.4 dB`, max `-17.6 dB`.
- No-BGM: mean `-48.6 dB`, max `-19.5 dB`.
- Both have ample peak headroom; no clipping detected by peak measurement.
- Final audio has only an initial silence interval at `0.000–0.183021 s` at the tested `-55 dB / 0.15 s` threshold; no abrupt full-track silence was detected after start.

## Source checks

- `BgmLayer` uses `audio/neuro-rop-bgm.mp3`, base volume `0.12`, fade-in `45` frames (1.50 s), fade-out `72` frames (2.40 s).
- Ducking is applied around every `MASTER_BGM_CUE_FRAMES` cue: `[cue−20, cue−8, cue+12, cue+28]`, with minimum level `0.78` (22% reduction) before recovery.
- Cue list covers Quick Help `2096 / 69.87 s`, Admin transition/action cues `2494 / 83.13 s`, `2611 / 87.03 s`, `2743 / 91.43 s`, and Outro cues `2824 / 94.13 s`, `2938 / 97.93 s`.
- SFX remain low-volume click/filter one-shots; no send/auto-send cue exists. The `reports/audio-cue-map.md` positions match the current 3042-frame master.

## Findings / risks

- P1: none.
- P2: none. No pumping or abrupt cue behavior was evidenced by source envelope: ducking is shallow (0.78) and returns over 16 frames (0.53 s).
- P3: AAC container audio duration/metadata is `101.461333 s` versus nominal 101.40 s; identical in final and no-BGM artifacts, with matching 3042 video frames. This is mux timing, not a content mismatch.

FINDINGS: BGM+SFX pass is technically safe and secondary to UI; fades and cue ducking are implemented; Quick Help/Admin/Outro cues are covered; no-BGM artifact keeps identical video geometry/timing.  
CHANGES: none.  
FILES: report only.  
RISKS: no material audio risk; future loudness target can be tuned only if a delivery platform requires one.

## Verification

- `ffprobe` on both MP4s: 1920×1080, 30 fps, 3042 frames, AAC stereo 48 kHz.
- `ffmpeg -af volumedetect` on both audio streams: exact mean/max values above.
- `ffmpeg -af silencedetect=noise=-55dB:d=0.15` on final: initial silence only, ending not flagged.
- Inspected `src/shared/BgmLayer.tsx`, `src/master/timeline.ts`, chapter timelines, `Master.tsx`, and `reports/audio-cue-map.md`.
