# Stage 05 — Auth, security, multi-tenant basics

## Цель

Добавить auth к Blog API: register/login/refresh/logout, RolesGuard, защита чужих ресурсов.

## Темы

- JWT access + refresh, httpOnly cookies
- Password hashing (argon2/bcrypt)
- Guards, RBAC (roles/permissions)
- OWASP: injection, XSS на API, rate limit
- Изоляция данных по owner/tenant

## Задача

Расширь Blog из этапа 04.

### Auth API

| Method | Path | Описание |
|--------|------|----------|
| `POST` | `/auth/register` | Создать пользователя (role по умолчанию `user`) |
| `POST` | `/auth/login` | Access + refresh (refresh в httpOnly cookie **или** body — выбери и задокументируй) |
| `POST` | `/auth/refresh` | Ротация refresh |
| `POST` | `/auth/logout` | Revoke refresh |

### RBAC

- Roles: `user`, `admin`
- Комментарии: редактировать/удалять может **автор** или **admin**
- Чужой ресурс без прав → **403**, не 500 и не 404 (либо 404, если сознательно скрываешь существование — документируй)

### Seed-пользователи

В `mocks/auth.users.json` — пароли в plaintext **только для моков**. В БД должны лежать **хэши**.

Используй разных пользователей для проверки изоляции (см. сценарии в mocks).

### Минимум hardening

- Rate limit на `/auth/login` (можно in-memory на этом этапе; Redis — этап 06)
- Не логируй пароли / токены

## Критерии «готово»

- [ ] Refresh rotation / revoke
- [ ] Все protected endpoints под Guard
- [ ] Чужие ресурсы → 403 (или задокументированный 404)
- [ ] Пароли только как hash в БД

## Проверочные сценарии

См. `mocks/auth.scenarios.md`.
