import { mount } from '@matthesketh/utopia-runtime'
import { createRouter, preloadRoute } from '@matthesketh/utopia-router'
import App from './App.utopia'
import { config } from '../site.config'
import { hydrateRepoIndex } from './lib/store'
import { installShowcaseKeys } from './lib/showcase'
import './global.css'

createRouter([
  { path: '/', component: () => import('./routes/Landing.utopia') },
  { path: '/open-source', component: () => import('./routes/OpenSource.utopia') },
  { path: '/apps', component: () => import('./routes/Apps.utopia') },
])

// Kick off the one-time GitHub fetch (non-blocking — pages render from config
// immediately and hydrate live stars when it resolves).
hydrateRepoIndex(config.openSource.username)

// Esc-to-close on the showcase routes.
installShowcaseKeys()

// Pre-load the initial route so the first paint is synchronous (no flash).
preloadRoute().then(() => {
  mount(App, '#app')
})
