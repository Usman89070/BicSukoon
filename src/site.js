import { sites } from './data/sites'

/** Which build this is: set by VITE_SITE in .env.bic / .env.sukoon / .env.portal. */
export const SITE_ID = import.meta.env.VITE_SITE === 'sukoon' ? 'sukoon' : import.meta.env.VITE_SITE === 'portal' ? 'portal' : 'bic'
export const site = sites[SITE_ID] // undefined for the portal (starting page)

/** Path this build is served under, without trailing slash ("" at the root). */
export const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
/** Public origin + base path, for canonical URLs and Open Graph. */
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '') + basePath

const devUrl = (port) => (import.meta.env.DEV ? `http://localhost:${port}/` : null)

/** Links between the three builds. Defaults suit a single-domain deploy. */
export const urls = {
  portal: import.meta.env.VITE_PORTAL_URL || devUrl(5175) || '/',
  bic: import.meta.env.VITE_BIC_URL || devUrl(5173) || '/bic/',
  sukoon: import.meta.env.VITE_SUKOON_URL || devUrl(5174) || '/sukoon/',
}

/**
 * Link to a page on either website. Returns null for the current website
 * (use a router link), otherwise an absolute href to the other website.
 */
export const externalHref = (siteId, path = '/') => {
  if (!siteId || siteId === SITE_ID) return null
  const root = (SITE_ID !== 'portal' && site?.sister?.id === siteId && site.sister.url) || urls[siteId]
  return root.replace(/\/$/, '') + path
}
