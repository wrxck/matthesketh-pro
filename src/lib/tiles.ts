// ---------------------------------------------------------------------------
// Tile model builders.
//
// Both showcase pages (Open Source, Apps) render the same normalised `Tile`
// shape through BentoGrid. These builders resolve config + live data into that
// shape, including turning a theme `variant` into concrete colours and a
// precomputed inline-style string of CSS custom properties.
// ---------------------------------------------------------------------------

import type { RepoIndex } from './github'

export interface Tile {
  key: string
  title: string
  tagline: string
  desc: string | null
  url: string
  external: boolean
  ctaLabel: string | null
  badge: string | null
  span: string
  stars: number | null
  language: string | null
  glyph: string | null
  variant: string
  styleVars: string
  bigStat: boolean
}

interface ThemeInput {
  variant?: string
  accent: string
  bg?: string
  ink?: string
  muted?: string
}

const INK = '#111110'

interface ResolvedTheme {
  bg: string
  ink: string
  accent: string
  muted: string
  border: string
}

function resolveTheme(theme: ThemeInput): ResolvedTheme {
  const variant = theme.variant ?? 'light'
  if (variant === 'dark') {
    return {
      bg: theme.bg ?? '#141413',
      ink: theme.ink ?? '#f4f3ef',
      accent: theme.accent,
      muted: theme.muted ?? '#a8a7a0',
      border: '#2a2a27',
    }
  }
  if (variant === 'paper') {
    const bg = theme.bg ?? '#f4f3ef'
    return {
      bg,
      ink: theme.ink ?? INK,
      accent: theme.accent,
      muted: theme.muted ?? '#4a4943',
      border: INK,
    }
  }
  // light — resolves to theme tokens so these tiles flip with the mode
  // (dark/paper variants above stay constant on purpose).
  return {
    bg: theme.bg ?? 'var(--surface)',
    ink: theme.ink ?? 'var(--text)',
    accent: theme.accent,
    muted: theme.muted ?? 'var(--text-faint)',
    border: 'var(--border)',
  }
}

function styleVars(t: ResolvedTheme): string {
  return [
    `--tile-bg:${t.bg}`,
    `--tile-ink:${t.ink}`,
    `--tile-accent:${t.accent}`,
    `--tile-muted:${t.muted}`,
    `--tile-border:${t.border}`,
  ].join(';')
}

const VALID_SPANS = new Set(['sm', 'md', 'lg', 'wide', 'tall'])

function span(value: unknown): string {
  return typeof value === 'string' && VALID_SPANS.has(value) ? value : 'md'
}

// GitHub linguist colours, used to theme auto-generated (non-curated) tiles.
const LANG_COLORS: Record<string, string> = {
  Lua: '#5b6cff',
  TypeScript: '#3178c6',
  JavaScript: '#d9b400',
  Rust: '#f74c00',
  Shell: '#3fae4a',
  Java: '#b07219',
  Python: '#3572a5',
  Go: '#00add8',
  Kotlin: '#a97bff',
  'Objective-C': '#438eff',
  Swift: '#f05138',
  Ruby: '#b3203b',
  HTML: '#e34c26',
  CSS: '#8a63d2',
  'C++': '#f34b7d',
  C: '#6b6a64',
  'C#': '#178600',
  Vue: '#41b883',
  Svelte: '#ff3e00',
}

const DEFAULT_ACCENT = '#6b6a64'

function langAccent(language: string | null): string {
  return (language && LANG_COLORS[language]) || DEFAULT_ACCENT
}

/** Auto-size a non-curated repo tile by how much traction it has. */
function autoSpan(stars: number): string {
  if (stars >= 10) return 'wide'
  if (stars >= 4) return 'md'
  return 'sm'
}

/**
 * Build Open Source tiles by merging the curated `featured` list with live
 * GitHub metadata. Curation drives which/where/how-big/theme; live data fills
 * stars, language and the secondary description. Missing live data degrades
 * gracefully — the tile still renders from config.
 */
export function buildRepoTiles(
  openSource: {
    username: string
    featured: Array<{
      repo: string
      span?: string
      tagline?: string
      badge?: string
      theme: ThemeInput
    }>
  },
  index: RepoIndex,
): Tile[] {
  // 1. Curated tiles — hand-tailored order, sizing, theme and copy. These
  //    always render (even before live data arrives, or if the repo is gone).
  const curated: Tile[] = openSource.featured.map((f) => {
    const meta = index[f.repo]
    const theme = resolveTheme(f.theme)
    const url = meta?.url ?? `https://github.com/${openSource.username}/${f.repo}`
    const desc = meta?.description ?? null
    const sp = span(f.span)
    const stars = meta ? meta.stars : null
    return {
      key: f.repo,
      title: f.repo,
      tagline: f.tagline ?? desc ?? '',
      desc: desc && desc !== (f.tagline ?? '') ? desc : null,
      url,
      external: true,
      ctaLabel: null,
      badge: f.badge ?? null,
      span: sp,
      stars,
      language: meta?.language ?? null,
      glyph: null,
      variant: f.theme.variant ?? 'light',
      styleVars: styleVars(theme),
      bigStat: (sp === 'lg' || sp === 'tall') && (stars ?? 0) >= 10,
    }
  })

  // 2. Every other public repo, auto-themed by language and sized by stars.
  //    Forks and archived repos are skipped — they aren't original work.
  const curatedNames = new Set(openSource.featured.map((f) => f.repo))
  const rest = Object.values(index)
    .filter((r) => !curatedNames.has(r.name) && !r.fork && !r.archived)
    .sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name))
    .map((r): Tile => {
      const accent = langAccent(r.language)
      const sp = autoSpan(r.stars)
      return {
        key: r.name,
        title: r.name,
        tagline: r.description ?? '',
        desc: null,
        url: r.url,
        external: true,
        ctaLabel: null,
        badge: null,
        span: sp,
        stars: r.stars,
        language: r.language,
        glyph: null,
        variant: 'light',
        styleVars: styleVars(resolveTheme({ variant: 'light', accent })),
        bigStat: false,
      }
    })

  return [...curated, ...rest]
}

/** Build Apps tiles from the hand-authored app list. */
export function buildAppTiles(
  apps: {
    items: Array<{
      name: string
      tagline?: string
      blurb?: string
      url: string
      ctaLabel?: string
      span?: string
      glyph?: string
      badge?: string
      theme: ThemeInput
    }>
  },
): Tile[] {
  return apps.items.map((a, i) => {
    const theme = resolveTheme(a.theme)
    return {
      key: `${a.name}-${i}`,
      title: a.name,
      tagline: a.tagline ?? '',
      desc: a.blurb ?? null,
      url: a.url,
      external: true,
      ctaLabel: a.ctaLabel ?? null,
      badge: a.badge ?? null,
      span: span(a.span),
      stars: null,
      language: null,
      glyph: a.glyph ?? null,
      variant: a.theme.variant ?? 'paper',
      styleVars: styleVars(theme),
      bigStat: false,
    }
  })
}
