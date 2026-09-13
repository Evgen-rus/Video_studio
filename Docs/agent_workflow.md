# Экономная работа агентов — Video Studio

Цель — минимальная стоимость **качественно принятого** видео, а не минимальное число токенов любой ценой.

## Model routing

| Роль | Модель / reasoning | Применение |
| --- | --- | --- |
| Lead / orchestrator | `gpt-5.6-sol`, medium | Creative direction, scope, worker routing, интеграция, финальная приёмка |
| Luna Low worker | `gpt-5.6-luna`, low | Asset inventory, shot-card search, простые проверки, render/log triage, рутинные правки |
| Luna Max worker | `gpt-5.6-luna`, max | Основная bounded Remotion implementation, сложный motion/debugging |
| code_mapper | Luna Medium | Read-only mapping больших product repos и точных source ranges |

- Маленькая известная задача — lead.
- Широкое неизвестное исследование — `code_mapper`.
- Простая отделимая работа — Luna Low.
- Нетривиальная ограниченная реализация — Luna Max.
- По умолчанию максимум 2 workers одновременно, из них максимум 1 Max.
- Дополнительный Sol lead не создавай.
- Если среда не позволяет точный model/effort routing, сообщи об этом; не делай вид, что переключение произошло.

## Как делегировать

Перед spawn зафиксируй:
- цель;
- минимальную область;
- обязательные ограничения;
- ожидаемый артефакт/handoff;
- проверки.

Не передавай worker всю историю чата, если достаточно путей, требований и 5–10 строк контекста.

### Product repo mapping

`code_mapper` подходит для:
- найти page/route нужного интерфейса;
- определить дизайн-токены/компоненты;
- найти безопасный demo-state;
- указать точные файлы/ranges для lead.

Он не:
- меняет product repo;
- решает, что рекламировать;
- выбирает финальный creative direction.

### Shot-card scouting

Luna Low может:
- читать Gallery index;
- отфильтровать подходящие shot cards;
- вернуть 3–7 вариантов с exact names/paths;
- указать достоинства/риски.

Не возвращать lead пересказ всей библиотеки.

### Remotion implementation

Luna Max получает:
- утверждённый storyboard/scene scope;
- точные assets;
- exact shot cards;
- design constraints;
- target duration/fps/resolution;
- критерии QA.

Один worker — один владелец записи на один набор файлов.

## Render и проверки

Worker:
1. targeted TypeScript/Remotion check;
2. preview/stills для своей области;
3. при необходимости короткий segment render;
4. компактный handoff.

Lead после интеграции:
1. проверяет diff/scope;
2. смотрит ограниченный набор ключевых кадров;
3. запускает/делегирует один полный render;
4. проверяет итоговый QA report;
5. повторяет только сломанные/изменившиеся проверки.

Длинный успешный render log lead не читает. При ошибке worker возвращает только релевантный хвост/причину/файл.

## Creative QA, который нельзя «оптимизировать»

Ponytail/YAGNI не отменяет:
- реальные screenshots для real-product UI;
- data sanitization;
- storyboard/timing;
- визуальные holds/rest;
- beat sync, если музыка этого требует;
- representative frame review;
- full render до статуса DONE.

## Отчёт worker

```text
FINDINGS:
CHANGES:
FILES:
RISKS:
VERIFICATION:
```

`VERIFICATION` должен содержать фактическую команду и результат, а для видео — пути к frame/render artefacts.
