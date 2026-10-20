// Minimal Node server for Node.js hosts (e.g. GoDaddy / Airo). Serves the
// built site from dist/ on process.env.PORT, with page fallbacks for the
// portal, /bic/ and /sukoon/. Videos are served from bic-videos/ next to the
// project (kept on redeploys) or dist/videos/, with Range support.
// The PHP admin panel and api/*.php need a PHP host (Hostinger) and do not
// run here; the website falls back to its built-in lists without them.
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'

const root = resolve('dist')
const videoRoots = [resolve('bic-videos'), resolve('..', 'bic-videos'), join(root, 'videos')]
const port = process.env.PORT || 3000

const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain',
  '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
}

const isFile = (p) => { try { return statSync(p).isFile() } catch { return false } }
const inside = (base, rel) => { const p = normalize(join(base, rel)); return p.startsWith(base) ? p : null }

function send(req, res, file, cache) {
  const size = statSync(file).size
  const headers = { 'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': cache, 'Accept-Ranges': 'bytes' }
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '')
  if (range) {
    const start = range[1] ? +range[1] : Math.max(0, size - +range[2])
    const end = range[1] && range[2] ? Math.min(+range[2], size - 1) : size - 1
    if (start >= size || start > end) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); return res.end() }
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 })
    return req.method === 'HEAD' ? res.end() : createReadStream(file, { start, end }).pipe(res)
  }
  res.writeHead(200, { ...headers, 'Content-Length': size })
  return req.method === 'HEAD' ? res.end() : createReadStream(file).pipe(res)
}

createServer((req, res) => {
  let path
  try { path = decodeURIComponent(new URL(req.url, 'http://x').pathname) } catch { res.writeHead(400); return res.end() }

  const video = /^\/(?:bic\/|sukoon\/)?videos\/((?:bic|sukoon)\/[^/]+)$/.exec(path)
  if (video) {
    for (const base of videoRoots) {
      const file = inside(base, video[1])
      if (file && isFile(file)) return send(req, res, file, 'no-cache')
    }
    res.writeHead(404, { 'Cache-Control': 'no-store' }); return res.end()
  }

  if (/\.php$/i.test(path) || path.includes('/api/') || path.includes('/admin')) {
    res.writeHead(404, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    return res.end('{"error":"PHP is not available on this host"}')
  }

  const file = inside(root, path)
  if (file && isFile(file)) return send(req, res, file, path.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache')
  if (file && isFile(join(file, 'index.html'))) return send(req, res, join(file, 'index.html'), 'no-cache')
  if (extname(path)) { res.writeHead(404); return res.end('Not found') }

  const site = /^\/(bic|sukoon)(\/|$)/.exec(path)?.[1]
  const page = join(root, site || '', 'index.html')
  if (existsSync(page)) return send(req, res, page, 'no-cache')
  res.writeHead(503); res.end('Site not built yet: run npm run build')
}).listen(port, () => console.log(`BicSukoon running on port ${port}`))
