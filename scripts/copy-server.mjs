// Copies the PHP admin panel and API (server/) into the dist root and writes
// dist/api/<list>-seed.json: the lists the website was built with, used by
// the admin panel until the first change is saved there.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { guests } from '../src/data/guests.js'
import { about } from '../src/data/about.js'

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

console.log(`[server] Copied admin panel + API, seeded ${guests.length} guests and ${about.board.length} board members; ${names.length} video slots`)
