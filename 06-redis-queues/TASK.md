# Stage 06 — Redis, queues, realtime

## Цель

Кэш ленты, очередь email-дайджеста (mock SMTP), WebSocket-уведомления о новых постах.

## Темы

- Redis cache-aside, TTL, invalidation
- BullMQ: jobs, retries, concurrency
- Rate limiting / sessions в Redis
- WebSockets / SSE (Gateway)
- Idempotency keys для мутаций

## Задача

На базе Blog + Auth:

1. **Кэш** `GET /posts` в Redis (TTL, например 30–60s).
2. При `POST/PATCH/DELETE` поста — **инвалидация** ключей ленты.
3. После создания поста — job в **BullMQ**: «отправить email-дайджест» подписчикам.
4. Worker пишет письма не в реальный SMTP, а в `mocks/outbox/` или лог (адаптер `EmailSender`).
5. **WebSocket Gateway**: клиенты подписываются на комнату `feed` и получают событие `post.created`.
6. (Бонус) Idempotency-Key на `POST /posts`.

### Подписчики для дайджеста

Список email для mock-рассылки: `mocks/digest.subscribers.json`.

### Симуляция падения

`mocks/fail-once.flag` — если файл существует, первые N попыток job должны fail’иться, затем succeed (проверка retries). Или env `EMAIL_FAIL_TIMES=1`.

## Критерии «готово»

- [ ] Retry при падении worker
- [ ] Кэш hit/miss в логах или metrics
- [ ] WS: уведомление подписчикам о новом посте
- [ ] Rate limit login перенесён/доусилен через Redis (желательно)

## Env

См. `mocks/.env.example`.
