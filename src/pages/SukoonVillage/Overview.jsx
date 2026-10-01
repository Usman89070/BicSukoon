import { projects } from '../../data/projects'
import { facilitiesFor } from '../../data/facilities'
import { timeline } from '../../data/timeline'
import SectionHeader from '../../components/common/SectionHeader'
import Reveal from '../../components/common/Reveal'
import Button from '../../components/common/Button'
import FacilityCard from '../../components/cards/FacilityCard'
import VisionPillars from '../../components/story/VisionPillars'
import Masterplan from '../../components/masterplan/Masterplan'
import Timeline from '../../components/timeline/Timeline'
import VideoFeature from '../../components/video/VideoFeature'
import ProjectShell from '../shared/ProjectShell'
import CtaBand from '../shared/CtaBand'

export default function SukoonOverview() {
  const p = projects.sukoon
  return (
    <ProjectShell
      project="sukoon"
      title={p.name}
      heading={p.name}
      eyebrow="A village for every stage of life"
      description={p.description}
      lead={p.description}
      heroSize="lg"
      heroActions={<>
        <Button to="/sukoon-village/vision" variant="primary" icon="arrow">Explore the Vision</Button>
        <Button to="/sukoon-village/project-status" variant="glass">Project Status</Button>
      </>}
    >
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="What is being built" title="Care, connection and belonging." intro={p.intro} />
          <div className="card-grid">{facilitiesFor('sukoon').map((f, i) => <FacilityCard key={f.id} facility={f} delay={i * 100} />)}</div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split split--center">
          <SectionHeader eyebrow="Sukoon Village" title="Life in the village." intro="A film introducing Sukoon Village will be published here." />
          <Reveal variant="scale"><VideoFeature id="sukoon" /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Our vision" title="Rooted in community and legacy." />
          <VisionPillars filter="sukoon" />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Masterplan" title="Explore Sukoon Village." />
          <Masterplan project="sukoon" />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <SectionHeader eyebrow="Where we are" title="Project timeline">
            <Button to="/sukoon-village/project-status" variant="ghost" icon="arrow">Full project status</Button>
          </SectionHeader>
          <Timeline items={timeline.sukoon} project="sukoon" />
        </div>
      </section>

      <CtaBand />
    </ProjectShell>
  )
}
