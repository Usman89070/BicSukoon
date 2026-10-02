import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Three builds from one codebase, selected with --mode:
 *   portal → dist/          (starting page: choose BIC or Sukoon)
 *   bic    → dist/bic/      (served under VITE_BASE, default /bic/)
 *   sukoon → dist/sukoon/   (served under VITE_BASE, default /sukoon/)
 * In dev every site runs at "/" on its own port.
 */
const SUB_SITES = ['/bic/', '/sukoon/']

/** `npm run preview` serves the combined dist/ like the real host would. */
const subSiteFallback = () => ({
  name: 'sub-site-spa-fallback',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const path = req.url.split('?')[0]
      const site = SUB_SITES.find((p) => path === p.slice(0, -1) || path.startsWith(p))
      if (site && !/\.[a-z0-9]+$/i.test(path)) req.url = `${site}index.html`
      next()
    })
  },
})

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: command === 'build' ? env.VITE_BASE || '/' : '/',
    plugins: [react(), subSiteFallback()],
    build: {
      target: 'es2020',
      // The portal builds into dist/ itself, so it must not wipe dist/bic or
      // dist/sukoon; the sub-sites empty only their own folder.
      emptyOutDir: mode !== 'portal',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
          },
        },
      },
    },
  }
})
