# Capture pack

Start locally with `python mock_server.py`, then use a 1920×1080 viewport. The
frame index and purpose are documented in `CAPTURE_PACK.md`; `contact-sheet.html`
is the visual storyboard preview:

- `http://127.0.0.1:4173/?role=rop&view=dashboard&state=before` — ROP dashboard
- `http://127.0.0.1:4173/?role=rop&view=dashboard&state=after` — attention deal
- `http://127.0.0.1:4173/?role=manager&view=manager&state=before` — manager workspace
- `http://127.0.0.1:4173/?role=manager&view=manager&state=after` — confirmed/refined state
- `http://127.0.0.1:4173/?role=rop&view=daily&state=before` — daily control (15:45)
- `http://127.0.0.1:4173/?role=rop&view=daily&state=after` — day-end (23:00)
- `http://127.0.0.1:4173/?role=admin&view=spend` — AI spend KPIs and journal

All responses are fixed fictional DEMO data; no external calls are made.
