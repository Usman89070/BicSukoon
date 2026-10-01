import { videos } from '../../data/videos'
import { useParallax } from '../../hooks/useParallax'
import Button from '../common/Button'
import Media from '../common/Media'
import Pattern from '../common/Pattern'

/** Cinematic home hero — background film when supplied, otherwise render placeholder. */
export default function Hero() {
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
          <span className="line"><span>A new landmark</span></span>
          <span className="line"><span>for faith and community</span></span>
          <span className="line"><span className="hero__title-accent">in Brisbane.</span></span>
        </h1>
        <p className="hero__lead">
          The Brisbane Islamic Centre and Sukoon Village — two connected projects bringing worship, learning, care and
          belonging together for generations to come.
        </p>
        <div className="hero__ctas">
          <Button to="/vision" variant="primary" icon="arrow">Explore the Vision</Button>
          <Button to="/project-updates" variant="glass">Project Updates</Button>
          <Button to="/donate" variant="ghost-light" icon="heart">Donate Now</Button>
        </div>
      </div>

      <a href="#projects" className="hero__scroll" aria-label="Scroll to the projects">
        <span />
      </a>
    </section>
  )
}
