import FacilityPage from '../shared/FacilityPage'
import StatusPage from '../shared/StatusPage'
import ProjectVisionPage from '../shared/VisionPage'

export { default as BicOverview } from './Overview'
export { default as BicFunding } from './Funding'
export { default as BicGuests } from './Guests'
export { default as BicEvents } from './Events'
export { default as BicAbout } from './About'
export { default as BicContact } from './Contact'

export const BicVision = () => <ProjectVisionPage project="bic" />
export const BicMasjid = () => <FacilityPage id="masjid-complex" />
export const BicHeritage = () => <FacilityPage id="cultural-heritage-centre" />
export const BicStatus = () => <StatusPage project="bic" />
