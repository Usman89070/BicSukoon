import { Link } from 'react-router-dom'
import { galleries, galleryItems } from '../../data/gallery'
import { SITE_ID } from '../../site'
import Button from '../common/Button'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

/**
 * Home-page preview of the galleries: a few photos of this website's project
 * first, then the sister project's; each opens its gallery.
 */
export default function HomeGallery() {
  const own = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'
  const other = own === 'bic' ? 'sukoon' : 'bic'
  const pick = (id, n) => galleryItems.filter((p) => p.project === id).slice(0, n)
  const photos = [...pick(own, 3), ...pick(other, 3)]
  if (!photos.length) return null

  return (
    <section className="section section--muted home-gallery" aria-labelledby="home-gallery-title">
      <div className="container container--wide">
        <SectionHeader eyebrow="Gallery" title={<span id="home-gallery-title">See the Projects</span>} align="center" intro="Renders and photos of the Brisbane Islamic Centre and Sukoon Village." />
        <ul className="home-gallery__grid">
          {photos.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
              <Link to={galleries[p.project].path} className="gallery-card home-gallery__card" aria-label={`${p.title}: open the ${galleries[p.project].title}`}>
                <img src={p.src} alt="" loading="lazy" decoding="async" className="gallery-card__img" />
                <span className="gallery-card__shade" aria-hidden="true" />
                <span className={`home-gallery__tag home-gallery__tag--${p.project}`}>{galleries[p.project].title}</span>
                <span className="gallery-card__title">{p.title}</span>
                <span className="gallery-card__zoom" aria-hidden="true"><Icon name="arrow" size={18} /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="home-gallery__actions">
          <Button to="/gallery" variant="primary" icon="arrow">View all galleries</Button>
          <Button to={galleries.bic.path} variant="ghost">BIC Gallery</Button>
          <Button to={galleries.sukoon.path} variant="ghost">Sukoon Gallery</Button>
        </div>
      </div>
    </section>
  )
}
