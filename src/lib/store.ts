// ---------------------------------------------------------------------------
// Reactive store for live GitHub data.
//
// The fetch happens in main.ts (plain module scope, real async). It writes the
// result into this signal; the Open Source page reads it through a `computed`,
// so tiles render from config immediately and re-render in place once live
// stars/languages arrive. Reading a global signal inside a component is the
// same pattern the framework's own components use (e.g. currentRoute()).
// ---------------------------------------------------------------------------

import { signal } from '@matthesketh/utopia-core'
import { loadRepoIndex, type RepoIndex } from './github'

export const repoIndex = signal<RepoIndex>({})

let started = false

/**
 * How many public repositories to claim, counted once so the home tile and the
 * showcase subtitle cannot disagree.
 *
 * This counts live GitHub data, not tiles. A curated repo that no longer
 * resolves still renders a tile — that is deliberate graceful degradation —
 * but it is not a repository, so counting tiles would overstate the number.
 */
export function liveRepoCount(index: RepoIndex): number {
  return Object.values(index).filter((r) => !r.fork && !r.archived).length
}

/** kick off the one-time repo fetch and hydrate the signal when it resolves. */
export function hydrateRepoIndex(username: string): void {
  if (started) return
  started = true
  loadRepoIndex(username).then((index) => {
    repoIndex.set(index)
  })
}
