---
name: portfolio-ui
description: UI and design system conventions for the portfolio monorepo. Use when building or styling any frontend component, working with Tailwind classes, design tokens, shadcn primitives, or the @portfolio/ui shared package. Enforces token-driven styling from packages/ui/src/styles/globals.css, bans ad-hoc hex values and arbitrary pixels. Trigger on ANY UI or styling task — component creation, styling changes, layout work, or when touching className or style props.
---

# UI & Design System Conventions

## Source of Truth

All UI foundations are centralized in **`packages/ui`** (shadcn `base-mira` style, Phosphor icons):

- Shared components → `packages/ui/src/components`
- Theme tokens → `packages/ui/src/styles/globals.css`
- Utilities/hooks → `packages/ui/src/lib`, `packages/ui/src/hooks`

Import via the `@portfolio/ui/*` aliases (see `packages/ui/components.json`):

- `@portfolio/ui/components` — UI primitives
- `@portfolio/ui/lib/utils` — `cn()` and helpers
- `@portfolio/ui/hooks` — shared hooks
- `@portfolio/ui/lib` — lib modules

Use the shared UI package instead of redefining styles locally in app code.

## Styling Rules

**Colors** — Use only design-system tokens / Tailwind classes from the shared theme. No custom hex values unless intentionally added to the design system in `globals.css` first.

**Spacing & Sizing** — Use the project spacing scale (`p-4`, `m-6`, `gap-2`). Avoid arbitrary pixel values (`p-[11px]`).

**Border Radius** — Use predefined radius tokens/utilities only (`rounded`, `rounded-lg`).

**Typography** — Use project font sizes / weights / line-height utilities.

**Icons** — Use `@phosphor-icons/react` only (the project's `iconLibrary` is phosphor). Don't mix in other icon sets (e.g. tabler, lucide).

## Component Usage

- Prefer shared components from `packages/ui/src/components` (e.g. `Button` from `@portfolio/ui/components/button`).
- Keep customizations token-driven and minimal.
- If overriding behavior/styles, inspect the base shadcn component first and override at the usage site intentionally.
- Add new primitives via the shadcn CLI (`components.json`) — they land in `packages/ui/src/components`.

## Example

```tsx
// ✅ Correct — token-driven classes
<Button className="bg-primary text-primary-foreground rounded-lg p-4">
  Click Me
</Button>

// ❌ Incorrect — ad-hoc values
<Button style={{ backgroundColor: '#ff1234', padding: '11px', borderRadius: '7px' }}>
  Click Me
</Button>
```

## Why This Matters

Ad-hoc styling drifts: one developer uses `#ff1234`, another uses `primary`, and the UI looks inconsistent. Token-driven styling keeps the entire app visually coherent and makes theme changes (dark mode, rebrand) a single-file edit in `globals.css`.
