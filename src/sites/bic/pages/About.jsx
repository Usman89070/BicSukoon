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
import { useBoard } from '../../../hooks/useGuests'
import { donateLink } from '../../../data/donation'

const boardPhotos = import.meta.glob('../../../assets/images/board/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const boardPhoto = (id) => {
  const key = Object.keys(boardPhotos).find((k) => new RegExp(`/${id}\\.[a-z]+$`, 'i').test(k))
  return key ? boardPhotos[key] : null
}
const initials = (name) =>
  name
    .replace(/^Dr\s+/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

/** About BIC — the Board's vision, the Board of Directors and the project history. */
export default function BicAbout() {
  const board = useBoard()
  return (
    <PageShell
      title="About Us"
      eyebrow="Brisbane Islamic Centre"
      heading={c.title}
      lead={`${c.statements[0].label} ${c.statements[0].text}`}
      description="The vision, purpose and Board of Directors of the Brisbane Islamic Centre."
      media={{ image: heroImage, label: 'Brisbane Islamic Centre render' }}
      heroActions={
        <>
          <Button href="#board" variant="primary" icon="arrow">Board of Directors</Button>
          <Button href="#history" variant="glass">Our history</Button>
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

      {/* Board of Directors */}
      <section id="board" className="section qm-space" aria-labelledby="board-title">
        <div className="container container--wide">
          <SectionHeader eyebrow="Our people" title={<span id="board-title">{c.boardTitle}</span>} align="center" />
          <ul className="guests ab-board">
            {board.map((m, i) => {
              const photo = m.photoUrl ?? boardPhoto(m.id)
              return (
                <Reveal as="li" key={m.id} delay={(i % 4) * 70} className={`guest${m.memoriam ? ' guest--memoriam' : ''}`}>
                  <div className="guest__frame">
                    {photo ? <img className="guest__photo" src={photo} alt={m.name} loading="lazy" decoding="async" /> : <span className="guest__monogram" aria-hidden="true">{initials(m.name)}</span>}
                  </div>
                  {m.memoriam && <p className="ab-board__memoriam">In Memoriam</p>}
                  <h3 className="guest__name">{m.name}</h3>
                  {m.role && !m.memoriam && <p className="guest__role">{m.role}</p>}
                </Reveal>
              )
            })}
          </ul>
          <Reveal className="ab-tribute">
            {c.memoriam.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <div className="ab-donate">
            <Button {...donateLink} variant="primary" icon="heart">Donate Now</Button>
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
          <SectionHeader eyebrow="Our history" title={<span id="history-title">{timelineIntro.bic.title}</span>} intro={timelineIntro.bic.text} className="status-timeline__head">
            <Button to="/vision" variant="ghost" icon="arrow">Our vision</Button>
          </SectionHeader>
          <Timeline items={timeline.bic} />
        </div>
      </section>
    </PageShell>
  )
}
