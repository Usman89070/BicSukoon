import { privacy } from '../../../data/privacy'
import Reveal from '../../../components/common/Reveal'
import PageShell from '../../../templates/PageShell'

function Block({ b }) {
  if (typeof b === 'string') return <p>{b}</p>
  if (b.sub) return <h3 className="legal__sub">{b.sub}</h3>
  if (b.ul) return <ul className="legal__list">{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>
  if (b.ol) return <ol className="legal__list legal__list--num">{b.ol.map((t) => <li key={t}>{t}</li>)}</ol>
  if (b.lead) return <p><strong>{b.lead}</strong> {b.text}</p>
  if (b.link) return <p>{b.link.lead} <a href={b.link.href} target="_blank" rel="noopener noreferrer">{b.link.label}</a></p>
  return null
}

/** BIC Privacy Policy: the official wording from data/privacy.js. */
export default function Privacy() {
  return (
    <PageShell title={privacy.title} description="How Brisbane Islamic Centre collects, uses, stores, protects and discloses personal information." heroLayout="center">
      <section className="section">
        <div className="container legal">
          {privacy.sections.map((s, i) => (
            <Reveal as="section" key={s.title} className="legal__section" aria-labelledby={`privacy-${i + 1}`}>
              <h2 id={`privacy-${i + 1}`} className="legal__title"><span className="legal__num">{i + 1}.</span> {s.title}</h2>
              {s.blocks.map((b, j) => <Block key={j} b={b} />)}
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
