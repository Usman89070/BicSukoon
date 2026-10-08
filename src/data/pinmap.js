/**
 * Interactive site picture on each website: numbered pins on the aerial
 * render; hovering (or tapping) a pin opens a card with that area's film.
 *
 * x / y are percentages of the full render (src/assets/images/<site>-pinmap.jpg) at
 * the point the pin touches. Areas as marked by the project team. `video` is an entry in data/videos.js (upload the file to
 * videos/<site>/ on the server); `path` is the page the card links to;
 * `narrow: 'below'` puts the label under the pin on phones, where it would
 * collide with a neighbour.
 */
export const pinmaps = {
  bic: {
    name: 'the Brisbane Islamic Centre',
    image: 'bic-pinmap',
    width: 1500,
    height: 1101,
    visibleHeight: 860, // crop the motorway at the bottom
    pins: [
      { id: 'community-hall', n: 1, title: 'Community Hall', x: 27, y: 26, video: 'pinCommunityHall', path: '/community-hall' },
      { id: 'qmchc', n: 2, title: 'Queensland Muslim Cultural and Heritage Centre (QMCHC)', short: 'QMCHC', narrow: 'below', x: 45.5, y: 28, video: 'pinQmchc', path: '/cultural-heritage-centre' },
      { id: 'masjid', n: 3, title: 'Masjid', x: 70.5, y: 26, video: 'pinMasjid', path: '/masjid-complex' },
      { id: 'cafe', n: 4, title: 'Café, outdoor dining area and gyms', short: 'Café & gyms', x: 53.5, y: 20.5, video: 'pinCafe', path: '/cafe' },
    ],
  },
  sukoon: {
    name: 'Sukoon Village',
    image: 'sukoon-pinmap',
    width: 1500,
    height: 1084,
    visibleHeight: 760, // crop the road and motorway at the bottom
    pins: [
      { id: 'childcare', n: 'A', title: 'Childcare Centre', x: 33.7, y: 41, video: 'pinChildcare', path: '/childcare-centre' },
      { id: 'seniors-living', n: 'B', title: 'Sukoon Village Seniors Living', short: 'Seniors Living', x: 56, y: 34.5, video: 'pinSeniorsLiving', path: '/seniors-living' },
    ],
  },
}
