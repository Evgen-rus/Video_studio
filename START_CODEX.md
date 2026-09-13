# Первый промпт для Codex

Скопируй после успешного `SETUP.bat`:

```text
Работаем в Video Studio.

Сначала прочитай AGENTS.md, ARCHITECTURE.md и только релевантные части Docs/agent_workflow.md.
Проверь reports/setup-report.txt и skills-lock.json.

Подтверди:
1) какие project-local skills реально доступны;
2) что video-shotcraft доступен локально;
3) что Remotion smoke-test прошёл;
4) что глобальный Ponytail не изменялся;
5) что корень этого проекта не был автоматически инициализирован как Git-репозиторий.

Не создавай промо-ролик и не меняй настройки среды, пока я не дам задачу на конкретный ролик.
Если picker Codex не показывает project-local skill, не устанавливай его глобально: прочитай соответствующий .agents/skills/<skill>/SKILL.md напрямую и сообщи о проблеме discovery.
```
