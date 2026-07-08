# Stage 04 — PostgreSQL + ORM

## Цель

Blog API: users, posts, comments, tags. Миграции, seed, список постов без N+1.

## Темы

- Реляционная модель, нормализация, индексы
- SQL: JOIN, GROUP BY, EXPLAIN basics
- Prisma или TypeORM + migrations
- Relations, soft delete, transactions
- N+1 и как его избегать

## Задача

На Nest (или продолжай app с этапа 03) подключи **PostgreSQL** + **Prisma** (рекомендуется) или TypeORM.

### Модель (минимум)

- `User` — id, email, name, createdAt
- `Post` — id, title, body, authorId, publishedAt, deletedAt (soft delete)
- `Comment` — id, body, postId, authorId, createdAt
- `Tag` — id, slug, name
- `PostTag` — M2M post ↔ tag

### API (минимум)

- `GET /posts` — посты с **автором** и **тегами** одним запросом (include / join), pagination
- `POST /posts` — создать пост + привязать теги **в транзакции**
- `GET /posts/:id` — пост + comments (с автором комментария)
- CRUD тегов / создание пользователя для seed допустимо без полного auth (auth — этап 05)

### Seed

Импортируй `mocks/blog.seed.json` через `prisma db seed` (или аналог).

### Индексы

Добавь индексы под частые фильтры: `post.authorId`, `tag.slug`, `comment.postId`.

## Критерии «готово»

- [ ] Миграции воспроизводимы с нуля (`migrate reset` + seed)
- [ ] Транзакция create post + tags
- [ ] Индексы под частые запросы
- [ ] Докажи отсутствие N+1 (логи запросов Prisma / `EXPLAIN` / debug)

## Env

См. `mocks/.env.example`. Подними Postgres локально или через Docker (полный compose — этап 08).
