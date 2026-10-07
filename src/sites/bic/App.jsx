import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from '../../layouts/SiteLayout'
import BicHome from './pages/Home'

const FacilityPage = lazy(() => import('../../templates/FacilityPage'))
const VisionPage = lazy(() => import('../../templates/VisionPage'))
const StatusPage = lazy(() => import('../../templates/StatusPage'))
const UpdatesPage = lazy(() => import('../../templates/UpdatesPage'))
const ContactPage = lazy(() => import('../../templates/ContactPage'))
const NotFound = lazy(() => import('../../templates/NotFound'))
const About = lazy(() => import('./pages/About'))
const Funding = lazy(() => import('./pages/Funding'))
const Events = lazy(() => import('./pages/Events'))
const Guests = lazy(() => import('./pages/Guests'))
const Donate = lazy(() => import('./pages/Donate'))
const Childcare = lazy(() => import('./pages/Childcare'))

/** Brisbane Islamic Centre website. */
export default function BicApp() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<BicHome />} />
        <Route path="about" element={<About />} />
        <Route path="vision" element={<VisionPage />} />
        <Route path="masjid-complex" element={<FacilityPage id="masjid-complex" />} />
        <Route path="cultural-heritage-centre" element={<FacilityPage id="cultural-heritage-centre" />} />
        <Route path="community-hall" element={<FacilityPage id="community-hall" />} />
        <Route path="cafe" element={<FacilityPage id="cafe" />} />
        <Route path="gyms" element={<FacilityPage id="gyms" />} />
        <Route path="childcare-centre" element={<Childcare />} />
        <Route path="project-status" element={<StatusPage />} />
        <Route path="project-updates" element={<UpdatesPage />} />
        <Route path="project-funding" element={<Funding />} />
        <Route path="events" element={<Events />} />
        <Route path="honoured-guests" element={<Guests />} />
        <Route path="donate" element={<Donate />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
