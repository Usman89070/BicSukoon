import { useCallback, useEffect, useRef, useState } from 'react'
import { videos, videoUrl } from '../../data/videos'
import { statusFilms } from '../../data/statusFilms'
import { SITE_ID } from '../../site'
import { API } from '../../hooks/useAdminList'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import FilmFrame from './FilmFrame'

const brand = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'

const fromVideos = (id) => ({ id, title: videos[id]?.title, caption: videos[id]?.caption, src: videos[id]?.src, poster: videos[id]?.poster })
// the large film always stays; the row's built-in list is used until the admin panel's list exists
const [mainId, ...rowIds] = statusFilms[brand] ?? []
const mainFilm = mainId ? fromVideos(mainId) : null
const builtInRow = rowIds.map(fromVideos)

/** The row of films for this website: from the admin panel ("Current Status Videos"), else the built-in list. */
function useRowFilms() {
  const [films, setFilms] = useState(builtInRow)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${API}/films.php`, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!Array.isArray(data?.films)) return
        setFilms(
          data.films
            .filter((f) => (f.project === 'sukoon' ? 'sukoon' : 'bic') === brand && (f.video || f.youtube))
            .map((f) => ({
              id: f.id,
              title: f.title,
              src: f.video ? videoUrl(`${brand}/${f.video}`) : null,
              youtube: f.youtube || null,
              cover: f.photo ? `${API}/${f.photo}` : f.youtube ? `https://i.ytimg.com/vi/${f.youtube}/hqdefault.jpg` : null,
            })),
        )
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return films
}

/** Film src once it is confirmed on the server (YouTube films need no check). */
function useFilmSrc(film) {
  const src = useVideoSrc(film?.youtube ? null : film?.src)
  return film?.youtube ? `yt:${film.youtube}` : src
}

/** A film's picture: its cover from the admin panel, else its own opening frame. */
function FilmPicture({ film, src }) {
  if (film.cover) return <img className="video__thumb-photo" src={film.cover} alt="" loading="lazy" decoding="async" />
  if (src && !film.youtube) return <FilmFrame src={src} />
  return film.poster ? <img className="video__thumb-photo" src={film.poster} alt="" loading="lazy" decoding="async" /> : null
}

/** One box in the row: the film's picture + logo, with its title under it. Hidden until the film is available. */
function PlaylistItem({ film, active, onPick, onReady }) {
  const src = useFilmSrc(film)
  useEffect(() => {
    if (src) onReady(film.id)
  }, [src, film.id, onReady])
  if (!src) return null
  return (
    <li className="playlist__item">
      <button type="button" className={`playlist__btn${active ? ' is-active' : ''}`} onClick={() => onPick(film.id)} aria-pressed={active} aria-label={`Play video: ${film.title}`}>
        <span className="playlist__thumb">
          <FilmPicture film={film} src={src} />
          <span className="playlist__logo" aria-hidden="true"><Logo project={brand} tone="dark" height={brand === 'sukoon' ? 34 : 28} decorative /></span>
          <span className="playlist__play" aria-hidden="true"><Icon name={active ? 'pause' : 'play'} size={16} /></span>
          {active && <span className="playlist__now">Now playing</span>}
        </span>
        <span className="playlist__title">{film.title}</span>
      </button>
    </li>
  )
}

/**
 * A large film with a row of film boxes under it (each with its title).
 * The large film is fixed (data/statusFilms.js); the row comes from the
 * admin panel. Choosing a box plays that film in the large player, in
 * place. Films not on the server yet are left out of the row.
 */
export default function FilmPlaylist() {
  const row = useRowFilms()
  // the large film first (it also has a box, to come back to it), then the admin panel's films
  const films = mainFilm ? [mainFilm, ...row.filter((f) => f.src !== mainFilm.src)] : row
  const [ready, setReady] = useState([])
  const [chosen, setChosen] = useState(null)
  const [playing, setPlaying] = useState(false)
  const stage = useRef(null)
  const onReady = useCallback((id) => setReady((r) => (r.includes(id) ? r : [...r, id])), [])
  // the chosen film, else the first one that is available
  const active = films.find((f) => f.id === chosen) ?? films.find((f) => ready.includes(f.id)) ?? films[0]
  const src = useFilmSrc(active)

  const pick = (id) => {
    setChosen(id)
    setPlaying(true)
    stage.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  if (!active) return null
  return (
    <div className="playlist">
      <figure className="video playlist__stage" ref={stage}>
        {playing && src && active.youtube ? (
          <iframe key={active.youtube} className="video__el" src={`https://www.youtube-nocookie.com/embed/${active.youtube}?autoplay=1&rel=0`} title={active.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : playing && src ? (
          <video key={src} className="video__el" src={src} controls autoPlay playsInline />
        ) : (
          <>
            <div className={`video__thumb video__thumb--${brand}`} aria-hidden="true">
              <FilmPicture film={active} src={src} />
              <span className="video__thumb-logo"><Logo project={brand} tone="dark" height={brand === 'sukoon' ? 96 : 80} decorative /></span>
            </div>
            <div className="video__overlay">
              <button type="button" className="video__play" onClick={() => setPlaying(true)} disabled={!src} aria-label={src ? `Play video: ${active.title}` : `${active.title} video — coming soon`}>
                <span className="video__play-ring" aria-hidden="true" />
                <Icon name="play" size={28} />
              </button>
              <figcaption className="video__caption glass">
                <span className="video__title">{active.title}</span>
                <span className="video__meta">{src ? active.caption ?? 'Current status' : 'Video coming soon'}</span>
              </figcaption>
            </div>
          </>
        )}
      </figure>

      <ul className={`playlist__row${ready.length > 1 ? '' : ' is-single'}`} aria-label="More films">
        {films.map((f) => <PlaylistItem key={f.id} film={f} active={f.id === active.id && playing} onPick={pick} onReady={onReady} />)}
      </ul>
    </div>
  )
}
