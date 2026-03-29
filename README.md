# Personal Landing Page

A minimal, config-driven personal landing page built with [UtopiaJS](https://github.com/wrxck/utopiajs) and Vite.

## Quick Start

1. Clone this repo
2. Edit `site.config.ts` with your details
3. Install and build:

```bash
pnpm install
pnpm build
```

The build will fail if `site.config.ts` still contains placeholder values.

## Configuration

Edit `site.config.ts` at the project root. All fields are required:

| Field | Description |
|-------|-------------|
| `name` | Your full name |
| `title` | Your job title or tagline |
| `description` | One-line meta description for search engines |
| `locale` | Locale code (e.g. `en_GB`, `en_US`) |
| `themeColor` | Browser theme color (hex) |
| `url` | Your site's canonical URL |
| `bio` | A short paragraph about yourself |
| `navCards` | Array of navigation cards (title, description, url, external?) |
| `contact.email` | Your email address |
| `contact.github` | Your GitHub profile URL |
| `contact.linkedin` | Your LinkedIn profile URL |

## Local Development

```bash
pnpm dev
```

Opens at `http://localhost:5173`.

## Deployment

### Docker

```bash
docker compose up -d --build
```

Serves on port `60610`. Configure your reverse proxy to point your domain here.

### Static

The `dist/` folder after `pnpm build` is a static site. Deploy to any static host (Netlify, Vercel, Cloudflare Pages, etc.).
