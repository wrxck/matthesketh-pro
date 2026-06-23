import { mount } from '@matthesketh/utopia-runtime'
import { createRouter, preloadRoute } from '@matthesketh/utopia-router'
import App from './App.utopia'
import { config } from '../site.config'
import { hydrateRepoIndex } from './lib/store'
import { installShowcaseKeys } from './lib/showcase'
import './global.css'

// The two showcases are optional. A fork that drops `openSource` or `apps`
// from site.config.ts gets the route (and its data fetch) skipped entirely,
// rather than a crash.
const routes = [{ path: '/', component: () => import('./routes/Landing.utopia') }]

if (config.openSource) {
  routes.push({ path: '/open-source', component: () => import('./routes/OpenSource.utopia') })
}
if (config.apps && Array.isArray(config.apps.items) && config.apps.items.length > 0) {
  routes.push({ path: '/apps', component: () => import('./routes/Apps.utopia') })
}

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
