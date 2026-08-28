# homepage Specification

## Purpose

Defines the static homepage at route `/`: layout, visual identity, section composition, dummy content contract, and accessibility expectations for the portfolio landing page. Excludes database, API, authentication, form submission, and chat behavior; later capabilities replace the static content source without redefining page behavior.

## Requirements

### Requirement: Page composition

The homepage SHALL present, in order: a navigation bar, a hero section, a decorative terminal widget alongside the hero, a featured-projects section, a contact section, and a footer. Navigation items SHALL scroll to corresponding in-page anchors; no navigation item shall navigate to a nonexistent route.

#### Scenario: Full-page render

- **WHEN** a visitor loads `/`
- **THEN** all six regions are visible in order: nav, hero with terminal widget, selected projects, contact, footer
- **AND** each nav item scrolls smoothly to its target section

#### Scenario: Nav links never dead-end

- **GIVEN** every nav item targets an in-page anchor
- **WHEN** a visitor activates any nav item via keyboard or pointer
- **THEN** focus and view move to the target section without a 404 or blank navigation

### Requirement: Visual identity

The homepage SHALL use a dark-first visual system: near-black canvas with a faint dot-grid backdrop, a single green accent used only for status indicators, prompts, links, and primary calls to action, monospace typography for headings/nav/labels/chrome, and readable proportional type for prose paragraphs. The theme SHALL be dark by default.

#### Scenario: Dark default

- **GIVEN** a visitor with no stored theme preference
- **WHEN** they load `/`
- **THEN** the page renders dark (near-black background, light text) with no flash of light theme

#### Scenario: Prose readability

- **WHEN** a bio paragraph is displayed
- **THEN** it uses the readable body font at accessible contrast, while headings, nav, buttons, and labels render in monospace

### Requirement: Hero section

The hero SHALL display an availability status pill, a prompt-style greeting containing the owner's name rendered with a blinking block cursor, a roles/stack/location line, a short bio paragraph, one primary call-to-action linking to the contact section, one secondary call-to-action linking to the projects section, and social profile icon links. Blinking or animated elements SHALL respect `prefers-reduced-motion`.

#### Scenario: Reduced motion

- **GIVEN** a visitor whose OS enables reduced-motion
- **WHEN** the hero renders
- **THEN** the cursor is shown statically (no blinking animation)

#### Scenario: CTA targets

- **WHEN** the visitor activates either hero call-to-action
- **THEN** they are brought to the contact or projects section respectively

### Requirement: Decorative terminal widget

The homepage SHALL include a terminal-styled panel with terminal window chrome (title bar, status indicator) and suggestion chips. Chips SHALL be honest controls: activating one scrolls to a relevant page anchor. The widget SHALL NOT present a text input claiming connectivity to a live assistant during the static phase.

#### Scenario: Chip activation

- **WHEN** a visitor activates a suggestion chip
- **THEN** the page scrolls to the chip's mapped section
- **AND** no message is sent to any backend

#### Scenario: No fake chat

- **GIVEN** no chat backend exists
- **WHEN** the widget renders
- **THEN** it presents no input field inviting a question to be answered

### Requirement: Selected projects section

The projects section SHALL render a heading with section index annotation and path ornament, followed by a grid of project cards. Each card SHALL display an index label (`[01]`-style), project title, year, role, description, and optionally an external live link marked as opening externally. Card count metadata SHALL display total-count text appropriate for static content. A "view all" affordance SHALL link to the projects section anchor (full listing being out of scope).

#### Scenario: Card completeness

- **WHEN** the projects section renders with N sample projects
- **THEN** each card shows index label, title, year, role, and description
- **AND** external live links carry `rel="noopener"` and indicate external intent

### Requirement: Contact section

The contact section SHALL display a prominent email address as a working `mailto:` link, owner metadata rows (location, status, stack, profiles), and an optional scheduling call-to-action. It SHALL also render a visually complete contact form shell whose submit control is disabled with an explanatory state — so visitors cannot enter data that would silently fail.

#### Scenario: Working mailto

- **WHEN** the visitor activates the large email address
- **THEN** their mail client opens with the site owner's address

#### Scenario: Inert form disclosed

- **GIVEN** the form has no submission backend
- **WHEN** the visitor inspects or focuses the form
- **THEN** the submit control is visibly disabled and communicates why (e.g., "coming soon")

### Requirement: Static dummy-content contract

All homepage text and data (profile fields, availability, roles, bio, links, projects) SHALL come from one typed content module whose `Profile` and `Project` types define the field shapes a future API will return. Dummy values SHALL be unmistakably non-production (sample-marked), MUST NOT assert real achievements, employment history, metrics, or testimonials about the site owner, and Sections SHALL consume this module rather than embedding literals in component trees. Replacing the content source with API data MUST require changing only the data-fetching layer, not section components.

#### Scenario: Sample-only content

- **GIVEN** owner-approved copy does not exist yet
- **WHEN** any homepage section renders
- **THEN** displayed values derive from sample-marked dummy records that cannot be mistaken for verified owner claims

#### Scenario: Swap-ready shape

- **WHEN** a future change replaces the dummy content provider with an API response typed as `Profile`/`Project`
- **THEN** no section component's JSX changes because props/types already match

### Requirement: Responsive and accessible presentation

Each homepage section SHALL remain usable and legible from mobile through wide desktop widths. All interactive elements SHALL be keyboard-operable with visible focus, honor semantic landmarks and heading hierarchy, and maintain WCAG AA contrast against the dark canvas including the green accent on near-black backgrounds.

#### Scenario: Mobile layout

- **GIVEN** a viewport of 375px width
- **WHEN** the homepage renders
- **THEN** hero, terminal widget, project cards, and contact form stack vertically with no horizontal overflow or truncated interactive targets

#### Scenario: Keyboard operation

- **WHEN** a keyboard user tabs sequentially through the page
- **THEN** nav links, chips, CTAs, social icons, email link, and form controls receive visible focus in DOM order
