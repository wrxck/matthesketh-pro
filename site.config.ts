// ---------------------------------------------------------------------------
// Shared theme tokens for showcase tiles. Kept here so the whole showcase
// reads from one palette and Matt can retune it in a single place.
// ---------------------------------------------------------------------------
const INK = '#111110'

export const config = {
  name: 'Matt Hesketh',
  title: 'Software Engineer',
  description: 'Software Engineer. Full-stack, mainframe, AI.',
  locale: 'en_GB',
  themeColor: '#ffffff',
  url: 'https://matthesketh.pro',
  bio: 'Full-stack engineer with a focus on web platforms, mainframe systems, and AI tooling. I build things that work — from COBOL batch jobs to reactive frontends.',
  navCards: [
    { title: 'Open Source Software', description: 'Libraries, tools, and MCP servers', url: '/open-source' },
    { title: 'Apps', description: "Things I've shipped", url: '/apps' },
    { title: 'CV', description: 'Experience, skills, and projects', url: 'https://cv.matthesketh.pro' },
    { title: 'Blog', description: 'Writing about engineering and building', url: 'https://blog.matthesketh.pro' },
    { title: 'GitHub', description: 'Open source and side projects', url: 'https://github.com/wrxck', external: true },
  ],
  contact: {
    email: 'matt@matthesketh.pro',
    github: 'https://github.com/wrxck',
    linkedin: 'https://linkedin.com/in/matthesketh',
  },

  // -------------------------------------------------------------------------
  // Open Source showcase — /open-source
  //
  // `featured` is the curation list: it decides WHICH repos appear, their
  // order, their tile SIZE (span) and their THEME. Live data (stars, language,
  // description, updated, url) is merged on by `repo` slug at runtime from the
  // GitHub API. A featured repo missing from the API still renders from this
  // config — it just won't show live stars.
  //
  // span:    sm | md | lg | wide | tall   (4-col grid, dense flow)
  // theme:   { variant: 'dark' | 'light' | 'paper', accent, bg?, ink? }
  //          variant picks bg/ink; accent is the per-app colour; bg/ink override.
  // -------------------------------------------------------------------------
  openSource: {
    username: 'wrxck',
    githubUrl: 'https://github.com/wrxck',
    featured: [
      {
        repo: 'telegram-bot-lua',
        span: 'lg',
        tagline: 'The Telegram Bot API, in pure Lua',
        theme: { variant: 'dark', accent: '#8a93ff' },
      },
      {
        repo: 'utopiajs',
        span: 'wide',
        tagline: 'Compiler-first, signal-based UI framework',
        badge: 'powers this site',
        theme: { variant: 'dark', accent: '#4da3ff' },
      },
      {
        repo: 'mattata',
        span: 'tall',
        tagline: 'Plugin-based, multi-purpose Telegram bot',
        theme: { variant: 'dark', accent: '#b3a0ff' },
      },
      {
        repo: 'srag',
        span: 'md',
        tagline: 'Semantic code search & RAG, in Rust',
        theme: { variant: 'light', accent: '#f74c00' },
      },
      {
        repo: 'auto-audit',
        span: 'md',
        tagline: 'Autonomous repo security auditor',
        theme: { variant: 'light', accent: '#3fae4a' },
      },
      {
        repo: 'fleet',
        span: 'wide',
        tagline: 'Docker production management — CLI + MCP',
        theme: { variant: 'dark', accent: '#2dd4bf' },
      },
      {
        repo: 'cloudflare-mcp',
        span: 'tall',
        tagline: 'Every Cloudflare API — 2,655 operations',
        theme: { variant: 'light', accent: '#f6821f' },
      },
      {
        repo: 'reddit-mcp',
        span: 'md',
        tagline: 'Browse, search & post Reddit over MCP',
        theme: { variant: 'light', accent: '#ff4500' },
      },
      {
        repo: 'infrastructure-mcp',
        span: 'md',
        tagline: 'Cloudflare + Fleet + Namecheap, orchestrated',
        theme: { variant: 'light', accent: '#3178c6' },
      },
      {
        repo: 'behavior-hooks',
        span: 'md',
        tagline: 'Turn corrections into enforceable hooks',
        theme: { variant: 'light', accent: '#6e56cf' },
      },
      {
        repo: 'agenttop',
        span: 'md',
        tagline: 'htop for your AI coding agents',
        theme: { variant: 'dark', accent: '#00d8b4' },
      },
      {
        repo: 'claude-plugins',
        span: 'wide',
        tagline: 'My curated Claude Code plugin marketplace',
        theme: { variant: 'paper', accent: '#d97757', bg: '#f7f3ee', ink: INK },
      },
      {
        repo: 'openapi-mcp',
        span: 'md',
        tagline: 'Any OpenAPI spec → MCP tools, instantly',
        theme: { variant: 'light', accent: '#f89820' },
      },
      {
        repo: 'trilium-mcp',
        span: 'md',
        tagline: 'TriliumNext notes as an infra ontology',
        theme: { variant: 'light', accent: '#3582c4' },
      },
      {
        repo: 'matts-second-brain',
        span: 'md',
        tagline: 'Persistent Claude Code memory, your way',
        theme: { variant: 'dark', accent: '#a78bfa' },
      },
      {
        repo: 'fontvibe',
        span: 'md',
        tagline: 'Detect, search & swap fonts in any project',
        theme: { variant: 'light', accent: '#e2447a' },
      },
      {
        repo: 'wiremock-ts',
        span: 'md',
        tagline: 'WireMock, reimagined in TypeScript',
        theme: { variant: 'light', accent: '#3178c6' },
      },
      {
        repo: 'ink',
        span: 'sm',
        tagline: '30 composable components for Ink TUIs',
        theme: { variant: 'light', accent: '#7c5cff' },
      },
      {
        repo: 'gh-baseline',
        span: 'sm',
        tagline: 'Idempotent, security-first GitHub hardening',
        theme: { variant: 'light', accent: '#3178c6' },
      },
      {
        repo: 'microsoft-dev-server',
        span: 'md',
        tagline: 'A fake Microsoft Graph API for local dev',
        theme: { variant: 'dark', accent: '#00a4ef' },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Apps showcase — /apps
  //
  // Hand-authored app tiles. Each inherits its own product brand via `theme`.
  // Grid scales as more apps ship; one tile is intentionally a large hero so a
  // single-app grid still reads as deliberate.
  // -------------------------------------------------------------------------
  apps: {
    items: [
      {
        name: 'Whey to Go',
        tagline: 'Nutrition, training & trends',
        blurb: 'Log food in seconds, plan your training and watch your trends — all kept private on your iPhone.',
        url: 'https://wheytogo.app',
        ctaLabel: 'wheytogo.app',
        span: 'lg',
        glyph: 'whey',
        theme: { variant: 'paper', bg: '#f4f3ef', ink: '#111110', accent: '#16a34a', muted: '#4a4943' },
      },
    ],
  },
}
