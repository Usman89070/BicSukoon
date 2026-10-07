// Copies the PHP admin panel and API (server/) into the dist root and writes
// dist/api/guests-seed.json: the guest list the website was built with, used
// by the admin panel until the first change is saved there.
import { cpSync, existsSync, writeFileSync } from 'node:fs'
import { guests } from '../src/data/guests.js'

if (!existsSync('dist/index.html')) {
  console.error('[server] dist/index.html not found, run the full build first.')
  process.exit(1)
}

cpSync('server', 'dist', { recursive: true })
writeFileSync(
  'dist/api/guests-seed.json',
  JSON.stringify({ guests: guests.map(({ id, name, role }) => ({ id, name, role: role ?? '' })) }, null, 2),
)
console.log(`[server] Copied admin panel + API, seeded ${guests.length} guests`)
