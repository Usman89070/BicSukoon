import { useState } from 'react'
import { Link } from 'react-router-dom'
import { galleries } from '../../data/gallery'
import { useGallery } from '../../hooks/useGallery'
import { GalleryThumb } from './GalleryMedia'
import GalleryLightbox from './GalleryLightbox'
import { SITE_ID } from '../../site'
import Button from '../common/Button'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'

/**
 * One project's gallery block: centred title, up to five photos and a
 * same-size 'View … Gallery' tile. A photo or video opens in the viewer;
 * after the last one the viewer offers 'View … Gallery'.
 */
function GalleryBlock({ id, galleryItems }) {
  const g = galleries[id]
  const all = galleryItems.filter((p) => p.project === id)
  const photos = all.slice(0, 5)
  const [open, setOpen] = useState(null)
  if (!photos.length) return null
  return (
    <div className={`home-gallery__block home-gallery__block--${id}`} aria-labelledby={`home-gallery-${id}`}>
      <header className="home-gallery__head">
        <div className="home-gallery__name">
          <span className="home-gallery__kicker">{g.name}</span>
          <h3 id={`home-gallery-${id}`} className="home-gallery__title">{g.title}</h3>
          <span className="home-gallery__rule" aria-hidden="true" />
        </div>
        <Button to={g.path} variant="ghost" icon="arrow" className="home-gallery__more">View {g.title}</Button>
      </header>
      <ul className="home-gallery__grid">
        {photos.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 70}>
            <button type="button" className={`gallery-card gallery-card--${p.kind} home-gallery__card`} onClick={() => setOpen(i)} aria-label={`${p.kind === 'video' ? 'Play video' : 'View photo'}: ${p.title}`}>
              <GalleryThumb item={p} />
              <span className="gallery-card__shade" aria-hidden="true" />
              <span className="gallery-card__title">{p.title}</span>
              <span className="gallery-card__zoom" aria-hidden="true"><Icon name="expand" size={18} /></span>
            </button>
          </Reveal>
        ))}
        <Reveal as="li" delay={photos.length * 70}>
          <Link to={g.path} className={`home-gallery__view home-gallery__view--${id}`}>
            <span className="home-gallery__view-label">View {g.title}</span>
            <span className="home-gallery__view-arrow" aria-hidden="true"><Icon name="arrow" size={22} /></span>
          </Link>
        </Reveal>
      </ul>
      {open !== null && <GalleryLightbox items={photos} index={open} onClose={() => setOpen(null)} onGo={setOpen} end={{ label: `View ${g.title}`, to: g.path }} />}
    </div>
  )
}

/**
 * Home-page gallery: a separate block for each project's gallery, this
 * website's own first.
 */
export default function HomeGallery() {
  const galleryItems = useGallery()
  const own = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'
  const order = own === 'bic' ? ['bic', 'sukoon'] : ['sukoon', 'bic']
  return (
    <section className="section section--muted home-gallery" aria-label="Galleries">
      <div className="container container--wide">
        {order.map((id) => <GalleryBlock key={id} id={id} galleryItems={galleryItems} />)}
        <div className="home-gallery__actions">
          <Button to="/gallery" variant="primary" icon="arrow">View all galleries</Button>
        </div>
      </div>
    </section>
  )
}
