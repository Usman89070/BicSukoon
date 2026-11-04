import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from '../../layouts/SiteLayout'
import SukoonHome from './pages/Home'

const FacilityPage = lazy(() => import('../../templates/FacilityPage'))
const StatusPage = lazy(() => import('../../templates/StatusPage'))
const SeniorsLiving = lazy(() => import('./pages/SeniorsLiving'))
const ChildcarePage = lazy(() => import('../../templates/ChildcarePage'))
const NotFound = lazy(() => import('../../templates/NotFound'))
const GalleryPage = lazy(() => import('../../templates/GalleryPage'))

/** Sukoon Village website. */
export default function SukoonApp() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<SukoonHome />} />
        {/* the Vision page is off on Sukoon; old links go to the home page */}
        <Route path="vision" element={<Navigate to="/" replace />} />
        <Route path="seniors-living" element={<SeniorsLiving />} />
        <Route path="lifestyle-centre" element={<FacilityPage id="lifestyle-centre" />} />
        <Route path="childcare-centre" element={<ChildcarePage />} />
        {/* the Current Status page, now named Project Updates; the old address goes there */}
        <Route path="project-updates" element={<StatusPage />} />
        <Route path="project-status" element={<Navigate to="/project-updates" replace />} />
        <Route path="gallery" element={<GalleryPage project="sukoon" />} />
        {/* each site shows only its own gallery; older links land on it */}
        <Route path="gallery/:project" element={<Navigate to="/gallery" replace />} />
        {/* the Contact page is off on Sukoon for now; old links go to the home page */}
        <Route path="contact" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
