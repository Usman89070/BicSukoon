import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/footer/Footer'
import ScrollManager from '../components/common/ScrollManager'
import PageLoader from '../components/common/PageLoader'

/** Subtly shifts the accent toward the active project's logo identity. */
function useProjectTheme() {
  const { pathname } = useLocation()
  useEffect(() => {
    const project = pathname.startsWith('/sukoon-village') ? 'sukoon' : pathname.startsWith('/brisbane-islamic-centre') ? 'bic' : 'neutral'
    document.documentElement.dataset.project = project
  }, [pathname])
}

export default function SiteLayout() {
  useProjectTheme()
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
