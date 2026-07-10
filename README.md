# backend-ai

Учебный трек **frontend → fullstack** на Node.js / NestJS.

Стек и этапы соответствуют чек-листу fullstack Node.js / NestJS: от Node/TS до capstone SaaS.

## Как пользоваться

1. Иди по папкам `01-…` → `13-…` по порядку (этапы `11-13` — расширение: Redis + LLM).
2. В каждой папке читай `TASK.md`, используй `mocks/` если есть.
3. Решение клади в ту же папку (`src/`, `app/` и т.д.) — структуру выбирай сам в рамках задачи.
4. Критерии «готово» в конце каждого `TASK.md` — чеклист перед переходом дальше.

```bash
cd ~/pets/backend-ai
nvm use          # Node 24 LTS (.nvmrc)
npm install
npm run lint
npm run typecheck
```

## Этапы

| # | Папка | Тема |
|---|--------|------|
| 01 | `01-node-typescript` | Node.js + TypeScript, streams, CLI |
| 02 | `02-http-express` | HTTP, REST, Express |
| 03 | `03-nestjs-foundation` | NestJS foundation |
| 04 | `04-postgres-orm` | PostgreSQL + ORM |
| 05 | `05-auth-security` | Auth, JWT, RBAC |
| 06 | `06-redis-queues` | Redis в Nest: кэш, BullMQ, WebSockets |
| 07 | `07-testing` | Unit / e2e tests |
| 08 | `08-docker-cicd` | Docker, CI/CD |
| 09 | `09-architecture` | Architecture & production habits |
| 10 | `10-capstone` | Fullstack portfolio project |
| 11 | `11-redis-fundamentals` | Redis: структуры данных, TTL, pub/sub |
| 12 | `12-llm-apis` | LLM APIs: OpenAI, Anthropic, Gemini |
| 13 | `13-llm-production` | Streaming, tools, RAG, кэш LLM в Redis |

### Рекомендуемый порядок для Redis / LLM

- **Redis:** `11` → `06` → `13` (сначала основы, потом Nest, потом кэш LLM)
- **LLM:** `12` → `13` → опционально в `10-capstone`

## Рекомендации

- Держи **strict TypeScript** с корня (`tsconfig.json`).
- **ESLint 9** (flat config): `@eslint/js` + `typescript-eslint` (`recommendedTypeChecked`) + `@stylistic/eslint-plugin` (`disable-legacy` + `customize`).
- Node **24 LTS** — `nvm use` (см. `.nvmrc`).
- После этапа 03 подключай свой фронт к своим API.
- Не копируй готовые туториалы целыми — цель в том, чтобы **сам** прогнать критерии приёмки.
- Секреты только в `.env` (шаблоны — `.env.example` внутри этапов).

## Прогресс

Отмечай этапы в canvas-чеклисте или просто зачёркивай критерии в `TASK.md`.
