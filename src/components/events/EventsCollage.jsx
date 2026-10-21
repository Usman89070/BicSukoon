import Media from '../common/Media'
import { useEvents } from '../../hooks/useEvents'

const eventImages = import.meta.glob('../../assets/images/events-*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

/**
 * Collage of event photos for the Events page hero: photos added to events
 * in the admin panel (Events tab), plus any src/assets/images/events-*.jpg.
 * Shows the standard placeholder until there are photos.
 */
export default function EventsCollage({ label }) {
  const { events } = useEvents()
  const photos = [
    ...events.flatMap((e) => e.photos.map((src) => ({ src, alt: e.title }))),
    ...Object.keys(eventImages).sort().map((k) => ({ src: eventImages[k], alt: 'Community event' })),
  ].slice(0, 5)

  if (!photos.length) return <Media label={label} eager />
  return (
    <div className="events-collage" data-count={photos.length}>
      {photos.map((p, i) => (
        <img key={p.src} src={p.src} alt={p.alt} loading={i ? 'lazy' : 'eager'} decoding="async" />
      ))}
    </div>
  )
}
