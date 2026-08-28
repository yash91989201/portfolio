---
name: portfolio-schema
description: Schema and type conventions for the portfolio monorepo. Use whenever defining Zod schemas, creating schema files, importing types, or working with src/lib/schemas, src/lib/types, or @portfolio/* packages. Covers schema definition with Zod (v4), auto-generated types via scripts/type-generator.ts, file organization, and monorepo import rules. Trigger on ANY task involving schemas, types, validation, or data models — even if the user doesn't explicitly say "schema."
---

# Schema Conventions

## Core Rules

1. **Always use Zod (v4)** for schema definitions. No hand-written types for data shapes.
2. **Types are auto-generated per workspace** in `<workspace>/src/lib/types.ts` — never edit this file manually. Generation is driven by `scripts/type-generator.ts` (watch: `bun run dev:type-generator`; one-shot: `bun scripts/type-generator.ts`).
3. **Import types from the generated `types.ts`**, never directly from schema files:
   - Web app → `@/lib/types`
   - Packages → `@portfolio/<pkg>/lib/types` (e.g. `@portfolio/api/lib/types`) or relative `../lib/types`
4. **Group schemas by domain** in `<workspace>/src/lib/schemas/` — one file per domain (all auth schemas in `auth.ts`, all workspace schemas in `workspace.ts`). Don't split one domain across many one-schema files; don't lump unrelated domains together. No nested directories under `schemas/`.
5. **Filenames**: lowercase, single domain noun (`auth.ts`, `workspace.ts`, `user.ts`). Dashes for compounds (`user-profile.ts`).

## Schema Definition

```ts
import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
});
```

For input/output transforms (e.g. passwords, file uploads, parsed dates), also export `<Name>Input` / `<Name>Output` schemas — the generator derives types for all three suffixes.

## Type Inference (auto-generated)

`scripts/type-generator.ts` scans every workspace that has `src/lib/schemas/` for `export const <Name>(Schema|Input|Output) =` and writes `<workspace>/src/lib/types.ts`:

```ts
// AUTO-GENERATED FILE. DO NOT EDIT.
import type { z } from "zod";
import type { UserSchema } from "./schemas/user";
export type UserType = z.infer<typeof UserSchema>;
```

Derived names (see `toTypeName` in the generator):

| Schema export | Generated type |
|---|---|
| `UserSchema` | `UserType` |
| `UserInput` | `UserInputType` |
| `UserOutput` | `UserOutputType` |

So `LogInFormSchema` → `LogInFormType`. Never `z.infer` inside components — import the generated type:

```ts
import type { User } from "@/lib/types";
```

## Monorepo Structure

Nx workspaces. Apps: `web` (TanStack Start). Packages: `api` (oRPC routers + context), `auth` (better-auth), `db` (Drizzle), `env`, `ui` (shared UI), `config` (shared biome/tsconfig).

Schemas live per workspace at `src/lib/schemas/`; types are auto-generated to `src/lib/types.ts` in the same workspace.

| Workspace | Schemas | Generated types (import as) |
|---|---|---|
| `apps/web` | `apps/web/src/lib/schemas/` | `apps/web/src/lib/types.ts` → `@/lib/types` |
| `packages/api` | `packages/api/src/lib/schemas/` | `packages/api/src/lib/types.ts` → `@portfolio/api/lib/types` |
| `packages/auth` | `packages/auth/src/lib/schemas/` | `packages/auth/src/lib/types.ts` → `@portfolio/auth/lib/types` |

### Import Rules

- Frontend schemas/types → `@/lib/schemas`, `@/lib/types` (web app only).
- Shared UI → `@portfolio/ui/*` (alias → `packages/ui/src/*`; see `packages/ui/components.json`).
- Other packages → `@portfolio/<pkg>/*` (e.g. `@portfolio/api/*`, `@portfolio/auth/*`).
- There is **no `@server/lib/*` alias**. Server logic lives in `packages/api` (oRPC) and `packages/auth` (better-auth).

### File Layout

```
apps/web/src/lib/
  schemas/
    auth.ts          ← login, signup, magic-link, password-reset, ...
    profile.ts       ← update-profile, change-email, ...
  types.ts           ← auto-generated, do not edit

packages/api/src/lib/
  schemas/           ← oRPC request/response schemas
  types.ts           ← auto-generated
```

## Zod v4 Notes

- Use `z.email()` (not the deprecated `z.string().email()`) for emails.
- `.transform()` produces an `Output` type distinct from the `Input` type — export both `XSchema` and `XInput`/`XOutput` when you need to reference either side in forms or routers.
