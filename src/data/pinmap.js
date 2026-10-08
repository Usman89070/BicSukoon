/**
 * Interactive site picture on the BIC website: numbered pins on the aerial
 * render; hovering (or tapping) a pin opens a card with that area's film.
 *
 * x / y are percentages of the full render (src/assets/images/bic-pinmap.jpg,
 * 1500 x 1101) at the point the pin touches. Areas as marked by the
 * project team. `video` is an entry in data/videos.js (upload the file to
 * videos/bic/ on the server); `path` is the page the card links to.
 */
export const pinmap = {
  image: 'bic-pinmap',
  width: 1500,
  height: 1101,
  visibleHeight: 860, // crop the motorway at the bottom
  pins: [
    { id: 'community-hall', n: 1, title: 'Community Hall', x: 27, y: 26, video: 'pinCommunityHall', path: '/community-hall' },
    { id: 'qmchc', n: 2, title: 'Queensland Muslim Cultural and Heritage Centre (QMCHC)', short: 'QMCHC', x: 45.5, y: 28, video: 'pinQmchc', path: '/cultural-heritage-centre' },
    { id: 'masjid', n: 3, title: 'Masjid', x: 70.5, y: 26, video: 'pinMasjid', path: '/masjid-complex' },
    { id: 'cafe', n: 4, title: 'Café, outdoor dining area and gyms', short: 'Café & gyms', x: 53.5, y: 20.5, video: 'pinCafe', path: '/cafe' },
  ],
}
