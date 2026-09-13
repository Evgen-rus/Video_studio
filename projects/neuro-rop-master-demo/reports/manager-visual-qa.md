# Manager chapter — visual QA

Дата: 2026-09-13  
Scope: `NeuroRopManager`, supplied QA stills, read-only review.

## Verdict

Условно принимается. Causal chain читается как `роль менеджера → мои задачи → подтверждение текущей ситуации → ручное дополнение (текст/голос) → AI next-step/quick help → сопроводительный текст только для копирования`.

## Findings

- `manager-role.png`: clean role transition; «Для менеджера» and subtitle are legible.
- `manager-tasks.png`: camera crop clearly lands on overdue “Пилот — Север” task and highlights it; DEMO identifiers visible.
- `manager-confirmed.png`: before/after transition is understandable; green «ситуация подтверждена» and right-side confirmation state are visible. The overlay is large but does not hide the key confirmation card.
- `manager-context.png`: strongest evidence for manual semantics. Modal visibly says «ручной дополнительный контекст», provides text area plus separate «Короткая голосовая заметка» / «Говорить» control, and shows explicit submit action «Пересобрать ситуацию». No auto-submit is implied.
- `manager-quick-help.png`: next-step recommendation is readable: «Понял ситуацию», concrete choice, message to client, fallback, and CRM comment action. **P2:** the oversized “Фокус на следующем шаге” overlay crosses the message panel and competes with the product UI; shorten/reposition only if final master needs maximum UI legibility.
- `manager-companion.png`: excellent no-auto-send proof: title «Сопроводительный текст · только копирование», subtitle «без автоотправки», and visible «Скопировать» button. No send button is presented as completed action.
- `manager-hold.png`: final hold preserves the copy-only label and visible copy action, but UI is smaller than `manager-companion.png`; acceptable as a hold, not as the primary explanatory still.
- No invented Manager UI detected in supplied captures; all surfaces match the capture pack’s DEMO manager states. No ROP/Admin surfaces appear in the chapter stills.

## Source/timing check

- `src/manager/timeline.ts`: 1080 frames / 36 s; role 0–120, tasks 120–300, confirmed 300–450, context 450–630, quick-help 630–900, companion 900–1020, hold 1020–1080.
- SFX are placed at context `524`, quick-help `704`, and no sound cue is attached to a send/auto-send action. This supports manual-context and copy-only semantics.

## Changes

None. Read-only review; no code modified.

## Risks

- P2: quick-help title overlay reduces readable area over the message panel.
- P3: `manager-hold.png` is visually small; use `manager-companion.png` for primary proof of copy-only behavior.

## Verification

- Reviewed: `out/qa/manager-role.png`, `manager-tasks.png`, `manager-confirmed.png`, `manager-context.png`, `manager-quick-help.png`, `manager-companion.png`, `manager-hold.png`.
- Reviewed source: `src/manager/timeline.ts`, `src/manager/ManagerScenes.tsx`, `src/manager/ManagerChapter.tsx`, `src/manager/assets.ts`.
- `out/manager-preview.mp4` exists (2,056,819 bytes); still-based QA was used for detailed visual inspection.

FINDINGS: Causal chain and manual/copy-only semantics are clear; one P2 overlay readability risk in quick-help, one P3 small final hold.  
CHANGES: none.  
FILES: report only.  
RISKS: oversized quick-help overlay may compete with UI at motion frames; hold is secondary evidence.  
VERIFICATION: seven QA stills reviewed; source timing/SFX checked; preview MP4 presence confirmed.
