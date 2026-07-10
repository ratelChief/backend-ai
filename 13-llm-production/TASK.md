# Stage 13 — LLM production patterns (streaming, tools, cache)

## Цель

Продвинутые паттерны LLM в бэкенде: **streaming (SSE)**, tool/function calling, кэш ответов в **Redis**, embeddings + простой RAG.

## Темы

- Server-Sent Events (SSE) для stream токенов
- Tool / function calling (structured output)
- Кэш LLM-ответов в Redis (cache key = hash prompt + model)
- Embeddings API (OpenAI или mock) + cosine similarity
- Cost/usage tracking в Postgres или Redis counters
- Guardrails: max tokens, blocked topics (простой filter)

## Задача

Расширь `LlmGateway` из этапа 12.

### 1. Streaming

`POST /ai/chat/stream` — SSE, чанки из `mocks/streaming.chunks.ndjson` в mock-режиме.

Клиент видит:
```
event: token
data: {"delta":"Hello"}

event: done
data: {"usage":{"inputTokens":10,"outputTokens":5}}
```

### 2. Tools

`POST /ai/chat/tools` — модель «вызывает» tool `get_weather` по определению из `mocks/tools.weather.json`.

Flow:
1. LLM возвращает tool_call (mock: `mocks/tools.weather-call.mock.json`)
2. Твой код исполняет tool (mock weather API → `mocks/weather.response.json`)
3. Второй round-trip → финальный ответ пользователю

### 3. Redis cache

Повторный **идентичный** запрос (тот же prompt hash) → ответ из Redis без вызова LLM.
Логируй `cache: hit|miss`.

### 4. RAG-lite

`POST /ai/rag/ask` — вопрос + поиск по `mocks/knowledge.base.json` через embeddings (mock vectors в `mocks/embeddings.mock.json`).

Ответ должен ссылаться на `sourceIds` из найденных чанков.

## Критерии «готово»

- [ ] SSE stream работает в mock и не ломает connection при ошибке
- [ ] Tool loop: call → execute → final answer
- [ ] Redis cache с TTL (например 1h) для completions
- [ ] RAG возвращает `sources[]` с id и score
- [ ] Usage counters инкрементятся в Redis (`llm:tokens:input`, `llm:tokens:output`)
- [ ] Тесты на cache hit и tool flow (unit или e2e)

## Env

См. `mocks/.env.example`. Нужен Redis (этап 11).

## Связь с capstone

На этапе 10 можно добавить «AI assistant» в workspace — опционально.
