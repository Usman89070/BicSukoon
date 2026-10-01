import { sites } from './data/sites'

/** Which website this build is: set by VITE_SITE in .env.bic / .env.sukoon. */
export const SITE_ID = import.meta.env.VITE_SITE === 'sukoon' ? 'sukoon' : 'bic'
export const site = sites[SITE_ID]
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')
