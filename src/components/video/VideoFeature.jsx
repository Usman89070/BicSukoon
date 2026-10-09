import { useRef, useState } from 'react'
import { videos } from '../../data/videos'
import { cx } from '../../utils/format'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import { SITE_ID } from '../../site'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import { enterFullscreen } from '../../utils/fullscreen'
import VideoLightbox from './VideoLightbox'

/**
 * Reusable video block: a branded thumbnail (the website's logo) first,
 * video loaded only on play (lazy).
 * Pressing play opens the film in the gallery-style viewer, except for the
 * large full-width films (`video--wide`), which play in place.
 * Supports native controls + fullscreen. Shows an elegant placeholder
 * until the video file is on the server (see data/videos.js).
 */
export default function VideoFeature({ id, title, caption, className, ratio = '16 / 9' }) {
  const data = videos[id] ?? {}
  const label = title ?? data.title
  const sub = caption ?? data.caption
  const [playing, setPlaying] = useState(false)
  const [viewing, setViewing] = useState(false)
  const ref = useRef(null)
  const src = useVideoSrc(data.src)
  const hasVideo = Boolean(src || data.sources?.length || data.youtubeId)
  // Thumbnail carries the logo of the website it is shown on.
  const brand = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'

  const playsInPlace = Boolean(className?.split(' ').includes('video--wide'))

  const play = () => {
    if (!hasVideo) return
    if (!playsInPlace) {
      setViewing(true)
      return
    }
    setPlaying(true)
    requestAnimationFrame(() => ref.current?.play?.())
  }

  const fullscreen = () => enterFullscreen(ref.current)

  return (
    <figure className={cx('video', playing && 'is-playing', className)} style={{ aspectRatio: ratio }}>
      {playing && data.youtubeId ? (
        <iframe
          className="video__el"
          src={`https://www.youtube-nocookie.com/embed/${data.youtubeId}?autoplay=1&rel=0`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : playing ? (
        <video ref={ref} className="video__el" controls playsInline preload="none">
          {data.sources?.length ? data.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />) : <source src={src} />}
          Your browser does not support embedded video.
        </video>
      ) : (
        <>
          <div className={`video__thumb video__thumb--${brand}`} aria-hidden="true">
            {data.poster && <img className="video__thumb-photo" src={data.poster} alt="" loading="lazy" decoding="async" />}
            <span className="video__thumb-logo">
              <Logo project={brand} tone="dark" height={brand === 'sukoon' ? 96 : 80} decorative />
            </span>
          </div>
          <div className="video__overlay">
            <button type="button" className="video__play" onClick={play} disabled={!hasVideo} aria-label={hasVideo ? `Play video: ${label}` : `${label} video — coming soon`}>
              <span className="video__play-ring" aria-hidden="true" />
              <Icon name="play" size={28} />
            </button>
            <figcaption className="video__caption glass">
              <span className="video__title">{label}</span>
              <span className="video__meta">{hasVideo ? [sub, data.duration].filter(Boolean).join(' · ') : 'Video coming soon'}</span>
            </figcaption>
          </div>
        </>
      )}
      {playing && !data.youtubeId && (
        <button type="button" className="video__fs glass" onClick={fullscreen} aria-label="View fullscreen">
          <Icon name="expand" size={18} />
        </button>
      )}
      {viewing && (
        <VideoLightbox title={label} tag={sub} src={src} sources={data.sources} youtubeId={data.youtubeId} poster={data.poster} project={brand} onClose={() => setViewing(false)} />
      )}
    </figure>
  )
}
