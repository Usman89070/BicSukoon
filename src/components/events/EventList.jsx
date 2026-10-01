import { useMemo } from 'react'
import { events } from '../../data/events'
import { SITE_ID } from '../../site'
import { formatDate, isUpcoming, sortByDateDesc } from '../../utils/format'
import Media from '../common/Media'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'
import EmptyState from '../common/EmptyState'
import { Value } from '../common/Pending'

function EventCard({ ev, delay }) {
  const d = ev.date ? new Date(`${ev.date}T00:00:00`) : null
  return (
    <Reveal as="article" delay={delay} className="event-card">
      <div className="event-card__media">
        <Media src={ev.image?.src} alt={ev.image?.alt ?? ''} label="Event image" ratio="16 / 10" />
        {d && (
          <span className="event-card__date glass" aria-hidden="true">
            <strong>{d.getDate()}</strong>
            {d.toLocaleDateString('en-AU', { month: 'short' })}
          </span>
        )}
      </div>
      <div className="event-card__body">
        <h3 className="event-card__title">{ev.title}</h3>
        <ul className="event-card__meta">
          <li><Icon name="calendar" size={16} /> <Value value={formatDate(ev.date)} fallback="Date TBC" /></li>
          <li><Icon name="clock" size={16} /> <Value value={ev.time} fallback="Time TBC" /></li>
          <li><Icon name="pin" size={16} /> <Value value={ev.location} fallback="Location TBC" /></li>
        </ul>
        {ev.description && <p className="event-card__text">{ev.description}</p>}
        {ev.cta?.href && (
          <a className="btn btn--primary btn--sm" href={ev.cta.href} target={ev.cta.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            <span>{ev.cta.label ?? 'Learn more'}</span>
            <Icon name="arrow" size={16} className="btn__icon" />
          </a>
        )}
      </div>
    </Reveal>
  )
}

export default function EventList() {
  const { upcoming, past } = useMemo(() => {
    const list = events.filter((e) => !e.project || e.project === SITE_ID)
    const up = sortByDateDesc(list.filter((e) => isUpcoming(e.date))).reverse()
    const pa = sortByDateDesc(list.filter((e) => !isUpcoming(e.date)))
    return { upcoming: up, past: pa }
  }, [])

  if (!upcoming.length && !past.length) {
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
          <h3 className="events__heading">Past events</h3>
          <div className="card-grid card-grid--muted">{past.map((ev, i) => <EventCard key={ev.id} ev={ev} delay={i * 80} />)}</div>
        </>
      )}
    </div>
  )
}
