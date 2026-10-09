import { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { galleries, galleryItems } from '../data/gallery'
import { useEscape } from '../hooks/useEscape'
import { useLockBody } from '../hooks/useLockBody'
import Icon from '../components/common/Icon'
import Logo from '../components/common/Logo'
import Reveal from '../components/common/Reveal'
import PageShell from './PageShell'

const order = ['bic', 'sukoon']

/** Full-screen viewer with previous / next, Escape and arrow keys. */
function Lightbox({ items, index, onClose, onGo }) {
  const item = items[index]
  const step = useCallback((d) => onGo((index + d + items.length) % items.length), [index, items.length, onGo])
  useLockBody(true)
  useEscape(true, onClose)
  const onKey = (e) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onKeyDown={onKey} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <figure className="lightbox__figure">
        <img key={item.id} src={item.src} alt={item.title} className="lightbox__img" />
        <figcaption className="lightbox__caption">
          <span className={`lightbox__tag lightbox__tag--${item.project}`}>{galleries[item.project].title}</span>
          {item.title}
          <span className="lightbox__count">{index + 1} / {items.length}</span>
        </figcaption>
      </figure>
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close" autoFocus><Icon name="close" size={22} /></button>
      {items.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous photo"><Icon name="arrow" size={22} /></button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next photo"><Icon name="arrow" size={22} /></button>
        </>
      )}
    </div>
  )
}

function Grid({ items, onOpen, offset = 0 }) {
  return (
    <ul className="gallery-grid">
      {items.map((p, i) => (
        <Reveal as="li" key={p.id} delay={(i % 3) * 80} className="gallery-grid__item">
          <button type="button" className="gallery-card" onClick={() => onOpen(offset + i)} aria-label={`View photo: ${p.title}`}>
            <img src={p.src} alt="" loading="lazy" decoding="async" className="gallery-card__img" />
            <span className="gallery-card__shade" aria-hidden="true" />
            <span className="gallery-card__title">{p.title}</span>
            <span className="gallery-card__zoom" aria-hidden="true"><Icon name="expand" size={18} /></span>
          </button>
        </Reveal>
      ))}
    </ul>
  )
}

/**
 * Gallery page on both websites. `project` = 'bic' | 'sukoon' shows one
 * gallery; without it both are shown, one after the other.
 */
export default function GalleryPage({ project }) {
  const shown = project ? [project] : order
  const visible = shown.flatMap((id) => galleryItems.filter((p) => p.project === id))
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const title = project ? galleries[project].title : 'Gallery'

  // each gallery's items, and where they start in the lightbox order
  const blocks = shown.map((id, n) => ({
    id,
    items: galleryItems.filter((p) => p.project === id),
    start: shown.slice(0, n).reduce((sum, prev) => sum + galleryItems.filter((p) => p.project === prev).length, 0),
  }))

  return (
    <PageShell
      title={title}
      eyebrow={project ? galleries[project].name : 'Brisbane Islamic Centre · Sukoon Village'}
      lead={project ? `Renders and photos of ${galleries[project].name}.` : 'Renders and photos of the Brisbane Islamic Centre and Sukoon Village.'}
      description={`${title}: renders and photos of the ${project ? galleries[project].name : 'Brisbane Islamic Centre and Sukoon Village'}.`}
      media={{ image: visible[0]?.src, label: 'Gallery' }}
    >
      <section className="section gallery-page">
        <div className="container container--wide">
          <nav className="gallery-tabs" aria-label="Choose a gallery">
            <NavLink to="/gallery" end className="gallery-tabs__link">All</NavLink>
            {order.map((id) => (
              <NavLink key={id} to={galleries[id].path} className="gallery-tabs__link">{galleries[id].title}</NavLink>
            ))}
          </nav>

          {blocks.map(({ id, items, start }) => {
            return (
              <div key={id} className="gallery__block" aria-labelledby={`gallery-${id}`}>
                <header className="gallery__head">
                  <Logo project={id} tone="light" height={id === 'sukoon' ? 44 : 34} decorative />
                  <h2 id={`gallery-${id}`} className="gallery__title">{galleries[id].title}</h2>
                  <span className="gallery__count">{items.length} {items.length === 1 ? 'photo' : 'photos'}</span>
                  {!project && <Link to={galleries[id].path} className="gallery__only">Only this gallery <Icon name="arrow" size={14} /></Link>}
                </header>
                {items.length ? <Grid items={items} onOpen={setOpen} offset={start} /> : <p className="gallery__empty">Photos coming soon.</p>}
              </div>
            )
          })}
        </div>
      </section>

      {open !== null && visible[open] && <Lightbox items={visible} index={open} onClose={close} onGo={setOpen} />}
    </PageShell>
  )
}
