# Stage 02 — HTTP, REST, Express baseline

## Цель

Собрать мини-API заметок на Express: CRUD, пагинация, фильтр, единый формат ошибок.

## Темы

- HTTP status, headers, CORS, cookies
- REST ресурсы, идемпотентность
- Middleware, routing, body parsing
- Валидация входа, единый error handler
- Логирование запросов

## Задача

Реализуй **Notes API** на Express + TypeScript.

### Эндпоинты (минимум)

| Method | Path | Описание |
|--------|------|----------|
| `GET` | `/notes` | Список с `limit`, `offset` (или cursor) и `?q=` / `?tag=` |
| `GET` | `/notes/:id` | Одна заметка |
| `POST` | `/notes` | Создать |
| `PATCH` | `/notes/:id` | Частичное обновление |
| `DELETE` | `/notes/:id` | Удалить (идемпотентно: повторный delete → 204/404 на твой выбор, но документируй) |

Хранение на этом этапе — **in-memory**, начальное состояние загружай из `mocks/notes.json`.

### Тело заметки

```ts
type Note = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string; // ISO
  updatedAt: string;
};
```

### Общий формат ошибки

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "title is required",
    "requestId": "..."
  }
}
```

Каждый запрос получает `requestId` (middleware) — он же в логах и в ответе об ошибке.

## Критерии «готово»

- [ ] Корректные 4xx/5xx и валидация body
- [ ] Pagination: `limit`/`offset` или cursor
- [ ] README в этой папке с примерами `curl` / httpie
- [ ] Логи: method, path, status, requestId, duration

## Подсказки

- CORS включи для локального фронта (`http://localhost:5173` или подобное).
- Не тащи Nest — это baseline перед этапом 03.
