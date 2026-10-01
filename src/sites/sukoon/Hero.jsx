import { Link } from 'react-router-dom'
import { facilitiesFor } from '../../data/facilities'
import { videos } from '../../data/videos'
import Button from '../../components/common/Button'
import Media from '../../components/common/Media'
import Icon from '../../components/common/Icon'

/** Sukoon home hero — light, calm split layout with an arched image window. */
export default function SukoonHero() {
  const film = videos.sukoon
  return (
    <section className="sv-hero" aria-labelledby="hero-title">
      <div className="container sv-hero__inner">
        <div className="sv-hero__text">
          <p className="sv-hero__eyebrow">Seniors Living · Lifestyle · Childcare</p>
          <h1 id="hero-title" className="sv-hero__title">
            A village for <em>every stage</em> of life.
          </h1>
          <p className="sv-hero__lead">
            Sukoon Village brings together Seniors Living, a Lifestyle Centre and a Childcare Centre — a calm,
            connected community designed around care and belonging.
          </p>
          <div className="sv-hero__ctas">
            <Button to="/vision" variant="primary" icon="arrow">Discover the village</Button>
            <Button to="/contact" variant="ghost" icon="mail">Enquire</Button>
          </div>
        </div>

        <div className="sv-hero__visual">
          <div className="sv-hero__arch">
            {film.src ? (
              <video autoPlay muted loop playsInline preload="metadata" poster={film.poster ?? undefined} aria-hidden="true">
                <source src={film.src} />
              </video>
            ) : (
              <Media src={film.poster} label="Village render" eager />
            )}
          </div>
          <ul className="sv-hero__chips" aria-label="In the village">
            {facilitiesFor('sukoon').map((f, i) => (
              <li key={f.id} style={{ '--i': i }}>
                <Link to={f.path} className="sv-chip">
                  <span className="sv-chip__dot" aria-hidden="true" />
                  {f.title}
                  <Icon name="arrow" size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
