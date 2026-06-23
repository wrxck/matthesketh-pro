# Open Source & Apps Showcases — Design

Date: 2026-06-22
Status: Approved (design), pending implementation plan
Repo: `wrxck/matthesketh.pro` (UtopiaJS config-driven landing page)

## Goal

Add two new sections to the landing page, ordered **above** the existing CV card:

1. **Open Source Software** → full-screen, mobile-responsive bento grid of curated public GitHub repos, each tile fully themed to its project.
2. **Apps** → the same bento treatment, seeded with one app, **Whey to Go** (`wheytogo.app`), whose tile inherits that app's own brand. The grid is built to scale to more apps later.

It must "look cool af": deliberate bento composition, per-app theming, and a level of polish that survives a designer's keen eye at every screen size.

## Non-negotiable quality bar (read first)

This design is not "done" when the code compiles or when it looks right in one viewport. Per Matt's standing instruction, components are frequently rushed and declared done prematurely. To prevent that, the implementation is only complete when **all** of the following hold, with rendered evidence:

- The app is actually built/served and rendered in a real browser — not asserted from reading code.
- Each page (`/`, `/open-source`, `/apps`) is screenshotted at **four viewports**: mobile `375×812`, tablet `768×1024`, desktop `1280×800`, large `1920×1080`.
- Each screenshot is critiqued for: grid alignment & gutters, vertical rhythm/spacing, text overflow/truncation, tile aspect ratios at each breakpoint, tap-target size (≥44px) on mobile, colour contrast (themed tiles included), hover/focus/active states, the `← back`/Esc affordance, and the **one-app Apps grid not looking empty or broken**.
- Defects found are fixed and the page re-screenshotted to confirm. Iterate until polished.
- Reduced-motion and keyboard navigation (tab order, Esc-to-close, focus-visible) are verified.

The implementation plan must carry a dedicated "visual verification & polish" phase that blocks completion, with the screenshots retained as evidence.

## Architecture

### Routing
Introduce `@matthesketh/utopia-router`. `src/main.ts` builds a router with three routes and mounts a `RouterView`:

- `/` → `App.utopia` (existing landing, lightly edited)
- `/open-source` → `OpenSource.utopia`
- `/apps` → `Apps.utopia`

Router API per project conventions: `createRouter(routes[])` with simple `{path, component}` configs; `createRouterView()` used as `<RouterView />`; route state via the `currentRoute` signal (not `useRoute`). Internal nav cards use router navigation; external links (GitHub, app URLs) remain plain `<a>`.

### Landing changes (`App.utopia`)
Insert two internal nav cards at the **top** of `.nav-cards`, before CV:
1. Open Source Software — "Libraries, tools, and MCP servers" → `/open-source`
2. Apps — "Things I've shipped" → `/apps`

Existing CV / Blog / GitHub cards keep their current order and styling beneath. Internal cards navigate via the router; they are visually consistent with existing cards but must not regress the current hover-invert behaviour.

### Shared components
- **`src/components/BentoGrid.utopia`** — full-screen page shell. Sticky header (page title + `← back` link to `/`), responsive CSS grid, owns the Esc-to-close and focus management. Columns: 4 (≥1100px) → 2 (≥640px) → 1 (<640px). Accepts a title and the list of tiles.
- **`src/components/BentoTile.utopia`** — a single tile. Receives a normalised tile model and applies its theme as **inline CSS custom properties** (`--tile-bg`, `--tile-ink`, `--tile-accent`, `--tile-muted`) so themed colour tiles live in isolation inside the otherwise strict black/white site. Props/data drive: size span (`sm | md | lg | wide | tall`), title, subtitle/blurb, meta row (stars ★, language dot, updated), optional glyph/motif SVG, and the destination URL. Hover state uses the tile's own accent, not a global one.

Both components have one clear purpose and a documented prop contract, testable in isolation.

### Data layer — `src/lib/github.ts`
- `fetchRepos(username): Promise<Repo[]>` — `GET https://api.github.com/users/{username}/repos?per_page=100&sort=updated`.
- **Cache**: persist the raw response in `localStorage` under a versioned key with a timestamp; TTL ~6h. In-memory promise dedupe so one page render = at most one network call. A visitor therefore triggers ≤1 call per 6h, far under the 60/hr unauthenticated limit.
- **Resilience**: on HTTP 403 (rate limit), network error, or offline → use stale cache if present; otherwise resolve to `[]`. Tiles always render from config metadata even when live data is absent — stars/language simply omit. No loading spinner that can get stuck; show config-based content immediately and hydrate live numbers when they arrive.
- Pure, framework-free module; the components import it.

