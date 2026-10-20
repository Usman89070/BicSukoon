import { useCallback, useState } from 'react'
import { videos } from '../../data/videos'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import { FilmGrid } from './FilmPlaylist'
import VideoLightbox from './VideoLightbox'
import Icon from '../common/Icon'

/**
 * Large home-page film shown as it is (its own shape, no tint or overlay):
 * it plays silently in place, and a click opens it with sound in the
 * full-screen viewer, like every other film. Until the file is on the
 * server, the film's poster picture is shown.
 */
export default function HomeFilm({ id }) {
  const data = videos[id] ?? {}
  const src = useVideoSrc(data.src)
  const [watching, setWatching] = useState(false)
  // React sets `muted` after the element exists, which browsers can treat as
  // "not muted" and block autoplay; set it first and start the film here.
  const start = useCallback((el) => {
    if (!el) return
    el.muted = true
    el.play?.().catch(() => {})
  }, [])
  return (
    <section className="home-film" aria-label={data.title}>
      <div className="container container--wide">
        {src ? (
          // plays silently in place; a click opens it with sound in the full-screen viewer, like every other film
          <button type="button" className="home-film__open" onClick={() => setWatching(true)} aria-label={`Play video with sound: ${data.title}`}>
            <video ref={start} className="home-film__el" src={src} poster={data.poster ?? undefined} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
            <span className="home-film__play" aria-hidden="true"><Icon name="play" size={30} /></span>
          </button>
        ) : (
          data.poster && <img className="home-film__el" src={data.poster} alt={data.title} decoding="async" />
        )}
      </div>
      {watching && src && <VideoLightbox title={data.title} tag={data.caption} src={src} poster={data.poster} onClose={() => setWatching(false)} />}
      {/* the Current Status films, under the large film */}
      <div className="container container--wide home-film__status">
        <h2 className="home-film__status-title">Current Status</h2>
        <FilmGrid />
      </div>
    </section>
  )
}
