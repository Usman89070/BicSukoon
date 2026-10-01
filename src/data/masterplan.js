/**
 * Masterplan hotspots. Positions are percentages over the masterplan image
 * (x from left, y from top). Add a location by appending an object.
 *
 * NOTE: The plan currently shows an INDICATIVE schematic. When the official
 * masterplan / aerial image is supplied set `masterplan.image` and adjust
 * the x/y coordinates to sit on the correct buildings.
 */
export const masterplan = {
  image: null, // official aerial / masterplan image
  imageAlt: 'Development masterplan',
  isIndicative: true,
  locations: [
    { id: 'masjid-complex', project: 'bic', facility: 'masjid-complex', x: 30, y: 36 },
    { id: 'cultural-heritage-centre', project: 'bic', facility: 'cultural-heritage-centre', x: 45, y: 24 },
    {
      id: 'bic-future',
      project: 'bic',
      title: 'Future BIC Development',
      description: 'Additional areas of the Brisbane Islamic Centre site. Details will be published when confirmed.',
      status: null,
      x: 18,
      y: 62,
    },
    { id: 'seniors-living', project: 'sukoon', facility: 'seniors-living', x: 68, y: 56 },
    { id: 'lifestyle-centre', project: 'sukoon', facility: 'lifestyle-centre', x: 60, y: 76 },
    { id: 'childcare-centre', project: 'sukoon', facility: 'childcare-centre', x: 82, y: 34 },
    {
      id: 'sukoon-future',
      project: 'sukoon',
      title: 'Future Sukoon Development',
      description: 'Further stages of Sukoon Village. Details will be published when confirmed.',
      status: null,
      x: 86,
      y: 74,
    },
  ],
}
