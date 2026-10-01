import { videos } from '../../data/videos'
import { useParallax } from '../../hooks/useParallax'
import Button from '../../components/common/Button'
import Media from '../../components/common/Media'
import Pattern from '../../components/common/Pattern'

/** BIC home hero — full-bleed cinematic film/render on deep navy. */
export default function BicHero() {
  const film = videos.hero
  const ref = useParallax(0.12)
  return (
    <section className="hero" aria-labelledby="hero-title" ref={ref}>
      <div className="hero__bg">
        {film.src ? (
          <video className="hero__video" autoPlay muted loop playsInline preload="metadata" poster={film.poster ?? undefined} aria-hidden="true">
            <source src={film.src} />
          </video>
        ) : (
          <Media src={film.poster} label="Hero film / aerial footage" eager className="hero__media" />
        )}
        <div className="hero__scrim" />
        <Pattern className="hero__pattern" opacity={0.07} scale={110} />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow"><span>Faith</span><span>Knowledge</span><span>Community</span><span>Legacy</span></p>
        <h1 id="hero-title" className="hero__title">
          <span className="line"><span>A landmark for</span></span>
          <span className="line"><span>faith and heritage</span></span>
          <span className="line"><span className="hero__title-accent">in Brisbane.</span></span>
        </h1>
        <p className="hero__lead">
          The Brisbane Islamic Centre — a Masjid Complex and the Queensland Muslim Cultural &amp; Heritage Centre,
          built for the community and for generations to come.
        </p>
        <div className="hero__ctas">
          <Button to="/vision" variant="primary" icon="arrow">Explore the Vision</Button>
          <Button to="/project-updates" variant="glass">Project Updates</Button>
          <Button to="/donate" variant="ghost-light" icon="heart">Donate Now</Button>
        </div>
      </div>

      <a href="#statement" className="hero__scroll" aria-label="Scroll to content"><span /></a>
    </section>
  )
}
