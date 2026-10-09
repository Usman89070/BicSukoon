import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { pinmaps } from '../../data/pinmap'
import { SITE_ID } from '../../site'
import { videos } from '../../data/videos'
import { imageFor } from '../../utils/images'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import { enterFullscreen } from '../../utils/fullscreen'
import Icon from '../common/Icon'
import Logo from '../common/Logo'

const pinmap = pinmaps[SITE_ID]
const image = imageFor(pinmap.image)
const crop = pinmap.height / pinmap.visibleHeight // pins are given on the full render

/** The film (or a branded "coming soon" card) for one pin. */
function PinFilm({ pin }) {
  const film = videos[pin.video]
  const src = useVideoSrc(film?.src)
  const [started, setStarted] = useState(false)

  // The card plays a silent preview; a click opens it fullscreen with sound
  // and controls, and it goes back to the silent preview on exit.
  const openFull = (e) => {
    const v = e.currentTarget
    v.controls = true
    v.muted = false
    v.play?.()
    const back = () => {
      if (document.fullscreenElement || document.webkitFullscreenElement) return
      v.controls = false
      v.muted = true
      document.removeEventListener('fullscreenchange', back)
      document.removeEventListener('webkitfullscreenchange', back)
    }
    document.addEventListener('fullscreenchange', back)
    document.addEventListener('webkitfullscreenchange', back)
    v.addEventListener('webkitendfullscreen', () => { v.controls = false; v.muted = true }, { once: true })
    enterFullscreen(v)
  }
  return (
    <div className="pinmap__film">
      {src && (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          title="Click to watch full screen"
          onPlaying={() => setStarted(true)}
          onClick={openFull}
        />
      )}
      {/* the website's logo shows until the film is actually playing */}
      <div className={`pinmap__film-thumb${started ? ' is-hidden' : ''}`} aria-hidden={src ? true : undefined}>
        <Logo project={SITE_ID} tone="dark" height={34} decorative />
        <span><Icon name="play" size={14} /> {src ? 'Loading video' : 'Video coming soon'}</span>
      </div>
    </div>
  )
}

/**
 * Aerial render with numbered pins. Hover (mouse) or tap (touch) a pin to
 * open a card with its film; the card stays open while hovered, and closes
 * on leaving, Escape or tapping elsewhere.
 */
export default function PinMap() {
  const [open, setOpen] = useState(null)
  const timer = useRef(null)
  const root = useRef(null)
  const hovered = useRef(false) // a mouse click on a hovered pin keeps its card open

  const show = (id) => {
    clearTimeout(timer.current)
    setOpen(id)
  }
  const hideSoon = () => {
    clearTimeout(timer.current)
    // keep the card (and its film) while the film is fullscreen
    timer.current = setTimeout(() => !(document.fullscreenElement || document.webkitFullscreenElement) && setOpen(null), 280)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    const onDown = (e) => root.current && !root.current.contains(e.target) && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      clearTimeout(timer.current)
    }
  }, [])

  const active = pinmap.pins.find((p) => p.id === open)

  return (
    <div className="pinmap" ref={root}>
      <div className="pinmap__frame" style={{ aspectRatio: `${pinmap.width} / ${pinmap.visibleHeight}` }}>
        {image && <img className="pinmap__img" src={image} alt={`Aerial render of ${pinmap.name} with its main areas marked`} loading="lazy" decoding="async" />}
      </div>

      {pinmap.pins.map((p) => (
        <button
          key={p.id}
          type="button"
          className={`pinmap__pin${p.narrow ? ` pinmap__pin--${p.narrow}` : ''}${open === p.id ? ' is-open' : ''}`}
          style={{ left: `${p.x}%`, top: `${p.y * crop}%` }}
          aria-label={`${p.n}. ${p.title}: show video`}
          aria-expanded={open === p.id}
          onPointerEnter={(e) => { if (e.pointerType === 'mouse') { hovered.current = true; show(p.id) } }}
          onPointerLeave={(e) => { if (e.pointerType === 'mouse') { hovered.current = false; hideSoon() } }}
          onFocus={(e) => e.currentTarget.matches(':focus-visible') && show(p.id)}
          onClick={() => (open === p.id && !hovered.current ? setOpen(null) : show(p.id))}
        >
          <svg viewBox="0 0 32 42" aria-hidden="true">
            <path d="M16 0C7.2 0 0 7 0 15.7 0 27.5 16 42 16 42s16-14.5 16-26.3C32 7 24.8 0 16 0z" />
          </svg>
          <span className="pinmap__num">{p.n}</span>
          <span className="pinmap__tip">{p.short ?? p.title}</span>
        </button>
      ))}

      {active && (
        <div
          className="pinmap__card"
          role="dialog"
          aria-label={active.title}
          style={{ '--x': `${active.x}%`, top: `calc(${active.y * crop}% + 14px)` }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && show(active.id)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && hideSoon()}
        >
          <PinFilm key={active.id} pin={active} />
          <div className="pinmap__card-body">
            <span className="pinmap__card-num">{active.n}</span>
            <h3 className="pinmap__card-title">{active.title}</h3>
            <Link to={active.path} className="pinmap__card-link">Learn more <Icon name="arrow" size={14} /></Link>
          </div>
          <button type="button" className="pinmap__close" aria-label="Close" onClick={() => setOpen(null)}>
            <Icon name="close" size={16} />
          </button>
        </div>
      )}

      <ol className="pinmap__legend">
        {pinmap.pins.map((p) => (
          <li key={p.id}>
            <button type="button" className={open === p.id ? 'is-open' : undefined} onClick={() => (open === p.id ? setOpen(null) : show(p.id))}>
              <span>{p.n}</span> {p.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
