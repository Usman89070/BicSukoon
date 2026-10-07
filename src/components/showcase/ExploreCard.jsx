import { Link } from 'react-router-dom'
import { externalHref } from '../../site'
import { imageFor } from '../../utils/images'
import Icon from '../common/Icon'
import Media from '../common/Media'
import Reveal from '../common/Reveal'

/** Large picture card that links within this website or across to the other one. */
export default function ExploreCard({ item, index }) {
  const href = externalHref(item.site, item.path)
  const inner = (
    <>
      <Media src={imageFor(item.image)} label={item.title} showLabel={false} className="explore-card__media" />
      <span className="explore-card__shade" aria-hidden="true" />
      <span className="explore-card__num" aria-hidden="true">0{index + 1}</span>
      <span className="explore-card__body">
        <span className="explore-card__title">{item.title}</span>
        <span className="explore-card__text">{item.text}</span>
        <span className="explore-card__more">Discover <Icon name="arrow" size={16} /></span>
      </span>
    </>
  )
  return (
    <Reveal as="li" delay={index * 80} className={`explore-card explore-card--${item.id}`}>
      {href ? <a href={href} className="explore-card__link">{inner}</a> : <Link to={item.path} className="explore-card__link">{inner}</Link>}
      {item.links && (
        <ul className="explore-card__chips" aria-label={`${item.title}: pages`}>
          {item.links.map((l) => (
            <li key={l.label}><Link to={l.path}>{l.label}</Link></li>
          ))}
        </ul>
      )}
    </Reveal>
  )
}

