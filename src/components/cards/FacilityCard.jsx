import Media from '../common/Media'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'
import FacilityLink from '../common/FacilityLink'

export default function FacilityCard({ facility, delay = 0 }) {
  return (
    <Reveal delay={delay} className="facility-card">
      <FacilityLink facility={facility} className="facility-card__link">
        <Media src={facility.media.image} label={facility.media.label} ratio="4 / 3" className="facility-card__media" />
        <div className="facility-card__body">
          <span className="facility-card__pillar">{facility.pillar}</span>
          <h3 className="facility-card__title">{facility.title}</h3>
          <p className="facility-card__text">{facility.summary}</p>
          <span className="facility-card__more">Learn more <Icon name="arrow" size={16} /></span>
        </div>
      </FacilityLink>
    </Reveal>
  )
}
