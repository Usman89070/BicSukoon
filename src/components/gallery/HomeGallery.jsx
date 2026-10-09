import { Link } from 'react-router-dom'
import { galleries, galleryItems } from '../../data/gallery'
import { SITE_ID } from '../../site'
import Button from '../common/Button'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'

/** One project's gallery block: centred title, three large photos and a button (right) to the full gallery. */
function GalleryBlock({ id }) {
  const g = galleries[id]
  const photos = galleryItems.filter((p) => p.project === id).slice(0, 3)
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
