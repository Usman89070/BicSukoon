import { seniors } from './seniors'
import { childcare } from './childcare'

/**
 * BIC home page copy — official wording supplied by the project team.
 * Edit here; the layout is in src/sites/bic/pages/Home.jsx.
 */
export const bicHome = {
  hero: {
    eyebrow: 'Brisbane Islamic Centre',
    lines: ['Building Faith.', 'Strengthening Community.', 'Creating a Legacy.'],
  },

  welcome: {
    title: 'Welcome to Brisbane Islamic Centre',
    lead: 'Brisbane Islamic Centre is being developed as more than a place of worship.',
    body: [
      'It is a vision for a thriving community precinct where faith is strengthened, knowledge is shared, and people of all backgrounds are welcomed.',
      'Designed to serve generations to come, the development will bring together worship, education, culture, wellbeing and community connection in one unique destination.',
    ],
    pillars: ['Worship', 'Education', 'Culture', 'Wellbeing', 'Community'],
  },

  vision: {
    title: 'A Vision for Future Generations',
    body: [
      'Following a comprehensive review of the project and consultation with industry specialists, the Brisbane Islamic Centre Board adopted a revised and sustainable vision for the future.',
      'The updated masterplan has been carefully designed to ensure the project remains practical, financially sustainable and capable of serving the needs of our growing community for generations to come.',
      'The development includes Brisbane Islamic Centre, Sukoon Village Seniors Living, a council-approved Childcare Centre and a range of community facilities designed to benefit both Muslims and the wider Australian community.',
    ],
  },

  explore: {
    title: 'Explore the Development',
    body: [
      'Every part of Brisbane Islamic Centre has been designed with purpose.',
      'Whether you are seeking a place of worship, learning, community connection or cultural understanding, we invite you to explore the vision and discover what makes this project unique.',
    ],
    items: [
      {
        id: 'bic',
        title: 'Brisbane Islamic Centre',
        text: 'The spiritual heart of the development, providing a welcoming place for worship, learning and community.',
        site: 'bic',
        path: '/masjid-complex',
        image: ['facility-masjid', 'site-300DPIbic'],
      },
      {
        id: 'sukoon',
        title: 'Sukoon Village Seniors Living',
        text: 'Thoughtfully designed independent living that allows our elders to remain connected to family, faith and community.',
        site: 'sukoon',
        path: '/seniors-living',
        image: ['facility-seniors-living', 'site-300DPISukoon'],
      },
      {
        id: 'childcare',
        title: 'Childcare Centre',
        text: 'A nurturing environment where young minds can learn, grow and thrive within a values-based community.',
        site: 'bic',
        path: '/childcare-centre',
        image: 'facility-childcare',
      },
      {
        id: 'community',
        title: 'Community Facilities',
        text: 'Including the Queensland Muslim Cultural Heritage Centre, Islamic Museum, Theatre, Community Hall, Café and other spaces designed to bring people together.',
        site: 'bic',
        path: '/cultural-heritage-centre',
        image: 'facility-qmchc',
        links: [
          { label: 'Cultural Heritage Centre', path: '/cultural-heritage-centre' },
          { label: 'Islamic Museum', path: '/cultural-heritage-centre#museum' },
          { label: 'Theatre', path: '/cultural-heritage-centre#theatre' },
          { label: 'Community Hall', path: '/community-hall' },
          { label: 'Café', path: '/cafe' },
          { label: 'Gyms', path: '/gyms' },
        ],
      },
    ],
  },

  updates: {
    title: 'Project Updates',
    lead: 'Brisbane Islamic Centre continues to move forward.',
    body: 'As the project progresses, we remain committed to keeping our community informed through regular updates, key milestones and important announcements.',
    highlight: 'Construction is expected to commence later this year, Insha’Allah.',
  },

  journey: {
    title: 'Join Us on the Journey',
    lines: ['This is more than a development.', 'More than a collection of buildings.'],
    body: 'It is a place where communities gather, knowledge is shared, children are nurtured and our elders remain connected.',
    closing: 'Together, we are building a legacy that will serve this generation and every generation to come.',
  },
}

/**
 * Sukoon Village home page — built from the official Seniors Living copy
 * (src/data/seniors.js) so wording stays in one place.
 */
export const sukoonHome = {
  hero: { eyebrow: 'Sukoon Village Seniors Living', title: seniors.heading },
  welcome: {
    title: 'Welcome to Sukoon Village',
    lead: seniors.intro[0],
    body: [seniors.intro[1], seniors.belong],
    pillars: ['Comfort', 'Independence', 'Community', 'Family', 'Faith'],
  },
  facts: seniors.facts,
  explore: {
    title: 'Explore the Village',
    body: [seniors.dignity.lead, seniors.connected.lead],
    items: [
      { id: 'seniors', title: 'Seniors Living', text: seniors.dignity.body[1], site: 'sukoon', path: '/seniors-living', image: ['facility-seniors-living', 'site-300DPISukoon'] },
      { id: 'lifestyle', title: 'Lifestyle Centre', text: `${seniors.lifestyle.lead} ${seniors.lifestyle.body[1]}`, site: 'sukoon', path: '/lifestyle-centre', image: 'facility-lifestyle-centre' },
      { id: 'bic', title: 'Brisbane Islamic Centre', text: seniors.connected.body[0], site: 'bic', path: '/', image: ['hero-bic', 'site-300DPIbic'] },
      { id: 'childcare', title: 'Childcare Centre', text: childcare.intro[0], site: 'bic', path: '/childcare-centre', image: 'facility-childcare' },
    ],
  },
  connected: seniors.connected,
  chapter: seniors.chapter,
  ahead: seniors.ahead,
  values: seniors.values,
}
