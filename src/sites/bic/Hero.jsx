import { Link } from 'react-router-dom'
import { videos } from '../../data/videos'
import { facilitiesFor } from '../../data/facilities'
import Button from '../../components/common/Button'
import Media from '../../components/common/Media'
import Icon from '../../components/common/Icon'
import Pattern from '../../components/common/Pattern'
import { heroImage } from './images'

/**
 * BIC home hero — light and frosted white. Navy text on the left; on the
 * right a framed image (film when supplied) kept at the aerial render's
 * proportions so the whole picture is visible, with frosted-glass chips.
 */
export default function BicHero() {
  const film = videos.hero
  return (
    <section className="bic-hero" aria-labelledby="hero-title">
      <Pattern className="bic-hero__pattern" opacity={0.06} scale={96} />
      <div className="container bic-hero__inner">
        <div className="bic-hero__text">
          <p className="bic-hero__eyebrow">
            <span>Faith</span><span>Knowledge</span><span>Community</span><span>Legacy</span>
          </p>
          <h1 id="hero-title" className="bic-hero__title">
            A landmark for faith and heritage <em>in Brisbane.</em>
          </h1>
          <p className="bic-hero__lead">
            The Brisbane Islamic Centre — a Masjid Complex and the Queensland Muslim Cultural &amp; Heritage Centre,
            built for the community and for generations to come.
          </p>
          <div className="bic-hero__ctas">
            <Button to="/vision" variant="primary" icon="arrow">Explore the Vision</Button>
            <Button to="/project-updates" variant="glass">Project Updates</Button>
            <Button to="/donate" variant="ghost" icon="heart">Donate Now</Button>
          </div>
        </div>

        <div className="bic-hero__visual">
          <div className="bic-hero__frame">
            {film.src ? (
              <video autoPlay muted loop playsInline preload="metadata" poster={film.poster ?? heroImage ?? undefined} aria-hidden="true">
                <source src={film.src} />
              </video>
            ) : (
              <Media src={heroImage ?? film.poster} alt="Aerial render of the Brisbane Islamic Centre" label="BIC aerial render" eager />
            )}
          </div>
          <ul className="bic-hero__chips" aria-label="The Centre">
            {facilitiesFor('bic').map((f, i) => (
              <li key={f.id} style={{ '--i': i }}>
                <Link to={f.path} className="bic-chip">
                  <span className="bic-chip__dot" aria-hidden="true" />
                  {f.shortTitle ?? f.title}
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
