# Stage 10 — Capstone: fullstack portfolio

## Цель

SaaS-скелет: multi-tenant workspace, invite users, CRUD сущностей, JWT, роли owner/member, деплой, README + OpenAPI.

## Темы

- End-to-end фича: Nest + твой фронт
- Домен: tasks / billing-lite / marketplace (выбери один)
- RBAC, migrations, tests, Docker, CI
- Deploy preview (Railway / Fly / Render / AWS)
- Короткое demo и архитектура

## Задача

Собери **один** продукт, который можно показать на собеседовании.

### Рекомендуемый домен: Workspaces + Tasks

Опирайся на бриф `mocks/product.brief.md` и seed `mocks/capstone.seed.json`.

### Must-have

1. Multi-tenant: `Workspace` → members с ролями `owner` | `member`
2. Invite по email (токен/ссылка; можно без реального SMTP — outbox)
3. CRUD задач внутри workspace + изоляция (member чужого workspace → 403)
4. JWT auth (из этапа 05+)
5. Postgres migrations + seed
6. Тесты на auth + tenant isolation
7. Docker Compose для локалки
8. OpenAPI (`/docs`)
9. Deploy публичного URL **или** записанное demo (README со скринкастом)
10. Фронт: хотя бы login + список задач (твой стек: React/Next)

### Scope control

Не строй биллинг/микросервисы «для красоты». Лучше узкий вертикальный срез высокого качества.

## Критерии «готово»

- [ ] Можно клонировать и поднять за <15 мин (README)
- [ ] Есть тесты на auth / isolation
- [ ] Живой URL или demo-запись
- [ ] OpenAPI актуален
- [ ] Короткий `ARCHITECTURE.md` (диаграмма модулей + поток invite)

## Definition of done для портфолио

Репозиторий (этот или отдельный) + ссылка в LinkedIn/CV: «Fullstack NestJS + React: multi-tenant tasks».
