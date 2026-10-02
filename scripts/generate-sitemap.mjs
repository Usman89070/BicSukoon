// Generates sitemap.xml + robots.txt for one website: node scripts/generate-sitemap.mjs <bic|sukoon>
// Uses VITE_SITE_URL (origin) + VITE_BASE (path) from .env.<site> (or .env.<site>.local / the environment).
import { writeFileSync, existsSync, readFileSync } from 'node:fs'

const siteId = process.argv[2]
if (!['bic', 'sukoon'].includes(siteId)) {
  console.error('Usage: node scripts/generate-sitemap.mjs <bic|sukoon>')
  process.exit(1)
}
const { routes } = await import(`../src/sites/${siteId}/routes.js`)

const readEnv = (file, key) =>
  existsSync(file) ? readFileSync(file, 'utf8').match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1]?.trim() : ''
const env = (key) => process.env[key] || readEnv(`.env.${siteId}.local`, key) || readEnv(`.env.${siteId}`, key)
const site = env('VITE_SITE_URL')
const basePath = (env('VITE_BASE') || '/').replace(/\/$/, '')
const outDir = `dist/${siteId}`

if (!site) {
  console.warn(`[sitemap:${siteId}] VITE_SITE_URL not set — skipping sitemap.xml.`)
  process.exit(0)
}
const base = site.replace(/\/$/, '') + basePath
writeFileSync(
  `${outDir}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${base}${r}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(`${outDir}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
console.log(`[sitemap:${siteId}] Wrote ${routes.length} URLs to ${outDir}/sitemap.xml`)
