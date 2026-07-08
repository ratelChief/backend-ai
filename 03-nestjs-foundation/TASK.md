# Stage 03 — NestJS foundation

## Цель

Перенести Notes API на NestJS: modules, DTO, ValidationPipe, Config, Swagger.

## Темы

- Modules, Controllers, Providers, DI
- DTO + `class-validator` + `ValidationPipe`
- `ConfigModule`, env schema
- Exception filters, interceptors, pipes
- Swagger / OpenAPI

## Задача

Создай Nest-приложение (CLI `nest new` или вручную) в этой папке / соседнем `app/`.

1. Перенеси функциональность из этапа 02 (CRUD notes + pagination + filter).
2. Стартовые данные — `mocks/notes.seed.json` (можно тот же контент, что в этапе 02).
3. Глобальный `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`).
4. `ConfigModule` — порт, `NODE_ENV`, лимиты pagination только через `ConfigService`.
5. Swagger на `/docs`.
6. Единый exception filter (или встроенный Nest + кастомный формат ошибки с `requestId`).

### Структура (ориентир)

```
src/
  main.ts
  app.module.ts
  config/
  notes/
    notes.module.ts
    notes.controller.ts
    notes.service.ts
    dto/
```

In-memory store пока допустим; PostgreSQL — этап 04.

## Критерии «готово»

- [ ] Чёткие границы modules
- [ ] Swagger доступен локально
- [ ] Конфиг только через `ConfigService` (нет «голого» `process.env` в сервисах)
- [ ] DTO покрывают create/update/query

## Env

Скопируй `mocks/.env.example` → `.env` в корне приложения.
