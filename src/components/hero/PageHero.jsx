import { cx } from '../../utils/format'
import { useParallax } from '../../hooks/useParallax'
import Breadcrumbs from '../common/Breadcrumbs'
import Media from '../common/Media'
import Pattern from '../common/Pattern'

/** Interior page hero with image/video background and glass title panel. */
export default function PageHero({ eyebrow, title, lead, media, breadcrumbs, children, size = 'md', className }) {
  const ref = useParallax(0.1)
  return (
    <section className={cx('page-hero', `page-hero--${size}`, className)} ref={ref}>
      <div className="page-hero__bg">
        {media?.video ? (
          <video autoPlay muted loop playsInline preload="metadata" poster={media.poster} aria-hidden="true">
            <source src={media.video} />
          </video>
        ) : (
          <Media src={media?.image} label={media?.label} eager />
        )}
        <div className="page-hero__scrim" />
        <Pattern className="page-hero__pattern" opacity={0.06} scale={100} />
      </div>
      <div className="page-hero__content container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </section>
  )
}
