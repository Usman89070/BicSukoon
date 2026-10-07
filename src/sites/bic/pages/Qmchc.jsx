import { qmchc as c } from '../../../data/qmchc'
import { imageFor } from '../../../utils/images'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import Media from '../../../components/common/Media'
import Icon from '../../../components/common/Icon'
import PageShell from '../../../templates/PageShell'
import { heroImage } from '../images'

/** Queensland Muslim Cultural Heritage Centre — official copy, three spaces with large images. */
export default function Qmchc() {
  return (
    <PageShell
      title={c.title}
      eyebrow={c.title}
      heading={c.heading}
      lead={c.intro[0]}
      description={c.intro[1]}
      media={{ image: imageFor(['facility-qmchc', 'qmchc']), label: 'Cultural Heritage Centre render' }}
      heroActions={c.spaces.map((s, i) => (
        <Button key={s.id} href={`#${s.id}`} variant={i === 0 ? 'primary' : 'glass'} icon={i === 0 ? 'arrow' : undefined}>{s.title}</Button>
      ))}
    >
      {/* Intro */}
      <section className="section cc-intro">
        <div className="container">
          <Reveal className="cc-intro__inner">
            {c.intro.slice(1).map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <ul className="qm-index" aria-label="Inside the Centre">
            {c.spaces.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 90}>
                <a href={`#${s.id}`} className="qm-index__link">
                  <span className="qm-index__num">0{i + 1}</span>
                  <span className="qm-index__title">{s.title}</span>
                  <span className="qm-index__lead">{s.lead}</span>
                  <Icon name="arrow" size={18} className="qm-index__arrow" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Library, Museum, Theatre */}
      {c.spaces.map((s, i) => (
        <section key={s.id} id={s.id} className={`section${i % 2 === 0 ? ' section--muted' : ''} qm-space`} aria-labelledby={`${s.id}-title`}>
          <div className={`container cc-split${i % 2 ? ' cc-split--flip' : ''}`}>
            <Reveal variant="image" className={`cc-split__media${i % 2 ? ' qm-space__media--end' : ''}`}>
              <Media src={imageFor(s.image)} label={`${s.title} render`} ratio="4 / 5" />
            </Reveal>
            <div className="cc-split__text">
              <SectionHeader eyebrow={`0${i + 1} · Inside the Centre`} title={<span id={`${s.id}-title`}>{s.title}</span>} />
              <Reveal delay={80}>
                <p className="cc-lead">{s.lead}</p>
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* A place for everyone */}
      <section className="section section--dark" aria-labelledby="everyone-title">
        <div className="container qm-everyone">
          <SectionHeader eyebrow="Open to all" title={<span id="everyone-title">{c.everyone.title}</span>} align="center" intro={c.everyone.lead} />
          <Reveal delay={80}>
            <p className="qm-everyone__body">{c.everyone.body}</p>
            <p className="qm-everyone__closing">{c.everyone.closing}</p>
          </Reveal>
        </div>
      </section>

      {/* Looking ahead */}
      <section className="home-journey" aria-labelledby="ahead-title">
        <div className="home-journey__bg" aria-hidden="true"><Media src={heroImage} showLabel={false} /></div>
        <div className="container home-journey__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">{c.ahead.title}</p>
            <h2 id="ahead-title" className="home-journey__lines"><span>Preserving the Past.</span><span>Inspiring the Future.</span></h2>
            {c.ahead.body.map((p) => <p key={p} className="home-journey__body">{p}</p>)}
            <div className="home-journey__ctas">
              <Button to="/donate" variant="light" icon="heart">Support the Centre</Button>
              <Button to="/contact" variant="glass" icon="mail">Get in touch</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
