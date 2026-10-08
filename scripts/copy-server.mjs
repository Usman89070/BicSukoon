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
// Videos folder: any videos committed to videos/, plus a list of the expected
// file names (from src/data/videos.js) for whoever uploads them by hand.
mkdirSync('dist/videos', { recursive: true })
if (existsSync('videos')) cpSync('videos', 'dist/videos', { recursive: true, filter: (f) => !f.endsWith('README.md') })
const names = [...readFileSync('src/data/videos.js', 'utf8').matchAll(/film\([^)]*?'([^']+\.(?:mp4|webm|mov|m4v))'/g)].map((m) => m[1])
writeFileSync('dist/videos/README.txt', `Upload videos here (or to bic-videos/ next to public_html) with these exact names:\n\n${names.join('\n')}\n`)

console.log(`[server] Copied admin panel + API, seeded ${guests.length} guests and ${about.board.length} board members; ${names.length} video slots`)
