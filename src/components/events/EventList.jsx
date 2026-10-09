import { Link } from 'react-router-dom'
import { useEvents } from '../../hooks/useEvents'
import { formatDate, isUpcoming, sortByDateDesc } from '../../utils/format'
import Media from '../common/Media'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'
import EmptyState from '../common/EmptyState'

/** One event: cover photo, date, title and a short description; opens the event's page. */
function EventCard({ ev, delay }) {
  const d = ev.date ? new Date(`${ev.date}T00:00:00`) : null
  const first = ev.body.split(/\n\s*\n/)[0]
  return (
    <Reveal as="article" delay={delay} className="event-card">
      <Link to={`/events/${ev.id}`} className="event-card__link">
        <div className="event-card__media">
          <Media src={ev.photos[0]} alt="" label="Event photo" ratio="16 / 10" />
          {d && (
            <span className="event-card__date glass" aria-hidden="true">
              <strong>{d.getDate()}</strong>
              {d.toLocaleDateString('en-AU', { month: 'short' })}
            </span>
          )}
          {ev.photos.length > 1 && <span className="event-card__count"><Icon name="layers" size={14} /> Photos</span>}
        </div>
        <div className="event-card__body">
          <h3 className="event-card__title">{ev.title}</h3>
          {(ev.date || ev.location) && (
            <ul className="event-card__meta">
              {ev.date && <li><Icon name="calendar" size={16} /> {formatDate(ev.date)}</li>}
              {ev.location && <li><Icon name="pin" size={16} /> {ev.location}</li>}
            </ul>
          )}
          {first && <p className="event-card__text">{first}</p>}
          <span className="event-card__more">View event <Icon name="arrow" size={16} /></span>
        </div>
      </Link>
    </Reveal>
  )
}

export default function EventList() {
  const { events } = useEvents()
  const dated = events.filter((e) => e.date)
  const upcoming = sortByDateDesc(dated.filter((e) => isUpcoming(e.date))).reverse()
  const past = [...sortByDateDesc(dated.filter((e) => !isUpcoming(e.date))), ...events.filter((e) => !e.date)]

  if (!events.length) {
    return (
      <EmptyState icon="calendar" title="Events will be announced soon">
        Community events, open days and gatherings will be listed here once they are officially scheduled.
      </EmptyState>
    )
  }

  return (
    <div className="events">
      {upcoming.length > 0 && (
        <>
          <h3 className="events__heading">Upcoming</h3>
          <div className="card-grid">{upcoming.map((ev, i) => <EventCard key={ev.id} ev={ev} delay={i * 80} />)}</div>
        </>
      )}
      {past.length > 0 && (
        <>
          {upcoming.length > 0 && <h3 className="events__heading">Past events</h3>}
          <div className="card-grid">{past.map((ev, i) => <EventCard key={ev.id} ev={ev} delay={i * 80} />)}</div>
        </>
      )}
    </div>
  )
}
