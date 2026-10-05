import { sites } from '../data/sites'
import { urls } from '../site'
import Logo from '../components/common/Logo'
import Icon from '../components/common/Icon'
import Pattern from '../components/common/Pattern'
import { aerialImage, portalImage } from './media'

/**
 * Where each site sits in the aerial photo (portal-aerial.*), as % of the
 * image: `area` outlines the buildings, `pin` marks their centre and `top`
 * is where the block's bottom edge sits (just above the buildings).
 */
const mapAreas = {
  bic: { area: { x: 17, y: 54.5, w: 21, h: 10.5 }, pin: { x: 27.5, y: 59.5 }, top: 49 },
  sukoon: { area: { x: 47.8, y: 50.5, w: 23.6, h: 17 }, pin: { x: 59.6, y: 59 }, top: 45.5 },
}

const doors = [
  {
    id: 'bic',
    short: 'A Masjid Complex and the Queensland Muslim Cultural & Heritage Centre.',
    eyebrow: 'Masjid Complex · Cultural & Heritage Centre',
    text: 'A place of worship, learning and heritage, built for the community and for generations to come.',
    tags: ['Faith', 'Knowledge', 'Community', 'Legacy'],
  },
  {
    id: 'sukoon',
    short: 'Seniors Living, a Lifestyle Centre and a Childcare Centre.',
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
 */
/** Aerial map version: both blocks placed over their own buildings in one photo. */
function MapPortal() {
  return (
    <main className="portal portal--map">
      <title>{import.meta.env.VITE_SITE_NAME}</title>

      <header className="portal__bar">
        <Crescent className="portal__bar-mark" />
        <div>
          <p className="portal__bar-eyebrow">Welcome</p>
          <h1 className="portal__bar-title">Choose a project to explore</h1>
        </div>
      </header>

      <div className="map">
        <div className="map__stage">
          <img className="map__img" src={aerialImage} alt="Aerial view of the Brisbane Islamic Centre and Sukoon Village sites" fetchPriority="high" decoding="async" />
          <span className="map__shade" aria-hidden="true" />
          {doors.map((d) => {
            const m = mapAreas[d.id]
            return (
              <span key={d.id} className={`map__spot map__spot--${d.id}`} aria-hidden="true">
                <span className="map__area" style={{ left: `${m.area.x}%`, top: `${m.area.y}%`, width: `${m.area.w}%`, height: `${m.area.h}%` }} />
                <span className="map__line" style={{ left: `${m.pin.x}%`, top: `${m.top}%`, height: `${m.pin.y - m.top}%` }} />
                <span className="map__pin" style={{ left: `${m.pin.x}%`, top: `${m.pin.y}%` }} />
              </span>
            )
          })}
        </div>

        <div className="map__stage map__stage--cards">
          {doors.map((d, i) => {
            const s = sites[d.id]
            const m = mapAreas[d.id]
            return (
              <a
                key={d.id}
                href={urls[d.id]}
                className={`map-card map-card--${d.id}`}
                style={{ '--x': `${m.pin.x}%`, '--top': `${m.top}%`, '--i': i }}
                aria-label={`Enter the ${s.name} website`}
              >
                <span className="map-card__logo">
                  <Logo project={d.id} tone="light" height={d.id === 'sukoon' ? 56 : 44} decorative />
                </span>
                <span className="map-card__eyebrow">{d.eyebrow}</span>
                <span className="map-card__text">{d.short}</span>
                <span className="map-card__cta">
                  Enter website <Icon name="arrow" size={16} />
                </span>
              </a>
            )
          })}
        </div>
      </div>

      <footer className="portal__foot">
        <p>© {new Date().getFullYear()} {sites.bic.name} · {sites.sukoon.name}</p>
      </footer>
    </main>
  )
}

export default function Portal() {
  if (aerialImage) return <MapPortal />
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
                  Enter website <Icon name="arrow" size={18} />
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
