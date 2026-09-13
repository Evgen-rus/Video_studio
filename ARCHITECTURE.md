# Video Studio — карта проекта

## Назначение

Изолированное рабочее пространство для создания продуктовых видео кодом через Remotion и агентные skills.

## Карта

- `.agents/skills/` — project-local skills/adapters. Заполняется `SETUP.bat`.
- `.vendor/video-shotcraft/` — полный локальный checkout video-shotcraft; Git игнорирует его, версия фиксируется в `skills-lock.json`.
- `projects/<name>/` — отдельный исходный Remotion-проект каждого ролика.
- `assets/` — общие разрешённые ассеты.
- `assets/private/` — локальные приватные материалы; Git игнорирует содержимое.
- `references/` — референсы и согласованные storyboard/design notes.
- `renders/` — итоговые тяжёлые видео; бинарники игнорируются Git.
- `reports/` — setup/check/QA отчёты; текстовые отчёты можно коммитить.
- `tools/remotion-smoke/` — минимальная техническая проверка Remotion.
- `Docs/agent_workflow.md` — model routing, delegation и handoff.
- `skills-lock.json` — создаётся SETUP и фиксирует источники/commit SHA skills.

## Критические инварианты

1. Рабочие продуктовые репозитории по умолчанию read-only.
2. Video Studio не меняет глобальные Codex skills/settings.
3. Ponytail — внешняя глобальная возможность, а не зависимость проекта.
4. Реальный UI продукта показывать через реальные/санитизированные screenshots или recordings; не выдумывать продуктовые возможности.
5. Не переносить в видео реальные клиентские/CRM/секретные данные.
6. Каждый ролик живёт в `projects/<video-name>/`; не складывать production-код роликов в корень.
7. Финальная приёмка требует render/visual QA, а не только успешного TypeScript build.
8. Большие логи, shot-card каталоги и полный product-repo context не тащить в lead без необходимости.
9. Git не инициализируется автоматически.

## Где менять

| Нужно | Место |
| --- | --- |
| Правила работы Codex | `AGENTS.md` |
| Model routing / delegation | `Docs/agent_workflow.md` |
| Setup skills/окружения | `scripts/setup.ps1` |
| Диагностика | `scripts/check.ps1` |
| Smoke Remotion | `tools/remotion-smoke/` |
| Конкретный ролик | `projects/<video-name>/` |
| Визуальные референсы | `references/` |
