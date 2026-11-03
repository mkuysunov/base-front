# Base Front — фронтенд

Base Front — базовый каркас SPA: набор инфраструктуры (провайдеры, тема, i18n, типобезопасный API-клиент, роутинг) для старта новых приложений.

> ⚠️ Ранняя стадия. Реализованы инфраструктура (провайдеры, тема, i18n, типобезопасный API-клиент, роуты) и домен `auth` как пример. Прикладные домены и страницы добавляются под конкретный проект. Детали архитектуры см. в [ARCHITECTURE.md](ARCHITECTURE.md), рабочие инструкции — в [CLAUDE.md](CLAUDE.md).

## Стек

React 19 · Vite 8 · TypeScript · Mantine 9 · React Router 7 · TanStack Query 5 (`openapi-fetch` + `openapi-react-query`) · nuqs · i18next + ICU.

## Требования

- Node.js 20+
- **Yarn 4 (berry)** через corepack — `corepack enable`. `npm install` не используется.

## Запуск

```bash
yarn install
yarn generate:api   # генерит src/services/schema/api-schema.ts из OpenAPI — обязательно перед первым запуском
yarn vite           # dev-сервер
```

`yarn generate:api` нужно запускать вручную: без сгенерированной схемы `tsc`/`build` падают, а апи-клиент не компилируется. Запускайте его повторно при изменениях контракта бэкенда.

## Скрипты (`package.json`)

| Команда             | Действие                            |
| ------------------- | ----------------------------------- |
| `yarn vite`         | dev-сервер                          |
| `yarn build`        | `tsc && vite build`                 |
| `yarn preview`      | локальный предпросмотр прод-сборки  |
| `yarn typecheck`    | `tsc --noEmit`                      |
| `yarn lint`         | ESLint + Stylelint                  |
| `yarn format`       | Prettier `--write`                  |
| `yarn prettier`     | Prettier `--check`                  |
| `yarn generate:api` | перегенерация типов из OpenAPI      |

Vitest сконфигурирован ([vite.config.mjs](vite.config.mjs), `jsdom`), но отдельного `test`-скрипта и тестов пока нет. Запуск: `yarn vitest run <путь>`.

## Окружение

Скопируйте [.env.example](.env.example) → `.env`:

| Переменная                 | Назначение                          |
| -------------------------- | ----------------------------------- |
| `VITE_API_BASE_URL`        | базовый URL API                     |
| `VITE_BRAND_NAME`          | имя бренда (используется в теме)     |
| `VITE_YANDEX_MAPS_API_KEY` | ключ Яндекс.Карт (для будущих карт) |

## Деплой

Прод собирается мультистейдж-[Dockerfile](Dockerfile) (Node 20 build → Nginx) с конфигом [nginx.conf](nginx.conf); `VITE_*` пробрасываются как build-args.

## Качество кода

ESLint (`eslint-config-mantine` + `simple-import-sort`), Stylelint (`stylelint-config-standard-scss`), Prettier. Pre-commit хук ([.husky/pre-commit](.husky/pre-commit)) гоняет `format → lint --max-warnings 0 → typecheck`.
