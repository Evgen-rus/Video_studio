# Neuro ROP master demo — capture pack

`mock_server.py` serves the existing built frontend with a fixed, local-only
fictional API. It never starts the product backend, CRM, Bitrix, or AI calls.

The checked pack contains 12 key frames:

1. `screens/01-rop-dashboard.jpg` — ROP dashboard, all DEMO deals.
2. `screens/02-rop-attention.jpg` — attention-filtered DEMO deal.
3. `screens/03-rop-daily-1545.jpg` — saved 15:45 daily-control snapshot.
4. `screens/04-rop-daily-2300.jpg` — saved 23:00 daily-control snapshot.
5. `screens/05-manager-tasks-before.jpg` — manager tasks before confirmation.
6. `screens/06-manager-confirmed-after.jpg` — manager situation confirmed.
7. `screens/07-manager-add-context.jpg` — manual context entry state.
8. `screens/08-manager-quick-help.jpg` — ready next-step recommendation.
9. `screens/09-manager-companion.jpg` — copyable companion text.
10. `screens/10-rop-control.jpg` — ROP control view.
11. `screens/11-admin-ai-spend.jpg` — AI spend KPIs and journal.
12. `screens/12-admin-event-detail.jpg` — fictional spend event detail.

Use `?state=after` for the attention-filtered dashboard. `auth/me?role=rop`,
`?role=manager`, and `?role=admin` provide role fixtures. The visual preview is
`contact-sheet.html`; the scene mapping and sanitization checks are in
`CAPTURE_PACK.md`.

All identifiers, people, deals, events, costs, and text are prefixed or
explicitly marked `DEMO`; no real customer data is present.
