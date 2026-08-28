# Design

See [proposal.md](./proposal.md) for motivation and scope; see the homepage spec for behavioral contracts.

## Context

`apps/web` runs TanStack Start (React 19, Vite 8, Nitro SSR) with file-based routes; `/` currently renders one text line. `packages/ui` owns shadcn primitives (`base-mira`, Phosphor icons) and `src/styles/globals.css` tokens — currently light-default with a green `--primary` in oklch. Fonts installed via fontsource: Oxanium Variable and Geist Variable. No DB/API/auth work exists or is wanted for this change; the reference adaptation is layout/interaction only.

## Goals / Non-Goals

**Goals**: dark-first token foundation; four composed sections on `/`; a swap-ready typed content module; honest static affordances; AA accessibility on the dark canvas.

**Non-Goals**: server data flow of any kind; new shared UI primitives (sections are app compositions); theme-toggle *behavior* (placeholder control visual only); additional routes.

## Decisions

### D1: Tokens change centrally in `packages/ui/globals.css`; sections stay app-side

Flip `.dark` values into `:root` (dark default), retune `--primary` to the reference's bright terminal green (oklch ≈ `0.85 0.21 155` range, verified against AA contrast needs), add `--font-mono`. Prose/body remains Geist; mono goes to headings/nav/labels/buttons.

*Alternatives*: (a) leave root light and set `class="dark"` at app root — rejected because "dark default" then depends on an attribute every future page must remember; flipping root makes the whole product dark-native. (b) Put mono everywhere including prose — rejected, hurts bio readability as the reference itself demonstrates (prose body isn't mono there).

Dot-grid becomes two utilities in globals.css (a `bg-dot-grid` backdrop layer via radial-gradient tiling, plus a masked variant if needed). This is styling, not a component — reusable without owning markup.

### D2: One content module, types defined where data lives

`apps/web/src/content/homepage.ts` exports `profile: Profile` and `projects: Project[]` plus those exported types. Field shapes anticipate the future API:

```
Profile { name, promptName?, availability: {open: boolean, label}, rolesLine,
          bioSegments?: (string | {accent})[] /* render hints OK */, email,
          location, statusNote, stackLine, links: {kind: 'github'|'linkedin'|'email', href, label}[],
          scheduleUrl? }
Project { index, title, year, role, description, liveUrl?, featured: boolean }
```

Values carry obvious sample markers (e.g., titles like `[Sample] Realtime Dashboard`). `bioSegments` avoids needing rich-text infrastructure while allowing accent spans like the reference's inline green phrases.

*Alternatives*: (a) JSON file + zod parse — overkill pre-API, adds runtime validation of our own literals; types suffice. (b) Inline literals per section — rejected, this is exactly the archaeology cost we're avoiding. (c) Markdown/MDX content — wrong weight for singleton profile + flat project list.

### D3: Sections as pure presentational components taking typed props

`apps/web/src/components/home/{nav,hero,terminal-widget,projects,contact,footer}.tsx`. Each imports nothing but primitives (`@portfolio/ui`) and receives content via props from the route. The route (`routes/index.tsx`) composes: imports content module → passes props. API-swap cutover later = route starts fetching instead of importing statics; components untouched.

Metadata/title set through TanStack Start head API on the route, marked owner-placeholder.

*Alternatives*: colocation of content inside sections — rejected above; a `HomePageContext` provider — rejected as indirection with a single consumer.

### D4: Honest static affordances

- Terminal widget: chrome frame + header dots + title (`~/ask-me.sh` style annotation with *your* naming), green ready dot, suggestion chips as anchor-scroll buttons. No input field rendered at all.
- Contact form: full visual form using existing ui primitives (`Input`, `Textarea`, `Button`, `Label`), submit button `disabled` with visible helper text ("backend coming soon"); big email line is the real working CTA.
- Theme toggle icon in nav renders but is inert-cosmetic... **Decision**: omit it rather than ship a control that does nothing. A visible non-functional toggle fails the same honesty bar as the fake chat input. Add it when theming behavior exists.

*Alternatives*: skeleton-ing these off entirely — rejected; spec requires visually complete contact shell to validate the section layout that admin features will later populate.

### D5: Motion minimal and single

Only signature animation: blinking block cursor after the hero name, CSS keyframes gated behind `prefers-reduced-motion: no-preference`. No scroll-triggered reveals, no typewriter effects — they multiply review surface and fail-silent-animally degrade.

*Alternatives*: typewriter intro matching terminal vibe — deferred; can be added by same pattern later if wanted.

## Risks / Trade-offs

- [Green-on-black AA contrast] → verify chosen oklch green against near-black ≥ 4.5:1 for text use; use lighter tint or limit to large/graphic elements if borderline.
- [Dark flip ripples into packages/ui primitives] → all primitives consume tokens already; verify visually on key shadcn surfaces used (input, textarea, card, badge) rather than assuming.
- [Dummy shapes drift from eventual API design] → mitigation is precisely that this drift is cheap now; note shapes as non-normative preview in spec/design so the future content-infra change owns reconciling them.
- [SSR flash] → tokens are CSS-only (no JS theming), so no flash risk exists; keep it that way by not introducing class-toggling now.

## Migration Plan

Additive UI work on `/`; nothing to migrate. Rollback = revert commit. Publication gate: site MUST NOT be deployed publicly before owner-content replacement tasks complete (tracked in tasks.md).

## Open Questions

None blocking. Two deliberate deferrals recorded: theme-toggle behavior and full SEO/sitemap work — both belong to later changes and do not affect specs or this task breakdown.
