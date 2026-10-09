import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { galleries } from '../../data/gallery'
import { useEscape } from '../../hooks/useEscape'
import { useLockBody } from '../../hooks/useLockBody'
import Icon from '../common/Icon'
import { GalleryFull } from './GalleryMedia'

/**
 * Full-screen viewer for gallery photos and videos: previous / next buttons,
 * arrow keys and swipe. With `end` ({ label, to }), the viewer stops at the
 * last item and then shows a final "View … Gallery" step instead of
 * starting again.
 */
export default function GalleryLightbox({ items, index, onClose, onGo, end }) {
  const count = items.length + (end ? 1 : 0)
  const atEnd = end && index === items.length
  const item = atEnd ? null : items[index]
  const step = useCallback(
    (d) => {
      const next = index + d
      if (end) {
        if (next >= 0 && next < count) onGo(next)
      } else {
        onGo((next + count) % count)
      }
    },
    [index, count, end, onGo],
  )
  useLockBody(true)
  useEscape(true, onClose)
  const touch = useRef(null)
  // arrow keys anywhere (focus may sit on a button that has just gone)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])
  const onTouchStart = (e) => (touch.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touch.current === null) return
    const dx = e.changedTouches[0].clientX - touch.current
    touch.current = null
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
  }
  const canPrev = end ? index > 0 : count > 1
  const canNext = end ? index < count - 1 : count > 1

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item ? item.title : end.label}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {item ? (
        <figure className="lightbox__figure">
          <GalleryFull item={item} />
          <figcaption className="lightbox__caption">
            <span className={`lightbox__tag lightbox__tag--${item.project}`}>{item.tag ?? galleries[item.project]?.title}</span>
            {item.title}
          </figcaption>
        </figure>
      ) : (
        <div className="lightbox__end">
          <p className="lightbox__end-text">See every photo and video</p>
          <Link to={end.to} className="lightbox__end-link" onClick={onClose}>
            {end.label} <Icon name="arrow" size={20} />
          </Link>
        </div>
      )}
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close" autoFocus><Icon name="close" size={22} /></button>
      {canPrev && <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous"><Icon name="arrow" size={22} /></button>}
      {canNext && <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next"><Icon name="arrow" size={22} /></button>}
    </div>,
    document.body,
  )
}
