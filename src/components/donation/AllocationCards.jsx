import { Link } from 'react-router-dom'
import { allocations } from '../../data/donation'
import { facilities } from '../../data/facilities'
import Media from '../common/Media'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

export default function AllocationCards() {
  return (
    <div className="alloc-grid">
      {allocations.map((a, i) => {
        const f = a.facility ? facilities[a.facility] : null
        return (
          <Reveal key={a.id} delay={(i % 4) * 70} className={`alloc-card theme-${a.project}`}>
            <Media src={a.image ?? f?.media.image} label={a.title} showLabel={false} className="alloc-card__media" />
            <div className="alloc-card__body">
              <span className="alloc-card__icon"><Icon name="heart" size={18} /></span>
              <h3 className="alloc-card__title">{a.title}</h3>
              <p className="alloc-card__text">{a.text ?? f?.summary}</p>
              {f && <Link to={f.path} className="alloc-card__link">About this area <Icon name="arrow" size={14} /></Link>}
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
