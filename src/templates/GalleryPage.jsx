import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { galleries } from '../data/gallery'
import { useGallery } from '../hooks/useGallery'
import { GalleryThumb } from '../components/gallery/GalleryMedia'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import Button from '../components/common/Button'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import PageShell from './PageShell'

const order = ['bic', 'sukoon']

function Grid({ items, onOpen, offset = 0 }) {
  return (
    <ul className="gallery-grid">
      {items.map((p, i) => (
        <Reveal as="li" key={p.id} delay={(i % 3) * 80} className="gallery-grid__item">
          <button type="button" className={`gallery-card gallery-card--${p.kind}`} onClick={() => onOpen(offset + i)} aria-label={`${p.kind === 'video' ? 'Play video' : 'View photo'}: ${p.title}`}>
            <GalleryThumb item={p} />
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
  const galleryItems = useGallery()
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
      lead={project ? `Photos and videos of ${galleries[project].name}.` : 'Photos and videos of the Brisbane Islamic Centre and Sukoon Village.'}
      description={`${title}: photos and videos of the ${project ? galleries[project].name : 'Brisbane Islamic Centre and Sukoon Village'}.`}
      media={{ image: visible.find((p) => p.src)?.src, label: 'Gallery' }}
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
              <div key={id} className={`gallery__block home-gallery__block home-gallery__block--${id}`} aria-labelledby={`gallery-${id}`}>
                <header className="home-gallery__head gallery__head">
                  <div className="home-gallery__name">
                    <span className="home-gallery__kicker">{galleries[id].name}</span>
                    <h2 id={`gallery-${id}`} className="home-gallery__title">{galleries[id].title}</h2>
                    <span className="home-gallery__rule" aria-hidden="true" />
                  </div>
                  {!project && <Button to={galleries[id].path} variant="ghost" icon="arrow" className="home-gallery__more">View {galleries[id].title}</Button>}
                </header>
                {items.length ? <Grid items={items} onOpen={setOpen} offset={start} /> : <p className="gallery__empty">Photos and videos coming soon.</p>}
              </div>
            )
          })}
        </div>
      </section>

      {open !== null && visible[open] && <GalleryLightbox items={visible} index={open} onClose={close} onGo={setOpen} />}
    </PageShell>
  )
}
