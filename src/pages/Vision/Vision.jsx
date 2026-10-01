import { pillars } from '../../data/vision'
import { facilities } from '../../data/facilities'
import { Link } from 'react-router-dom'
import Seo from '../../components/common/Seo'
import SectionHeader from '../../components/common/SectionHeader'
import Reveal from '../../components/common/Reveal'
import Media from '../../components/common/Media'
import PageHero from '../../components/hero/PageHero'
import Masterplan from '../../components/masterplan/Masterplan'
import Icon from '../../components/common/Icon'
import CtaBand from '../shared/CtaBand'

export default function Vision() {
  return (
    <>
      <Seo title="The Vision" description="Faith, Knowledge, Community and Legacy — the four themes behind the Brisbane Islamic Centre and Sukoon Village." />
      <PageHero
        eyebrow="The Vision"
        title="Faith. Knowledge. Community. Legacy."
        lead="Four themes guide every facility in the precinct — and connect the Brisbane Islamic Centre with Sukoon Village."
        media={{ label: 'Vision film / aerial render' }}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Vision' }]}
        size="lg"
      />

      <section className="section">
        <div className="container vision-chapters">
          {pillars.map((p, i) => (
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
                    <li key={id} className={`theme-${facilities[id].project}`}>
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
    </>
  )
}
