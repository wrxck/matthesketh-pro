// ---------------------------------------------------------------------------
// Theme store: light | dark | auto.
//
// `auto` follows the OS via prefers-color-scheme. The resolved theme is written
// to <html data-theme="light|dark"> (CSS keys off it) and the preference to
// data-theme-pref. An inline script in index.html applies both BEFORE first
// paint to avoid a flash; this module re-applies on change and keeps `auto` in
// sync with the OS.
// ---------------------------------------------------------------------------

import { signal } from '@matthesketh/utopia-core'

export type ThemePref = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'theme'

function systemPrefersDark(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
}

function readPref(): ThemePref {
  if (typeof document !== 'undefined') {
    const fromDom = document.documentElement.getAttribute('data-theme-pref')
    if (fromDom === 'light' || fromDom === 'dark' || fromDom === 'auto') return fromDom
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored
  } catch {
    /* private mode — fall through */
  }
  return 'auto'
}

/** The current preference (what the user picked). Reactive. */
export const themePref = signal<ThemePref>(readPref())

/** The resolved theme actually applied ('light' | 'dark'). Reactive. */
export const resolvedTheme = signal<'light' | 'dark'>('light')

function apply(pref: ThemePref): void {
  if (typeof document === 'undefined') return
  const dark = pref === 'dark' || (pref === 'auto' && systemPrefersDark())
  const root = document.documentElement
  root.setAttribute('data-theme', dark ? 'dark' : 'light')
  root.setAttribute('data-theme-pref', pref)
  resolvedTheme.set(dark ? 'dark' : 'light')
}

/** Set the preference, persist it, and apply it. */
export function setTheme(pref: ThemePref): void {
  themePref.set(pref)
  try {
    localStorage.setItem(STORAGE_KEY, pref)
  } catch {
    /* ignore */
  }
  apply(pref)
}

/** Call once on startup: sync state, watch the OS, enable transitions. */
export function initTheme(): void {
  apply(themePref.peek())
  if (typeof matchMedia !== 'undefined') {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (themePref.peek() === 'auto') apply('auto')
    })
  }
  // Enable theme transitions only after the first paint, so switching is smooth
  // but the initial (pre-painted) theme doesn't animate in.
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'))
  }
}
