// Generates sitemap.xml + robots.txt for one website: node scripts/generate-sitemap.mjs <bic|sukoon>
// Uses VITE_SITE_URL from .env.<site> (or .env.<site>.local / the environment).
import { writeFileSync, existsSync, readFileSync } from 'node:fs'

const siteId = process.argv[2]
if (!['bic', 'sukoon'].includes(siteId)) {
  console.error('Usage: node scripts/generate-sitemap.mjs <bic|sukoon>')
  process.exit(1)
}
const { routes } = await import(`../src/sites/${siteId}/routes.js`)

const readEnv = (file) => (existsSync(file) ? readFileSync(file, 'utf8').match(/^VITE_SITE_URL=(.*)$/m)?.[1]?.trim() : '')
const site = process.env.VITE_SITE_URL || readEnv(`.env.${siteId}.local`) || readEnv(`.env.${siteId}`)
const outDir = `dist/${siteId}`

if (!site) {
  console.warn(`[sitemap:${siteId}] VITE_SITE_URL not set — skipping sitemap.xml.`)
  process.exit(0)
}
const base = site.replace(/\/$/, '')
writeFileSync(
  `${outDir}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${base}${r}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(`${outDir}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
console.log(`[sitemap:${siteId}] Wrote ${routes.length} URLs to ${outDir}/sitemap.xml`)
