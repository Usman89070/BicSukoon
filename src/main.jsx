import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import './styles/sukoon.css'
import './styles/bic.css'
import './styles/portal.css'

// VITE_SITE is replaced with a literal at build time, so only one of these
// imports survives in each build (portal, BIC or Sukoon).
const mode = import.meta.env.VITE_SITE
const app =
  mode === 'portal'
    ? import('./portal/Portal')
    : mode === 'sukoon'
      ? import('./sites/sukoon/App')
      : import('./sites/bic/App')

const root = createRoot(document.getElementById('root'))

app.then(({ default: App }) => {
  root.render(
    <StrictMode>
      {mode === 'portal' ? (
        <App />
      ) : (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      )}
    </StrictMode>,
  )
})
