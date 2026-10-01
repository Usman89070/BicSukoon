/**
 * The two connected projects. `media.image` / `media.video` accept an
 * imported asset or a public URL; `null` renders an art-directed placeholder.
 */
export const projects = {
  bic: {
    id: 'bic',
    theme: 'theme-bic',
    name: 'Brisbane Islamic Centre',
    short: 'BIC',
    eyebrow: 'Project One',
    path: '/brisbane-islamic-centre',
    intro: 'A place of worship, learning and heritage.',
    description:
      'The Brisbane Islamic Centre brings together a Masjid Complex and the Queensland Muslim Cultural & Heritage Centre — a landmark for faith, knowledge and community.',
    facilities: ['masjid-complex', 'cultural-heritage-centre'],
    media: { image: null, video: null, label: 'BIC architectural render' },
  },
  sukoon: {
    id: 'sukoon',
    theme: 'theme-sukoon',
    name: 'Sukoon Village',
    short: 'Sukoon',
    eyebrow: 'Project Two',
    path: '/sukoon-village',
    intro: 'A connected village for every stage of life.',
    description:
      'Sukoon Village brings together Seniors Living, a Lifestyle Centre and a Childcare Centre — a community designed around care, connection and belonging.',
    facilities: ['seniors-living', 'lifestyle-centre', 'childcare-centre'],
    media: { image: null, video: null, label: 'Sukoon Village render' },
  },
}

export const projectList = Object.values(projects)
