// ---------------------------------------------------------------------------
// Showcase keyboard handling.
//
// Route pages in this Utopia version are rendered directly (no per-instance
// lifecycle), so Esc-to-close is wired once at module scope and gated on the
// current route rather than per-component onMount.
// ---------------------------------------------------------------------------

import { currentRoute, navigate } from '@matthesketh/utopia-router'

let installed = false

export function installShowcaseKeys(): void {
  if (installed || typeof document === 'undefined') return
  installed = true
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    const path = currentRoute()?.url?.pathname
    if (path === '/open-source' || path === '/apps') {
      navigate('/')
    }
  })
}
