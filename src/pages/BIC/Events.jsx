import SectionHeader from '../../components/common/SectionHeader'
import Reveal from '../../components/common/Reveal'
import EventList from '../../components/events/EventList'
import VideoFeature from '../../components/video/VideoFeature'
import ProjectShell from '../shared/ProjectShell'

export default function BicEvents() {
  return (
    <ProjectShell project="bic" title="Events" description="Community events, open days and gatherings at the Brisbane Islamic Centre." lead="Gatherings, open days and community moments." crumb="Events">
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Calendar" title="Events" />
          <EventList />
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Watch" title="Community moments" align="center" />
          <Reveal variant="scale"><VideoFeature id="events" /></Reveal>
        </div>
      </section>
    </ProjectShell>
  )
}
