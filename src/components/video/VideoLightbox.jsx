import { useState } from 'react'
import { createPortal } from 'react-dom'
import { onInterestClick } from '../common/InterestNotice'
import { SITE_ID, site } from '../../site'
import { checkoutLink } from '../../data/donation'
import { useEscape } from '../../hooks/useEscape'
import { useLockBody } from '../../hooks/useLockBody'
import Icon from '../common/Icon'
import { imageFor } from '../../utils/images'

/**
 * A film in the same dark viewer the gallery uses: plays with sound and
 * controls, closes with ✕, Escape or a click outside. Rendered at the end
 * of <body> so no parent layout can clip it. A Donate button (on Sukoon
 * Village: Expressions of Interest) sits in the caption, before the site tag,
 * and another over the film's bottom-left corner:
 * soft and blurred while the film plays, clear when it is paused or hovered.
 */
function OverlayCta() {
  const heart = (icon) => <span className="lightbox__donate-heart"><Icon name={icon} size={14} /></span>
  if (site.features.donate) {
    return (
      <a {...checkoutLink} className="lightbox__donate-over" aria-label="Donate securely with Square (opens in a new tab)">
        {heart('heart')}
        <span className="lightbox__donate-text">
          <strong>Donate</strong>
        </span>
      </a>
    )
  }
  const interest = site.interest
  if (!interest) return null
  const body = (
    <>
      {heart('mail')}
      <span className="lightbox__donate-text">
        <strong>{interest.label}</strong>
        <small>Register your interest</small>
      </span>
    </>
  )
  // shown without a link until one is set (sites.js → interest.href)
  return interest.href ? (
    <a href={interest.href} target="_blank" rel="noopener noreferrer" className="lightbox__donate-over" onClick={onInterestClick} aria-label={`${interest.label} (opens in a new tab)`}>{body}</a>
  ) : (
    <span className="lightbox__donate-over">{body}</span>
  )
}

function CaptionCta() {
  if (site.features.donate) {
    return (
      <a {...checkoutLink} className="donate-tab lightbox__donate" aria-label="Donate securely with Square (opens in a new tab)">
        <Icon name="heart" size={14} />
        <span>Donate</span>
      </a>
    )
  }
  const interest = site.interest
  if (!interest) return null
  const body = (
    <>
      <Icon name="mail" size={14} />
      <span>{interest.label}</span>
    </>
  )
  return interest.href ? (
    <a href={interest.href} target="_blank" rel="noopener noreferrer" className="donate-tab lightbox__donate" onClick={onInterestClick} aria-label={`${interest.label} (opens in a new tab)`}>{body}</a>
  ) : (
    <span className="donate-tab lightbox__donate">{body}</span>
  )
}

export default function VideoLightbox({ title, tag, src, sources, youtubeId, poster, project = SITE_ID, partnerLogo = false, note = null, onClose }) {
  useLockBody(true)
  useEscape(true, onClose)
  const brand = project === 'sukoon' ? 'sukoon' : 'bic'
  const [playing, setPlaying] = useState(false)
  // partnerLogo (the site-picture pin films): the Ray White Rochedale logo replaces the tag
  const captionLogo = partnerLogo && !site.features.donate && site.interest?.logo ? imageFor(site.interest.logo.image) : null
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <figure className="lightbox__figure">
        <div className={`lightbox__stage${playing ? ' is-playing' : ''}`}>
          {youtubeId ? (
            <iframe
              className="lightbox__video lightbox__video--yt"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video className="lightbox__video" poster={poster ?? undefined} controls autoPlay playsInline onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}>
              {sources?.length ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />) : <source src={src} />}
            </video>
          )}
          <OverlayCta />
        </div>
        <figcaption className="lightbox__caption">
          <CaptionCta />
          {/* Sukoon pin films: the Ray White Rochedale logo (sites.js → interest.logo) in place of the tag */}
          {captionLogo ? (
            <img className="lightbox__logo" src={captionLogo} alt={site.interest.logo.alt} width="300" height="300" />
          ) : (
            tag && <span className={`lightbox__tag lightbox__tag--${brand}`}>{tag}</span>
          )}
          {title}
          {note && <span className="lightbox__note">{note}</span>}
        </figcaption>
      </figure>
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close" autoFocus><Icon name="close" size={22} /></button>
    </div>,
    document.body,
  )
}
