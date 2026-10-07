import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from '../../layouts/SiteLayout'
import ExternalRedirect from '../../templates/ExternalRedirect'
import { externalHref } from '../../site'
import SukoonHome from './pages/Home'

const FacilityPage = lazy(() => import('../../templates/FacilityPage'))
const VisionPage = lazy(() => import('../../templates/VisionPage'))
const StatusPage = lazy(() => import('../../templates/StatusPage'))
const UpdatesPage = lazy(() => import('../../templates/UpdatesPage'))
const ContactPage = lazy(() => import('../../templates/ContactPage'))
const SeniorsLiving = lazy(() => import('./pages/SeniorsLiving'))
const NotFound = lazy(() => import('../../templates/NotFound'))

/** Sukoon Village website. */
export default function SukoonApp() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<SukoonHome />} />
        <Route path="vision" element={<VisionPage />} />
        <Route path="seniors-living" element={<SeniorsLiving />} />
        <Route path="lifestyle-centre" element={<FacilityPage id="lifestyle-centre" />} />
        <Route path="childcare-centre" element={<ExternalRedirect href={externalHref('bic', '/childcare-centre')} label="the Brisbane Islamic Centre website" />} />
        <Route path="project-status" element={<StatusPage />} />
        <Route path="project-updates" element={<UpdatesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
