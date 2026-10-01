import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import Home from './pages/Home/Home'

// Route-level code splitting: one chunk per section.
const pick = (loader, name) => lazy(() => loader().then((m) => ({ default: m[name] })))
const bic = () => import('./pages/BIC')
const sv = () => import('./pages/SukoonVillage')

const BicOverview = pick(bic, 'BicOverview')
const BicVision = pick(bic, 'BicVision')
const BicMasjid = pick(bic, 'BicMasjid')
const BicHeritage = pick(bic, 'BicHeritage')
const BicStatus = pick(bic, 'BicStatus')
const BicFunding = pick(bic, 'BicFunding')
const BicGuests = pick(bic, 'BicGuests')
const BicEvents = pick(bic, 'BicEvents')
const BicAbout = pick(bic, 'BicAbout')
const BicContact = pick(bic, 'BicContact')

const SukoonOverview = pick(sv, 'SukoonOverview')
const SukoonVision = pick(sv, 'SukoonVision')
const SukoonSeniors = pick(sv, 'SukoonSeniors')
const SukoonLifestyle = pick(sv, 'SukoonLifestyle')
const SukoonStatus = pick(sv, 'SukoonStatus')
const SukoonChildcare = pick(sv, 'SukoonChildcare')
const SukoonContact = pick(sv, 'SukoonContact')

const ProjectUpdates = lazy(() => import('./pages/ProjectUpdates/ProjectUpdates'))
const Donate = lazy(() => import('./pages/Donate/Donate'))
const Vision = lazy(() => import('./pages/Vision/Vision'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="vision" element={<Vision />} />
        <Route path="project-updates" element={<ProjectUpdates />} />
        <Route path="donate" element={<Donate />} />
        <Route path="contact" element={<Contact />} />

        <Route path="brisbane-islamic-centre">
          <Route index element={<BicOverview />} />
          <Route path="vision" element={<BicVision />} />
          <Route path="masjid-complex" element={<BicMasjid />} />
          <Route path="cultural-heritage-centre" element={<BicHeritage />} />
          <Route path="project-status" element={<BicStatus />} />
          <Route path="project-funding" element={<BicFunding />} />
          <Route path="honoured-guests" element={<BicGuests />} />
          <Route path="events" element={<BicEvents />} />
          <Route path="about" element={<BicAbout />} />
          <Route path="contact" element={<BicContact />} />
        </Route>

        <Route path="sukoon-village">
          <Route index element={<SukoonOverview />} />
          <Route path="vision" element={<SukoonVision />} />
          <Route path="seniors-living" element={<SukoonSeniors />} />
          <Route path="lifestyle-centre" element={<SukoonLifestyle />} />
          <Route path="project-status" element={<SukoonStatus />} />
          <Route path="childcare-centre" element={<SukoonChildcare />} />
          <Route path="contact" element={<SukoonContact />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
