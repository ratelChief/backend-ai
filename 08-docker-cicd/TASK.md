# Stage 08 — Docker, CI/CD, cloud basics

## Цель

`docker compose up` поднимает API + Postgres + Redis. CI на PR: lint + test. Секреты не в git.

## Темы

- Dockerfile multi-stage, Compose (app + db + redis)
- Healthchecks, 12-factor config
- GitHub Actions: lint, test, build
- Secrets, env по окружениям
- AWS/Azure overview: S3, RDS, ECS/Lambda (теория + короткий ADR)

## Задача

1. **Dockerfile** multi-stage для Nest API (builder + runner, non-root user).
2. **docker-compose.yml**: `api`, `postgres`, `redis` + healthchecks.
3. Миграции: entrypoint скрипт или документированный шаг `compose run`.
4. **`.env.example`** в корне приложения (без секретов) — шаблон в `mocks/.env.example`.
5. **GitHub Actions** workflow (положи файл в `mocks/github-workflow.ci.yml` как образец, или сразу в `.github/workflows/ci.yml` репо):
   - install → lint → test
6. Короткий `ADR-cloud.md` в этой папке: что бы ты использовал на AWS для этого API (ECS vs Lambda + RDS + S3) и почему.

### Compose-проверка

После подъёма:

```bash
curl -sf http://localhost:3000/health
```

Health endpoint добавь, если ещё нет (`{ "status": "ok" }` + опционально ping db/redis).

## Критерии «готово»

- [ ] Образ не root / разумный размер
- [ ] Миграции в entrypoint или documented step
- [ ] README: один путь от clone до working API
- [ ] CI yaml валиден (можно проверить `actionlint` или просто ревью структуры)

## Моки / шаблоны

- `mocks/docker-compose.sample.yml` — стартовая точка (можешь скопировать и доработать)
- `mocks/Dockerfile.sample`
- `mocks/github-workflow.ci.yml`
- `mocks/.env.example`
