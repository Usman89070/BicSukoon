import { SITE_ID, site } from '../site'
import SectionHeader from '../components/common/SectionHeader'
import Reveal from '../components/common/Reveal'
import UpdateJournal from '../components/updates/UpdateJournal'
import VideoFeature from '../components/video/VideoFeature'
import PageShell from './PageShell'
import CtaBand from './CtaBand'

export default function UpdatesPage() {
  return (
    <PageShell
      title="Project Updates"
      eyebrow="Development journal"
      description={`The ${site.name} development journal — progress, milestones and films, newest first.`}
      lead="Progress, milestones and stories from the project — newest first."
      media={{ label: 'Progress photography' }}
    >
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Featured" title={SITE_ID === 'bic' ? '2026 Update' : 'Project Update'} align="center" />
          <Reveal variant="scale"><VideoFeature id={SITE_ID === 'bic' ? 'update2026' : 'sukoonUpdate'} /></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Journal" title="All updates" />
          <UpdateJournal />
        </div>
      </section>
      <CtaBand />
    </PageShell>
  )
}
