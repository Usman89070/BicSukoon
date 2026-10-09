import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from '../../layouts/SiteLayout'
import BicHome from './pages/Home'

const FacilityPage = lazy(() => import('../../templates/FacilityPage'))
const StatusPage = lazy(() => import('../../templates/StatusPage'))
const UpdatesPage = lazy(() => import('../../templates/UpdatesPage'))
const ContactPage = lazy(() => import('../../templates/ContactPage'))
const NotFound = lazy(() => import('../../templates/NotFound'))
const GalleryPage = lazy(() => import('../../templates/GalleryPage'))
const About = lazy(() => import('./pages/About'))
const Funding = lazy(() => import('./pages/Funding'))
const Events = lazy(() => import('./pages/Events'))
const Guests = lazy(() => import('./pages/Guests'))
const Donate = lazy(() => import('./pages/Donate'))
const ChildcarePage = lazy(() => import('../../templates/ChildcarePage'))
const Qmchc = lazy(() => import('./pages/Qmchc'))
const Vision = lazy(() => import('./pages/Vision'))

/** Brisbane Islamic Centre website. */
export default function BicApp() {
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
        <Route path="childcare-centre" element={<ChildcarePage />} />
        <Route path="project-status" element={<StatusPage />} />
        <Route path="project-updates" element={<UpdatesPage />} />
        <Route path="project-funding" element={<Funding />} />
        <Route path="events" element={<Events />} />
        <Route path="honoured-guests" element={<Guests />} />
        <Route path="donate" element={<Donate />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/bic" element={<GalleryPage project="bic" />} />
        <Route path="gallery/sukoon" element={<GalleryPage project="sukoon" />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
