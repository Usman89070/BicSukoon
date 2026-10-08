import { useRef, useState } from 'react'
import { completedWorks } from '../../data/progress'
import { videos } from '../../data/videos'
import { SITE_ID } from '../../site'
import { imageFor } from '../../utils/images'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import Icon from '../common/Icon'
import Media from '../common/Media'
import Reveal from '../common/Reveal'

const imageOf = (w) => imageFor(w.image && !Array.isArray(w.image) && typeof w.image === 'object' ? w.image[SITE_ID] : w.image)

/**
 * One panel. With a `video` (see data/videos.js) that is on the server, the
 * panel shows a play button and plays the film inside the panel; the video
 * is only downloaded when the visitor presses play.
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
          <Media src={imageOf(w) ?? film?.poster} label={src ? undefined : w.label} showLabel={!src} className="done__media" />
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
