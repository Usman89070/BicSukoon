/**
 * Drop-in photography from src/assets/images/. Any JPG, PNG or WebP whose
 * file name starts with a known key is picked up automatically, e.g.
 *   sukoon-drive.jpg, underground-tank.webp, facility-cafe.jpg
 * Until a file is supplied, components show a labelled placeholder.
 */
const files = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

export const imageFor = (key) => {
  if (!key) return null
  if (Array.isArray(key)) return key.map(imageFor).find(Boolean) ?? null
  const match = Object.keys(files).find((k) => new RegExp(`/${key}[^/]*\\.[a-z]+$`, 'i').test(k))
  return match ? files[match] : null
}
