import { bicHome as c } from '../../../data/home'
import Seo from '../../../components/common/Seo'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import SocialLinks from '../../../components/common/SocialLinks'
import PinMap from '../../../components/pinmap/PinMap'
import HomeFilm from '../../../components/video/HomeFilm'
import { heroImage } from '../images'
import { imageFor } from '../../../utils/images'

const welcomeImage = imageFor('bic-welcome')
import { donateLink } from '../../../data/donation'
import HomeGallery from '../../../components/gallery/HomeGallery'

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
      {/* the page's main heading for search engines and screen readers (the page opens with the site picture) */}
      <h1 className="sr-only">Brisbane Islamic Centre</h1>
      {/* Site picture with pins, first thing on the page */}
      <section className="section section--dark home-pinmap-top" aria-label="Site map">
        <div className="container">
          <PinMap />
        </div>
      </section>

      {/* The masjid film, large and as it is, right under the site picture */}
      <HomeFilm id="masjid" />

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
            <ul className="home-welcome__pillars" aria-label="What the development brings together">
              {c.welcome.pillars.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>


      {/* Vision */}
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
        </div>
      </section>


      {/* Gallery preview */}
      <HomeGallery />

      {/* Join us: the heading on the left, the official text and buttons in a panel on the right */}
      <section className="sv-more" aria-labelledby="journey-title">
        <div className="sv-more__bg" aria-hidden="true"><Media src={heroImage} showLabel={false} /></div>
        <div className="container sv-more__inner">
          <Reveal className="sv-more__text">
            <p className="sv-more__eyebrow">{c.journey.title}</p>
            <h2 id="journey-title" className="sv-more__title">
              {c.journey.lines.map((l, i) => <span key={l} className={`sv-more__line${i ? ' sv-more__line--accent' : ''}`}>{l}</span>)}
            </h2>
          </Reveal>
          <Reveal className="sv-more__panel" delay={100}>
            <p className="sv-more__body">{c.journey.body}</p>
            <p className="sv-more__closing">{c.journey.closing}</p>
            <div className="sv-more__ctas">
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
