/**
 * Masterplans — one per website.
 *
 * Until the official masterplan / aerial image is supplied, an INDICATIVE
 * schematic is drawn from each location's `shape` ({ x, y, w, h } in a
 * 1000 × 620 canvas, `round: true` for a circular form). Hotspots sit at the
 * centre of the shape unless `x` / `y` (percent) are given.
 *
 * When the official image arrives: set `image`, set `isIndicative: false`
 * and give every location explicit `x` / `y` percentages over that image.
 * To add a location, append an object.
 */
export const masterplans = {
  bic: {
    image: null,
    imageAlt: 'Brisbane Islamic Centre masterplan',
    isIndicative: true,
    zoneLabel: 'BRISBANE ISLAMIC CENTRE',
    locations: [
      { id: 'masjid-complex', facility: 'masjid-complex', shape: { x: 170, y: 140, w: 280, h: 260 } },
      { id: 'cultural-heritage-centre', facility: 'cultural-heritage-centre', shape: { x: 520, y: 130, w: 300, h: 170 } },
      {
        id: 'bic-future',
        title: 'Future Development',
        description: 'Further areas of the Brisbane Islamic Centre site. Details will be published when confirmed.',
        status: null,
        future: true,
        shape: { x: 520, y: 340, w: 300, h: 160 },
      },
    ],
  },
  sukoon: {
    image: null,
    imageAlt: 'Sukoon Village masterplan',
    isIndicative: true,
    zoneLabel: 'SUKOON VILLAGE',
    locations: [
      { id: 'seniors-living', facility: 'seniors-living', shape: { x: 160, y: 130, w: 340, h: 210 } },
      { id: 'lifestyle-centre', facility: 'lifestyle-centre', shape: { x: 600, y: 150, w: 200, h: 200, round: true } },
      { id: 'childcare-centre', facility: 'childcare-centre', shape: { x: 170, y: 380, w: 250, h: 120 } },
      {
        id: 'sukoon-future',
        title: 'Future Stages',
        description: 'Further stages of Sukoon Village. Details will be published when confirmed.',
        status: null,
        future: true,
        shape: { x: 500, y: 390, w: 320, h: 110 },
      },
    ],
  },
}
