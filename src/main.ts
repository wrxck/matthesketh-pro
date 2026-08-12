import { mount } from '@matthesketh/utopia-runtime'
import { createRouter, preloadRoute } from '@matthesketh/utopia-router'
import App from './App.utopia'
import { config } from '../site.config'
import { hydrateRepoIndex } from './lib/store'
import { installShowcaseKeys } from './lib/showcase'
import { initTheme } from './lib/theme'
import './global.css'

// Sync theme state, watch the OS for `auto`, enable smooth switching.
initTheme()

// a deploy replaces the content-hashed route chunks and deletes the old ones,
// so a tab open across one asks for a file that is no longer there. reload
// once to pick up the current html rather than leaving a dead route; the flag
// stops a genuinely missing chunk turning into a reload loop.
const RELOAD_FLAG = 'route-chunk-reloaded'

function remembered(key: string): string | null {
    try {
        return sessionStorage.getItem(key)
    } catch {
        return null
    }
}

function remember(key: string, value: string | null): void {
    try {
        if (value === null) sessionStorage.removeItem(key)
        else sessionStorage.setItem(key, value)
    } catch {
        // storage is unavailable, so this browser simply gets no retry
    }
}

function lazy<T>(load: () => Promise<T>): () => Promise<T> {
    return async () => {
        try {
            const module = await load()
            remember(RELOAD_FLAG, null)
            return module
        } catch (error) {
            if (remembered(RELOAD_FLAG)) throw error
            remember(RELOAD_FLAG, '1')
            location.reload()
            // the reload takes over, so this deliberately never settles
            return new Promise<T>(() => {})
        }
    }
}

// The two showcases are optional. A fork that drops `openSource` or `apps`
// from site.config.ts gets the route (and its data fetch) skipped entirely,
// rather than a crash.
const routes = [{ path: '/', component: lazy(() => import('./routes/Landing.utopia')) }]

if (config.openSource) {
  routes.push({ path: '/open-source', component: lazy(() => import('./routes/OpenSource.utopia')) })
}
if (config.apps && Array.isArray(config.apps.items) && config.apps.items.length > 0) {
  routes.push({ path: '/apps', component: lazy(() => import('./routes/Apps.utopia')) })
}

routes.push({ path: '/privacy', component: lazy(() => import('./routes/Privacy.utopia')) })

createRouter(routes)

// Kick off the one-time GitHub fetch only when the Open Source showcase is
// configured (non-blocking — pages render from config immediately and hydrate
// live stars when it resolves).
if (config.openSource) {
  hydrateRepoIndex(config.openSource.username)
}

// Esc-to-close on the showcase routes.
installShowcaseKeys()

// Pre-load the initial route so the first paint is synchronous (no flash).
preloadRoute().then(() => {
  mount(App, '#app')
})
