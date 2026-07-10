# Stage 11 — Redis fundamentals

## Цель

Освоить Redis как key-value store **до** (или параллельно с) интеграцией в Nest на этапе 06: структуры данных, TTL, pipelines, pub/sub.

> Этап 06 фокусируется на кэше/очередях в Blog API. Здесь — чистая практика с Redis через `ioredis` или `node-redis`.

## Темы

- Strings, hashes, lists, sets, sorted sets
- TTL, `EXPIRE`, `SETEX`, eviction basics
- `INCR` / atomic counters (rate limit задел)
- Pipelines и `MULTI`/`EXEC` (транзакции)
- Pub/Sub (без persistence — понимать ограничения)
- Подключение из Node, reconnect, healthcheck

## Задача

CLI или небольшой скрипт `redis-lab` + набор подкоманд (или один runner с флагами):

| Команда | Что делает |
|---------|------------|
| `seed` | Загружает `mocks/redis.seed.json` в Redis |
| `leaderboard` | Top-N авторов по `postCount` из sorted set |
| `session` | Сохранить/прочитать hash сессии с TTL 3600s |
| `pipeline-demo` | 100× `INCR` через pipeline vs без — вывести timing |
| `pubsub` | Publisher шлёт в канал `feed.events`, subscriber печатает 3 сообщения из `mocks/pubsub.events.json` |

### Seed-данные

`mocks/redis.seed.json` — пользователи, счётчики постов, сессии.

### Локальный Redis

```bash
docker run -d --name redis-lab -p 6379:6379 redis:7-alpine
# или см. mocks/docker-redis.yml
```

## Критерии «готово»

- [ ] Все операции через официальный клиент (`ioredis` / `node-redis`), не `redis-cli` в production-коде
- [ ] TTL на сессиях работает (ключ исчезает после expire)
- [ ] Leaderboard через `ZADD` / `ZREVRANGE`
- [ ] Pipeline demo показывает выигрыш по времени (хотя бы порядок величины)
- [ ] Pub/Sub: subscriber корректно завершается после N сообщений
- [ ] README с командами запуска

## Env

См. `mocks/.env.example`.

## Связь с этапом 06

После этого этапа в Nest-приложении кэш и rate limit должны быть «осознанными», а не copy-paste.