### Configuration (`site.config.ts`)
Two new config blocks, keeping the file template-shaped but seeded with Matt's real data.

```
openSource: {
  username: 'wrxck',
  featured: [
    { repo: 'telegram-bot-lua', span: 'lg', theme: {...}, glyph?, blurb? },
    ...
  ],
}
apps: {
  items: [
    {
      name: 'Whey to Go',
      tagline: 'Nutrition, training & trends',
      blurb: 'Log food in seconds, plan training, watch your trends — private on-device.',
      url: 'https://wheytogo.app',
      span: 'lg',
      theme: { bg: '#f4f3ef', ink: '#111110', accent: '#16a34a', muted: '#4a4943' },
      glyph: 'whisk',
    },
  ],
}
```

`featured` is the **curation list**: it decides which repos appear, their order, their tile size, and their per-app theme. Live GitHub data is merged onto each entry by `repo` slug. A featured slug missing from the API still renders (from config), just without live stars.

### Curation (Open Source)
~20 standouts seeded; Matt trims.
- **Hero / large**: `telegram-bot-lua` (204★), `mattata` (127★), `auto-audit`, `srag`, `fleet`, `utopiajs` (badged "powers this site").
- **Medium**: the MCP servers and tools — `reddit-mcp`, `infrastructure-mcp`, `cloudflare-mcp` ("2,655 operations"), `openapi-mcp`, `trilium-mcp`, `agenttop`, `behavior-hooks`, `fontvibe`, `wiremock-ts`, `gh-baseline`, the dev-servers (`smtp-dev-server`, `microsoft-dev-server`, `stripe-dev-server`), `ink`, `react-storyteller`.
- **Collapse**: the ~12 `*-guard` / `*-quality` Python plugins represented by a single `claude-plugins` tile.
- Empty/trivial repos (`sounds`, `ughf.ml`, `wrxck.pro`, `website`, etc.) are excluded.

### Theming model ("full per-app theming")
Every tile carries its own `{bg, ink, accent, muted}`. Default accent = the language's canonical colour (Rust orange, Go cyan, TS blue, Lua navy, Python blue/yellow, Java red, Shell green, etc.) on a near-white/near-black base consistent with the site; hero tiles are hand-tuned. The **Whey to Go** tile is the exemplar of full inheritance: cream bg, ink text, green accent, whisk-knot glyph derived from the app's favicon. `/open-source` and `/apps` therefore intentionally introduce colour while the landing page (`/`) stays strict black/white.

## Accessibility & motion
- Each tile is a single focusable link with an accessible name (project + short purpose). Meta (stars/lang) is `aria-hidden` decoration or properly labelled.
- `← back` and Esc both return to `/`; focus moves to the page heading on entry and returns sensibly on exit.
- Respect `prefers-reduced-motion` (already handled globally) — no transform/opacity animation when reduced.
- Contrast checked on themed tiles, including hover/invert states.

## Validation & verification
- Extend `scripts/validate-config.ts` (runs on `prebuild`) to validate the `openSource` and `apps` shapes: required fields, known `span` values, hex-colour themes, non-empty `featured`/`items`. Fail the build on malformed config — matches the repo's existing validation convention.
- No unit-test runner exists in this repo; correctness of layout/visuals is established by the **visual verification phase** (above), plus a build (`utopia build` / `preview`) that must succeed with no console errors.

## Files
- `+ src/OpenSource.utopia`
- `+ src/Apps.utopia`
- `+ src/components/BentoGrid.utopia`
- `+ src/components/BentoTile.utopia`
- `+ src/lib/github.ts`
- `~ src/main.ts` (router + RouterView)
- `~ src/App.utopia` (two internal nav cards above CV)
- `~ site.config.ts` (`openSource`, `apps`)
- `~ scripts/validate-config.ts` (validate new config)
- `~ package.json` (add `@matthesketh/utopia-router`)

## Out of scope
- Replacing the existing placeholder identity fields in `site.config.ts` (name/bio/contact) — unrelated to this feature.
- Server-side rendering of live GitHub data (client fetch + cache is sufficient for a static site).
- Unrelated refactors of the existing landing layout beyond inserting the two cards.

## Open follow-ups (not blocking)
- If the unauth rate limit ever bites in practice, a build-time snapshot fallback could be added later; cache + graceful degradation covers it for now.
