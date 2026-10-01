// Generates dist/sitemap.xml from src/utils/routes.js.
// Requires VITE_SITE_URL (absolute URLs are mandatory in sitemaps).
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { routes } from '../src/utils/routes.js'

let site = process.env.VITE_SITE_URL
if (!site && existsSync('.env')) {
  site = readFileSync('.env', 'utf8').match(/^VITE_SITE_URL=(.*)$/m)?.[1]?.trim()
}
if (!site) {
  console.warn('[sitemap] VITE_SITE_URL not set — skipping sitemap.xml generation.')
  process.exit(0)
}
const base = site.replace(/\/$/, '')
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${base}${r}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync('dist/sitemap.xml', xml)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
console.log(`[sitemap] Wrote ${routes.length} URLs to dist/sitemap.xml`)
