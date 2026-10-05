/**
 * Photos for the starting-page text blocks, picked up automatically
 * from src/assets/images/ (JPG, PNG or WebP):
 *   BIC block:     site-300DPIbicM-50kb.jpg   (or portal-bic.*)
 *   Sukoon block:  site-300DPISukoon-50kb.jpg (or portal-sukoon.*)
 * Without a photo, a block uses its brand colours and pattern.
 */
const files = import.meta.glob('../assets/images/{portal-*,site-300DPI*}.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const patterns = {
  bic: [/\/site-300DPIbic[^/]*$/i, /\/portal-bic\.[a-z]+$/i],
  sukoon: [/\/site-300DPISukoon[^/]*$/i, /\/portal-sukoon\.[a-z]+$/i],
}

export function portalImage(id) {
  for (const re of patterns[id] ?? []) {
    const key = Object.keys(files).find((k) => re.test(k))
    if (key) return files[key]
  }
  return null
}

/** Aerial photo showing both sites, used as the starting-page background map. */
export const aerialImage = (() => {
  const key = Object.keys(files).find((k) => /\/portal-aerial\.[a-z]+$/i.test(k))
  return key ? files[key] : null
})()
