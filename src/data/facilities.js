/**
 * Development areas / facilities. Drives facility pages, masterplan panels
 * and donation allocation cards.
 *
 * Wording here is introductory draft copy based on the project brief and is
 * written to avoid factual claims. Replace with official wording as supplied.
 * `status: null` displays "Status to be confirmed".
 */
export const facilities = {
  'masjid-complex': {
    id: 'masjid-complex',
    project: 'bic',
    title: 'Masjid Complex',
    path: '/brisbane-islamic-centre/masjid-complex',
    eyebrow: 'Brisbane Islamic Centre',
    pillar: 'Faith',
    summary: 'The spiritual heart of the Brisbane Islamic Centre — a place for prayer, reflection and gathering.',
    status: null,
    media: { image: null, video: 'masjid', label: 'Masjid Complex render' },
    sections: [
      {
        heading: 'Purpose',
        body: 'A dedicated space for daily and congregational prayer, designed to welcome worshippers and visitors with dignity and calm.',
      },
      {
        heading: 'Architecture',
        body: 'Architectural renders and design details will be published here as they are released by the project team.',
      },
      {
        heading: 'Community role',
        body: 'Beyond prayer, the Masjid is envisioned as a gathering point that connects families, generations and the wider Brisbane community.',
      },
    ],
  },
  'cultural-heritage-centre': {
    id: 'cultural-heritage-centre',
    project: 'bic',
    title: 'Queensland Muslim Cultural & Heritage Centre',
    shortTitle: 'Cultural & Heritage Centre',
    path: '/brisbane-islamic-centre/cultural-heritage-centre',
    eyebrow: 'Brisbane Islamic Centre',
    pillar: 'Knowledge',
    summary: 'A centre to preserve, share and celebrate the story of Muslims in Queensland.',
    status: null,
    media: { image: null, video: null, label: 'Cultural & Heritage Centre render' },
    sections: [
      { heading: 'Cultural purpose', body: 'A home for the cultural life of Queensland’s Muslim communities — open to everyone who wishes to learn and connect.' },
      { heading: 'Educational role', body: 'A place for learning, exhibitions and programmes that build understanding across communities and generations.' },
      { heading: 'Community role', body: 'A welcoming civic space where the wider community can meet, share and take part.' },
      { heading: 'Heritage contribution', body: 'Recording and honouring the contribution of Muslims to Queensland’s history so it can be passed on to future generations.' },
    ],
  },
  'seniors-living': {
    id: 'seniors-living',
    project: 'sukoon',
    title: 'Seniors Living',
    path: '/sukoon-village/seniors-living',
    eyebrow: 'Sukoon Village',
    pillar: 'Community',
    summary: 'Seniors living designed around dignity, comfort and connection to community.',
    status: null,
    media: { image: null, video: null, label: 'Seniors Living render' },
    sections: [
      { heading: 'Purpose', body: 'Providing seniors with a place to live that honours their values and keeps them close to family and community.' },
      { heading: 'Lifestyle', body: 'A calm, supportive environment that encourages wellbeing, independence and daily connection.' },
      { heading: 'Community', body: 'Located within a wider village, so residents remain part of everyday community life.' },
      { heading: 'Accommodation concept', body: 'Accommodation types, layouts and specifications will be published once officially confirmed.' },
      { heading: 'Supporting facilities', body: 'Details of supporting facilities and services will be shared as the design progresses.' },
    ],
  },
  'lifestyle-centre': {
    id: 'lifestyle-centre',
    project: 'sukoon',
    title: 'Lifestyle Centre',
    path: '/sukoon-village/lifestyle-centre',
    eyebrow: 'Sukoon Village',
    pillar: 'Community',
    summary: 'A shared hub for gathering, wellbeing and everyday village life.',
    status: null,
    media: { image: null, video: null, label: 'Lifestyle Centre render' },
    sections: [
      { heading: 'Purpose', body: 'A central place for residents, families and visitors to meet, socialise and take part in village life.' },
      { heading: 'Community role', body: 'Bringing generations together and strengthening the connections that make Sukoon a village rather than a development.' },
    ],
  },
  'childcare-centre': {
    id: 'childcare-centre',
    project: 'sukoon',
    title: 'Childcare Centre',
    path: '/sukoon-village/childcare-centre',
    eyebrow: 'Sukoon Village',
    pillar: 'Legacy',
    summary: 'Early learning and care for the next generation, at the heart of the village.',
    status: null,
    media: { image: null, video: null, label: 'Childcare Centre render' },
    sections: [
      { heading: 'Purpose', body: 'A nurturing environment for early learning and care, close to home and community.' },
      { heading: 'Community benefit', body: 'Supporting local families and creating everyday moments where young and old share the same village.' },
      { heading: 'Role in the development', body: 'Completing a village designed for every stage of life — from early childhood to later years.' },
    ],
  },
}

export const facilityList = Object.values(facilities)
export const facilitiesFor = (project) => facilityList.filter((f) => f.project === project)
