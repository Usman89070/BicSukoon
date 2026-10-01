import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/footer/Footer'
import ScrollManager from '../components/common/ScrollManager'
import PageLoader from '../components/common/PageLoader'

/** Shell shared by both websites; each site's identity comes from data/sites.js and <html data-site>. */
export default function SiteLayout() {
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
