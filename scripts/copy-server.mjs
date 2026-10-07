// Copies the PHP admin panel and API (server/) into the dist root and writes
// dist/api/<list>-seed.json: the lists the website was built with, used by
// the admin panel until the first change is saved there.
import { cpSync, existsSync, writeFileSync } from 'node:fs'
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
console.log(`[server] Copied admin panel + API, seeded ${guests.length} guests and ${about.board.length} board members`)
