import { sukoonHome as c } from '../../../data/home'
import { videos } from '../../../data/videos'
import { imageFor } from '../../../utils/images'
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

const heroImage = imageFor(['hero-sukoon', 'site-300DPISukoon', 'portal-sukoon'])
const welcomeImage = imageFor('sukoon-welcome')

const Crescent = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M38 14a19 19 0 1 0 0 36 22 22 0 0 1 0-36z" fill="currentColor" />
  </svg>
)

/** Sukoon Village home: official copy, big visuals (same structure as the BIC home). */
export default function SukoonHome() {
  return (
    <>
      <Seo />
      <StageHero
        eyebrow={c.hero.eyebrow}
        title={<>A Place to <em>Call Home.</em></>}
        image={heroImage}
        film={videos.sukoonHero}
        label="Village render"
        actions={[
          { label: 'Explore the village', href: '#explore', variant: 'light', icon: 'arrow' },
          { label: 'Enquire', to: '/contact', variant: 'glass', icon: 'mail' },
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
            <ul className="home-welcome__pillars" aria-label="What Sukoon Village brings together">
              {c.welcome.pillars.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        </div>
        <div className="container">
          <ul className="sl-facts">
            {c.facts.map((f, i) => (
              <Reveal as="li" key={f.label} delay={i * 90} className="sl-fact">
                <span className="sl-fact__value">{f.value}</span>
                <span className="sl-fact__label">{f.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Explore */}
      <section id="explore" className="section section--muted" aria-labelledby="explore-title">
        <div className="container container--wide">
          <div className="home-explore__head">
            <SectionHeader eyebrow="The village" title={<span id="explore-title">{c.explore.title}</span>} />
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
          <Reveal variant="scale"><VideoFeature id="sukoon" ratio="21 / 9" className="video--wide" /></Reveal>
        </div>
      </section>

      {/* Connected community + masterplan */}
      <section className="section section--dark" aria-labelledby="connected-title">
        <div className="container">
          <div className="home-vision">
            <SectionHeader eyebrow="Brisbane Islamic Centre" title={<span id="connected-title">{c.connected.title}</span>}>
              <Button to="/seniors-living" variant="glass" icon="arrow">Seniors Living</Button>
            </SectionHeader>
            <Reveal className="home-vision__text" delay={100}>
              <p>{c.connected.lead}</p>
              {c.connected.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
          </div>
          <Reveal className="home-vision__plan"><PinMap /></Reveal>
        </div>
      </section>

      {/* A new chapter + progress */}
      <section className="section" aria-labelledby="chapter-title">
        <div className="container container--wide">
          <div className="home-updates">
            <SectionHeader eyebrow="Progress" title={<span id="chapter-title">{c.chapter.title}</span>}>
              <div className="btn-row">
                <Button to="/project-updates" variant="primary" icon="arrow">All updates</Button>
                <Button to="/project-status" variant="ghost">Project status</Button>
              </div>
            </SectionHeader>
            <Reveal className="home-updates__text" delay={100}>
              <p className="home-updates__lead">{c.chapter.body[0]}</p>
              <p>{c.chapter.body[1]}</p>
            </Reveal>
          </div>
          <CompletedWorks />
        </div>
      </section>

      {/* More than seniors living */}
      <section className="home-journey" aria-labelledby="journey-title">
        <div className="home-journey__bg" aria-hidden="true"><Media src={heroImage} showLabel={false} /></div>
        <div className="container home-journey__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">{c.values.title}</p>
            <h2 id="journey-title" className="home-journey__lines">
              <span>{c.ahead.lead}</span>
            </h2>
            <ul className="ab-ahead">
              {c.values.lines.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <p className="home-journey__body">{c.ahead.closing}</p>
            <div className="home-journey__ctas">
              <Button to="/contact" variant="light" icon="mail">Register your interest</Button>
              <Button to="/seniors-living" variant="glass">Seniors Living</Button>
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
