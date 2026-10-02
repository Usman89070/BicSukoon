import { sites } from '../data/sites'
import { urls } from '../site'
import Logo from '../components/common/Logo'
import Icon from '../components/common/Icon'
import Pattern from '../components/common/Pattern'
import { portalImage } from './media'

const choices = [
  {
    id: 'bic',
    tone: 'dark',
    eyebrow: 'Masjid Complex · Cultural & Heritage Centre',
    tags: ['Faith', 'Knowledge', 'Community', 'Legacy'],
    text: 'A Masjid Complex and the Queensland Muslim Cultural & Heritage Centre.',
    imageAlt: 'Aerial render of the Brisbane Islamic Centre',
  },
  {
    id: 'sukoon',
    tone: 'light',
    eyebrow: 'Seniors Living · Lifestyle · Childcare',
    tags: ['Seniors Living', 'Lifestyle Centre', 'Childcare Centre'],
    text: 'Seniors Living, a Lifestyle Centre and a Childcare Centre — a village for every stage of life.',
    imageAlt: 'Sukoon Village render',
  },
]

/** Starting page: the visitor chooses which website to enter. */
export default function Portal() {
  return (
    <main className="portal">
      <title>{import.meta.env.VITE_SITE_NAME}</title>
      <Pattern className="portal__pattern" opacity={0.05} scale={96} />

      <header className="portal__head">
        <svg className="portal__mark" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M38 14a19 19 0 1 0 0 36 22 22 0 0 1 0-36z" fill="currentColor" />
        </svg>
        <p className="portal__eyebrow">Welcome</p>
        <h1 className="portal__title">Where would you like to go?</h1>
        <p className="portal__lead">Choose a project to visit its website.</p>
      </header>

      <ul className="portal__choices">
        {choices.map((c, i) => {
          const s = sites[c.id]
          const image = portalImage(c.id)
          // With an image the logo sits in the panel; without one it is centred.
          const tone = image ? 'dark' : c.tone
          return (
            <li key={c.id} style={{ '--i': i }}>
              <a
                href={urls[c.id]}
                className={`choice choice--${c.id}${image ? ' choice--image' : ''}`}
                aria-label={`Visit the ${s.name} website`}
              >
                {image ? (
                  <span className="choice__media">
                    <img src={image} alt={c.imageAlt} width="1500" height="1101" fetchPriority={i === 0 ? 'high' : undefined} decoding="async" />
                  </span>
                ) : (
                  <>
                    <Pattern className="choice__pattern" opacity={c.tone === 'dark' ? 0.1 : 0.12} scale={72} />
                    <span className="choice__glow" aria-hidden="true" />
                  </>
                )}
                <span className="choice__body">
                  <span className="choice__logo">
                    <Logo project={c.id} tone={tone} height={c.id === 'sukoon' ? 66 : 64} decorative />
                  </span>
                  <span className="choice__eyebrow">{c.eyebrow}</span>
                  <span className="choice__text">{c.text}</span>
                  <span className="choice__tags">
                    {c.tags.map((t) => <span key={t}>{t}</span>)}
                  </span>
                  <span className="choice__cta">
                    Visit website <Icon name="arrow" size={18} />
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      <footer className="portal__foot">
        <p>© {new Date().getFullYear()} {sites.bic.name} · {sites.sukoon.name}</p>
      </footer>
    </main>
  )
}
