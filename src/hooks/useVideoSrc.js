import { useEffect, useState } from 'react'

const known = new Map()

/**
 * Returns `src` once the server confirms it is a real video file, otherwise
 * null (file not uploaded yet, or the request fell through to a web page).
 * Results are cached for the visit.
 */
export function useVideoSrc(src) {
  const [, rerender] = useState(0)
  useEffect(() => {
    if (!src || known.has(src)) return
    let alive = true
    fetch(src, { method: 'HEAD' })
      .then((r) => r.ok && /^video\//i.test(r.headers.get('content-type') || ''))
      .catch(() => false)
      .then((ok) => {
        known.set(src, ok)
        if (alive) rerender((n) => n + 1)
      })
    return () => {
      alive = false
    }
  }, [src])
  return src && known.get(src) ? src : null
}
