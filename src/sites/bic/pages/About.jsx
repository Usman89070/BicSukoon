import { timeline, timelineIntro } from '../../../data/timeline'
import SectionHeader from '../../../components/common/SectionHeader'
import Button from '../../../components/common/Button'
import Timeline from '../../../components/timeline/Timeline'
import Reveal from '../../../components/common/Reveal'
import Pending from '../../../components/common/Pending'
import VisionPillars from '../../../components/story/VisionPillars'
import VideoFeature from '../../../components/video/VideoFeature'
import PageShell from '../../../templates/PageShell'
import CtaBand from '../../../templates/CtaBand'

export default function BicAbout() {
  return (
    <PageShell title="About Us" description="The story and purpose behind the Brisbane Islamic Centre." lead="The people and the purpose behind the project.">
      <section className="section">
        <div className="container split split--center">
          <Reveal className="stack">
            <p className="eyebrow">Our story</p>
            <h2 className="section-title">A project shaped by community.</h2>
            <p className="section-intro">The official story of the organisation — its history, governance and people — will be published here.</p>
            <Pending>Official “About Us” wording to be supplied</Pending>
          </Reveal>
          <Reveal variant="scale"><VideoFeature id="about" /></Reveal>
        </div>
      </section>
      <section className="section section--muted" aria-labelledby="history-title">
        <div className="container split">
          <SectionHeader eyebrow="Our history" title={<span id="history-title">{timelineIntro.bic.title}</span>} intro={timelineIntro.bic.text} className="status-timeline__head">
            <Button to="/project-status" variant="ghost" icon="arrow">Project status</Button>
          </SectionHeader>
          <Timeline items={timeline.bic} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="What we stand for" title="Faith, Knowledge, Community, Legacy" />
          <VisionPillars />
        </div>
      </section>
      <CtaBand />
    </PageShell>
  )
}
