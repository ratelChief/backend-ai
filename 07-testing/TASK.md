# Stage 07 — Testing quality bar

## Цель

Покрыть Auth + Posts: unit для service + e2e happy path и запрет доступа к чужому ресурсу.

## Темы

- Unit: services с моками репозиториев
- Integration: e2e Nest + test DB
- Supertest / Jest / Vitest
- Coverage на auth и критичные flows
- Contract / OpenAPI smoke

## Задача

1. Unit-тесты на сервис(ы) постов и auth (моки Prisma/репозитория).
2. E2E (Supertest):
   - register → login → create post → list posts
   - user A не может удалить комментарий/пост user B → 403
3. Отдельная **test database** (URL из env), миграции в `beforeAll`.
4. Скрипт `npm test` (и желательно `npm run test:e2e`).
5. (Бонус) Smoke: OpenAPI документ отдаётся и содержит `/auth/login`.

### Фикстуры

Используй `mocks/e2e.fixtures.json` для пользователей и постов в e2e.

### Минимальный набор кейсов

См. `mocks/test.cases.md` — отмечай выполненное.

## Критерии «готово»

- [ ] CI может гонять тесты (локально сейчас; GH Actions — этап 08)
- [ ] Тестовая БД изолирована
- [ ] Хотя бы один negative case на каждый Guard
- [ ] Unit + e2e зелёные на чистой машине после migrate

## Env

`mocks/.env.test.example`
