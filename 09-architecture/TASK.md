# Stage 09 — Architecture & production habits

## Цель

Upload аватара в S3-compatible storage + signed URL. Structured JSON logs + correlation id. Короткий ADR: monolith vs microservices.

## Темы

- Layered / clean: controller → service → repo
- API versioning, pagination, idempotency
- Observability: structured logs, metrics, tracing basics
- BFF vs public API; when microservices
- Files/uploads (S3), background workers

## Задача

1. Эндпоинт загрузки аватара (multipart) или «initiate upload» → **presigned URL**.
2. Хранение файлов — **S3-compatible**: AWS S3, MinIO, или LocalStack.
   - Для локалки: MinIO в compose; мок credentials в `mocks/.env.example`.
3. Бинарники **не** в git и **не** в Postgres (только key/url metadata на User).
4. Логи: JSON-строки с `correlationId` / `requestId`, `level`, `msg`, `context`.
5. Напиши `ADR-001-modularity.md`: почему сейчас modular monolith, а не microservices (1 страница).
6. (Бонус) `/metrics` Prometheus-style или счётчик cache hit/miss.

### Моки

- `mocks/avatar.png.b64` — крошечный PNG в base64 (декодируй для ручного теста upload)
- `mocks/upload.http.examples.md` — примеры запросов
- `mocks/log.sample.ndjson` — эталон формата логов

## Критерии «готово»

- [ ] Нет бинарников в git / DB
- [ ] Ошибки внешнего storage изолированы (нормальный 502/503 + код ошибки, не unhandled)
- [ ] Есть короткий ADR
- [ ] Корреляция request → log lines работает

## Примечание

LocalStack/MinIO можно описать в README этапа, даже если полный compose живёт в этапе 08.
