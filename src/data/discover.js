/**
 * "Discover" grid: every facility in one place, on both websites.
 * `site` says which website the facility page lives on; links to the other
 * website are built automatically. `image` is a file name prefix (or a list,
 * first match wins) in src/assets/images/ (see utils/images.js).
 */
export const discover = [
  { id: 'masjid', title: 'Masjid', subtitle: 'Prayer & reflection', site: 'bic', path: '/masjid-complex', image: ['facility-masjid', 'site-300DPIbic'] },
  { id: 'qmchc', title: 'QMCHC', subtitle: 'Museum · Library · Theatre', site: 'bic', path: '/cultural-heritage-centre', image: 'facility-qmchc' },
  { id: 'community-hall', title: 'Community Hall', subtitle: 'Gatherings & events', site: 'bic', path: '/community-hall', image: 'facility-community-hall' },
  { id: 'cafe', title: 'Café', subtitle: 'Meet & unwind', site: 'bic', path: '/cafe', image: 'facility-cafe' },
  { id: 'gyms', title: 'Gyms', subtitle: 'Health & fitness', site: 'bic', path: '/gyms', image: 'facility-gyms' },
  { id: 'childcare', title: 'Childcare', subtitle: 'Early learning', site: 'bic', path: '/childcare-centre', image: 'facility-childcare' },
  { id: 'sukoon-village', title: 'Sukoon Village', subtitle: 'Seniors living & lifestyle', site: 'sukoon', path: '/', image: 'site-300DPISukoon' },
]
