import { Link } from 'react-router-dom'
import { pillars } from '../data/vision'
import { facilities } from '../data/facilities'
import { SITE_ID, site } from '../site'
import SectionHeader from '../components/common/SectionHeader'
import Reveal from '../components/common/Reveal'
import Media from '../components/common/Media'
import Icon from '../components/common/Icon'
import Masterplan from '../components/masterplan/Masterplan'
import PageShell from './PageShell'
import CtaBand from './CtaBand'

export default function VisionPage() {
  return (
    <PageShell
      title="The Vision"
      eyebrow="Faith · Knowledge · Community · Legacy"
      description={site.description}
      lead="Four themes guide everything we are building — and how each facility serves the community."
      media={{ label: 'Vision film / aerial render' }}
      heroSize="lg"
    >
      <section className="section">
        <div className="container vision-chapters">
          {pillars[SITE_ID].map((p, i) => (
            <article key={p.id} className="vision-chapter" id={p.id}>
              <Reveal variant="image" className="vision-chapter__media">
                <Media src={p.media.image} label={`${p.title} imagery`} ratio="4 / 3" />
              </Reveal>
              <Reveal className="vision-chapter__text" delay={100}>
                <span className="vision-chapter__num" aria-hidden="true">0{i + 1}</span>
                <h2 className="vision-chapter__title">{p.title}</h2>
                <p className="vision-chapter__line">{p.line}</p>
                <p className="vision-chapter__body">{p.body}</p>
                <ul className="vision-chapter__links">
                  {p.facilities.map((id) => (
                    <li key={id}>
                      <Link to={facilities[id].path}>{facilities[id].title} <Icon name="arrow" size={14} /></Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Masterplan" title="How the vision takes shape." />
          <Masterplan />
        </div>
      </section>
      <CtaBand />
    </PageShell>
  )
}
