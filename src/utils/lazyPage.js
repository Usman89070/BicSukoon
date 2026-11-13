import { lazy } from 'react'

const loaders = []

/**
 * lazy() for a page, remembered so every page can be fetched in the
 * background once the site has loaded: a click in the menu then opens the
 * page at once instead of waiting for its file (the old page stays on screen
 * while the next one loads, which on a slow host looks like nothing happens).
 */
export function lazyPage(load) {
  loaders.push(load)
  return lazy(load)
}

/** Fetches every page file while the browser is idle (call once, after the first render). */
export function preloadPages() {
  // one file after another (not all at once), gentle on the host
  const run = () => loaders.reduce((chain, load) => chain.then(() => load().catch(() => {})), Promise.resolve())
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 })
  else setTimeout(run, 1500)
}

// A page file that no longer exists (the site was updated while this tab was
// open) cannot load: reload once to pick up the new version.
window.addEventListener('vite:preloadError', (e) => {
  e.preventDefault()
  if (sessionStorage.getItem('reloaded-for-update')) return
  try {
    sessionStorage.setItem('reloaded-for-update', '1')
  } catch {
    /* storage unavailable */
  }
  window.location.reload()
})
