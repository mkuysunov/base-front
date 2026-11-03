# Архитектура проекта

Base Front — базовый каркас SPA: переиспользуемая инфраструктура (провайдеры, тема, i18n, типобезопасный API-клиент, роутинг) для старта новых приложений.

> Статус: ранний каркас. Реализованы инфраструктура и домен `auth` как пример; прикладные домены и страницы добавляются под конкретный проект. Этот документ описывает фактическое состояние и целевую структуру каркаса.

## Технологический стек (установлено)

| Слой                    | Технологии                                                                    |
| ----------------------- | ----------------------------------------------------------------------------- |
| UI / Framework          | React 19, TypeScript, Vite 8                                                   |
| Маршрутизация           | React Router DOM 7                                                             |
| Компонентная библиотека | Mantine 9 (`@mantine/core`, `dates`, `modals`, `notifications`, `hooks`)      |
| Серверное состояние     | TanStack React Query 5 + `openapi-react-query` + `openapi-fetch`              |
| URL-состояние           | `nuqs`                                                                         |
| Локализация             | `i18next` + `i18next-icu` (ru / tj), детект через браузер/localStorage         |
| Стили                   | CSS Modules + PostCSS (`postcss-preset-mantine`) + тема Mantine                |
| Даты                    | `dayjs`                                                                        |
| Тестирование            | Vitest + Testing Library (сконфигурировано, тестов пока нет)                   |
| Качество кода           | ESLint, Stylelint, Prettier, Husky                                            |

### Запланировано (ещё не в `package.json`)

Формы и валидация (`@mantine/form` + `zod`), карусели (`@mantine/carousel`), Яндекс.Карты (env-ключ уже заведён), утилиты (`clsx`, `lodash-es`). Не считайте их доступными, пока не добавите зависимость.

## Менеджер пакетов и скрипты

Только **Yarn 4 (berry)** через corepack (`packageManager: yarn@4.13.0`).

```bash
yarn generate:api    # генерит src/services/schema/api-schema.ts из OpenAPI — запускать вручную
yarn vite            # dev-сервер
yarn build           # tsc && vite build
yarn typecheck       # tsc --noEmit
yarn lint            # ESLint + Stylelint
yarn format          # Prettier --write
yarn prettier        # Prettier --check
```

- `yarn generate:api` нужно запускать **до** первого `typecheck`/`build`: [src/config/apiClient.ts](src/config/apiClient.ts) импортирует ещё не сгенерированный `@/services/schema/api-schema`. Источник схемы зашит в скрипт `generate:api` в `package.json`.
- ⚠️ `yarn dev` = `yarn vite && yarn generate:api`, т.е. `generate:api` отрабатывает только после остановки dev-сервера. Для разработки: один раз `yarn generate:api`, затем `yarn vite`.
- Запуск одного теста: `yarn vitest run src/path/to/file.test.tsx` (отдельного `test`-скрипта пока нет).
- Pre-commit ([.husky/pre-commit](.husky/pre-commit)): `format → lint --max-warnings 0 → typecheck`.

## Структура каталогов

```
├── src/
│   ├── assets/                  # статические ресурсы
│   ├── components/              # компонент = папка (ExampleComponent, PrivateRoute, RouterLink)
│   ├── config/
│   │   └── apiClient.ts         # openapi-fetch клиент (credentials: include, Accept-Language)
│   ├── hooks/                   # кросс-фичевые хуки
│   ├── i18n/
│   │   ├── config.ts            # инициализация i18next + ICU
│   │   ├── i18next.d.ts
│   │   └── locales/{ru,tj}.json
│   ├── icons/                   # SVG-иконки (фабрика SvgIconWrapper)
│   ├── pages/                   # роут-уровневые компоненты + Router.tsx
│   ├── providers/               # ReactQueryProvider, MantineProvider, DayjsProvider
│   ├── services/                # API-слой по доменам (см. ниже)
│   ├── styles/                  # theme.tsx, global.css, theme.module.css
│   └── utils/                   # routes.ts, getEnv.ts, constants.ts
├── ARCHITECTURE.md
├── CLAUDE.md
├── eslint.config.js
├── postcss.config.cjs
├── tsconfig.json
├── vite.config.mjs
└── vitest.setup.mjs
```

## API-слой

Полностью типобезопасен через OpenAPI-кодогенерацию:

1. `yarn generate:api` собирает типы `paths` в [src/services/schema/api-schema.ts](src/services/schema/api-schema.ts) (файл генерируемый, в репозитории отсутствует).
2. [src/config/apiClient.ts](src/config/apiClient.ts) создаёт `openapi-fetch`-клиент (`credentials: include`, заголовок `Accept-Language` из i18n), обёрнутый в `openapi-react-query` → `apiClient`.
3. Доменные хуки оборачивают `apiClient.useQuery()` / `apiClient.useMutation()` со строковыми путями (см. [src/services/auth/useAuth.ts](src/services/auth/useAuth.ts): `useLogin`, `useGetMe`, `useLogout`, …).

