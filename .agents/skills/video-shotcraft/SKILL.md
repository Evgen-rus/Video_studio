---
name: video-shotcraft
description: Project-local adapter for the full video-shotcraft production skill stored in .vendor/video-shotcraft. Use for cinematic product promos, shot-card selection, Remotion product videos, camera/motion/timing/SFX, or when the user explicitly asks for video-shotcraft.
---

# video-shotcraft — local adapter

The canonical full skill is installed locally at:

`.vendor/video-shotcraft/SKILL.md`

When this skill is invoked:

1. Read `.vendor/video-shotcraft/SKILL.md` first.
2. Treat `.vendor/video-shotcraft/` as the canonical skill root for all relative references, shot cards, demos, templates, assets and workbench files.
3. Follow the canonical skill workflow rather than this adapter.
4. Do not copy or install the skill globally.
5. If `.vendor/video-shotcraft/SKILL.md` is missing, stop and tell the user to run `SETUP.bat`.

The vendor checkout is intentionally Git-ignored because the upstream repository is large. Its exact source commit is recorded in `skills-lock.json`, so the installed version remains auditable.
