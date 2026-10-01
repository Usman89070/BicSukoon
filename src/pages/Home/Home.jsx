import { projectList } from '../../data/projects'
import Seo from '../../components/common/Seo'
import Hero from '../../components/hero/Hero'
import ProjectCard from '../../components/cards/ProjectCard'
import SectionHeader from '../../components/common/SectionHeader'
import ProjectStory from '../../components/story/ProjectStory'
import Masterplan from '../../components/masterplan/Masterplan'
import VisionPillars from '../../components/story/VisionPillars'
import VideoFeature from '../../components/video/VideoFeature'
import UpdateJournal from '../../components/updates/UpdateJournal'
import FundingProgress from '../../components/donation/FundingProgress'
import Button from '../../components/common/Button'
import Reveal from '../../components/common/Reveal'
import SocialLinks from '../../components/common/SocialLinks'
import CtaBand from '../shared/CtaBand'

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />

      <section id="projects" className="section projects" aria-labelledby="projects-title">
        <div className="container">
          <SectionHeader
            eyebrow="Two connected projects"
            title={<span id="projects-title">Choose where to begin.</span>}
            intro="Brisbane Islamic Centre and Sukoon Village are distinct projects that share one precinct and one purpose."
          />
          <div className="projects__grid">
            {projectList.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 140} />)}
          </div>
        </div>
      </section>

      <ProjectStory />

      <section className="section section--dark" aria-labelledby="mp-title">
        <div className="container">
          <SectionHeader eyebrow="Interactive masterplan" title={<span id="mp-title">Explore the development.</span>} intro="Select an area to discover what is planned, its purpose and current status." />
          <Masterplan />
        </div>
      </section>

      <section className="section" aria-labelledby="vision-title">
        <div className="container">
          <SectionHeader eyebrow="Our vision" title={<span id="vision-title">Faith. Knowledge. Community. Legacy.</span>}>
            <Button to="/vision" variant="ghost" icon="arrow">Discover the vision</Button>
          </SectionHeader>
          <VisionPillars />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split split--center">
          <SectionHeader eyebrow="2026 Update" title="See the project come to life." intro="Films of the development, its progress and the community behind it — published as the project moves forward.">
            <Button to="/project-updates" variant="primary" icon="arrow">All project updates</Button>
          </SectionHeader>
          <Reveal variant="scale"><VideoFeature id="update2026" /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Project journal" title="Latest updates" />
          <UpdateJournal limit={2} showFilter={false} />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split split--center">
          <SectionHeader eyebrow="Project funding" title="Built by the community, for the community." intro="Learn why funding is needed, what it supports and how you can help.">
            <div className="btn-row">
              <Button to="/brisbane-islamic-centre/project-funding" variant="ghost" icon="arrow">Project Funding</Button>
              <Button to="/donate" variant="primary" icon="heart">Donate Now</Button>
            </div>
          </SectionHeader>
          <Reveal><FundingProgress /></Reveal>
        </div>
      </section>

      <CtaBand />

      <section className="section section--tight social-band">
        <div className="container social-band__inner">
          <p className="social-band__title">Follow the journey</p>
          <SocialLinks />
        </div>
      </section>
    </>
  )
}
