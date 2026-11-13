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

/**
 * Fetches the page files only when the visitor reaches for the menu (hovers
 * or touches the header, or opens the mobile menu), so the first visit loads
 * nothing extra and the chosen page is usually ready by the time of the click.
 */
export function preloadPages() {
  let started = false
  const run = () => {
    if (started) return
    started = true
    events.forEach((e) => window.removeEventListener(e, onIntent, true))
    // one file after another (not all at once), gentle on the host
    loaders.reduce((chain, load) => chain.then(() => load().catch(() => {})), Promise.resolve())
  }
  const onIntent = (e) => {
    if (e.target instanceof Element && e.target.closest('header, nav, .mobile-menu, a[href]')) run()
  }
  const events = ['pointerover', 'touchstart', 'focusin']
  events.forEach((e) => window.addEventListener(e, onIntent, { capture: true, passive: true }))
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
