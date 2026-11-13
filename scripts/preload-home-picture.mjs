// Adds an early download of each website's first picture (the site picture
// with the pins, a WebP copy sized for the screen) to its index.html, so it
// loads together with the page instead of after the scripts. Only on the
// website's home page (a small inline check), as other pages do not show it.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'

for (const site of ['bic', 'sukoon']) {
  const file = `dist/${site}/index.html`
  if (!existsSync(file)) continue
  const copies = readdirSync(`dist/${site}/assets`)
    .map((f) => [Number(f.match(new RegExp(`^portal-${site}-(\\d+)-.*\\.webp$`))?.[1]), f])
    .filter(([w]) => w)
    .sort((a, b) => a[0] - b[0])
  if (!copies.length) continue
  // the full render (2400 px) is the last choice, as in the page itself
  const full = readdirSync(`dist/${site}/assets`).find((f) => new RegExp(`^hero-${site}-.*\\.jpg$`).test(f))
  const srcset = [...copies.map(([w, f]) => `/${site}/assets/${f} ${w}w`), ...(full ? [`/${site}/assets/${full} 2400w`] : [])].join(', ')
  const tag = `<script>(function(){var p=location.pathname.replace(/index\\.html$/,'');if(p!=='/${site}/'&&p!=='/${site}')return;var l=document.createElement('link');l.rel='preload';l.as='image';l.fetchPriority='high';l.setAttribute('imagesrcset',${JSON.stringify(srcset)});l.setAttribute('imagesizes','(max-width: 1320px) 100vw, 1280px');document.head.appendChild(l)})()</script>`
  const html = readFileSync(file, 'utf8').replace(/<script>\(function\(\)\{var p=location[\s\S]*?<\/script>\n?/, '')
  writeFileSync(file, html.replace('</title>', `</title>\n    ${tag}`))
  console.log(`[preload] ${site}: home picture preloaded`)
}
