import FacilityPage from '../shared/FacilityPage'
import StatusPage from '../shared/StatusPage'
import ProjectVisionPage from '../shared/VisionPage'
import ProjectContactPage from '../shared/ContactPage'

export { default as SukoonOverview } from './Overview'
export const SukoonVision = () => <ProjectVisionPage project="sukoon" />
export const SukoonSeniors = () => <FacilityPage id="seniors-living" />
export const SukoonLifestyle = () => <FacilityPage id="lifestyle-centre" />
export const SukoonChildcare = () => <FacilityPage id="childcare-centre" />
export const SukoonStatus = () => <StatusPage project="sukoon" />
export const SukoonContact = () => <ProjectContactPage project="sukoon" />
