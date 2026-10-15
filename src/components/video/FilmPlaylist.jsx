import { useCallback, useEffect, useRef, useState } from 'react'
import { videos } from '../../data/videos'
import { SITE_ID } from '../../site'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import FilmFrame from './FilmFrame'

const brand = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'

/** One box in the row: the film's opening frame + logo, with its title under it. Hidden until the file is on the server. */
function PlaylistItem({ id, active, onPick, onReady }) {
  const data = videos[id] ?? {}
  const src = useVideoSrc(data.src)
  useEffect(() => {
    if (src) onReady(id)
  }, [src, id, onReady])
  if (!src) return null
  return (
    <li className="playlist__item">
      <button type="button" className={`playlist__btn${active ? ' is-active' : ''}`} onClick={() => onPick(id)} aria-pressed={active} aria-label={`Play video: ${data.title}`}>
        <span className="playlist__thumb">
          <FilmFrame src={src} />
          <span className="playlist__logo" aria-hidden="true"><Logo project={brand} tone="dark" height={brand === 'sukoon' ? 34 : 28} decorative /></span>
          <span className="playlist__play" aria-hidden="true"><Icon name={active ? 'pause' : 'play'} size={16} /></span>
          {active && <span className="playlist__now">Now playing</span>}
        </span>
        <span className="playlist__title">{data.title}</span>
      </button>
    </li>
  )
}

/**
 * A large film with a row of film boxes under it (each with its title).
 * Choosing a box plays that film in the large player, in place.
 * Films not on the server yet are left out of the row.
 */
export default function FilmPlaylist({ ids }) {
  const [ready, setReady] = useState([])
  const [chosen, setChosen] = useState(null)
  const [playing, setPlaying] = useState(false)
  const stage = useRef(null)
  const onReady = useCallback((id) => setReady((r) => (r.includes(id) ? r : [...r, id])), [])
  // the first film in the list that is on the server, until one is chosen
  const activeId = chosen ?? ids.find((id) => ready.includes(id)) ?? ids[0]
  const data = videos[activeId] ?? {}
  const src = useVideoSrc(data.src)

  const pick = (id) => {
    setChosen(id)
    setPlaying(true)
    stage.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="playlist">
      <figure className="video playlist__stage" ref={stage}>
        {playing && src ? (
          <video key={src} className="video__el" src={src} controls autoPlay playsInline />
        ) : (
          <>
            <div className={`video__thumb video__thumb--${brand}`} aria-hidden="true">
              {src ? <FilmFrame src={src} /> : data.poster && <img className="video__thumb-photo" src={data.poster} alt="" loading="lazy" decoding="async" />}
              <span className="video__thumb-logo"><Logo project={brand} tone="dark" height={brand === 'sukoon' ? 96 : 80} decorative /></span>
            </div>
            <div className="video__overlay">
              <button type="button" className="video__play" onClick={() => setPlaying(true)} disabled={!src} aria-label={src ? `Play video: ${data.title}` : `${data.title} video — coming soon`}>
                <span className="video__play-ring" aria-hidden="true" />
                <Icon name="play" size={28} />
              </button>
              <figcaption className="video__caption glass">
                <span className="video__title">{data.title}</span>
                <span className="video__meta">{src ? data.caption : 'Video coming soon'}</span>
              </figcaption>
            </div>
          </>
        )}
      </figure>

      <ul className={`playlist__row${ready.length > 1 ? '' : ' is-single'}`} aria-label="More films">
        {ids.map((id) => <PlaylistItem key={id} id={id} active={id === activeId && playing} onPick={pick} onReady={onReady} />)}
      </ul>
    </div>
  )
}
