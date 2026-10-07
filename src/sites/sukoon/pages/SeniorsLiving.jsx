import { Link } from 'react-router-dom'
import { seniors as c } from '../../../data/seniors'
import { externalHref } from '../../../site'
import { imageFor } from '../../../utils/images'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import PageShell from '../../../templates/PageShell'

const villageImage = imageFor(['hero-sukoon', 'site-300DPISukoon', 'portal-sukoon'])

const SiteLink = ({ site, path, children, ...rest }) => {
  const href = externalHref(site, path)
  return href ? <a href={href} {...rest}>{children}</a> : <Link to={path} {...rest}>{children}</Link>
}

/** Sukoon Village Seniors Living — official copy, laid out around large images. */
export default function SeniorsLiving() {
  return (
    <PageShell
      title={c.title}
      eyebrow={c.eyebrow}
      heading={c.heading}
      lead={c.intro[0]}
      description={c.intro[1]}
      media={{ image: imageFor(['facility-seniors-living', 'site-300DPISukoon']), label: 'Sukoon Village render' }}
      heroActions={
        <>
          <Button href="#living" variant="primary" icon="arrow">Discover the village</Button>
          <Button to="/contact" variant="glass" icon="mail">Enquire</Button>
        </>
      }
    >
      {/* Intro + key facts */}
      <section className="section cc-intro">
        <div className="container">
          <Reveal className="cc-intro__inner">
            <p>{c.intro[1]}</p>
            <p className="sl-belong">{c.belong}</p>
          </Reveal>
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

      {/* Dignity and independence */}
      <section id="living" className="section section--muted" aria-labelledby="dignity-title">
        <div className="container cc-split">
          <Reveal variant="image" className="cc-split__media">
            <Media src={imageFor(['seniors-townhouses', 'site-300DPISukoon'])} label="Townhouses render" ratio="4 / 5" />
          </Reveal>
          <div className="cc-split__text">
            <SectionHeader eyebrow="Independent living" title={<span id="dignity-title">{c.dignity.title}</span>} />
            <Reveal delay={80}>
              <p className="cc-lead">{c.dignity.lead}</p>
              {c.dignity.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
          </div>
        </div>
      </section>

      {/* A connected community */}
      <section className="section" aria-labelledby="connected-title">
        <div className="container cc-split cc-split--flip">
          <div className="cc-split__text">
            <SectionHeader eyebrow="Brisbane Islamic Centre" title={<span id="connected-title">{c.connected.title}</span>} />
            <Reveal delay={80}>
              <p className="cc-lead">{c.connected.lead}</p>
              {c.connected.body.map((p) => <p key={p}>{p}</p>)}
              <ul className="sl-chips">
                {c.connected.links.map((l) => (
                  <li key={l.label}><SiteLink site={l.site} path={l.path}>{l.label} <Icon name="arrow" size={14} /></SiteLink></li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal variant="image" className="cc-split__media">
            <Media src={imageFor(['seniors-connected', 'hero-bic', 'site-300DPIbic'])} label="Brisbane Islamic Centre render" ratio="4 / 5" />
          </Reveal>
        </div>
      </section>

      {/* Lifestyle Centre + A new chapter */}
      <section className="section section--muted" aria-label="Lifestyle Centre and a new chapter">
        <div className="container container--wide cc-pair">
          <Reveal className="cc-card">
            <Media src={imageFor('facility-lifestyle-centre')} label={c.lifestyle.title} showLabel={false} className="cc-card__media" />
            <span className="cc-card__shade" aria-hidden="true" />
            <div className="cc-card__body">
              <h2 className="cc-card__title">{c.lifestyle.title}</h2>
              <p>{c.lifestyle.lead}</p>
              {c.lifestyle.body.map((p) => <p key={p}>{p}</p>)}
              <Link to="/lifestyle-centre" className="sl-more">Discover the Lifestyle Centre <Icon name="arrow" size={16} /></Link>
            </div>
          </Reveal>
          <Reveal className="cc-card sl-chapter" delay={100}>
            <Media src={villageImage} label={c.chapter.title} showLabel={false} className="cc-card__media" />
            <span className="cc-card__shade" aria-hidden="true" />
            <div className="cc-card__body">
              <h2 className="cc-card__title">{c.chapter.title}</h2>
              {c.chapter.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* More than seniors living */}
      <section className="section sl-values" aria-labelledby="values-title">
        <div className="container sl-values__inner">
          <SectionHeader eyebrow="Our values" title={<span id="values-title">{c.values.title}</span>} align="center" intro={c.values.lead} />
          <ol className="sl-values__list">
            {c.values.lines.map((l, i) => (
              <Reveal as="li" key={l} delay={i * 90}>{l}</Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Looking ahead */}
      <section className="home-journey sl-ahead" aria-labelledby="ahead-title">
        <div className="home-journey__bg" aria-hidden="true"><Media src={villageImage} showLabel={false} /></div>
        <div className="container home-journey__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">{c.ahead.title}</p>
            <p className="sl-ahead__highlight"><Icon name="calendar" size={18} /> {c.ahead.highlight}</p>
            <h2 id="ahead-title" className="home-journey__lines"><span>{c.ahead.lead}</span></h2>
            <p className="home-journey__body">{c.ahead.closing}</p>
            <div className="home-journey__ctas">
              <Button to="/contact" variant="light" icon="mail">Register your interest</Button>
              <Button to="/project-updates" variant="glass">Project updates</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
