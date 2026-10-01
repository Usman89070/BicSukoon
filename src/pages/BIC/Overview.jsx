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

export default function BicOverview() {
  const p = projects.bic
  return (
    <ProjectShell
      project="bic"
      title={p.name}
      heading={p.name}
      eyebrow="Faith · Knowledge · Community · Legacy"
      description={p.description}
      lead={p.description}
      heroSize="lg"
      heroActions={<>
        <Button to="/brisbane-islamic-centre/vision" variant="primary" icon="arrow">Explore the Vision</Button>
        <Button to="/brisbane-islamic-centre/project-status" variant="glass">Project Status</Button>
      </>}
    >
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="What is being built" title="Two landmark facilities." intro={p.intro} />
          <div className="card-grid card-grid--2">{facilitiesFor('bic').map((f, i) => <FacilityCard key={f.id} facility={f} delay={i * 100} />)}</div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split split--center">
          <SectionHeader eyebrow="Masjid Complex" title="The heart of the centre." intro="Watch the architectural film of the Masjid Complex.">
            <Button to="/brisbane-islamic-centre/masjid-complex" variant="glass" icon="arrow">Discover the Masjid</Button>
          </SectionHeader>
          <Reveal variant="scale"><VideoFeature id="masjid" /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Our vision" title="Guided by four themes." />
          <VisionPillars filter="bic" />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Masterplan" title="Explore the BIC site." />
          <Masterplan project="bic" />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <SectionHeader eyebrow="Where we are" title="Project timeline">
            <Button to="/brisbane-islamic-centre/project-status" variant="ghost" icon="arrow">Full project status</Button>
          </SectionHeader>
          <Timeline items={timeline.bic} project="bic" />
        </div>
      </section>

      <CtaBand />
    </ProjectShell>
  )
}