Перед реализацией фич, затрагивающих API, всегда запускайте `generate:api`.

### Доменные сервисы (`src/services/<domain>/`)

Как образец реализован домен **`auth`** (аутентификация и пользовательская сессия). Прикладные домены добавляются под конкретный проект по той же структуре: `use<Domain>.ts` (хуки), `<domain>Types.ts` (ручные типы), `index.ts` (реэкспорт).

[src/services/index.ts](src/services/index.ts) реэкспортит домены централизованно — **создавайте папку под существующий реэкспорт**; пока папки нет, `typecheck` по этому импорту будет падать (ожидаемо для каркаса). Под новый проект приведите список реэкспортов в `index.ts` к своим доменам.

Общие типы — в [src/services/commonTypes.ts](src/services/commonTypes.ts).

## Управление состоянием

Три чётко разделённых слоя:

- **Серверное состояние** — TanStack React Query (`staleTime: 1m`, `gcTime: 5m`, без refetch-on-focus, `retry: false`; см. [src/providers/ReactQueryProvider.tsx](src/providers/ReactQueryProvider.tsx)).
- **URL-состояние** — `nuqs` (фильтры, пагинация, поиск — в query-параметрах для shareable URL; провайдер `NuqsAdapter` в [src/App.tsx](src/App.tsx)).
- **UI-состояние** — локальный state компонентов + Mantine hooks.

Глобальный кросс-страничный state добавляется отдельным провайдером только там, где он действительно нужен.

## Маршрутизация и доступ

- Все пути определены централизованно в [src/utils/routes.ts](src/utils/routes.ts) с типизированными `getPath()` — никогда не хардкодьте пути.
- Дерево роутов собирается в [src/pages/Router.tsx](src/pages/Router.tsx) через `createBrowserRouter`. Сейчас подключён только `/` → `DashboardPage`; остальные страницы добавляются по мере готовности.
- Маршруты оборачиваются в [src/components/PrivateRoute](src/components/PrivateRoute) (сейчас — `ScrollRestoration` + `Outlet`; точка для будущей проверки авторизации).
- Прикладные маршруты объявляются в `routes.ts` под конкретный проект; в каркасе подключён только `/` → `DashboardPage`.

## Path-алиасы

Vite + TypeScript настроены на алиасы — используйте их вместо относительных импортов ([vite.config.mjs](vite.config.mjs), [tsconfig.json](tsconfig.json)):

`@/*`, `@components`, `@services`, `@hooks`, `@pages`, `@utils`, `@providers`, `@styles`, `@icons`, `@assets`, `@config`, `@i18n`, `@test-utils`.

## Стилизация

- Mantine как база: тема в [src/styles/theme.tsx](src/styles/theme.tsx) (`primaryColor: orange`, кастомный цвет `app-primary` `#ff7528`, шрифт Open Sans; `NavLink`/`Anchor` по умолчанию рендерятся через `RouterLink`), глобальные стили в [src/styles/global.css](src/styles/global.css).
- PostCSS с `postcss-preset-mantine` и брейкпойнтами Mantine (`postcss.config.cjs`).
- CSS Modules для компонентного скоупа.

## Интернационализация

- Все пользовательские строки — через i18next.
- Локали: [src/i18n/locales/ru.json](src/i18n/locales/ru.json), [src/i18n/locales/tj.json](src/i18n/locales/tj.json).
- ICU MessageFormat для плюрализации.
- Язык авто-детектится из браузера/localStorage, fallback — русский ([src/i18n/config.ts](src/i18n/config.ts)).
- Заголовок `Accept-Language` пробрасывается в API-клиент.

## Обработка ошибок

Типы ответов и кодов ошибок берутся из сгенерированного OpenAPI-контракта (`src/services/schema/api-schema.ts`) и используются в типизированных колбэках мутаций (`onError`). Отдельного enum кодов ошибок в репозитории пока нет.

## Конвенции

- **Страницы** ([src/pages/](src/pages/)) — тонкие, делегируют логику feature-компонентам.
- **Компонент = папка** по шаблону [src/components/ExampleComponent](src/components/ExampleComponent): `Component.tsx`, `ComponentTypes.ts`, `ComponentConstants.ts`, `ComponentUtils.ts`, `ComponentStyles.module.css`, `index.ts`.
- **Сервис-домен** = папка `src/services/<domain>/`: `use<Domain>.ts` (хуки), `<domain>Types.ts` (ручные типы), `index.ts` (реэкспорт).
- **Иконки** — через фабрику [src/icons/SvgIconWrapper.tsx](src/icons/SvgIconWrapper.tsx) (поддержка `size`, `filled`).
- **Импорты** сортируются ESLint-плагином `simple-import-sort` (нарушение = ошибка).
- **Навигация** — только через `getPath()` из `routes.ts`.
