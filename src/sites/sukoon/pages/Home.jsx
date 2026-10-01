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
import SocialLinks from '../../../components/common/SocialLinks'
import VisionPillars from '../../../components/story/VisionPillars'
import Masterplan from '../../../components/masterplan/Masterplan'
import Timeline from '../../../components/timeline/Timeline'
import VideoFeature from '../../../components/video/VideoFeature'
import UpdateJournal from '../../../components/updates/UpdateJournal'
import CtaBand from '../../../templates/CtaBand'
import SukoonHero from '../Hero'

export default function SukoonHome() {
  return (
    <>
      <Seo />
      <SukoonHero />

      <section className="section sv-welcome">
        <div className="container">
          <Reveal className="sv-welcome__inner">
            <p className="sv-welcome__word">Sukoon</p>
            <p className="sv-welcome__text">
              means <em>peace</em> — the calm of feeling at home, cared for and close to the people who matter.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="living-title">
        <div className="container">
          <SectionHeader eyebrow="Life at Sukoon" title={<span id="living-title">Three places, one village.</span>} align="center" />
          <div className="sv-cards">
            {facilitiesFor('sukoon').map((f, i) => (
              <Reveal key={f.id} delay={i * 100} className="sv-card">
                <Link to={f.path} className="sv-card__link">
                  <div className="sv-card__arch"><Media src={f.media.image} label={f.media.label} /></div>
                  <h3 className="sv-card__title">{f.title}</h3>
                  <p className="sv-card__text">{f.summary}</p>
                  <span className="sv-card__more">Learn more <Icon name="arrow" size={16} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container features">
          {story.sukoon.map((s, i) => (
            <article key={s.id} className="feature">
              <Reveal variant="image" className="feature__media">
                <Media label={`${s.eyebrow} — lifestyle image`} ratio="5 / 4" />
              </Reveal>
              <Reveal className="feature__text" delay={100}>
                <span className="feature__num" aria-hidden="true">0{i + 1}</span>
                <p className="eyebrow">{s.eyebrow}</p>
                <h2 className="feature__title">{s.title}</h2>
                <p className="feature__body">{s.body}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="container split split--center">
          <SectionHeader eyebrow="Village film" title="See Sukoon Village come to life." intro="A film introducing the village will be published here." />
          <Reveal variant="scale"><VideoFeature id="sukoon" /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Our vision" title="Faith. Knowledge. Community. Legacy." align="center">
            <Button to="/vision" variant="ghost" icon="arrow">Discover the vision</Button>
          </SectionHeader>
          <VisionPillars />
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="mp-title">
        <div className="container">
          <SectionHeader eyebrow="Village masterplan" title={<span id="mp-title">Explore the village.</span>} intro="Select an area to discover what is planned, its purpose and current status." />
          <Masterplan />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <SectionHeader eyebrow="Where we are" title="Project progress" intro="Milestones and news, shared as the village takes shape.">
            <div className="btn-row">
              <Button to="/project-status" variant="ghost" icon="arrow">Project Status</Button>
              <Button to="/project-updates" variant="ghost">All updates</Button>
            </div>
          </SectionHeader>
          <Timeline items={timeline.sukoon} />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Latest news" title="From the village" />
          <UpdateJournal limit={1} showFilter={false} />
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
