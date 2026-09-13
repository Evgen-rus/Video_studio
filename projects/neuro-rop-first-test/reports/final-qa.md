# НейроРОП — первый тест: финальная проверка

- Формат: 1920×1080, 30 fps, 261 кадр, 8.746667 с.
- Видео: H.264; аудио: AAC, 48 kHz, stereo; BGM отсутствует.
- Сцена: реальный frontend НейроРОПа, снятый через локальный mock API только с фиктивными `DEMO`-данными.
- Storyboard: dashboard → «Требуют внимания» → клик → отфильтрованная сделка → контроль качества/следующий шаг → wordmark.
- Визуально проверены исходные stills и кадры, извлечённые из финального MP4.
- Исправления после независимой проверки: сокращён ghost-переход фильтра; титр S5 сдвинут в safe area.
- Проверки: `npm.cmd run typecheck`, `npm.cmd run build`, полный `npm.cmd run render`, `ffprobe`, `ffmpeg volumedetect`, sanitization scan.
- Audio peak: −17.9 dB; clipping не обнаружен.
- Source product repo: изменений нет.
- SHA-256: `1624D6BD26E1CA708B64E90B0CAE0BDAF8B4ADDC638B6DE5C4818B363FB3CC1A`.

Итоговый файл: `out/neuro-rop-first-test.mp4`.
