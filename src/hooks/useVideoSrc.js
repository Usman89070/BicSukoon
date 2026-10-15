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
    // A clear "not found" hides the video; a busy server or network hiccup is
    // retried a few times (and not remembered), so a film is not lost for the visit.
    const check = (attempt) =>
      fetch(src, { method: 'HEAD', cache: 'no-store' })
        .then((r) => (r.ok && /^video\//i.test(r.headers.get('content-type') || '') ? true : r.status === 404 || r.ok ? false : null))
        .catch(() => null)
        .then((ok) => {
          if (ok === null && attempt < 3) return new Promise((done) => setTimeout(done, 800 * (attempt + 1))).then(() => check(attempt + 1))
          return ok
        })
    check(0).then((ok) => {
      if (ok !== null) known.set(src, ok)
      if (alive && ok) rerender((n) => n + 1)
    })
    return () => {
      alive = false
    }
  }, [src])
  return src && known.get(src) ? src : null
}
