/**
 * Global site configuration.
 * Any value set to `null` is rendered in the UI as a clearly identifiable
 * "to be confirmed" placeholder. Replace with official information only.
 */
export const site = {
  name: 'Brisbane Islamic Centre & Sukoon Village',
  shortName: 'BIC & Sukoon Village',
  tagline: 'Faith — Knowledge — Community — Legacy',
  url: import.meta.env.VITE_SITE_URL || '',
  defaultDescription:
    'Brisbane Islamic Centre and Sukoon Village — two connected community developments shaped by Faith, Knowledge, Community and Legacy.',
  defaultOgImage: null, // e.g. '/og/default.jpg' once a render is supplied

  // Official logos — drop files into src/assets/logos and import them here.
  // Until supplied, a typographic placeholder mark is shown.
  logos: {
    bic: null,
    sukoon: null,
  },

  legalName: null,
  registrationNumber: null, // e.g. ABN / ACNC — never invent
  copyrightHolder: null,
  legalLinks: [], // [{ label: 'Privacy Policy', href: '/privacy' }]
}

export const contacts = {
  bic: {
    label: 'Brisbane Islamic Centre',
    address: null,
    phone: null,
    email: null,
    hours: null,
    mapEmbedUrl: null,
  },
  sukoon: {
    label: 'Sukoon Village',
    address: null,
    phone: null,
    email: null,
    hours: null,
    mapEmbedUrl: null,
  },
}

/**
 * Official social accounts only. Leave `href: null` until supplied —
 * icons without a link are not rendered as clickable.
 */
export const socials = [
  { id: 'facebook', label: 'Facebook', href: null },
  { id: 'instagram', label: 'Instagram', href: null },
  { id: 'youtube', label: 'YouTube', href: null },
  { id: 'linkedin', label: 'LinkedIn', href: null },
  { id: 'x', label: 'X', href: null },
  { id: 'whatsapp', label: 'WhatsApp', href: null },
]
