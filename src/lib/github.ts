// ---------------------------------------------------------------------------
// GitHub data layer for the Open Source showcase.
//
// Fetches a user's public repos once, caches them in localStorage with a TTL,
// and dedupes concurrent calls in-memory. Designed to stay well under the
// unauthenticated GitHub rate limit (60 req/hr): a visitor triggers at most
// one request per TTL window, and degrades gracefully to stale cache — or to
// nothing — when the API is unavailable. The UI always renders from config
// first, then hydrates live numbers when (and if) they arrive.
// ---------------------------------------------------------------------------

export interface RepoMeta {
  name: string
  description: string | null
  stars: number
  language: string | null
  url: string
  homepage: string | null
  updatedAt: string | null
  fork: boolean
  archived: boolean
}

/** Map of repo name → live metadata. */
export type RepoIndex = Record<string, RepoMeta>

const TTL_MS = 6 * 60 * 60 * 1000 // 6 hours
const CACHE_PREFIX = 'utopia:gh:repos:'
const CACHE_VERSION = 'v2'

interface CacheEntry {
  ts: number
  data: RepoIndex
}

// In-flight promises keyed by username so concurrent callers share one request.
const inflight = new Map<string, Promise<RepoIndex>>()

function cacheKey(username: string): string {
  return `${CACHE_PREFIX}${CACHE_VERSION}:${username.toLowerCase()}`
}

function readCache(username: string): CacheEntry | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(cacheKey(username))
    if (!raw) return null
    const parsed = JSON.parse(raw) as CacheEntry
    if (!parsed || typeof parsed.ts !== 'number' || !parsed.data) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(username: string, data: RepoIndex): void {
  if (typeof localStorage === 'undefined') return
  try {
    const entry: CacheEntry = { ts: Date.now(), data }
    localStorage.setItem(cacheKey(username), JSON.stringify(entry))
  } catch {
    // Quota or privacy mode — caching is best-effort, ignore.
  }
}

function normalise(raw: unknown): RepoIndex {
  const index: RepoIndex = {}
  if (!Array.isArray(raw)) return index
  for (const r of raw as Array<Record<string, unknown>>) {
    const name = typeof r.name === 'string' ? r.name : null
    if (!name) continue
    const lang = r.language
    const home = r.homepage
    index[name] = {
      name,
      description: typeof r.description === 'string' ? r.description : null,
      stars: typeof r.stargazers_count === 'number' ? r.stargazers_count : 0,
      language: typeof lang === 'string' ? lang : null,
      url: typeof r.html_url === 'string' ? r.html_url : `https://github.com/${name}`,
      homepage: typeof home === 'string' && home.length > 0 ? home : null,
      updatedAt: typeof r.updated_at === 'string' ? r.updated_at : null,
      fork: r.fork === true,
      archived: r.archived === true,
    }
  }
  return index
}

async function fetchFromApi(username: string): Promise<RepoIndex> {
  const url = `https://api.github.com/users/${encodeURIComponent(
    username,
  )}/repos?per_page=100&sort=updated`
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}`)
  }
  return normalise(await res.json())
}

/**
 * Resolve live repo metadata for a user, keyed by repo name.
 *
 * Strategy: fresh cache → return immediately, no network. Stale/missing →
 * fetch, cache, return; on failure fall back to stale cache, then to `{}`.
 * Never throws — the showcase must render regardless.
 */
export function loadRepoIndex(username: string): Promise<RepoIndex> {
  const existing = inflight.get(username)
  if (existing) return existing

  const cached = readCache(username)
  const fresh = cached && Date.now() - cached.ts < TTL_MS
  if (fresh && cached) {
    return Promise.resolve(cached.data)
  }

  const promise = fetchFromApi(username)
    .then((data) => {
      writeCache(username, data)
      return data
    })
    .catch(() => {
      // Network error or rate limit — serve stale cache if we have it.
      return cached?.data ?? {}
    })
    .finally(() => {
      inflight.delete(username)
    })

  inflight.set(username, promise)
  return promise
}
