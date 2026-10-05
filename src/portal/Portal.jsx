import { sites } from '../data/sites'
import { urls } from '../site'
import Logo from '../components/common/Logo'
import Icon from '../components/common/Icon'
import Pattern from '../components/common/Pattern'
import { aerialImage, portalImage } from './media'

const doors = [
  {
    id: 'bic',
    cta: 'Explore BIC',
    eyebrow: 'Masjid Complex · Cultural & Heritage Centre',
    text: 'A place of worship, learning and heritage, built for the community and for generations to come.',
    tags: ['Faith', 'Knowledge', 'Community', 'Legacy'],
  },
  {
    id: 'sukoon',
    cta: 'Explore Sukoon Village',
    eyebrow: 'Seniors Living · Lifestyle · Childcare',
    text: 'A calm, connected village designed around care and belonging, for every stage of life.',
    tags: ['Seniors Living', 'Lifestyle Centre', 'Childcare Centre'],
  },
]

const Crescent = (props) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
    <path d="M38 14a19 19 0 1 0 0 36 22 22 0 0 1 0-36z" fill="currentColor" />
  </svg>
)

/**
 * Starting page: two full-height "doors", one per website, each in its own
 * identity. The whole door is the link. When a photo is supplied (see
 * ./media.js) it becomes the background of the text block (with a soft shade
 * so the white text stays readable); otherwise a framed placeholder is shown.
 * With portal-aerial.* present, that aerial photo fills the page behind both
 * doors, graded cool (BIC) on the left and warm (Sukoon) on the right.
 */
export default function Portal() {
  return (
    <main className={`portal${aerialImage ? ' portal--aerial' : ''}`}>
      <title>{import.meta.env.VITE_SITE_NAME}</title>

      {aerialImage && (
        <div className="portal__aerial" aria-hidden="true">
          <img src={aerialImage} alt="" fetchPriority="high" decoding="async" />
          <span className="portal__grade" />
        </div>
      )}

      <header className="portal__bar">
        <Crescent className="portal__bar-mark" />
        <div>
          <p className="portal__bar-eyebrow">Welcome</p>
          <h1 className="portal__bar-title">Choose a project to explore</h1>
        </div>
      </header>

      <div className="portal__split">
        {doors.map((d, i) => {
          const s = sites[d.id]
          const image = portalImage(d.id)
          return (
            <a
              key={d.id}
              href={urls[d.id]}
              className={`door door--${d.id}${image ? ' door--photo' : ''}`}
              style={{ '--i': i }}
              aria-label={`Enter the ${s.name} website`}
            >
              <Pattern className="door__pattern" opacity={0.07} scale={88} />
              <span className="door__glow" aria-hidden="true" />

              <span className="door__inner">
                {image && (
                  <>
                    <img className="door__photo" src={image} alt="" fetchPriority={i === 0 ? 'high' : undefined} decoding="async" />
                    <span className="door__photo-shade" aria-hidden="true" />
                  </>
                )}
                <span className="door__logo">
                  <Logo project={d.id} tone={image ? 'dark' : 'light'} height={d.id === 'sukoon' ? 62 : 58} decorative />
                </span>
                <span className="door__eyebrow">{d.eyebrow}</span>

                {!image && (
                  <span className="door__frame">
                    <span className="door__placeholder">
                      <Pattern className="door__placeholder-pattern" opacity={0.22} scale={56} />
                      <Crescent className="door__placeholder-mark" />
                    </span>
                  </span>
                )}

                <span className="door__text">{d.text}</span>
                <span className="door__tags">
                  {d.tags.map((t) => <span key={t}>{t}</span>)}
                </span>
                <span className="door__cta">
                  {d.cta} <Icon name="arrow" size={18} />
                </span>
              </span>
            </a>
          )
        })}

        <span className="portal__medallion" aria-hidden="true">
          <Crescent />
        </span>
      </div>

      <footer className="portal__foot">
        <p>© {new Date().getFullYear()} {sites.bic.name} · {sites.sukoon.name}</p>
      </footer>
    </main>
  )
}
