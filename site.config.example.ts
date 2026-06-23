// ---------------------------------------------------------------------------
// EXAMPLE config — copy this file to `site.config.ts` and fill in your own
// details:
//
//     cp site.config.example.ts site.config.ts
//
// `site.config.ts` is gitignored so your personal details never get committed.
// The build fails while any placeholder value (Your Name / yourdomain.com /
// yourusername / yourprofile) remains, so you can't ship a half-filled config.
// ---------------------------------------------------------------------------

// Shared theme tokens for showcase tiles — retune the whole palette here.
const INK = '#111110'

export const config = {
  name: 'Your Name',
  title: 'Software Engineer',
  description: 'Your one-line description.',
  locale: 'en_GB',
  themeColor: '#ffffff',
  url: 'https://yourdomain.com',
  bio: 'Full-stack engineer with a focus on web platforms. Edit this in site.config.ts.',

  // Home page is a bento of these cards. Each is fully configurable:
  //   accent  — the tile's colour (hover shadow, bar, arrow, category label)
  //   kind    — short category eyebrow shown above the title
  //   span    — tile size: sm | md | lg | wide | tall
  //   external: true  — opens in a new tab (use for off-site links)
  //   live: 'repos'   — shows the live GitHub repo count (needs `openSource`)
  // Internal links ('/open-source', '/apps') are only shown when their section
  // below is configured, so you can delete a section without leaving dead links.
  navCards: [
    { title: 'Open Source Software', kind: 'code', description: 'Libraries, tools, and MCP servers', url: '/open-source', accent: '#6b7cff', span: 'lg', live: 'repos' },
    { title: 'Apps', kind: 'products', description: "Things I've shipped", url: '/apps', accent: '#16a34a', span: 'sm' },
    { title: 'CV', kind: 'career', description: 'Experience, skills, and projects', url: 'https://cv.yourdomain.com', accent: '#d9a14a', span: 'sm' },
    { title: 'Blog', kind: 'writing', description: 'Writing about engineering and building', url: 'https://blog.yourdomain.com', accent: '#c0653b', span: 'wide' },
    { title: 'GitHub', kind: 'profile', description: 'Open source and side projects', url: 'https://github.com/yourusername', external: true, accent: '#8b6fc9', span: 'sm' },
  ],
  contact: {
    email: 'you@yourdomain.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
  },

  // -------------------------------------------------------------------------
  // Open Source showcase — /open-source   (OPTIONAL)
  //
  // Delete this whole `openSource` block to drop the section: the route, the
  // GitHub fetch, and the home tile all disappear automatically.
  //
  // `featured` is the curation list — it decides WHICH of your repos appear,
  // their order, tile SIZE (span) and THEME. Live data (stars, language,
  // description) is merged on by `repo` name at runtime from the GitHub API;
  // every other public, non-fork repo is appended automatically, auto-themed
  // by language and sized by stars. A featured repo missing from the API still
  // renders from this config — it just won't show live stars.
  //
  // span:   sm | md | lg | wide | tall   (4-col grid, dense flow)
  // theme:  { variant: 'dark' | 'light' | 'paper', accent, bg?, ink? }
  //         variant picks bg/ink; accent is the per-app colour; bg/ink override.
  // -------------------------------------------------------------------------
  openSource: {
    username: 'yourusername',
    githubUrl: 'https://github.com/yourusername',
    featured: [
      {
        repo: 'your-flagship-project',
        span: 'lg',
        tagline: 'A one-line pitch for your biggest project',
        badge: 'powers this site',
        theme: { variant: 'dark', accent: '#6b7cff' },
      },
      {
        repo: 'your-cli-tool',
        span: 'wide',
        tagline: 'Whatever this tool does, in a sentence',
        theme: { variant: 'dark', accent: '#2dd4bf' },
      },
      {
        repo: 'your-mcp-server',
        span: 'md',
        tagline: 'A short description of this repo',
        theme: { variant: 'light', accent: '#f6821f' },
      },
      {
        repo: 'your-library',
        span: 'md',
        tagline: 'A short description of this repo',
        theme: { variant: 'light', accent: '#3178c6' },
      },
      {
        repo: 'your-experiment',
        span: 'sm',
        tagline: 'A small project worth featuring',
        theme: { variant: 'paper', accent: '#d97757', bg: '#f7f3ee', ink: INK },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Apps showcase — /apps   (OPTIONAL)
  //
  // Delete this whole `apps` block to drop the section (route + home tile go
  // with it). Each tile inherits its own product brand via `theme`.
  // -------------------------------------------------------------------------
  apps: {
    items: [
      {
        name: 'Your App',
        tagline: 'A short product tagline',
        blurb: 'One or two sentences describing what your app does and who it is for.',
        url: 'https://yourapp.com',
        ctaLabel: 'yourapp.com',
        span: 'lg',
        theme: { variant: 'paper', bg: '#f4f3ef', ink: '#111110', accent: '#16a34a', muted: '#4a4943' },
      },
    ],
  },
}
