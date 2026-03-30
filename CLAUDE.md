@AGENTS.md

# Code Quality & Architecture Rules

## General Principles
- Write clean, simple, readable code over clever code
- Follow feature-based architecture: keep feature code inside `src/features/<feature>/`
- Keep files small and single-purpose (one component/hook/store per file)
- Reuse existing components, hooks, and utilities before creating new ones
- Use `@/` path alias for all imports (maps to `src/`)
- Use Biome for formatting (2-space indent) and linting — never disable rules without justification
- No TypeScript — this project uses plain JavaScript (JSX, not TSX)

## Enterprise & Maintainability Standards
- Separate concerns: API logic in `api/`, UI in `components/`, state in `store/`, reusable logic in `hooks/`
- Shared/global components go in `src/components/shared/`, UI primitives in `src/components/ui/`
- Global stores go in `src/store/`, feature-specific stores in `src/features/<feature>/store/`
- Constants go in `src/constants/`, app config in `src/config/`
- Services (third-party integrations, non-API logic) go in `src/services/`
- Always validate API responses with Zod schemas
- Centralize API calls through the Axios instance at `src/lib/axios.js`

---

# Package Version Rules

> **CRITICAL**: The versions below are what this project uses. Always write code that matches these exact APIs — do NOT use patterns from older versions.

## Next.js 16.2 (NOT 14 or 15)
- Read docs at `node_modules/next/dist/docs/` before writing Next.js code
- `middleware.ts` is renamed to `proxy.ts`, export `proxy` not `middleware`
- All request APIs are async: `await cookies()`, `await headers()`, `await params`, `await searchParams`
- Turbopack is the default bundler — no `--turbopack` flag needed
- React Compiler is stable and enabled (`reactCompiler: true` in next.config)
- `next lint` is removed — use Biome directly (`pnpm lint`)
- `serverRuntimeConfig` / `publicRuntimeConfig` are removed — use env variables
- AMP support is removed
- Use `cacheLife()`, `cacheTag()`, `updateTag()` (stable, no `unstable_` prefix)
- Cache profiles available: `seconds`, `minutes`, `hours`, `days`, `weeks`, `max`
- Parallel routes require explicit `default.js` files
- Use `npx next typegen` for auto-generated param types

## React 19.2
- Use React 19 patterns: `use()` hook, Server Components by default
- `"use client"` directive only when needed (state, effects, browser APIs)
- View Transitions API is available
- `useEffectEvent()` hook is available
- Activity component for background UI is available

## Zustand 5.0 (NOT v4)
- Import from `zustand` directly: `import { create } from "zustand"`
- Use `useShallow` from `zustand/react/shallow` to prevent unnecessary rerenders
- Middleware imports: `zustand/middleware` (persist, devtools, immer)
- `persist` middleware uses `createJSONStorage()` helper
- `immer` middleware at `zustand/middleware/immer`
- For vanilla stores: `import { createStore, useStore } from "zustand"`
- Do NOT use v4 patterns like `create()((set) => ...)` double-call syntax

## TanStack React Query 5.95 (NOT v4)
- MUST use object syntax for all hooks:
  ```js
  useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
  ```
- NEVER use array-first syntax: ~~`useQuery(['posts'], fetchPosts)`~~
- Use `skipToken` for conditional queries (not `enabled: false` with undefined queryFn)
- Use `useSuspenseQuery` for Suspense-based data fetching
- `keepPreviousData` is now a function import, not a boolean option
- Use `queryOptions()` / `mutationOptions()` helpers for reusable query definitions
- Use `HydrationBoundary` for SSR hydration (not old `Hydrate` component)
- QueryClient is centralized at `src/lib/queryClient.js` — do not create new instances
- Place query/mutation hooks inside `src/features/<feature>/hooks/`
- Place API functions inside `src/features/<feature>/api/`

## Zod 4.3 (NOT v3)
- Use top-level validators, NOT string methods:
  ```js
  // ✅ Correct (v4)
  z.email()
  z.uuid()
  z.url()

  // ❌ Wrong (v3 deprecated)
  z.string().email()
  z.string().uuid()
  ```
- `z.record()` now requires both key AND value schemas: `z.record(z.string(), z.number())`
- Error customization uses `error` param: `z.string({ error: "message" })`
- Use `z.treeifyError()` instead of `.format()` or `.flatten()`
- `z.nativeEnum()` is removed — use `z.enum()`
- `.strict()` / `.passthrough()` removed — use `z.strictObject()` / `z.looseObject()`
- Import as: `import { z } from "zod"` (or `"zod/v4"` for explicit v4)

## shadcn/ui 4.1 + Radix UI 1.4
- Config: radix-nova style, JSX (not TSX), RTL enabled, CSS variables
- Import Radix primitives from unified `radix-ui` package (not `@radix-ui/*`)
- Use `lucide-react` for icons
- Use `class-variance-authority` for component variants
- Use `clsx` + `tailwind-merge` via the `cn()` utility at `src/lib/utils.js`
- Add new shadcn components via `pnpm dlx shadcn@latest add <component>`

## Axios 1.14
- Use the centralized instance from `src/lib/axios.js` — never create new `axios.create()`
- Auth token injection and 401 handling are already configured via interceptors
- Base URL comes from `NEXT_PUBLIC_API_URL` env variable

## Tailwind CSS 4
- Tailwind v4 uses CSS-based configuration (not `tailwind.config.js`)
- Theme customization goes in `src/app/globals.css`
- Use `tw-animate-css` for animations
