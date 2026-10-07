import { bicVision as c } from '../../../data/bicVision'
import { imageFor } from '../../../utils/images'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import FacilityLink from '../../../components/common/FacilityLink'
import Masterplan from '../../../components/masterplan/Masterplan'
import PageShell from '../../../templates/PageShell'
import { heroImage } from '../images'

/** BIC Vision — official copy laid out around big visuals. */
export default function BicVision() {
  return (
    <PageShell
      title="Vision"
      eyebrow={c.eyebrow}
      heading={c.heading}
      lead={c.intro[0]}
      description={c.intro[1]}
      media={{ image: heroImage, label: 'Brisbane Islamic Centre render' }}
      heroActions={
        <>
          <Button href="#precinct" variant="primary" icon="arrow">The precinct</Button>
          <Button to="/about" variant="glass">About us</Button>
        </>
      }
    >
      {/* Intro */}
      <section className="section cc-intro">
        <div className="container">
          <Reveal className="cc-intro__inner">
            {c.intro.slice(1).map((p) => <p key={p}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* More than a place of worship */}
      <section className="section section--muted" aria-labelledby="worship-title">
        <div className="container cc-split">
          <Reveal variant="image" className="cc-split__media">
            <Media src={imageFor(['facility-masjid', 'hero-bic', 'site-300DPIbic'])} label="Masjid render" ratio="4 / 5" />
          </Reveal>
          <div className="cc-split__text">
            <SectionHeader eyebrow="The Masjid" title={<span id="worship-title">{c.worship.title}</span>} />
            <Reveal delay={80}>
              <p className="cc-lead">{c.worship.lead}</p>
              {c.worship.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
          </div>
        </div>
      </section>

      {/* The precinct */}
      <section id="precinct" className="section ab-precinct" aria-labelledby="precinct-title">
        <div className="container container--wide">
          <div className="home-explore__head">
            <SectionHeader eyebrow="One connected precinct" title={<span id="precinct-title">{c.precinct.title}</span>} />
            <Reveal className="home-explore__intro" delay={80}>
              <p>{c.precinct.lead}</p>
              <p>{c.precinct.listIntro}</p>
            </Reveal>
          </div>
          <ul className="ab-list">
            {c.precinct.items.map((item, i) => (
              <Reveal as="li" key={item.label} delay={(i % 4) * 70}>
                <FacilityLink to={item.path} project={item.site} className="ab-list__link">
                  <span className="ab-list__num">0{i + 1}</span>
                  <span className="ab-list__label">{item.label}</span>
                  <Icon name="arrow" size={18} className="ab-list__arrow" />
                </FacilityLink>
              </Reveal>
            ))}
          </ul>
          <Reveal><p className="ab-precinct__closing">{c.precinct.closing}</p></Reveal>
        </div>
      </section>

      {/* A revised vision + masterplan */}
      <section className="section section--dark" aria-labelledby="revised-title">
        <div className="container">
          <div className="home-vision">
            <SectionHeader eyebrow="Masterplan" title={<span id="revised-title">{c.revised.title}</span>} />
            <Reveal className="home-vision__text" delay={80}>
              {c.revised.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
          </div>
          <Reveal className="home-vision__plan"><Masterplan /></Reveal>
        </div>
      </section>

      {/* Serving the wider community */}
      <section className="section" aria-labelledby="wider-title">
        <div className="container cc-split cc-split--flip">
          <div className="cc-split__text">
            <SectionHeader eyebrow="For everyone" title={<span id="wider-title">{c.wider.title}</span>} />
            <Reveal delay={80}>
              <p className="cc-lead">{c.wider.body[0]}</p>
              <p>{c.wider.body[1]}</p>
            </Reveal>
          </div>
          <Reveal variant="image" className="cc-split__media qm-space__media--end">
            <Media src={imageFor(['about-community', 'facility-qmchc', 'facility-community-hall'])} label="Community photo" ratio="4 / 5" />
          </Reveal>
        </div>
      </section>

      {/* Looking ahead */}
      <section className="home-journey" aria-labelledby="ahead-title">
        <div className="home-journey__bg" aria-hidden="true"><Media src={heroImage} showLabel={false} /></div>
        <div className="container home-journey__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">{c.ahead.title}</p>
            <h2 id="ahead-title" className="home-journey__lines">
              {c.ahead.lead.map((l) => <span key={l}>{l}</span>)}
            </h2>
            <ul className="ab-ahead">
              {c.ahead.lines.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <div className="home-journey__ctas">
              <Button to="/donate" variant="light" icon="heart">Donate</Button>
              <Button to="/contact" variant="glass" icon="mail">Get in touch</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
