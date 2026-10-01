import { projects } from '../../data/projects'
import { facilitiesFor } from '../../data/facilities'
import SectionHeader from '../../components/common/SectionHeader'
import VisionPillars from '../../components/story/VisionPillars'
import FacilityCard from '../../components/cards/FacilityCard'
import Masterplan from '../../components/masterplan/Masterplan'
import ProjectShell from './ProjectShell'
import CtaBand from './CtaBand'

export default function ProjectVisionPage({ project }) {
  const p = projects[project]
  return (
    <ProjectShell project={project} title={`${p.name} — Vision`} heading="The Vision" description={p.description} lead={p.description} crumb="Vision" heroSize="lg">
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Faith · Knowledge · Community · Legacy" title="What guides the project" intro="Each facility contributes to a shared vision. Explore how they connect." />
          <VisionPillars detailed filter={project} />
        </div>
      </section>
      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Development areas" title="What is being built" />
          <div className="card-grid">{facilitiesFor(project).map((f, i) => <FacilityCard key={f.id} facility={f} delay={i * 80} />)}</div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Masterplan" title="Explore the site" />
          <Masterplan project={project} />
        </div>
      </section>
      <CtaBand />
    </ProjectShell>
  )
}
