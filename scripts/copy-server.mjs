// Copies the PHP admin panel and API (server/) into the dist root and writes
// dist/api/<list>-seed.json: the lists the website was built with, used by
// the admin panel until the first change is saved there.
import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { guests } from '../src/data/guests.js'
import { about } from '../src/data/about.js'
import { galleryBuiltIn, captionFromSlug } from '../src/data/galleryList.js'

if (!existsSync('dist/index.html')) {
  console.error('[server] dist/index.html not found, run the full build first.')
  process.exit(1)
}

cpSync('server', 'dist', { recursive: true })
const seed = (name, items) =>
  writeFileSync(
    `dist/api/${name}-seed.json`,
    JSON.stringify({ items: items.map(({ id, name, role, memoriam }) => ({ id, name, role: role ?? '', memoriam: !!memoriam })) }, null, 2),
  )
seed('guests', guests)
seed('board', about.board)

// Gallery: the built-in photos become the admin panel's starting list. Each
// keeps its image key (the website has it bundled) and a copy is placed in
// dist/gallery-builtin/ for the admin panel's previews.
const images = readdirSync('src/assets/images').filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
const fileFor = (key) => images.find((f) => f.toLowerCase().startsWith(key.toLowerCase()))
const builtIn = [
  ...galleryBuiltIn.map((p) => ({ ...p, file: fileFor(p.image) })),
  ...images
    .filter((f) => /^gallery-(bic|sukoon)-/i.test(f))
    .sort()
    .map((f) => {
      const [, project, slug] = f.match(/^gallery-(bic|sukoon)-(.+)\.[a-z]+$/i)
      return { project: project.toLowerCase(), image: f.replace(/\.[a-z]+$/i, ''), title: captionFromSlug(slug), file: f }
    }),
].filter((p) => p.file)
mkdirSync('dist/gallery-builtin', { recursive: true })
const usedIds = new Set()
const galleryItems = builtIn.map((p) => {
  copyFileSync(`src/assets/images/${p.file}`, `dist/gallery-builtin/${p.file}`)
  let id = `${p.project}-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
  for (let n = 2; usedIds.has(id); n++) id = `${id.replace(/-\d+$/, '')}-${n}`
  usedIds.add(id)
  return { id, name: p.title, project: p.project, kind: 'photo', builtin: p.image, thumb: p.file }
})
writeFileSync('dist/api/gallery-seed.json', JSON.stringify({ items: galleryItems }, null, 2))
// Videos: one folder per website. Copies any videos committed to videos/,
// plus a list of the expected file names (from src/data/videos.js) for
// whoever uploads them by hand.
const slots = [...readFileSync('src/data/videos.js', 'utf8').matchAll(/film\('(bic|sukoon)',[^)]*?'([^']+\.(?:mp4|webm|mov|m4v))'/g)].map((m) => [m[1], m[2]])
const names = slots.map(([, n]) => n)
for (const folder of ['bic', 'sukoon']) {
  mkdirSync(`dist/videos/${folder}`, { recursive: true })
  writeFileSync(
    `dist/videos/${folder}/README.txt`,
    `Upload the ${folder === 'bic' ? 'Brisbane Islamic Centre' : 'Sukoon Village'} videos to bic-videos/${folder}/ NEXT TO public_html (kept on every redeploy; files put here in public_html/videos/ can be lost when the site is replaced) with these exact names:\n\n${slots.filter(([f]) => f === folder).map(([, n]) => n).join('\n')}\n`,
  )
}
if (existsSync('videos')) cpSync('videos', 'dist/videos', { recursive: true, filter: (f) => !/(README\.md|\.gitkeep)$/.test(f) })

console.log(`[server] Copied admin panel + API, seeded ${guests.length} guests, ${about.board.length} board members and ${galleryItems.length} gallery photos; ${names.length} video slots`)
