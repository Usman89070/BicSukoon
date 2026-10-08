import { useRef, useState } from 'react'
import { completedWorks } from '../../data/progress'
import { videos } from '../../data/videos'
import { SITE_ID } from '../../site'
import { imageFor } from '../../utils/images'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import Media from '../common/Media'
import Reveal from '../common/Reveal'

const brand = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'
const imageOf = (w) => imageFor(w.image && !Array.isArray(w.image) && typeof w.image === 'object' ? w.image[SITE_ID] : w.image)

/**
 * One panel. With a `video` (see data/videos.js) that is on the server, the
 * panel shows the website's logo and a play button, and plays the film
 * inside the panel; the video is only downloaded when the visitor presses play.
 */
function Work({ w, index }) {
  const film = w.video ? videos[w.video] : null
  const src = useVideoSrc(film?.src)
  const [playing, setPlaying] = useState(false)
  const ref = useRef(null)

  const play = () => {
    setPlaying(true)
    requestAnimationFrame(() => ref.current?.play?.())
  }

  return (
    <Reveal as="li" delay={index * 90} variant="image" className={`done__item${playing ? ' is-playing' : ''}`}>
      {playing ? (
        <video ref={ref} className="done__video" controls playsInline preload="none" poster={imageOf(w) ?? film?.poster ?? undefined}>
          <source src={src} />
        </video>
      ) : (
        <>
          {film ? (
            // video panel: the website's logo on its brand colours, like every other film
            <div className={`video__thumb video__thumb--${brand} done__thumb`} aria-hidden="true">
              {(imageOf(w) ?? film.poster) && <img className="video__thumb-photo" src={imageOf(w) ?? film.poster} alt="" loading="lazy" decoding="async" />}
              <span className="video__thumb-logo">
                <Logo project={brand} tone="dark" height={brand === 'sukoon' ? 96 : 80} decorative />
              </span>
              {!src && <span className="done__soon">Video coming soon</span>}
            </div>
          ) : (
            <Media src={imageOf(w)} label={w.label} className="done__media" />
          )}
          <span className="done__shade" aria-hidden="true" />
          {src && (
            <button type="button" className="done__play" onClick={play} aria-label={`Play video: ${w.title}`}>
              <Icon name="play" size={26} />
            </button>
          )}
        </>
      )}
      <span className="done__badge"><Icon name="check" size={14} /> Completed</span>
      {!playing && <h3 className="done__title">{w.title}</h3>}
    </Reveal>
  )
}

/** Large photo (or video) panels of the works already finished on site. */
export default function CompletedWorks() {
  return (
    <ul className="done">
      {completedWorks.map((w, i) => <Work key={w.id} w={w} index={i} />)}
    </ul>
  )
}
