# Project-local Skills

`SETUP.bat` заполняет `.agents/skills/`.

Ожидаемый набор:

| Skill | Назначение |
| --- | --- |
| `video-shotcraft` | Project-local adapter → canonical `.vendor/video-shotcraft` product promo workflow |
| `remotion-best-practices` | Общие правила Remotion |
| `remotion-create` | Создание Remotion composition/project |
| `remotion-markup` | React/Remotion markup + animation |
| `remotion-studio` | Preview/Studio |
| `remotion-render` | Render |
| `remotion-docs` | Актуальная документация |
| `remotion-interactivity` | Editable Studio elements |

Источники и commit SHA после установки записываются в `skills-lock.json`.

Если Codex Desktop не показывает локальный skill в picker, не копируй его глобально автоматически. Сначала проверь наличие `.agents/skills/<skill>/SKILL.md` и попроси Codex прочитать файл напрямую.

Полный `video-shotcraft` намеренно не коммитится в этот репозиторий: upstream большой. Для аудита используй `skills-lock.json` и публичный upstream commit.
