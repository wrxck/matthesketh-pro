# Personal Landing Page

![UtopiaJS](https://img.shields.io/badge/UtopiaJS-framework-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A minimal, config-driven personal landing page built with [UtopiaJS](https://github.com/wrxck/utopiajs) and Vite. Edit one file, build, deploy.

## Quick Start

```bash
# 1. Use this template on GitHub (or clone)
git clone https://github.com/wrxck/matthesketh-pro.git my-site
cd my-site

# 2. Edit site.config.ts with your details
# 3. Install and build
pnpm install
pnpm build
```

The build will fail if `site.config.ts` still contains placeholder values — you'll see clear error messages telling you what to change.

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

## Related Templates

- [CV / Resume](https://github.com/wrxck/cv-matthesketh-pro) — Config-driven CV with two-column layout and PDF export
- [Blog with Admin](https://github.com/wrxck/blog-matthesketh-pro) — Blog with WebAuthn admin panel, RSS/Atom feeds
