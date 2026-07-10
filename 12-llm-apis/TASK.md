# Stage 12 — LLM APIs (OpenAI, Anthropic, Gemini)

## Цель

Научиться вызывать **популярные LLM HTTP APIs** из Node/Nest: chat completion, обработка ошибок, таймауты, mock-режим без реальных ключей.

## Темы

- REST + JSON: headers, auth (`Bearer`), request/response shapes
- **OpenAI** Chat Completions API (`/v1/chat/completions`)
- **Anthropic** Messages API (`/v1/messages`)
- **Google Gemini** `generateContent` (REST)
- Таймауты, retry на 429/5xx, идемпотентность запросов
- Секреты в env, никогда в git
- Mock-слой для локальной разработки и тестов

## Задача

Сервис `LlmGateway` с единым интерфейсом:

```ts
type LlmProvider = 'openai' | 'anthropic' | 'gemini';

type ChatRequest = {
  provider: LlmProvider;
  model?: string;
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[];
};

type ChatResponse = {
  provider: LlmProvider;
  model: string;
  text: string;
  usage?: { inputTokens: number; outputTokens: number };
};
```

### Эндпоинт (Nest или Express)

`POST /ai/chat` — body из `mocks/chat.requests.json` (любой пример).

- `LLM_MOCK=true` → ответы из `mocks/providers/*.mock.json` (без сети)
- `LLM_MOCK=false` → реальный вызов выбранного провайдера

### Обязательные кейсы

1. Успешный ответ от каждого провайдера (mock или live)
2. Невалидный `provider` → 400
3. Отсутствует API key для live-режима → 503 с понятным кодом
4. Таймаут запроса (например 30s) → 504
5. Логировать `provider`, `model`, `usage` — **не** логировать ключи и полный user prompt в production-режиме

## Критерии «готово»

- [ ] Один `LlmGateway`, три адаптера (OpenAI / Anthropic / Gemini)
- [ ] Mock-режим покрывает все три провайдера
- [ ] Retry: минимум 1 retry на 429 с exponential backoff
- [ ] `.env.example` без секретов
- [ ] README: как запустить в mock и live

## Env

См. `mocks/.env.example`.

## Подсказки

- Официальные SDK: `openai`, `@anthropic-ai/sdk`, `@google/generative-ai` (или чистый `fetch`)
- Для учебы сначала реализуй **mock**, потом live — так проще тестировать
