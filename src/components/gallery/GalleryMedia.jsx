import { SITE_ID } from '../../site'
import Icon from '../common/Icon'
import Logo from '../common/Logo'

/** Picture for a gallery tile: the photo / video cover, or a branded card for a video without a cover. */
export function GalleryThumb({ item }) {
  return (
    <>
      {item.src ? (
        <img src={item.src} alt="" loading="lazy" decoding="async" className="gallery-card__img" />
      ) : (
        <span className={`gallery-card__placeholder gallery-card__placeholder--${item.project}`} aria-hidden="true">
          <Logo project={item.project ?? SITE_ID} tone="dark" height={item.project === 'sukoon' ? 56 : 46} decorative />
        </span>
      )}
      {item.kind === 'video' && (
        <span className="gallery-card__play" aria-hidden="true"><Icon name="play" size={24} /></span>
      )}
    </>
  )
}

/** The photo, video or YouTube film shown in the full-screen viewer. */
export function GalleryFull({ item }) {
  if (item.kind === 'video' && item.youtube) {
    return (
      <iframe
        key={item.id}
        className="lightbox__video lightbox__video--yt"
        src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0`}
        title={item.title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    )
  }
  if (item.kind === 'video') {
    return <video key={item.id} className="lightbox__video" src={item.video} poster={item.src ?? undefined} controls autoPlay playsInline />
  }
  return <img key={item.id} src={item.src} alt={item.title} className="lightbox__img" />
}
