## Why

The portfolio is an empty scaffold: the homepage renders a single line of text and no public surface exists. The site's visual direction — a terminal-aesthetic dark portfolio — has been chosen against a reference (akkila.dev), but nothing in the repository expresses it. Building the homepage UI first, as a static page fed by typed dummy content, unblocks all later functionality work (DB, API, admin CRUD) because those layers will write into interfaces the homepage already defines.

## What Changes

- Establish the site's design foundation: dark-default theme tokens (near-black canvas, surgical green accent), a monospace display/Chrome font alongside readable prose fonts, and a faint dot-grid background utility in `packages/ui` global styles.
- Build the homepage in `apps/web` from four sections, adapted from the reference's layout ideas only:
  - Nav bar with mono wordmark, in-page anchor links, theme-toggle placeholder.
  - Hero: availability pill, prompt-style greeting with blinking cursor, roles line, bio paragraph, CTA buttons, social icon links.
  - Selected projects: numbered project cards with year/role metadata, path annotations, "view all" affordance.
  - Contact section: large mailto CTA, metadata rows, visually complete but non-submitting form shell; footer with copyright row.
- Add a decorative terminal widget (framed terminal chrome, suggestion chips that scroll to page anchors) — visual only.
- Introduce a single typed dummy-content module (`src/content/homepage.ts`) defining `Profile` and `Project` shapes whose values are unmistakably sample data; sections consume it via props so a later change can swap the source to an API without touching JSX.

### Explicit Non-Goals

- Database schemas, migrations, or Drizzle changes (`packages/db`).
- oRPC contracts or any server data fetching (`packages/api`).
- Admin panel, auth-gated writes, or CMS behavior.
- Real contact-form submission (mutation, rate limiting, email delivery); submit stays disabled with `mailto:` as the working contact path.
- LLM- or Q&A-backed chat behind the terminal widget.
- Any route beyond `/`; nav items scroll to in-page anchors.

## Capabilities

### New Capabilities

- `homepage`: The public homepage — nav, hero, terminal widget, selected projects, contact section, footer — including its dummy-content contract and honest-affordance rules for static phase.

### Modified Capabilities

- None. No main specs exist yet; this is the first capability spec.

## Impact

- **Packages**: `apps/web` (routes, components, content module), `packages/ui` (global styles/tokens only — no new primitives expected; existing shadcn components may be composed).
- **Owner input**: Final bio copy, role line, project list, social links, and real email address are NOT provided. All shipped text is labeled sample content; an owner-content replacement task remains open at completion and publication gates stay closed.
- **Accessibility**: Keyboard navigation, semantic landmarks, focus visibility, contrast on near-black canvas, and `prefers-reduced-motion` handling for the blinking-cursor effect are in scope for this UI work.
- **SEO/deployment**: Minimal metadata on `/` in scope (title, description placeholder marked as owner-owned). Full SEO/sitemap/RSS hardening deferred to launch work.
- **Dependencies**: None on other OpenSpec changes. Future changes (content infrastructure, admin panel) will depend on the field shapes this change introduces.
