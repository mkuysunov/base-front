# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Base Front** — a base SPA scaffold: reusable infrastructure (providers, theme, i18n, type-safe API client, routing) for bootstrapping new applications. It is currently an early scaffold: the infrastructure and the `auth` domain (as an example) are implemented; application-specific domains are added per project.

## Package Manager

Only **Yarn 4 (berry)** via corepack (`packageManager: yarn@4.13.0`). Do not use `npm install`. The `lint` script calls `npm run` internally, but you should run it via `yarn lint`.

## Commands

```bash
yarn generate:api    # run first: generates src/services/schema/api-schema.ts from OpenAPI
yarn vite            # dev server (NOT `yarn dev` — see below)
yarn build           # tsc && vite build
yarn typecheck       # tsc --noEmit
yarn lint            # eslint . + stylelint '**/*.css'
yarn format          # prettier --write
yarn vitest run <path>   # single test (see below — there is no dedicated `test` script)
```

## Important Notes on the Current State

- **`yarn generate:api` must be run manually.** [src/config/apiClient.ts](src/config/apiClient.ts) imports `@/services/schema/api-schema`, which is not in the repo — it is generated. Without it, `tsc`/`build` fail. The schema source is hardcoded in `package.json` (`generate:api`), not localhost.
- **`yarn dev` is broken**: it is `yarn vite && yarn generate:api`, i.e. `generate:api` only runs after the dev server is stopped. For development: run `yarn generate:api` once, then `yarn vite`.
- **[src/services/index.ts](src/services/index.ts) re-exports ~14 domains that don't exist yet** (`cart`, `categories`, `orders`, `products`, …). Until those folders are created, `yarn typecheck` will fail — this is expected for a scaffold. When adding a domain, create the folder for the already-declared re-export.
- **Pre-commit hook** ([.husky/pre-commit](.husky/pre-commit)) runs `format` → `lint --max-warnings 0` → `typecheck`. Until typecheck is green, commits are blocked.
- **There are no tests or `test` script yet**, but Vitest is configured ([vite.config.mjs](vite.config.mjs), `jsdom`, [vitest.setup.mjs](vitest.setup.mjs)). Run with: `yarn vitest run <path>` or `npx vitest`.
- **[ARCHITECTURE.md](ARCHITECTURE.md) and [README.md](README.md) partially run ahead of reality** (they mention zod, `@mantine/form`, carousel, react-yandex-maps, Storybook — none are in `package.json`). Verify against `package.json`, not these files.

## Architecture

- **Stack**: React 19 + Vite 8, Mantine 9 (UI), React Router 7, TanStack Query 5 on top of `openapi-fetch` + `openapi-react-query`, `nuqs` (URL state), i18next + ICU.
- **Provider composition** ([src/App.tsx](src/App.tsx)): `NuqsAdapter` → `ReactQueryProvider` → `MantineProvider` → `DayjsProvider` + `Notifications` + `Router`.
- **The API is type-safe via codegen.** `generate:api` builds the `paths` types; [src/config/apiClient.ts](src/config/apiClient.ts) wraps them into `apiClient` (`credentials: include`, `Accept-Language` header from i18n). Domain hooks call `apiClient.useQuery/useMutation` with string paths (see [src/services/auth/useAuth.ts](src/services/auth/useAuth.ts)).
- **Three layers of state**: server — React Query (`staleTime 1m`, `gcTime 5m`, no refetch-on-focus, `retry: false`); URL — `nuqs`; UI — local state + Mantine hooks.
- **Routes** are all defined in [src/utils/routes.ts](src/utils/routes.ts) with typed `getPath()` helpers — navigate only through them, do not hardcode paths. The route tree is assembled in [src/pages/Router.tsx](src/pages/Router.tsx), all wrapped in [src/components/PrivateRoute](src/components/PrivateRoute) (currently just `ScrollRestoration` + `Outlet`).
- **Theme** ([src/styles/theme.tsx](src/styles/theme.tsx)): `primaryColor: orange`, custom color `app-primary` `#ff7528`, Open Sans font. `NavLink`/`Anchor` render through `RouterLink` by default (Mantine + React Router). Names are branded via `VITE_BRAND_NAME`.
- **i18n**: locales `ru`/`tj` ([src/i18n/locales](src/i18n/locales)), ICU MessageFormat, fallback `ru`, language is detected and persisted in localStorage. All user-facing strings go through i18next.
- **Env** ([.env.example](.env.example)) is read in a typed way in [src/utils/getEnv.ts](src/utils/getEnv.ts): `VITE_API_BASE_URL`, `VITE_BRAND_NAME`, `VITE_YANDEX_MAPS_API_KEY`.

## Conventions

