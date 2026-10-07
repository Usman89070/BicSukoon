import { sites } from '../data/sites'
import { urls } from '../site'
import Logo from '../components/common/Logo'
import Icon from '../components/common/Icon'
import Pattern from '../components/common/Pattern'
import { portalImage } from './media'

const halves = [
  { id: 'bic', cta: 'Explore BIC', line: 'Masjid · QMCHC · Community Hall' },
  { id: 'sukoon', cta: 'Explore Sukoon Village', line: 'Seniors Living · Lifestyle · Childcare' },
]

const Crescent = (props) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
    <path d="M38 14a19 19 0 1 0 0 36 22 22 0 0 1 0-36z" fill="currentColor" />
  </svg>
)

/**
 * Starting page: the screen split into two full-height photos, one per
 * website (stacked on phones). The whole half is the link.
 */
export default function Portal() {
  return (
    <main className="portal">
      <title>{import.meta.env.VITE_SITE_NAME}</title>

      <header className="portal__bar">
        <Crescent className="portal__bar-mark" />
        <div>
          <p className="portal__bar-eyebrow">Welcome</p>
          <h1 className="portal__bar-title">Choose a project to explore</h1>
        </div>
      </header>

      <div className="portal__split">
        {halves.map((h, i) => {
          const s = sites[h.id]
          const image = portalImage(h.id)
          return (
            <a key={h.id} href={urls[h.id]} className={`half half--${h.id}`} style={{ '--i': i }} aria-label={`Enter the ${s.name} website`}>
              {image ? (
                <img className="half__photo" src={image} alt="" fetchPriority="high" decoding="async" />
              ) : (
                <Pattern className="half__pattern" opacity={0.08} scale={88} />
              )}
              <span className="half__shade" aria-hidden="true" />
              <span className="half__content">
                <Logo project={h.id} tone="dark" height={h.id === 'sukoon' ? 70 : 60} decorative />
                <span className="half__line">{h.line}</span>
                <span className="half__cta">
                  {h.cta} <Icon name="arrow" size={18} />
                </span>
              </span>
            </a>
          )
        })}
        <span className="portal__medallion" aria-hidden="true"><Crescent /></span>
      </div>

      <footer className="portal__foot">
        <p>© {new Date().getFullYear()} {sites.bic.name} · {sites.sukoon.name}</p>
      </footer>
    </main>
  )
}
