import { guests } from '../../data/guests'
import { formatDate, sortByDateDesc } from '../../utils/format'
import Media from '../common/Media'
import Reveal from '../common/Reveal'
import EmptyState from '../common/EmptyState'

export default function GuestGrid() {
  if (!guests.length) {
    return (
      <EmptyState icon="star" title="Honoured guests will be featured here">
        Official visits and distinguished guests will be published with approved photographs and details.
      </EmptyState>
    )
  }
  return (
    <div className="guest-grid">
      {sortByDateDesc(guests).map((g, i) => (
        <Reveal as="article" key={g.id} delay={i * 80} className="guest-card">
          <Media src={g.photo?.src} alt={g.photo?.alt ?? g.name} label="Guest portrait" ratio="4 / 5" className="guest-card__photo" />
          <div className="guest-card__body glass">
            {g.date && <time dateTime={g.date} className="guest-card__date">{formatDate(g.date)}</time>}
            <h3 className="guest-card__name">{g.name}</h3>
            {g.position && <p className="guest-card__role">{g.position}</p>}
            {g.context && <p className="guest-card__context">{g.context}</p>}
            {g.description && <p className="guest-card__text">{g.description}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
