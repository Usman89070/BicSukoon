/**
 * Full-screen photos for the two halves of the starting page, picked up
 * automatically from src/assets/images/ (JPG, PNG or WebP):
 *   BIC half:     portal-bic.*    (or the high-res hero-bic.*, then site-300DPIbicM-50kb.jpg)
 *   Sukoon half:  portal-sukoon.* (or the high-res hero-sukoon.*, then site-300DPISukoon-50kb.jpg)
 * Without a photo, a half uses its brand colours and pattern.
 */
const files = import.meta.glob('../assets/images/{portal-bic,portal-sukoon,hero-bic,hero-sukoon,site-300DPI*}.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const patterns = {
  bic: [/\/portal-bic\.[a-z]+$/i, /\/hero-bic\.[a-z]+$/i, /\/site-300DPIbic[^/]*$/i],
  sukoon: [/\/portal-sukoon\.[a-z]+$/i, /\/hero-sukoon\.[a-z]+$/i, /\/site-300DPISukoon[^/]*$/i],
}

// Smaller WebP copies of the photos (portal-<id>-<width>.webp) for phones and laptops
const sized = import.meta.glob('../assets/images/portal-{bic,sukoon}-*.webp', { eager: true, import: 'default' })

/** srcset of the smaller copies, e.g. "…-960.webp 960w, …-1600.webp 1600w" (null when there are none). */
export function portalSrcSet(id) {
  const list = Object.entries(sized)
    .map(([k, url]) => [Number(k.match(new RegExp(`/portal-${id}-(\\d+)\\.webp$`))?.[1]), url])
    .filter(([w]) => w)
    .sort((a, b) => a[0] - b[0])
  return list.length ? list.map(([w, url]) => `${url} ${w}w`).join(', ') : null
}

export function portalImage(id) {
  for (const re of patterns[id] ?? []) {
    const key = Object.keys(files).find((k) => re.test(k))
    if (key) return files[key]
  }
  return null
}
