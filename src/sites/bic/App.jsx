import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from '../../layouts/SiteLayout'
import { externalHref } from '../../site'
import BicHome from './pages/Home'
import { lazyPage, preloadPages } from '../../utils/lazyPage'

const FacilityPage = lazyPage(() => import('../../templates/FacilityPage'))
const StatusPage = lazyPage(() => import('../../templates/StatusPage'))
const ContactPage = lazyPage(() => import('../../templates/ContactPage'))
const NotFound = lazyPage(() => import('../../templates/NotFound'))
const GalleryPage = lazyPage(() => import('../../templates/GalleryPage'))
const About = lazyPage(() => import('./pages/About'))
const Funding = lazyPage(() => import('./pages/Funding'))
const Events = lazyPage(() => import('./pages/Events'))
const EventPage = lazyPage(() => import('./pages/EventPage'))
const Guests = lazyPage(() => import('./pages/Guests'))
const Donate = lazyPage(() => import('./pages/Donate'))
const Qmchc = lazyPage(() => import('./pages/Qmchc'))
const Vision = lazyPage(() => import('./pages/Vision'))
const Privacy = lazyPage(() => import('./pages/Privacy'))

// The Childcare Centre is on the Sukoon Village website only; old BIC links go there.
function ToSukoonChildcare() {
  useEffect(() => {
    window.location.replace(externalHref('sukoon', '/childcare-centre'))
  }, [])
  return null
}

/** Brisbane Islamic Centre website. */
export default function BicApp() {
  // fetch the other pages in the background, so menu links open at once
  useEffect(() => preloadPages(), [])
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<BicHome />} />
        <Route path="about" element={<About />} />
        <Route path="vision" element={<Vision />} />
        <Route path="masjid-complex" element={<FacilityPage id="masjid-complex" />} />
        <Route path="cultural-heritage-centre" element={<Qmchc />} />
        <Route path="community-hall" element={<FacilityPage id="community-hall" />} />
        <Route path="cafe" element={<FacilityPage id="cafe" />} />
        <Route path="gyms" element={<FacilityPage id="gyms" />} />
        <Route path="childcare-centre" element={<ToSukoonChildcare />} />
        {/* the Current Status page, now named Project Updates; the old address goes there */}
        <Route path="project-updates" element={<StatusPage />} />
        <Route path="project-status" element={<Navigate to="/project-updates" replace />} />
        <Route path="project-funding" element={<Funding />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventPage />} />
        <Route path="honoured-guests" element={<Guests />} />
        <Route path="donate" element={<Donate />} />
        <Route path="gallery" element={<GalleryPage project="bic" />} />
        {/* each site shows only its own gallery; older links land on it */}
        <Route path="gallery/:project" element={<Navigate to="/gallery" replace />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
