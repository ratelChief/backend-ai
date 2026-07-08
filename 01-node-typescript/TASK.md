# Stage 01 — Node.js + TypeScript backend

## Цель

Освоить event loop, async/await, ESM, streams и strict TypeScript на реальной CLI-задаче.

## Темы

- Event loop, call stack, microtasks
- Promises / async-await / `Promise.allSettled`
- Modules (ESM), streams, Buffer, `fs`
- Strict TypeScript: types, generics, errors
- npm/pnpm, scripts, env, dotenv

## Задача

Напиши CLI-утилиту `report`, которая:

1. Читает входной файл (JSON lines или CSV) из `mocks/`.
2. Валидирует каждую запись типизированной схемой (можно zod / собственный type guard).
3. Пишет:
   - краткий отчёт в **stdout**;
   - полный отчёт в файл (например `output/report.json`).
4. Для больших файлов использует **streams** (не `fs.readFile` всего файла в память).

### Вход

Используй:

- `mocks/events.ndjson` — по одной JSON-записи на строку (основной сценарий)
- `mocks/events.csv` — альтернативный формат (бонус или второй режим `--format`)
- `mocks/events.invalid.ndjson` — заведомо битые строки (должны попасть в errors, не валить весь прогон)

### Ожидаемый CLI

```bash
npx tsx src/cli.ts --input mocks/events.ndjson --out output/report.json
# опционально:
npx tsx src/cli.ts --input mocks/events.csv --format csv --out output/report.json
```

### Формат отчёта (минимум)

```json
{
  "total": 0,
  "valid": 0,
  "invalid": 0,
  "byType": { "login": 0, "purchase": 0, "logout": 0 },
  "revenueCents": 0,
  "errors": [{ "line": 1, "message": "..." }]
}
```

## Критерии «готово»

- [ ] Нет блокировки event loop на больших файлах (streams / chunked read)
- [ ] `strict` TypeScript, нет `any`
- [ ] Понятные ошибки + ненулевые exit codes при фатальных сбоях (нет файла, неверный формат флагов)
- [ ] Невалидные строки учитываются в `errors`, процесс не падает на первой же

## Подсказки

- Создай свой `package.json` в этой папке (или скрипт в корне).
- Для локального запуска удобны `tsx` + `zod`.
- Сгенерировать stress-файл: скопируй `events.ndjson` много раз в новый файл и проверь память/`time`.
