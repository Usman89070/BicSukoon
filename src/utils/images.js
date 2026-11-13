/**
 * Drop-in photography from src/assets/images/. Any JPG, PNG or WebP whose
 * file name starts with a known key is picked up automatically, e.g.
 *   progress-underground-tank.webp, facility-cafe.jpg
 * Until a file is supplied, components show a labelled placeholder.
 */
const files = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

export const imageFor = (key) => {
  if (!key) return null
  if (Array.isArray(key)) return key.map(imageFor).find(Boolean) ?? null
  const matches = Object.keys(files).filter((k) => new RegExp(`/${key}[^/]*\\.[a-z]+$`, 'i').test(k))
  // a smaller WebP copy (same name, .webp) wins over the original JPG/PNG
  const exact = (ext) => matches.find((k) => new RegExp(`/${key}\\.${ext}$`, 'i').test(k))
  const match = exact('webp') ?? matches[0]
  return match ? files[match] : null
}
