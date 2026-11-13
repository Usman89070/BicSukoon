import { useEffect, useState } from 'react'
import { API } from './useAdminList'

const known = new Map()
const pending = new Map()

// A clear "not found" hides the video; a busy server or network hiccup is
// retried a few times (and not remembered), so a film is not lost for the visit.
const check = (src, attempt = 0) =>
  fetch(src, { method: 'HEAD', cache: 'no-store' })
    .then((r) => (r.ok && /^video\//i.test(r.headers.get('content-type') || '') ? true : r.status === 404 || r.ok ? false : null))
    .catch(() => null)
    .then((ok) => {
      if (ok === null && attempt < 3) return new Promise((done) => setTimeout(done, 800 * (attempt + 1))).then(() => check(src, attempt + 1))
      return ok
    })

// The list of video files on the server (api/videos.php), fetched once per
// visit: a film on the list starts at once, without a check of its own.
let listRequest = null
const loadList = () =>
  (listRequest ??= fetch(`${API}/videos.php`, { headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null))
const inList = (list, src) => {
  const m = /\/videos\/(bic|sukoon)\/([^/?#]+)$/.exec(new URL(src, window.location.href).pathname)
  if (!m || !list || !Array.isArray(list[m[1]])) return null
  let name
  try {
    name = decodeURIComponent(m[2])
  } catch {
    return null
  }
  return list[m[1]].includes(name)
}

/** One check per file for the whole visit, shared by every caller. */
function checkVideo(src) {
  if (known.has(src)) return Promise.resolve(known.get(src))
  if (!pending.has(src)) {
    pending.set(
      src,
      loadList()
        .then((list) => inList(list, src))
        // not answerable from the list (no list, other address): check the file itself
        .then((ok) => (ok === null ? check(src) : ok))
        .then((ok) => {
          pending.delete(src)
          if (ok !== null) known.set(src, ok)
          return ok
        }),
    )
  }
  return pending.get(src)
}

/** Checks a video ahead of time (e.g. the site-picture pins), so it starts sooner when opened. */
export function prefetchVideoSrc(src) {
  if (src) checkVideo(src)
}

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
    checkVideo(src).then((ok) => {
      if (alive && ok) rerender((n) => n + 1)
    })
    return () => {
      alive = false
    }
  }, [src])
  return src && known.get(src) ? src : null
}
