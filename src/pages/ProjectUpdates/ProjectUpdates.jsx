import { timeline } from '../../data/timeline'
import Seo from '../../components/common/Seo'
import SectionHeader from '../../components/common/SectionHeader'
import Reveal from '../../components/common/Reveal'
import PageHero from '../../components/hero/PageHero'
import UpdateJournal from '../../components/updates/UpdateJournal'
import Timeline from '../../components/timeline/Timeline'
import VideoFeature from '../../components/video/VideoFeature'
import CtaBand from '../shared/CtaBand'

export default function ProjectUpdates() {
  return (
    <>
      <Seo title="Project Updates" description="The development journal of the Brisbane Islamic Centre and Sukoon Village — progress, milestones and films, newest first." />
      <PageHero
        eyebrow="Development journal"
        title="Project Updates"
        lead="Progress, milestones and stories from the Brisbane Islamic Centre and Sukoon Village — newest first."
        media={{ label: 'Aerial progress photography' }}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Project Updates' }]}
      />

      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Featured" title="2026 Update" align="center" />
          <Reveal variant="scale"><VideoFeature id="update2026" /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Journal" title="All updates" intro="Filter by project to follow the stage that matters most to you." />
          <UpdateJournal />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Timeline" title="Milestones" />
          <div className="timeline-pair">
            <div className="theme-bic"><h3 className="timeline-pair__title">Brisbane Islamic Centre</h3><Timeline items={timeline.bic} project="bic" /></div>
            <div className="theme-sukoon"><h3 className="timeline-pair__title">Sukoon Village</h3><Timeline items={timeline.sukoon} project="sukoon" /></div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
