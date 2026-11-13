import { portalSrcSet } from '../portal/media'

const done = new Set()

const hint = (href, as) => {
  if (!href || document.head.querySelector(`link[rel="prefetch"][href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  if (as) link.as = as
  document.head.appendChild(link)
}

/**
 * Gets the other website ready while the visitor reaches for its link (hover,
 * touch or keyboard focus): its page, script and style files and the first
 * picture of its home page are fetched in the background, so the click opens
 * it much faster. Each website is only fetched once per visit.
 */
export function prefetchSite(url, id) {
  if (!url || done.has(url)) return
  done.add(url)
  const page = new URL(url, window.location.href)
  const base = page.pathname.replace(/[^/]*$/, '')
  fetch(page, { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.text() : ''))
    .then((html) => {
      const css = [...html.matchAll(/href="([^"]+\.css)"/g)].map((m) => m[1])
      const js = [...html.matchAll(/src="([^"]+\.js)"/g)].map((m) => m[1])
      css.forEach((h) => hint(h, 'style'))
      js.forEach((h) => hint(h, 'script'))
      // the entry script lists the files the home page needs: fetch those too
      return Promise.all(
        js.map((src) =>
          fetch(new URL(src, page))
            .then((r) => (r.ok ? r.text() : ''))
            .then((code) => [...code.matchAll(/["'](\.?\/?assets\/[^"']+\.js)["']/g)].forEach((m) => hint(new URL(m[1].replace(/^\.\//, ''), new URL(base, page)).pathname, 'script'))),
        ),
      )
    })
    .catch(() => {})
  // the home page's site picture, the WebP copy that suits this screen
  const set = id && portalSrcSet(id)
  if (set) {
    const want = window.innerWidth * (window.devicePixelRatio || 1) > 1100 ? 1600 : 960
    const pick = set.split(', ').map((s) => s.split(' ')).find(([, w]) => parseInt(w, 10) >= want)?.[0]
    if (pick) hint(pick.replace(/^.*\/assets\//, `${base}assets/`), 'image')
  }
}

/** Props for a link to another website: prefetches it on hover, touch or focus. */
export const prefetchProps = (url, id) => {
  const go = () => prefetchSite(url, id)
  return { onPointerEnter: go, onTouchStart: go, onFocus: go }
}
