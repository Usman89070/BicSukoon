import { site } from '../../site'
import { videos } from '../../data/videos'
import { cx } from '../../utils/format'
import { useParallax } from '../../hooks/useParallax'
import Breadcrumbs from '../common/Breadcrumbs'
import Media from '../common/Media'
import Pattern from '../common/Pattern'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import { useState } from 'react'
import Icon from '../common/Icon'
import VideoLightbox from '../video/VideoLightbox'

/**
 * Interior page hero. Style follows the website:
 *  - BIC ('framed'):   light frosted white, navy text, image in a rounded frame.
 *  - Sukoon ('split'): light, airy split layout with an arched image window.
 *  - 'cinematic':      full-bleed image/video with a dark scrim (not used now).
 */
export default function PageHero({ eyebrow, title, lead, media, visual: customVisual, breadcrumbs, children, size = 'md', className, layout, below }) {
  const ref = useParallax(0.1)
  // media.video may be an id from data/videos.js or a direct file URL.
  const film = media?.video ? videos[media.video] : null
  // Only background films autoplay in a page hero; other films show their poster.
  const videoSrc = useVideoSrc(film ? (film.background ? film.src : null) : media?.video && /[/.]/.test(media.video) ? media.video : null)
  const [watching, setWatching] = useState(false)
  // a background film plays silently; clicking it opens it with sound in the full-screen viewer
  const visual = customVisual ?? (videoSrc ? (
    <>
      <button type="button" className="page-hero__film" onClick={() => setWatching(true)} aria-label={`Play video with sound: ${film?.title ?? title}`}>
        <video autoPlay muted loop playsInline preload="metadata" poster={film?.poster ?? media.poster} aria-hidden="true">
          <source src={videoSrc} />
        </video>
        <span className="page-hero__film-play" aria-hidden="true"><Icon name="volume" size={18} /></span>
      </button>
      {/* outside the button, so clicks in the viewer do not reopen it */}
      {watching && <VideoLightbox title={film?.title ?? title} tag={film?.caption} src={videoSrc} onClose={() => setWatching(false)} />}
    </>
  ) : (
    <Media src={media?.image ?? film?.poster} label={media?.label} eager />
  ))

  const text = (
    <>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
      <h1 className="page-hero__title">{title}</h1>
      {lead && <p className="page-hero__lead">{lead}</p>}
      {children && <div className="page-hero__actions">{children}</div>}
    </>
  )

  // layout="center": the text centred, with `below` (e.g. a large film) under it instead of the picture
  if (layout === 'center') {
    return (
      <section className={cx('page-hero-center', className)}>
        <div className="container page-hero-center__text">{text}</div>
        {below && <div className="container container--wide page-hero-center__below">{below}</div>}
      </section>
    )
  }

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
