# Video Studio

Отдельная локальная лаборатория для продуктовых промо-роликов через **Codex + Remotion + video-shotcraft**.

Проект специально изолирован от рабочих репозиториев. Он не должен менять `Neuro_rop_practice`, LeadRecord или другие продукты.

## Первый запуск

1. Распакуй папку в удобное место, например `D:\Projects\video-studio`.
2. Запусти `SETUP.bat`.
3. Дождись завершения.
4. Открой `reports/setup-report.txt`.
5. Пришли этот файл в ChatGPT для проверки.
6. Только после проверки при желании выполни вручную:
   ```bash
   git init
   git add .
   git commit -m "Initial video studio setup"
   ```
7. Открой **корень этой папки** в Codex Desktop.

`SETUP.bat` сам **не выполняет `git init`**.

## Что делает SETUP

- проверяет существующие `Node.js`, `npm` и `Git`;
- ничего из них глобально не переустанавливает;
- скачивает полный `video-shotcraft` **локально** в `.vendor/video-shotcraft`; в `.agents/skills/video-shotcraft` лежит маленький project-local adapter;
- скачивает выбранные официальные Remotion skills и копирует их локально в `.agents/skills/`;
- `.vendor/` игнорируется Git, чтобы не тащить большой upstream-репозиторий в твой GitHub; точный commit SHA фиксируется в `skills-lock.json`;
- не создаёт symlink на глобальные skills;
- не меняет `~/.codex`, `~/.agents` и глобальный Ponytail;
- устанавливает зависимости только для локального Remotion smoke-test;
- выполняет обнаружение композиции и короткий тестовый MP4 render;
- пишет `skills-lock.json` с commit SHA использованных skill-репозиториев;
- создаёт диагностический отчёт в `reports/setup-report.txt`.

Для первого запуска нужен интернет.

## Локальные skills

После установки ожидаются:

- `video-shotcraft`
- `remotion-best-practices`
- `remotion-create`
- `remotion-markup`
- `remotion-studio`
- `remotion-render`
- `remotion-docs`
- `remotion-interactivity`

`video-shotcraft` — project-local adapter; полный canonical skill хранится локально в `.vendor/video-shotcraft`.  
Remotion skills — техническая реализация, Studio, render и актуальная документация.

## Ponytail

Ponytail здесь **не устанавливается** и **не обновляется**. Используется уже установленный глобальный вариант, если он доступен.

Правила проекта ограничивают его роль: минимизировать лишний код — да; сокращать обязательный storyboard, визуальный QA, безопасность данных или render-проверки — нет.

Если позже Ponytail будет отключён глобально, Video Studio должна продолжить работать.

## После настройки

Открой `START_CODEX.md` — там короткий стартовый промпт.

Для каждого реального ролика создавай отдельный каталог:

```text
projects/<video-name>/
```

Финальные видео:

```text
renders/
```

Исходные рабочие репозитории продуктов по умолчанию рассматриваются как **read-only source material**.
