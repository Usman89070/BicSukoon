import { about as c } from '../../../data/about'
import { timeline, timelineIntro } from '../../../data/timeline'
import { imageFor } from '../../../utils/images'
import SectionHeader from '../../../components/common/SectionHeader'
import Button from '../../../components/common/Button'
import Reveal from '../../../components/common/Reveal'
import Media from '../../../components/common/Media'
import Timeline from '../../../components/timeline/Timeline'
import PageShell from '../../../templates/PageShell'
import { heroImage } from '../images'

/** About BIC — the Board's vision and the project timeline. */
export default function BicAbout() {
  return (
    <PageShell
      title="About Us"
      eyebrow="Brisbane Islamic Centre"
      heading={c.title}
      lead={`${c.statements[0].label} ${c.statements[0].text}`}
      description="The vision and purpose of the Brisbane Islamic Centre."
      media={{ image: heroImage, label: 'Brisbane Islamic Centre render' }}
      heroActions={
        <>
          <Button href="#history" variant="glass">Our History to Projected Timeline</Button>
        </>
      }
    >
      {/* Vision, hope, purpose, aim */}
      <section className="section" aria-label="Our vision and purpose">
        <div className="container container--wide">
          <ul className="ab-statements">
            {c.statements.map((s, i) => (
              <Reveal as="li" key={s.label} delay={(i % 4) * 80} className="ab-statement">
                <span className="ab-statement__num">0{i + 1}</span>
                <h2 className="ab-statement__label">{s.label}</h2>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Heritage + objective */}
      <section className="section section--muted" aria-labelledby="objective-title">
        <div className="container cc-split">
          <Reveal variant="image" className="cc-split__media">
            <Media src={imageFor(['about-gallery-3', 'facility-masjid', 'hero-bic'])} label="Prayer hall render" ratio="4 / 5" />
          </Reveal>
          <div className="cc-split__text">
            <SectionHeader eyebrow="A powerful heritage" title={<span id="objective-title">{c.objective.label}</span>} />
            <Reveal delay={80}>
              {c.heritage.map((p, i) => <p key={p} className={i === 0 ? 'cc-lead' : undefined}>{p}</p>)}
              <p className="ab-objective"><strong>{c.objective.label}</strong> {c.objective.text}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section section--tight" aria-label="Renders">
        <div className="container container--wide ab-gallery">
          {c.gallery.map((g, i) => (
            <Reveal key={g.label} variant="image" delay={i * 90}>
              <Media src={imageFor(g.image)} label={g.label} ratio="4 / 3" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* History */}
      <section id="history" className="section section--muted qm-space" aria-labelledby="history-title">
        <div className="container split">
          <SectionHeader eyebrow="Timeline" title={<span id="history-title">{timelineIntro.bic.title}</span>} intro={timelineIntro.bic.text} className="status-timeline__head">
            <Button to="/vision" variant="ghost" icon="arrow">Our vision</Button>
          </SectionHeader>
          <Timeline items={timeline.bic} ascending={timelineIntro.bic.ascending} />
        </div>
      </section>
    </PageShell>
  )
}
