/**
 * Keeps the many small video thumbnails from flooding the connection (and the
 * host): one thumbnail loads at a time, and every video on the page stops
 * downloading the moment the visitor follows a link, so the next page gets
 * the whole connection.
 */
const waiting = []
let busy = false

const next = () => {
  if (busy || !waiting.length) return
  busy = true
  const start = waiting.shift()
  let done = false
  const release = () => {
    if (done) return
    done = true
    busy = false
    next()
  }
  start(release)
  setTimeout(release, 6000) // never wait on one slow file for long
}

/** Queues `start(release)`; call release() once the thumbnail has its frame (or failed). */
export function queueThumb(start) {
  let cancelled = false
  waiting.push((release) => (cancelled ? release() : start(release)))
  next()
  return () => {
    cancelled = true
  }
}

const stopVideos = () => {
  document.querySelectorAll('video').forEach((v) => {
    if (v.closest('.lightbox')) return
    v.pause()
    v.removeAttribute('src')
    v.querySelectorAll('source').forEach((s) => s.remove())
    v.load()
  })
  waiting.length = 0
}

if (typeof document !== 'undefined') {
  document.addEventListener(
    'click',
    (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target instanceof Element && e.target.closest('a[href]')
      if (!a || a.target === '_blank' || a.closest('.lightbox')) return
      const to = new URL(a.href, window.location.href)
      if (to.origin !== window.location.origin || (to.pathname === window.location.pathname && to.hash)) return
      // a link to another page: free the connection for it
      stopVideos()
    },
    true,
  )
}
