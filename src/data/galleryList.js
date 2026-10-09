/**
 * The photos the galleries start with (no build tools needed here, so the
 * admin-panel seed can be written from it too). `image` is a file name
 * prefix in src/assets/images/.
 */
export const galleryBuiltIn = [
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

/** "gallery-bic-eid-open-day" → "Eid open day" */
export const captionFromSlug = (slug) => {
  const text = slug.replace(/[-_]+/g, ' ').trim()
  return text.charAt(0).toUpperCase() + text.slice(1)
}
