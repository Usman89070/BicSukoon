/**
 * Full-screen photos for the two halves of the starting page, picked up
 * automatically from src/assets/images/ (JPG, PNG or WebP):
 *   BIC half:     portal-bic.*    (or site-300DPIbicM-50kb.jpg)
 *   Sukoon half:  portal-sukoon.* (or site-300DPISukoon-50kb.jpg)
 * Without a photo, a half uses its brand colours and pattern.
 */
const files = import.meta.glob('../assets/images/{portal-bic,portal-sukoon,site-300DPI*}.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const patterns = {
  bic: [/\/portal-bic\.[a-z]+$/i, /\/site-300DPIbic[^/]*$/i],
  sukoon: [/\/portal-sukoon\.[a-z]+$/i, /\/site-300DPISukoon[^/]*$/i],
}

export function portalImage(id) {
  for (const re of patterns[id] ?? []) {
    const key = Object.keys(files).find((k) => re.test(k))
    if (key) return files[key]
  }
  return null
}
