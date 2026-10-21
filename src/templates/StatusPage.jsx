import { timeline, timelineIntro } from '../data/timeline'
import { SITE_ID, site } from '../site'
import SectionHeader from '../components/common/SectionHeader'
import Reveal from '../components/common/Reveal'
import Button from '../components/common/Button'
import Timeline from '../components/timeline/Timeline'
import UpdateJournal from '../components/updates/UpdateJournal'
import FilmPlaylist from '../components/video/FilmPlaylist'
import PageShell from './PageShell'
import CtaBand from './CtaBand'

export default function StatusPage() {
  const intro = timelineIntro[SITE_ID]
  return (
    <PageShell
      title="Current Status"
      eyebrow="Progress"
      description={`Where ${site.name} is today: milestones, current stage and the latest updates.`}
      lead="Where the project is today, what has been achieved and what comes next."
      heroLayout="center"
      heroBelow={<Reveal variant="scale"><FilmPlaylist /></Reveal>}
    >
      <section className="section">
        <div className="container split">
          <SectionHeader
            eyebrow="Timeline"
            title={intro?.title}
            intro={intro?.text}
            className="status-timeline__head"
          />
          <Timeline items={timeline[SITE_ID]} ascending={intro?.ascending} />
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
