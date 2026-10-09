import { createPortal } from 'react-dom'
import { SITE_ID } from '../../site'
import { useEscape } from '../../hooks/useEscape'
import { useLockBody } from '../../hooks/useLockBody'
import Icon from '../common/Icon'

/**
 * A film in the same dark viewer the gallery uses: plays with sound and
 * controls, closes with ✕, Escape or a click outside. Rendered at the end
 * of <body> so no parent layout can clip it.
 */
export default function VideoLightbox({ title, tag, src, sources, youtubeId, poster, project = SITE_ID, onClose }) {
  useLockBody(true)
  useEscape(true, onClose)
  const brand = project === 'sukoon' ? 'sukoon' : 'bic'
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <figure className="lightbox__figure">
        {youtubeId ? (
          <iframe
            className="lightbox__video lightbox__video--yt"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video className="lightbox__video" poster={poster ?? undefined} controls autoPlay playsInline>
            {sources?.length ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />) : <source src={src} />}
          </video>
        )}
        <figcaption className="lightbox__caption">
          {tag && <span className={`lightbox__tag lightbox__tag--${brand}`}>{tag}</span>}
          {title}
        </figcaption>
      </figure>
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close" autoFocus><Icon name="close" size={22} /></button>
    </div>,
    document.body,
  )
}
