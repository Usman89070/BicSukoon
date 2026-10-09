import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEvents } from '../../../hooks/useEvents'
import { formatDate } from '../../../utils/format'
import { site } from '../../../site'
import Icon from '../../../components/common/Icon'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import GalleryLightbox from '../../../components/gallery/GalleryLightbox'
import PageShell from '../../../templates/PageShell'

/** One event: heading, description and its photo album (opens in the viewer). */
export default function EventPage() {
  const { id } = useParams()
  const { events, loaded } = useEvents()
  const ev = events.find((e) => e.id === id)
  const [open, setOpen] = useState(null)

  if (!ev) {
    return (
      <PageShell title="Events" lead={loaded ? 'This event could not be found.' : 'Loading…'}>
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            {loaded && <Button to="/events" variant="primary" icon="arrow">All events</Button>}
          </div>
        </section>
      </PageShell>
    )
  }

  const items = ev.photos.map((src, i) => ({ id: `${ev.id}-${i}`, project: site.id, kind: 'photo', title: ev.title, tag: 'Event', src }))
  const paragraphs = ev.body.split(/\n\s*\n/).filter(Boolean)

  return (
    <PageShell title={ev.title} eyebrow="Events" description={paragraphs[0] ?? `${ev.title} at the ${site.name}.`} media={{ image: ev.photos[0], label: ev.title }}>
      <section className="section event-page">
        <div className="container">
          <Reveal className="event-page__intro">
            <h2 className="event-page__title">{ev.title}</h2>
            {(ev.date || ev.time || ev.location) && (
              <ul className="event-page__meta">
                {ev.date && <li><Icon name="calendar" size={16} /> {formatDate(ev.date)}</li>}
                {ev.time && <li><Icon name="clock" size={16} /> {ev.time}</li>}
                {ev.location && <li><Icon name="pin" size={16} /> {ev.location}</li>}
              </ul>
            )}
            {paragraphs.map((p) => <p key={p} className="event-page__text">{p}</p>)}
          </Reveal>

          {items.length > 0 && (
            <ul className="event-album">
              {items.map((p, i) => (
                <Reveal as="li" key={p.id} delay={(i % 5) * 50}>
                  <button type="button" className="event-album__item" onClick={() => setOpen(i)} aria-label={`View photo ${i + 1} of ${items.length}`}>
                    <img src={p.src} alt="" loading="lazy" decoding="async" />
                  </button>
                </Reveal>
              ))}
            </ul>
          )}

          <div className="event-page__back">
            <Link to="/events" className="btn btn--ghost"><Icon name="arrowLeft" size={16} /> <span>All events</span></Link>
          </div>
        </div>
      </section>
      {open !== null && <GalleryLightbox items={items} index={open} onClose={() => setOpen(null)} onGo={setOpen} />}
    </PageShell>
  )
}
