import Button from '../common/Button'
import Media from '../common/Media'

/**
 * Full-screen home hero: one big render (or a muted looping film when
 * supplied) with a short headline and two actions. Little text by design.
 *
 * With `ratio` (the image's width / height, e.g. "5927 / 4352") the whole
 * picture is shown uncropped, below the navigation bar and within the
 * height of the screen.
 */
const ratioValue = (r) => {
  const [w, h] = String(r).split('/').map(Number)
  return h ? w / h : w
}

export default function StageHero({ id = 'hero-title', className, ratio, eyebrow, title, image, film, label, actions = [] }) {
  const bg = (
    <div className="stage-hero__bg" style={ratio ? { aspectRatio: ratio } : undefined}>
      {film?.src ? (
        <video autoPlay muted loop playsInline preload="metadata" poster={film.poster ?? image ?? undefined} aria-hidden="true">
          <source src={film.src} />
        </video>
      ) : (
        <Media src={image ?? film?.poster} label={label} eager alt="" />
      )}
      <span className="stage-hero__shade" aria-hidden="true" />
    </div>
  )
  const content = (
    <div className={ratio ? 'stage-hero__content' : 'container stage-hero__content'}>
      {eyebrow && <p className="stage-hero__eyebrow">{eyebrow}</p>}
      <h1 id={id} className="stage-hero__title">{title}</h1>
      <div className="stage-hero__ctas">
        {actions.map((a) => (
          <Button key={a.label} to={a.to} href={a.href} variant={a.variant ?? 'glass'} icon={a.icon}>{a.label}</Button>
        ))}
      </div>
    </div>
  )

  return (
    <section className={['stage-hero', ratio && 'stage-hero--fit', className].filter(Boolean).join(' ')} aria-labelledby={id}>
      {ratio ? (
        <div className="stage-hero__frame" style={{ '--ratio': ratioValue(ratio) }}>
          {bg}
          {content}
        </div>
      ) : (
        <>
          {bg}
          {content}
          <span className="stage-hero__scroll" aria-hidden="true" />
        </>
      )}
    </section>
  )
}
