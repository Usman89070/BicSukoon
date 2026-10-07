import Button from '../common/Button'
import Media from '../common/Media'

/**
 * Full-screen home hero: one big render (or a muted looping film when
 * supplied) with a short headline and two actions. Little text by design.
 */
export default function StageHero({ id = 'hero-title', className, eyebrow, title, image, film, label, actions = [] }) {
  return (
    <section className={className ? `stage-hero ${className}` : 'stage-hero'} aria-labelledby={id}>
      <div className="stage-hero__bg">
        {film?.src ? (
          <video autoPlay muted loop playsInline preload="metadata" poster={film.poster ?? image ?? undefined} aria-hidden="true">
            <source src={film.src} />
          </video>
        ) : (
          <Media src={image ?? film?.poster} label={label} eager alt="" />
        )}
        <span className="stage-hero__shade" aria-hidden="true" />
      </div>
      <div className="container stage-hero__content">
        {eyebrow && <p className="stage-hero__eyebrow">{eyebrow}</p>}
        <h1 id={id} className="stage-hero__title">{title}</h1>
        <div className="stage-hero__ctas">
          {actions.map((a) => (
            <Button key={a.label} to={a.to} href={a.href} variant={a.variant ?? 'glass'} icon={a.icon}>{a.label}</Button>
          ))}
        </div>
      </div>
      <span className="stage-hero__scroll" aria-hidden="true" />
    </section>
  )
}
