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

// hoisted so the meta copy further down can compose the exact strings that end
// up in <title> and the social cards.
const NAME = 'Your Name'
const TITLE = 'Software Engineer'
const DESCRIPTION = 'Your one-line description.'

export const config = {
  name: NAME,
  title: TITLE,
  description: DESCRIPTION,
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

  // -------------------------------------------------------------------------
  // copy — every remaining word on the site.
  //
  // headings, labels, link text, accessible names and the whole privacy page
  // live here, alongside the names, descriptions and taglines above, so the
  // site can be reworded without opening a template. `src/lib/copy.ts` types
  // this block: rename a key there and here, or the build stops.
  //
  // leading and trailing spaces are load-bearing where a string sits next to a
  // link or a number — keep them.
  // -------------------------------------------------------------------------
  copy: {
    // <head>: title is reused for og:title and twitter:title, and
    // socialDescription for og:description and twitter:description.
    meta: {
      title: `${NAME} — ${TITLE}`,
      description: `${NAME} — ${DESCRIPTION}`,
      socialDescription: DESCRIPTION,
      noscript: `${NAME} — ${TITLE}. Enable JavaScript to view.`,
    },

    // the light/auto/dark switch, top right on every page
    theme: {
      groupLabel: 'Theme',
      lightLabel: 'Light theme',
      lightTitle: 'Light',
      autoLabel: 'System theme',
      autoTitle: 'Auto (system)',
      darkLabel: 'Dark theme',
      darkTitle: 'Dark',
    },

    landing: {
      navLabel: 'Site navigation',
      repoCountLabel: 'repositories · live',
      emailLink: 'Email',
      githubLink: 'GitHub',
      linkedinLink: 'LinkedIn',
      privacyLink: 'Privacy',
    },

    // the back link shared by both showcase pages
    showcase: {
      back: 'Index',
    },

    openSource: {
      barLabel: 'Open Source',
      title: 'Open Source',
      // appended to the live repo count, so it starts with a space
      subtitleSuffix:
        ' public repositories — libraries, tools, MCP servers and experiments, pulled live from GitHub.',
      gridLabel: 'Open source projects',
      starsLabel: '★ stars',
    },

    apps: {
      barLabel: 'Apps',
      title: 'Apps',
      subtitle: 'Products I design, build and ship end to end.',
      gridLabel: 'Apps',
      // the empty-state tile that keeps a one-app grid looking deliberate
      ghostLabel: 'In the lab',
      ghostTitle: 'More on the way',
      ghostBody: 'New products in design and development — this grid grows as they ship.',
    },

    // the /privacy page — reword or trim it to match what you actually collect
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: 1 January 2026',
      intro:
        'This site (yourdomain.com) is the personal website of Your Name. This policy explains what data is collected and how it is used.',
      advertisingHeading: 'Advertising & cookies',
      advertisingBody:
        "This site uses Google AdSense. Third-party vendors, including Google, use cookies and similar identifiers to serve ads based on a user's prior visits to this and other websites.",
      cookiesBullet:
        "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the internet.",
      // this bullet wraps two links — the spaces at the edges are what keeps
      // the sentence reading as one line
      optOutBefore: 'You can opt out of personalised advertising via ',
      optOutGoogleLabel: 'Google Ads Settings',
      optOutBetween: ", or opt out of third-party vendors' cookies at ",
      optOutAboutAdsLabel: 'aboutads.info',
      optOutAfter: '.',
      consentHeading: 'Consent (EEA, UK & Switzerland)',
      consentBody:
        "Visitors in the EEA, UK and Switzerland are shown a consent message (Google's Consent Management Platform) before personalised ads are served, in line with GDPR and the ePrivacy Directive. You can change or withdraw consent at any time via the privacy options on the consent banner.",
      rightsHeading: 'Your rights',
      rightsBody:
        'You can request access to, correction of, or deletion of any personal data held about you, and may lodge a complaint with the ICO or your local data-protection authority. To do so, use the contact below.',
      contactHeading: 'Contact',
      // wraps the mailto link, which takes its address from contact.email above
      contactBefore: 'Questions about this policy? Email ',
      contactAfter: '.',
      back: 'Back home',
    },
  },
}
