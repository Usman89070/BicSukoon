import { site } from '../../site'
import { videos } from '../../data/videos'
import { cx } from '../../utils/format'
import { useParallax } from '../../hooks/useParallax'
import Breadcrumbs from '../common/Breadcrumbs'
import Media from '../common/Media'
import Pattern from '../common/Pattern'
import { useVideoSrc } from '../../hooks/useVideoSrc'

/**
 * Interior page hero. Style follows the website:
 *  - BIC ('framed'):   light frosted white, navy text, image in a rounded frame.
 *  - Sukoon ('split'): light, airy split layout with an arched image window.
 *  - 'cinematic':      full-bleed image/video with a dark scrim (not used now).
 */
export default function PageHero({ eyebrow, title, lead, media, breadcrumbs, children, size = 'md', className }) {
  const ref = useParallax(0.1)
  // media.video may be an id from data/videos.js or a direct file URL.
  const film = media?.video ? videos[media.video] : null
  // Only background films autoplay in a page hero; other films show their poster.
  const videoSrc = useVideoSrc(film ? (film.background ? film.src : null) : media?.video && /[/.]/.test(media.video) ? media.video : null)
  const visual = videoSrc ? (
    <video autoPlay muted loop playsInline preload="metadata" poster={film?.poster ?? media.poster} aria-hidden="true">
      <source src={videoSrc} />
    </video>
  ) : (
    <Media src={media?.image ?? film?.poster} label={media?.label} eager />
  )

  const text = (
    <>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
      <h1 className="page-hero__title">{title}</h1>
      {lead && <p className="page-hero__lead">{lead}</p>}
      {children && <div className="page-hero__actions">{children}</div>}
    </>
  )

  if (site.heroStyle === 'split' || site.heroStyle === 'framed') {
    return (
      <section className={cx('page-hero-split', `page-hero-split--${size}`, site.heroStyle === 'framed' && 'page-hero-split--framed', className)}>
        <div className="container page-hero-split__inner">
          <div className="page-hero-split__text">{text}</div>
          <div className="page-hero-split__visual">{visual}</div>
        </div>
      </section>
    )
  }

  return (
    <section className={cx('page-hero', `page-hero--${size}`, className)} ref={ref}>
      <div className="page-hero__bg">
        {visual}
        <div className="page-hero__scrim" />
        <Pattern className="page-hero__pattern" opacity={0.06} scale={100} />
      </div>
      <div className="page-hero__content container">{text}</div>
    </section>
  )
}
