import bicLogo from '../assets/logos/bic.png'
import bicLogoWhite from '../assets/logos/bic-white.png'
import sukoonLogo from '../assets/logos/sukoon.png'
import sukoonLogoDark from '../assets/logos/sukoon-dark.png'

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

  // Official logos. `onDark` / `onLight` select the right variant for the
  // background. bic-white and sukoon-dark are colour reversals of the official
  // files (BIC navy → white; Sukoon white → BIC navy, gold unchanged).
  // Replace with official reversed artwork if the design team supplies it.
  logos: {
    bic: {
      name: 'Brisbane Islamic Centre',
      onLight: bicLogo,
      onDark: bicLogoWhite,
      width: 779,
      height: 173,
    },
    sukoon: {
      name: 'Sukoon Village — Seniors Living',
      onLight: sukoonLogoDark,
      onDark: sukoonLogo,
      width: 987,
      height: 267,
      // The wordmark carries "peace" and "Seniors Living" above/below, so it
      // renders slightly taller to sit optically level with the BIC wordmark.
      scale: 1.3,
    },
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
