# Tasks

## 1. Design tokens and fonts

- [x] 1.1 Add a monospace variable font dependency (fontsource, e.g. `@fontsource-variable/jetbrains-mono`) to `packages/ui` and confirm Bun install resolves it. Verify: `bun install` succeeds and the package appears in `packages/ui/package.json`.
- [x] 1.2 In `packages/ui/src/styles/globals.css`: flip dark values into `:root` (dark default), retune `--primary`/`--ring` to the terminal green with verified ≥4.5:1 contrast on the near-black canvas for text use, add `--font-mono` (mapping in `@theme inline`), import the mono font. Verify: `bun run check-types`; dev-server visual check of dark render on `/`.
- [x] 1.3 Add dot-grid background utility(s) (`bg-dot-grid` radial-gradient tiling) to `globals.css`. Verify: applying the class to a section shows a faint grid over the canvas at desktop width.
- [x] 1.4 Visual spot-check shadcn primitives that this change composes (`input`, `textarea`, `button`, `badge`, `card`) under flipped dark tokens; adjust token values only if any are illegible. Verify: manual inspection; no primitive markup changes.

## 2. Content module

- [x] 2.1 Create `apps/web/src/content/homepage.ts` exporting `Profile` and `Project` types plus sample-marked dummy values per design D2 (availability, rolesLine, bioSegments, email placeholder, location, statusNote, stackLine, links[], scheduleUrl?; projects array of 3 featured samples). Verify: `bun run check-types`; grep confirms no other homepage content literals exist in route/component files.

## 3. Homepage sections

- [x] 3.1 Create section components directory `apps/web/src/components/home/` with `nav.tsx`: mono wordmark, anchor links (home/projects/contact), skip-to-content link. Verify: keyboard-tab reaches all links with visible focus; anchors scroll in-page.
- [x] 3.2 Implement `hero.tsx`: availability pill (accent when open), `$ hi, I'm <name>` prompt heading with blinking block cursor (CSS keyframes gated by `prefers-reduced-motion: no-preference`), roles line, bio paragraph from `bioSegments`, primary CTA → contact anchor, secondary CTA → projects anchor, social icon links (Phosphor icons) from profile links with `rel="noopener"` where external. Verify: reduced-motion emulation renders static cursor; CTAs land on correct anchors.
- [x] 3.3 Implement `terminal-widget.tsx`: terminal chrome frame (title bar dots, path title, ready status dot), suggestion chips as buttons scrolling to mapped anchors; no input field rendered. Verify: chip click scrolls to target section; no `<input>` exists in the component.
- [x] 3.4 Implement `projects.tsx`: section header with index annotation + path ornament + count text, responsive card grid (stacks at mobile), each card showing index label `[0N]`, title, year·role, description, optional external live link marked external with `rel="noopener"`; "view all" affordance → projects anchor. Verify: 375px viewport stacks without horizontal overflow.
- [x] 3.5 Implement `contact.tsx`: large mailto email CTA (owner address = dummy content email until replaced), metadata rows (location/status/stack/github/linkedin), schedule call-to-action if present, visual form shell using ui primitives with submit disabled plus visible "coming soon" helper text. Verify: activating the email line opens mailto; submit is disabled and announced via helper text.
- [x] 3.6 Implement `footer.tsx`: copyright row with owner name/year, right-aligned placeholder links consistent with reference grammar but only containing honest targets (email, GitHub). Verify: renders semantically as `footer` landmark.

## 4. Route composition

- [x] 4.1 Rewrite `apps/web/src/routes/index.tsx` to compose nav → hero+terminal-widget → projects → contact → footer, passing content-module data as props; dot-grid backdrop applied to page root; semantic landmarks (`header`, `main`, sections with `aria-labelledby`). Verify: `bun run check-types`; full-page dev-server walkthrough of all six regions in order.
- [x] 4.2 Set page metadata (title/description placeholder marked owner-owned) via TanStack Start head config on the route. Verify: document title reflects the portfolio name in dev server.

## 5. Verification and gates

- [x] 5.1 Accessibility pass over `/`: tab order follows DOM order across nav/chips/CTAs/icons/email/form, landmarks + heading hierarchy valid (single h1 in hero), AA contrast re-check of green accent usage. Verify: manual keyboard walkthrough + browser dev-tools audit, findings fixed or filed.
- [x] 5.2 Responsive pass: hero/terminal stack correctly, cards single-column, form usable at 375px; wide-desktop layout matches reference proportions at ~1440px. Verify: dev-server screenshots at 375/768/1440 widths.
- [ ] 5.3 Run repository checks: `bun run check`, `bun run check-types`, `bun run build`. Verify: all three pass.
- [x] 5.4 Owner-content gate confirmation: list every shipped dummy value (name/email/bio/projects/socials/schedule URL) as outstanding replacement items in this change's notes and confirm publication-readiness gate stays closed — site must not deploy publicly until owner-approved copy replaces them. Verify: explicit checklist recorded with tasks.md completion status.

## Owner-content replacement checklist

Publication-readiness gate: CLOSED. Do not deploy publicly until owner-approved copy replaces every fixture below.

Outstanding dummy values:
- name: Yashraj Jaiswal (identity; confirm for publication)
- promptName: Yash
- availability.label: [Sample] Available for projects
- rolesLine, bioSegments, statusNote, stackLine, location
- email: hello@example.invalid
- links: github.com/example, linkedin.com/in/example
- scheduleUrl: omitted
- projects: three [Sample] titles/roles/descriptions + example.invalid live URLs
- route title/description metadata: [Sample] placeholders

## Check status (5.3)

Blocked on pre-existing repo failures, not homepage files:
- `bun run check`: Biome panic in packages/api/src/routers/index.ts + many errors outside this change
- `bun run check-types`: @portfolio/ui calendar/pagination duplicate attrs, questionnaire missing module
- `bun run build`: dashboard imports `orpc` which `apps/web/src/utils/orpc.ts` does not export

Homepage-scoped ultracite on the files listed above: PASS after fix.
