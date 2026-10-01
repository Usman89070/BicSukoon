import { Link } from 'react-router-dom'
import { facilitiesFor } from '../../../data/facilities'
import { timeline } from '../../../data/timeline'
import { story } from '../../../data/vision'
import Seo from '../../../components/common/Seo'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import Pending from '../../../components/common/Pending'
import SocialLinks from '../../../components/common/SocialLinks'
import VisionPillars from '../../../components/story/VisionPillars'
import Masterplan from '../../../components/masterplan/Masterplan'
import Timeline from '../../../components/timeline/Timeline'
import VideoFeature from '../../../components/video/VideoFeature'
import UpdateJournal from '../../../components/updates/UpdateJournal'
import FundingProgress from '../../../components/donation/FundingProgress'
import EventList from '../../../components/events/EventList'
import CtaBand from '../../../templates/CtaBand'
import BicHero from '../Hero'

export default function BicHome() {
  return (
    <>
      <Seo />
      <BicHero />

      <section id="statement" className="section statement">
        <div className="container">
          <Reveal className="statement__inner">
            <svg className="statement__mark" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M38 14a19 19 0 1 0 0 36 22 22 0 0 1 0-36z" fill="currentColor" />
            </svg>
            <p className="statement__text">
              A place of worship, learning and heritage — <em>for Brisbane, and for the generations to come.</em>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-label="What is being built">
        <div className="container features">
          {facilitiesFor('bic').map((f, i) => (
            <article key={f.id} className="feature">
              <Reveal variant="image" className="feature__media">
                <Media src={f.media.image} label={f.media.label} ratio="4 / 3" />
              </Reveal>
              <Reveal className="feature__text" delay={100}>
                <span className="feature__num" aria-hidden="true">0{i + 1}</span>
                <p className="eyebrow">{f.pillar}</p>
                <h2 className="feature__title">{f.title}</h2>
                <p className="feature__body">{f.summary}</p>
                <Link to={f.path} className="feature__link">Discover {f.shortTitle ?? f.title} <Icon name="arrow" size={16} /></Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split split--center">
          <SectionHeader eyebrow="The Masjid Complex" title="The heart of the centre." intro="Watch the architectural film of the Masjid Complex.">
            <Button to="/masjid-complex" variant="glass" icon="arrow">Discover the Masjid</Button>
          </SectionHeader>
          <Reveal variant="scale"><VideoFeature id="masjid" /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Our story" title="Why the Brisbane Islamic Centre matters." />
          <ol className="story-grid">
            {story.bic.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 80} className="story-grid__item">
                <span className="story-grid__num" aria-hidden="true">0{i + 1}</span>
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="story-grid__title">{s.title}</h3>
                <p className="story-grid__body">{s.body}</p>
                {s.pending && <Pending>Official wording to be supplied</Pending>}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Our vision" title="Faith. Knowledge. Community. Legacy.">
            <Button to="/vision" variant="ghost" icon="arrow">Discover the vision</Button>
          </SectionHeader>
          <VisionPillars />
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="mp-title">
        <div className="container">
          <SectionHeader eyebrow="Interactive masterplan" title={<span id="mp-title">Explore the centre.</span>} intro="Select an area to discover what is planned, its purpose and current status." />
          <Masterplan />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <SectionHeader eyebrow="Where we are" title="Project progress" intro="Milestones and updates, published as the project moves forward.">
            <div className="btn-row">
              <Button to="/project-status" variant="ghost" icon="arrow">Project Status</Button>
              <Button to="/project-updates" variant="ghost">All updates</Button>
            </div>
          </SectionHeader>
          <Timeline items={timeline.bic} />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Latest from the journal" title="Project updates" />
          <UpdateJournal limit={1} showFilter={false} />
        </div>
      </section>

      <section className="section">
        <div className="container split split--center">
          <SectionHeader eyebrow="Project funding" title="Built by the community, for the community." intro="Learn why funding is needed, what it supports and how you can help.">
            <div className="btn-row">
              <Button to="/project-funding" variant="ghost" icon="arrow">Project Funding</Button>
              <Button to="/donate" variant="primary" icon="heart">Donate Now</Button>
            </div>
          </SectionHeader>
          <Reveal><FundingProgress /></Reveal>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Community" title="Events">
            <Button to="/events" variant="ghost" icon="arrow">All events</Button>
          </SectionHeader>
          <EventList />
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
