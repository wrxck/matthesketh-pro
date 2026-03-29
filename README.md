# CV / Resume

![UtopiaJS](https://img.shields.io/badge/UtopiaJS-framework-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A minimal, config-driven CV site built with [UtopiaJS](https://github.com/wrxck/utopiajs) and Vite. Two-column layout with sticky sidebar, timeline experience, skills grid, and PDF export. Black and white design.

## Quick Start

```bash
# 1. Use this template on GitHub (or clone)
git clone https://github.com/wrxck/cv-matthesketh-pro.git my-cv
cd my-cv

# 2. Edit site.config.ts with your experience, skills, projects, contact
# 3. Install and build
pnpm install
pnpm build
```

The build will fail if `site.config.ts` still contains placeholder values — you'll see clear error messages telling you what to change.

## Configuration

Edit `site.config.ts` at the project root. This single file contains all your CV data. Type definitions are in `site.config.types.ts`.

### Meta Fields

| Field | Description |
|-------|-------------|
| `url` | Your site's canonical URL |
| `locale` | Locale code (e.g. `en_GB`) |
| `themeColor` | Browser theme color (hex) |
| `sentryDsn` | Sentry DSN for error tracking (leave empty to disable) |
| `pdfFilename` | Filename for PDF export (without `.pdf`) |

### CV Data

| Field | Description |
|-------|-------------|
| `identity.name` | Your full name |
| `identity.title` | Your job title |
| `identity.summary` | A paragraph describing yourself |
| `experience` | Array of work experience entries |
| `skills` | Array of skill categories with items |
| `projects` | Array of notable projects |
| `contact` | Array of contact links (email, GitHub, LinkedIn) |

See `site.config.types.ts` for the exact shape of each entry.

## Local Development

```bash
pnpm dev
```

Opens at `http://localhost:5173`.

## PDF Export

Click the "Export PDF" button in the sidebar. The PDF is generated client-side using `@react-pdf/renderer`.

## Deployment

### Docker

```bash
docker compose up -d --build
```

Serves on port `60611`. Configure your reverse proxy to point your domain here.

To enable Sentry, set `sentryDsn` in `site.config.ts` to your DSN.

### Static

The `dist/` folder after `pnpm build` is a static site. Deploy to any static host.

## Related Templates

- [Personal Landing Page](https://github.com/wrxck/matthesketh-pro) — Minimal config-driven landing page
- [Blog with Admin](https://github.com/wrxck/blog-matthesketh-pro) — Blog with WebAuthn admin panel, RSS/Atom feeds
