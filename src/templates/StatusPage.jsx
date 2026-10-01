import { timeline } from '../data/timeline'
import { SITE_ID, site } from '../site'
import SectionHeader from '../components/common/SectionHeader'
import Reveal from '../components/common/Reveal'
import Button from '../components/common/Button'
import Timeline from '../components/timeline/Timeline'
import UpdateJournal from '../components/updates/UpdateJournal'
import VideoFeature from '../components/video/VideoFeature'
import PageShell from './PageShell'
import CtaBand from './CtaBand'

export default function StatusPage() {
  return (
    <PageShell
      title="Project Status"
      eyebrow="Progress"
      description={`Where ${site.name} is today: milestones, current stage and the latest updates.`}
      lead="Where the project is today, what has been achieved and what comes next."
    >
      <section className="section">
        <div className="container split">
          <SectionHeader eyebrow="Timeline" title="Milestones" intro="Completed, current and upcoming stages — published as they are officially confirmed." />
          <Timeline items={timeline[SITE_ID]} />
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Watch" title="Project status film" align="center" />
          <Reveal variant="scale"><VideoFeature id={SITE_ID === 'bic' ? 'status' : 'sukoon'} /></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Journal" title="Latest updates">
            <Button to="/project-updates" variant="ghost" icon="arrow">All project updates</Button>
          </SectionHeader>
          <UpdateJournal limit={3} showFilter={false} />
        </div>
      </section>
      <CtaBand />
    </PageShell>
  )
}