- **Path aliases** (`@components`, `@services`, `@hooks`, `@pages`, `@utils`, `@providers`, `@styles`, `@icons`, `@assets`, `@config`, `@i18n`, plus `@/*`) instead of relative imports. Defined in [vite.config.mjs](vite.config.mjs) and [tsconfig.json](tsconfig.json).
- **Component = folder**, following the [src/components/ExampleComponent](src/components/ExampleComponent) template: `Component.tsx`, `ComponentTypes.ts`, `ComponentConstants.ts`, `ComponentUtils.ts`, `ComponentStyles.module.css`, `index.ts`. Copy this structure for new components; CSS — CSS Modules only.
- **Service domain** = a `src/services/<domain>/` folder: `use<Domain>.ts` (hooks on top of `apiClient`), `<domain>Types.ts` (manual types), `index.ts` (re-export). Shared types — in [src/services/commonTypes.ts](src/services/commonTypes.ts).
- **Icons** are built by the [src/icons/SvgIconWrapper.tsx](src/icons/SvgIconWrapper.tsx) factory (supports `size`, `filled`).
- **Imports are sorted** by the `simple-import-sort` ESLint plugin (error on violation). Prettier: `trailingComma: es5`.
- Before any work with the API, run `yarn generate:api` first.

### Feature Organization

- `src/pages/` — route-level components (thin, delegate to feature components)
- `src/components/` — feature and shared components, one folder per component
- `src/services/<domain>/` — API hooks + domain types, indexed per feature (auth, products, cart, orders, disputes, notifications, favorites, shops, deliveryAddresses)
- `src/hooks/` — cross-feature custom hooks
- `src/providers/` — React context providers (ReactQueryProvider, MantineProvider, DayjsProvider, YMapsProvider)
- `src/utils/routes.ts` — centralized route definitions with typed `getPath()` helpers; always use this instead of hardcoding paths

### Routing & Auth

All routes are protected via `PrivateRoute`. Routes are defined centrally in `src/utils/routes.ts` and composed in `src/Router.tsx`. Use `getPath()` helpers from `routes.ts` for navigation.

### Path Aliases

Vite and TypeScript are configured with aliases — use them instead of relative imports:
`@components`, `@services`, `@hooks`, `@pages`, `@utils`, `@providers`, `@styles`, `@icons`, `@assets`, `@config`, `@i18n`, `@mock`

### Styling

Mantine component library + CSS Modules. Theme customization in `src/styles/theme.tsx`. Global styles in `src/styles/global.css`. Use `clsx` for conditional classNames.

---

**Z-index**: do NOT hardcode `z-index` numbers. Use Mantine's z-index CSS variables instead — `var(--mantine-z-index-app)` (100), `var(--mantine-z-index-modal)` (200), `var(--mantine-z-index-popover)` (300), `var(--mantine-z-index-overlay)` (400), `var(--mantine-z-index-max)` (9999).

### No Inline Styles Rule

**Do NOT use the `style={{ ... }}` inline-style prop.** Styling priority, in order:

1. **CSS Modules** (`className={styles.x}`) — the default for any non-trivial styling.
2. **Mantine style props / theme tokens** — `bg`, `c`, `w`, `maw`, `mih`, `p`, `pos`, `flex`, etc. Allowed for simple layout/spacing and one-off properties.

Inline `style` objects are only acceptable for genuinely dynamic values computed at runtime that cannot be expressed via a class or prop (e.g. `style={{ width: ${progress}% }}`). Static values — colors, `overflow`, `background`, etc. — must go through a Mantine prop or a CSS Module class. Move CSS custom properties (`var(--dci-ink)`, hardcoded hex like `#dfe3e7`) into the theme or a `.module.css` file.

### UI Components Rule

**Do NOT use native HTML tags in JSX.** Always use Mantine components instead:

- `<div>` → `<Box>`, `<Flex>`, `<Group>`, `<Stack>`, or `<Grid>` (pick the one matching the layout intent)
- `<span>` → `<Text span>` or `<Box component="span">`
- `<p>`, `<h1>`–`<h6>` → `<Text>`, `<Title>`
- `<button>` → `<Button>`, `<ActionIcon>`, or `<UnstyledButton>`
- `<input>`, `<textarea>`, `<select>` → `<TextInput>`, `<Textarea>`, `<Select>`, `<NumberInput>`, etc.
- `<a>` → `<Anchor>` (or `<Button component={Link}>` for router links)
- `<img>` → `<Image>`
- `<ul>`/`<ol>`/`<li>` → `<List>` / `<List.Item>`
- `<form>` → `<Box component="form">` paired with `@mantine/form`
- `<table>` → `<Table>`

If a Mantine equivalent does not exist for a specific use case, use `<Box component="...">` to render the underlying tag while keeping Mantine's styling system (`className`, style props, theme tokens). Raw HTML tags are only acceptable inside dedicated low-level primitives (e.g., inside a custom component that wraps a Mantine `Box`).

### Internationalization

All user-facing strings go through i18next. Locale files: `src/i18n/ru.json` and `src/i18n/tj.json`. ICU MessageFormat is supported for pluralization. Language is auto-detected from browser/localStorage with Russian as fallback.

**Adding new strings:** add new keys **only** to [src/i18n/locales/ru.json](src/i18n/locales/ru.json). Do NOT add or translate them into `tj.json` — the Tajik translations are done manually by a human.
