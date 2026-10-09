import { Link } from 'react-router-dom'
import { galleries, galleryItems } from '../../data/gallery'
import { SITE_ID } from '../../site'
import Button from '../common/Button'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'

/** One project's gallery block: centred title, up to five photos and a same-size 'View … Gallery' tile. */
function GalleryBlock({ id }) {
  const g = galleries[id]
  const all = galleryItems.filter((p) => p.project === id)
  const photos = all.slice(0, 5)
  if (!photos.length) return null
  return (
    <div className={`home-gallery__block home-gallery__block--${id}`} aria-labelledby={`home-gallery-${id}`}>
      <header className="home-gallery__head">
        <div className="home-gallery__name">
          <h3 id={`home-gallery-${id}`} className="home-gallery__title">{g.title}</h3>
        </div>
        <Button to={g.path} variant="ghost" icon="arrow" className="home-gallery__more">View {g.title}</Button>
      </header>
      <ul className="home-gallery__grid">
        {photos.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 70}>
            <Link to={g.path} className="gallery-card home-gallery__card" aria-label={`${p.title}: open the ${g.title}`}>
              <img src={p.src} alt="" loading="lazy" decoding="async" className="gallery-card__img" />
              <span className="gallery-card__shade" aria-hidden="true" />
              <span className="gallery-card__title">{p.title}</span>
              <span className="gallery-card__zoom" aria-hidden="true"><Icon name="arrow" size={18} /></span>
            </Link>
          </Reveal>
        ))}
        <Reveal as="li" delay={photos.length * 70}>
          <Link to={g.path} className={`home-gallery__view home-gallery__view--${id}`}>
            <span className="home-gallery__view-label">View {g.title}</span>
            <span className="home-gallery__view-arrow" aria-hidden="true"><Icon name="arrow" size={22} /></span>
          </Link>
        </Reveal>
      </ul>
    </div>
  )
}

/**
 * Home-page gallery: a separate block for each project's gallery, this
 * website's own first.
 */
export default function HomeGallery() {
  const own = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'
  const order = own === 'bic' ? ['bic', 'sukoon'] : ['sukoon', 'bic']
  return (
    <section className="section section--muted home-gallery" aria-label="Galleries">
      <div className="container container--wide">
        {order.map((id) => <GalleryBlock key={id} id={id} />)}
        <div className="home-gallery__actions">
          <Button to="/gallery" variant="primary" icon="arrow">View all galleries</Button>
        </div>
      </div>
    </section>
  )
}
