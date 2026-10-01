import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SITE_ID } from './site'
import BicApp from './sites/bic/App'
import SukoonApp from './sites/sukoon/App'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import './styles/sukoon.css'

// SITE_ID is a build-time constant (VITE_SITE), so the other site's app is
// tree-shaken out of each build.
const App = SITE_ID === 'sukoon' ? SukoonApp : BicApp
document.documentElement.dataset.site = SITE_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
