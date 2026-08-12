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

/** Kick off the one-time repo fetch and hydrate the signal when it resolves. */
export function hydrateRepoIndex(username: string): void {
  if (started) return
  started = true
  loadRepoIndex(username).then((index) => {
    repoIndex.set(index)
  })
}
