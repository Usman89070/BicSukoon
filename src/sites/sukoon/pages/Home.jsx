import { sukoonHome as c } from '../../../data/home'
import { imageFor } from '../../../utils/images'
import Seo from '../../../components/common/Seo'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import SocialLinks from '../../../components/common/SocialLinks'
import PinMap from '../../../components/pinmap/PinMap'
import HomeFilm from '../../../components/video/HomeFilm'
import ExploreCard from '../../../components/showcase/ExploreCard'
import HomeGallery from '../../../components/gallery/HomeGallery'

const heroImage = imageFor(['hero-sukoon', 'portal-sukoon'])
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
      {/* the page's main heading for search engines and screen readers (the page opens with the site picture) */}
      <h1 className="sr-only">Sukoon Village</h1>
      {/* Site picture with pins, first thing on the page */}
      <section className="section section--dark home-pinmap-top" aria-label="Site map">
        <div className="container">
          <PinMap />
        </div>
      </section>

      {/* The village film, large and as it is, right under the site picture */}
      <HomeFilm id="sukoon" />

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
            <h2 id="welcome-title" className="section-title home-welcome__title">
              {c.welcome.titleLines ? c.welcome.titleLines.map((l) => <span key={l} className="home-welcome__title-line">{l}</span>) : c.welcome.title}
            </h2>
          </Reveal>
          <Reveal className="home-welcome__text" delay={100}>
            <p className="home-welcome__lead">{c.welcome.lead}</p>
            {c.welcome.body.map((p) => <p key={p}>{p}</p>)}
            <ul className="home-welcome__pillars" aria-label="What Sukoon Village brings together">
              {c.welcome.pillars.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        </div>

        {/* Eight Mile Plains: tranquil living + what is nearby */}
        <div className="container">
          <div className="welcome-place" aria-labelledby="tranquil-title">
            <div className="welcome-place__intro">
              <Reveal>
                <p className="welcome-place__eyebrow"><Icon name="pin" size={16} /> Eight Mile Plains</p>
                <h3 id="tranquil-title" className="welcome-place__title">{c.tranquil.title}</h3>
              </Reveal>
              <Reveal className="welcome-place__text" delay={80}>
                {c.tranquil.body.map((p) => <p key={p}>{p}</p>)}
              </Reveal>
            </div>
            <div className="welcome-place__nearby">
              <h4 className="welcome-place__nearby-title">{c.tranquil.nearbyTitle}</h4>
              <p className="welcome-place__nearby-lead">{c.tranquil.nearbyLead}</p>
              <ul className="sv-nearby">
                {c.tranquil.nearby.map((n, i) => (
                  <Reveal as="li" key={n.name} delay={i * 80} className="sv-nearby__item">
                    <span className="sv-nearby__icon" aria-hidden="true"><Icon name={n.icon} size={22} /></span>
                    <span className="sv-nearby__name">{n.name}</span>
                    <span className="sv-nearby__text">{n.text}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
            <p className="welcome-place__closing">{c.tranquil.closing}</p>
          </div>
        </div>
      </section>




      {/* Connected community */}
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
        </div>
      </section>


      {/* Gallery preview */}
      <HomeGallery />

      {/* More than seniors living: the message on the left, the values on the right */}
      <section className="sv-more" aria-labelledby="journey-title">
        <div className="sv-more__bg" aria-hidden="true"><Media src={heroImage} showLabel={false} /></div>
        <div className="container sv-more__inner">
          <Reveal className="sv-more__text">
            <p className="sv-more__eyebrow">{c.values.title}</p>
            <h2 id="journey-title" className="sv-more__title">{c.ahead.lead}</h2>
            <p className="sv-more__lead">{c.values.lead}</p>
            <p className="sv-more__body">{c.ahead.closing}</p>
            <div className="sv-more__ctas">
              <Button to="/contact" variant="light" icon="mail">Register your interest</Button>
              <Button to="/seniors-living" variant="glass">Seniors Living</Button>
            </div>
          </Reveal>
          <ul className="sv-more__values">
            {c.values.lines.map((l, i) => (
              <Reveal as="li" key={l} delay={i * 90} className={`sv-more__value${i === c.values.lines.length - 1 ? ' is-last' : ''}`}>
                <span className="sv-more__check" aria-hidden="true"><Icon name="check" size={16} /></span>
                <span>{l}</span>
              </Reveal>
            ))}
          </ul>
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
