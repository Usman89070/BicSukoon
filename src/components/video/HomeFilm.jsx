import { useCallback } from 'react'
import { videos } from '../../data/videos'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import { FilmGrid } from './FilmPlaylist'

/**
 * Large home-page film shown as it is: plays silently on its own (sound on
 * via the controls), at its own shape, with no tint, logo or overlay.
 * Until the file is on the server, the film's poster picture is shown.
 */
export default function HomeFilm({ id }) {
  const data = videos[id] ?? {}
  const src = useVideoSrc(data.src)
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
          <video ref={start} className="home-film__el" src={src} poster={data.poster ?? undefined} autoPlay muted loop playsInline controls preload="auto" aria-label={data.title} />
        ) : (
          data.poster && <img className="home-film__el" src={data.poster} alt={data.title} decoding="async" />
        )}
      </div>
      {/* the Current Status films, under the large film */}
      <div className="container container--wide home-film__status">
        <h2 className="home-film__status-title">Current Status</h2>
        <FilmGrid />
      </div>
    </section>
  )
}
