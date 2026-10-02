/**
 * The two websites. Each is built separately (npm run build:bic / build:sukoon)
 * and has its own navigation, footer, contact details and social accounts.
 *
 * Sister-site links default to the other site's sub-path (see urls in site.js);
 * set VITE_SISTER_URL when the sites live on separate domains.
 *
 * Any value set to `null` renders as a clearly identifiable "to be confirmed"
 * placeholder. Replace with official information only.
 */
const socialSlots = () => [
  { id: 'facebook', label: 'Facebook', href: null },
  { id: 'instagram', label: 'Instagram', href: null },
  { id: 'youtube', label: 'YouTube', href: null },
  { id: 'linkedin', label: 'LinkedIn', href: null },
  { id: 'x', label: 'X', href: null },
  { id: 'whatsapp', label: 'WhatsApp', href: null },
]

export const sites = {
  bic: {
    id: 'bic',
    name: 'Brisbane Islamic Centre',
    shortName: 'BIC',
    tagline: 'Faith — Knowledge — Community — Legacy',
    description:
      'Brisbane Islamic Centre — a Masjid Complex and the Queensland Muslim Cultural & Heritage Centre, built on Faith, Knowledge, Community and Legacy.',
    defaultOgImage: null,
    // Light interface: frosted white surfaces so the official navy logo is shown as-is.
    navTone: 'light',
    footerTone: 'light',
    heroStyle: 'cinematic',

    nav: [
      { label: 'Home', to: '/' },
      {
        label: 'About',
        children: [
          { label: 'About Us', to: '/about', text: 'Our story and purpose' },
          { label: 'Vision', to: '/vision', text: 'Faith, Knowledge, Community, Legacy' },
        ],
      },
      {
        label: 'The Centre',
        children: [
          { label: 'Masjid Complex', to: '/masjid-complex', text: 'The spiritual heart of the centre' },
          { label: 'Cultural & Heritage Centre', to: '/cultural-heritage-centre', text: 'Queensland Muslim Cultural & Heritage Centre' },
        ],
      },
      {
        label: 'Progress',
        children: [
          { label: 'Project Status', to: '/project-status', text: 'Milestones and current stage' },
          { label: 'Project Updates', to: '/project-updates', text: 'The development journal' },
          { label: 'Project Funding', to: '/project-funding', text: 'Why funding is needed' },
        ],
      },
      {
        label: 'Community',
        children: [
          { label: 'Events', to: '/events', text: 'Gatherings and open days' },
          { label: 'Honoured Guests', to: '/honoured-guests', text: 'Distinguished visitors' },
        ],
      },
      { label: 'Contact', to: '/contact' },
    ],
    cta: { label: 'Donate', to: '/donate', icon: 'heart' },
    features: { donate: true, funding: true, events: true, guests: true },
    enquiryTopics: ['General enquiry', 'Masjid Complex', 'Cultural & Heritage Centre', 'Donations & funding', 'Events', 'Media'],

    contact: { address: null, phone: null, email: null, hours: null, mapEmbedUrl: null },
    socials: socialSlots(),
    legal: { name: null, registrationNumber: null, copyrightHolder: null, links: [] },

    sister: { id: 'sukoon', name: 'Sukoon Village', url: import.meta.env.VITE_SISTER_URL || null },
  },

  sukoon: {
    id: 'sukoon',
    name: 'Sukoon Village',
    shortName: 'Sukoon',
    tagline: 'A village for every stage of life',
    description:
      'Sukoon Village — Seniors Living, a Lifestyle Centre and a Childcare Centre: a village for every stage of life.',
    defaultOgImage: null,
    navTone: 'light',
    footerTone: 'dark',
    heroStyle: 'split',

    nav: [
      { label: 'Home', to: '/' },
      { label: 'Vision', to: '/vision' },
      {
        label: 'The Village',
        children: [
          { label: 'Seniors Living', to: '/seniors-living', text: 'Dignity, comfort and connection' },
          { label: 'Lifestyle Centre', to: '/lifestyle-centre', text: 'The heart of village life' },
          { label: 'Childcare Centre', to: '/childcare-centre', text: 'Care for the next generation' },
        ],
      },
      {
        label: 'Progress',
        children: [
          { label: 'Project Status', to: '/project-status', text: 'Milestones and current stage' },
          { label: 'Project Updates', to: '/project-updates', text: 'News from the village' },
        ],
      },
      { label: 'Contact', to: '/contact' },
    ],
    // No donation page on Sukoon unless the organisation confirms one.
    // To enable: set features.donate = true and change cta to the donate route.
    cta: { label: 'Enquire', to: '/contact', icon: 'mail' },
    features: { donate: false, funding: false, events: false, guests: false },
    enquiryTopics: ['General enquiry', 'Seniors Living', 'Lifestyle Centre', 'Childcare Centre', 'Media'],

    contact: { address: null, phone: null, email: null, hours: null, mapEmbedUrl: null },
    socials: socialSlots(),
    legal: { name: null, registrationNumber: null, copyrightHolder: null, links: [] },

    sister: { id: 'bic', name: 'Brisbane Islamic Centre', url: import.meta.env.VITE_SISTER_URL || null },
  },
}
