# Агент: Video Studio

Изолированная лаборатория для продуктовых промо-роликов на Remotion. Основной творческий skill — `video-shotcraft`; технические правила Remotion — в project-local skills `.agents/skills/`.

## Начало работы

- Начни с `git status --short`, только если Git уже инициализирован пользователем. Сам `git init` не выполняй.
- Прочитай этот файл → `ARCHITECTURE.md` → только релевантный раздел `Docs/agent_workflow.md`.
- Для конкретного видео читай только его `projects/<name>/`, нужные assets/references и необходимые skill-файлы.
- Не сканируй целиком `video-shotcraft`, все shot cards или исходный продуктовый репозиторий без причины.

## Skills и приоритет

Для продуктового промо:
1. Требования пользователя.
2. Этот `AGENTS.md` и критические инварианты проекта.
3. `.agents/skills/video-shotcraft/SKILL.md` — project-local adapter; затем canonical `.vendor/video-shotcraft/SKILL.md` — creative/product-video workflow.
4. Релевантный Remotion skill — техническая реализация.
5. Ponytail — только принцип минимальной достаточной реализации, если он глобально доступен.

Если skill не виден в Codex picker, но файл существует локально, не устанавливай его глобально. Прочитай `.agents/skills/<skill>/SKILL.md` напрямую и сообщи о проблеме discovery. Для `video-shotcraft` adapter затем обязан открыть `.vendor/video-shotcraft/SKILL.md`.

### video-shotcraft

Используй для:
- полного продуктового promo;
- storyboard/shot selection;
- camera/motion/timing/SFX;
- реальных screenshot-driven продуктовых сцен;
- template/free/guided workflow.

Не читай все 157+ shot cards в lead-контекст. Подбор большого множества карточек делегируй read-only scout/worker; lead получает короткий shortlist с точными путями.

### Remotion skills

- `remotion-best-practices` — общие технические правила;
- `remotion-create` — создание композиции/проекта;
- `remotion-markup` — React/Remotion markup и animation;
- `remotion-studio` — preview;
- `remotion-render` — render;
- `remotion-docs` — актуальная документация;
- `remotion-interactivity` — редактируемые элементы Studio.

## Ponytail

Ponytail уже может быть установлен глобально. Этот проект его не устанавливает и не настраивает.

Разрешено:
- YAGNI;
- переиспользование существующих компонентов;
- отказ от лишней абстракции;
- `ponytail-review`, когда реализация явно разрастается или пользователь просит review.

Не используй Ponytail как основание:
- пропустить обязательный этап video-shotcraft;
- урезать storyboard/visual QA;
- убрать render-проверку;
- проигнорировать accessibility/safety/data sanitization;
- заменить качественный motion shortcut-решением;
- самостоятельно менять глобальный Ponytail mode.

Если глобальный Ponytail отключён, продолжай без него.

## Orchestration

Главная цель — минимальная суммарная стоимость качественно принятого ролика.

- **Lead / orchestrator:** выбранный пользователем `gpt-5.6-sol`, `medium`. Понимание задачи, creative direction, декомпозиция, выбор контекста/workers, интеграция и финальная приёмка.
- **Luna Low worker:** `gpt-5.6-luna`, low. Asset inventory, простое исследование, факты, логи, проверки, рутинные правки.
- **Luna Max worker:** `gpt-5.6-luna`, max. Основная bounded Remotion-реализация, сложная сцена, локальный debugging, motion/timing implementation.
- **code_mapper:** Luna Medium, read-only. Большой product repo, поиск UI routes/components/styles, call/source mapping; не редактирует и не принимает creative/business решения.

Это routing policy, а не утверждение, что конкретный runtime всегда позволяет выбрать эти IDs/efforts. Проверяй доступность. Недоступную модель не подменяй молча более дорогой.

По умолчанию один lead и до 2 workers одновременно; максимум 1 Luna Max. Третий worker — только для реально независимой области и явной экономии.

Дополнительный Sol/Astra lead по умолчанию не создавать.

## Context Efficiency

Lead не должен:
- читать весь `.vendor/video-shotcraft`;
- читать все shot cards;
- читать полный source repo продукта;
- ждать/переваривать длинный npm/render log;
- перечитывать успешные проверки без изменений.

Делегируй:
- широкий поиск по product repo → `code_mapper`;
- каталог shot cards / подбор вариантов → Luna Low read-only;
- основную ограниченную Remotion-реализацию → Luna Max;
- render/test/log triage → Luna Low.

После scout lead самостоятельно читает только оригинальные source ranges / exact shot cards, которые реально влияют на решение.

## Source product policy

- Исходный продуктовый репозиторий по умолчанию read-only.
- Не модифицируй его ради видео без явного разрешения.
- Для показа настоящего продукта предпочитай реальные screenshots/recordings.
- Перед capture исключи реальные CRM-контакты, секреты, токены, приватные логи и клиентские данные.
- Если безопасный demo-state отсутствует, используй явно фиктивные/санитизированные данные.

## Производственный цикл

1. Понять цель, аудиторию, длительность, формат и source material.
2. Минимально и read-only исследовать продукт.
3. Определить режим video-shotcraft.
4. Зафиксировать creative direction / storyboard в `references/` или внутри video project.
5. Реализовать в `projects/<video-name>/`.
6. Targeted checks.
7. Рендер ключевых кадров/коротких участков.
8. Исправить визуальные/тайминговые проблемы.
9. Полный render.
10. Финальная визуальная приёмка и короткий handoff.

Успешный TypeScript build не равен готовому ролику.

## Handoff workers

Коротко, без chain-of-thought:

```text
FINDINGS: факты/решения + path:line или точные asset/shot-card пути
CHANGES: что изменено или none
FILES: затронутые файлы
RISKS: ограничения/неясности или none
VERIFICATION: команды, результат, render/frame paths; пропуски и причины
```

## Завершение

Lead проверяет:
- scope/diff;
- ключевые исходные материалы;
- несколько репрезентативных rendered frames;
- итоговый render/report;
- отсутствие секретов/приватных данных;
- что product repo не был изменён без разрешения.

Непроверенный результат не называй завершённым.
