import { bicHome as c } from '../../../data/home'
import { videos } from '../../../data/videos'
import Seo from '../../../components/common/Seo'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import SocialLinks from '../../../components/common/SocialLinks'
import PinMap from '../../../components/pinmap/PinMap'
import VideoFeature from '../../../components/video/VideoFeature'
import StageHero from '../../../components/showcase/StageHero'
import CompletedWorks from '../../../components/showcase/CompletedWorks'
import ExploreCard from '../../../components/showcase/ExploreCard'
import { heroImage } from '../images'
import { imageFor } from '../../../utils/images'

const welcomeImage = imageFor('bic-welcome')
import { donateLink } from '../../../data/donation'

const Crescent = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M38 14a19 19 0 1 0 0 36 22 22 0 0 1 0-36z" fill="currentColor" />
  </svg>
)

/** BIC home: official copy, big visuals. */
export default function BicHome() {
  return (
    <>
      <Seo />
      <StageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.lines.map((l, i) => <span key={l} className="stage-hero__line">{i === 2 ? <em>{l}</em> : l}</span>)}
        className="stage-hero--long"
        image={heroImage}
        film={videos.hero}
        label="BIC aerial render"
        actions={[
          { label: 'Explore the development', href: '#explore', variant: 'light', icon: 'arrow' },
          { label: 'Donate', ...donateLink, variant: 'glass', icon: 'heart' },
        ]}
      />

      {/* Welcome */}
      <section className={`section home-welcome${welcomeImage ? ' home-welcome--photo' : ''}`} aria-labelledby="welcome-title">
        {welcomeImage && (
          <div className="home-welcome__bg" aria-hidden="true">
            <img src={welcomeImage} alt="" loading="lazy" decoding="async" />
          </div>
        )}
        <div className="container home-welcome__inner">
          <Reveal className="home-welcome__head">
            <span className="home-welcome__mark"><Crescent /></span>
            <h2 id="welcome-title" className="section-title">{c.welcome.title}</h2>
          </Reveal>
          <Reveal className="home-welcome__text" delay={100}>
            <p className="home-welcome__lead">{c.welcome.lead}</p>
            {c.welcome.body.map((p) => <p key={p}>{p}</p>)}
            <ul className="home-welcome__pillars" aria-label="What the development brings together">
              {c.welcome.pillars.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Explore the development */}
      <section id="explore" className="section section--muted" aria-labelledby="explore-title">
        <div className="container container--wide">
          <div className="home-explore__head">
            <SectionHeader eyebrow="The development" title={<span id="explore-title">{c.explore.title}</span>} />
            <Reveal className="home-explore__intro" delay={80}>
              {c.explore.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
          </div>
          <ul className="explore-grid">
            {c.explore.items.map((item, i) => <ExploreCard key={item.id} item={item} index={i} />)}
          </ul>
        </div>
      </section>

      {/* Film */}
      <section className="section section--tight" aria-label="Film">
        <div className="container container--wide">
          <Reveal variant="scale"><VideoFeature id="masjid" ratio="21 / 9" className="video--wide" /></Reveal>
        </div>
      </section>

      {/* Vision + masterplan */}
      <section className="section section--dark" aria-labelledby="vision-title">
        <div className="container">
          <div className="home-vision">
            <SectionHeader eyebrow="Our vision" title={<span id="vision-title">{c.vision.title}</span>}>
              <Button to="/vision" variant="glass" icon="arrow">Discover the vision</Button>
            </SectionHeader>
            <Reveal className="home-vision__text" delay={100}>
              {c.vision.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
          </div>
          <Reveal className="home-vision__plan"><PinMap /></Reveal>
        </div>
      </section>

      {/* Project updates + completed works */}
      <section className="section" aria-labelledby="updates-title">
        <div className="container container--wide">
          <div className="home-updates">
            <SectionHeader eyebrow="Progress" title={<span id="updates-title">{c.updates.title}</span>}>
              <div className="btn-row">
                <Button to="/project-updates" variant="primary" icon="arrow">All updates</Button>
                <Button to="/project-status" variant="glass">Project timeline</Button>
              </div>
            </SectionHeader>
            <Reveal className="home-updates__text" delay={100}>
              <p className="home-updates__lead">{c.updates.lead}</p>
              <p>{c.updates.body}</p>
              <p className="home-updates__highlight"><Icon name="calendar" size={20} /> {c.updates.highlight}</p>
            </Reveal>
          </div>
          <CompletedWorks />
        </div>
      </section>

      {/* Join us */}
      <section className="home-journey" aria-labelledby="journey-title">
        <div className="home-journey__bg" aria-hidden="true">
          <Media src={heroImage} showLabel={false} />
        </div>
        <div className="container home-journey__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">{c.journey.title}</p>
            <h2 id="journey-title" className="home-journey__lines">
              {c.journey.lines.map((l) => <span key={l}>{l}</span>)}
            </h2>
            <p className="home-journey__body">{c.journey.body}</p>
            <p className="home-journey__closing">{c.journey.closing}</p>
            <div className="home-journey__ctas">
              <Button {...donateLink} variant="light" icon="heart">Donate</Button>
              <Button to="/contact" variant="glass" icon="mail">Get in touch</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight social-band">
        <div className="container social-band__inner">
          <p className="social-band__title">Follow the journey</p>
          <SocialLinks />
        </div>
      </section>
    </>
  )
}
