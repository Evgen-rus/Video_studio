# ROP-only preview — visual QA

Дата: 2026-09-13  
Scope: `RopChapterPreview`, 1920×1080, frames in `out/qa/`; no TSX changes.

## Verdict

Условно принимается для ROP-only preview. После reorder основная история читается как `Dashboard/cursor → Требуют внимания → сохранённые срезы → контроль РОП`; в кадрах нет Manager/Admin поверхностей. Daily-control теперь имеет отдельный читаемый hold.

## Findings

- **P2 readability:** `out/qa/frame-600.png` (timeline travel) всё ещё показывает карточку среза 15:45 мелко. Label `15:45` читаем, но UI внутри карточки — только contextual texture. Это допустимо, потому что following daily-control hold раскрывает snapshot.
- **P2 transition:** `out/qa/frame-820.png` использует заметный directional blur во время hidden cut между 15:45 и 23:00. Это работает как монтажный переход, а новый `frame-900` даёт достаточно долгий и крупный readable hold на 23:00; blur не остаётся единственным доказательством смены state.
- `frame-150` показывает общий dashboard, `frame-300` — attention spotlight; reorder теперь не путает стартовый dashboard с attention state. Label `Требуют внимания · 1` и spotlight поддерживают причинную связь.
- `frame-400` даёт читаемый camera path по dashboard: KPI/filter → deal row → right-side quality/focus area. Cursor stops соответствуют объектам внимания.
- `frame-1080` показывает ROP control surface с задачами/фокусом и без manager/admin навигации; markers и overlay не закрывают ключевую правую панель.
- `frame-1320` — безопасный ROP close; фоновый control UI приглушён, текст «Фокус на следующем шаге» читается.
- ROP timeline explicitly labels saved snapshots (`15:45`, `23:00`) and says `Сохранённые срезы, а не live-анализ`; daily scene has an explicit top-right time label and hidden cut at frame 103.
- SFX cues exist for spotlight lock, cursor stops, timeline stop, hidden cut, and control focus. No visual evidence of over-triggering from source timing.
- Capture pack is sanitized: DEMO identifiers, fictional deals/people, 0 ₽; no Manager/Admin scenes are imported by ROP chapter assets.

## Source/timing check

- `src/rop/timeline.ts`: 46 s / 1380 frames; cursor tour 120–300, spotlight 300–540, timeline 540–720, daily control 720–990, ROP control 990–1290, close 1290–1380.
- `src/rop/RopScenes.tsx`: camera and cursor stops are aligned to dashboard KPI/filter/deal/right-side focus; daily label switches exactly at cut 103; ROP control markers appear from frame 44 and focus at frame 150.

## Changes

None. No blocking typo found.

## Verification

- `npm run build` in `projects/neuro-rop-master-demo` — passed; `RopChapterPreview`, 1920×1080, 1380 frames.
- Reviewed fresh: `out/qa/frame-40.png`, `frame-150.png`, `frame-300.png`, `frame-400.png`, `frame-600.png`, `frame-820.png`, `frame-900.png`, `frame-1080.png`, `frame-1320.png`.
- Reviewed source: `src/rop/RopScenes.tsx`, `src/rop/timeline.ts`, `src/shared/ScreenCamera.tsx`, capture manifests.

## Handoff

FINDINGS: Reordered ROP-only causal chain is visually coherent; remaining risks are P2 small timeline card at frame 600 and P2 heavy-but-readable transition blur at frame 820.  
CHANGES: none.  
FILES: report only.  
RISKS: timeline card remains contextual rather than UI-readable; daily hold compensates.  
VERIFICATION: `npm run build` passed after reorder; fresh representative still review completed, including readable `frame-900` 23:00 hold.
