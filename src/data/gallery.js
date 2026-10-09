import { imageFor } from '../utils/images'

/**
 * Photo gallery for both websites (/gallery, /gallery/bic, /gallery/sukoon).
 *
 * To add photos, drop them into src/assets/images/ named
 *   gallery-bic-<anything>.jpg     → BIC gallery
 *   gallery-sukoon-<anything>.jpg  → Sukoon gallery
 * The caption is taken from the rest of the file name
 * (gallery-bic-eid-open-day.jpg → "Eid open day"). They appear after the
 * renders listed below.
 */
export const galleries = {
  bic: { id: 'bic', title: 'BIC Gallery', name: 'Brisbane Islamic Centre', path: '/gallery/bic' },
  sukoon: { id: 'sukoon', title: 'Sukoon Gallery', name: 'Sukoon Village', path: '/gallery/sukoon' },
}

const listed = [
  { project: 'bic', image: 'bic-welcome', title: 'The Brisbane Islamic Centre' },
  { project: 'bic', image: 'hero-bic', title: 'Aerial view of the centre' },
  { project: 'bic', image: 'progress-existing-structure', title: 'The existing structure' },
  { project: 'bic', image: 'about-gallery-3', title: 'Prayer hall interior' },
  { project: 'bic', image: 'about-gallery-2', title: 'Islamic Museum interior' },
  { project: 'sukoon', image: 'hero-sukoon', title: 'Aerial view of Sukoon Village' },
  { project: 'sukoon', image: 'sukoon-welcome', title: 'The village from above' },
  { project: 'sukoon', image: 'sukoon-existing-structure', title: 'The existing structure' },
  { project: 'sukoon', image: 'facility-childcare', title: 'Childcare Centre' },
]

const dropped = import.meta.glob('../assets/images/gallery-{bic,sukoon}-*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const caption = (slug) => {
  const text = slug.replace(/[-_]+/g, ' ').trim()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const galleryItems = [
  ...listed.map((p) => ({ ...p, src: imageFor(p.image) })).filter((p) => p.src),
  ...Object.entries(dropped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([file, src]) => {
      const [, project, slug] = file.match(/gallery-(bic|sukoon)-(.+)\.[a-z]+$/i)
      return { project: project.toLowerCase(), image: file, title: caption(slug), src }
    }),
].map((p, i) => ({ ...p, id: `${p.project}-${i}` }))
