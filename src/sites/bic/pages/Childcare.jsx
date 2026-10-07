import { Link } from 'react-router-dom'
import { childcare as c } from '../../../data/childcare'
import { externalHref } from '../../../site'
import { imageFor } from '../../../utils/images'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import PageShell from '../../../templates/PageShell'
import { heroImage } from '../images'

const SiteLink = ({ site, path, children, ...rest }) => {
  const href = externalHref(site, path)
  return href ? <a href={href} {...rest}>{children}</a> : <Link to={path} {...rest}>{children}</Link>
}

/** Childcare Centre — official copy, laid out around large images. */
export default function Childcare() {
  return (
    <PageShell
      title={c.title}
      eyebrow={c.title}
      heading={c.heading}
      lead={c.lead}
      description={c.intro[0]}
      media={{ image: imageFor(['facility-childcare', 'childcare']), label: 'Childcare Centre render' }}
      heroActions={
        <>
          <Button href="#learning" variant="primary" icon="arrow">Discover the centre</Button>
          <Button to="/contact" variant="glass" icon="mail">Enquire</Button>
        </>
      }
    >
      {/* Intro */}
      <section className="section cc-intro">
        <div className="container">
          <Reveal className="cc-intro__inner">
            <span className="cc-badge"><Icon name="check" size={14} /> Council-approved</span>
            {c.intro.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* Learning through care */}
      <section id="learning" className="section section--muted" aria-labelledby="learning-title">
        <div className="container cc-split">
          <Reveal variant="image" className="cc-split__media">
            <Media src={imageFor('childcare-learning')} label="Early learning photo" ratio="4 / 5" />
          </Reveal>
          <div className="cc-split__text">
            <SectionHeader eyebrow="Early years" title={<span id="learning-title">{c.learning.title}</span>} />
            <Reveal delay={80}>
              <p className="cc-lead">{c.learning.lead}</p>
              {c.learning.body.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Community-focused environment */}
      <section className="section section--dark" aria-labelledby="community-title">
        <div className="container cc-split cc-split--flip">
          <div className="cc-split__text">
            <SectionHeader eyebrow="One connected community" title={<span id="community-title">{c.community.title}</span>} />
            <Reveal delay={80}>{c.community.body.map((p) => <p key={p}>{p}</p>)}</Reveal>
          </div>
          <Reveal variant="scale" className="cc-connect" aria-hidden="true">
            <span className="cc-connect__node cc-connect__node--bic">Brisbane Islamic Centre</span>
            <span className="cc-connect__node cc-connect__node--main">Childcare Centre</span>
            <span className="cc-connect__node cc-connect__node--sv">Sukoon Village</span>
            <span className="cc-connect__people">Families · Children · Grandparents</span>
          </Reveal>
        </div>
      </section>

      {/* Supporting families + designed for the future */}
      <section className="section" aria-label="Supporting families and designed for the future">
        <div className="container container--wide cc-pair">
          {[c.families, c.future].map((block, i) => (
            <Reveal key={block.title} delay={i * 100} className={`cc-card${i ? ' cc-card--future' : ''}`}>
              <Media src={imageFor(i ? 'childcare-future' : 'childcare-families')} label={block.title} showLabel={false} className="cc-card__media" />
              <span className="cc-card__shade" aria-hidden="true" />
              <div className="cc-card__body">
                <h2 className="cc-card__title">{block.title}</h2>
                {block.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Looking ahead */}
      <section className="home-journey cc-ahead" aria-labelledby="ahead-title">
        <div className="home-journey__bg" aria-hidden="true"><Media src={heroImage} showLabel={false} /></div>
        <div className="container home-journey__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">{c.ahead.title}</p>
            <h2 id="ahead-title" className="home-journey__lines"><span>{c.ahead.closing}</span></h2>
            {c.ahead.body.map((p) => <p key={p} className="home-journey__body">{p}</p>)}
            <ul className="cc-links">
              {c.ahead.links.map((l) => (
                <li key={l.label}><SiteLink site={l.site} path={l.path}>{l.label} <Icon name="arrow" size={14} /></SiteLink></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
