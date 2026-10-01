import { projects } from '../../data/projects'
import { timeline } from '../../data/timeline'
import SectionHeader from '../../components/common/SectionHeader'
import Reveal from '../../components/common/Reveal'
import Button from '../../components/common/Button'
import Timeline from '../../components/timeline/Timeline'
import UpdateJournal from '../../components/updates/UpdateJournal'
import VideoFeature from '../../components/video/VideoFeature'
import ProjectShell from './ProjectShell'
import CtaBand from './CtaBand'

export default function StatusPage({ project }) {
  const p = projects[project]
  return (
    <ProjectShell project={project} title={`${p.name} — Project Status`} heading="Project Status" description={`Where ${p.name} is today: milestones, current stage and the latest updates.`} lead="Where the project is today, what has been achieved and what comes next." crumb="Project Status">
      <section className="section">
        <div className="container split">
          <SectionHeader eyebrow="Timeline" title="Milestones" intro="Completed, current and upcoming stages — published as they are officially confirmed." />
          <Timeline items={timeline[project]} project={project} />
        </div>
      </section>
      {project === 'bic' && (
        <section className="section section--dark">
          <div className="container">
            <SectionHeader eyebrow="Watch" title="Project status film" align="center" />
            <Reveal variant="scale"><VideoFeature id="status" /></Reveal>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Journal" title="Latest updates">
            <Button to="/project-updates" variant="ghost" icon="arrow">All project updates</Button>
          </SectionHeader>
          <UpdateJournal project={project} showFilter={false} />
        </div>
      </section>
      <CtaBand />
    </ProjectShell>
  )
}
