import { Link } from 'react-router-dom'
import { discover } from '../../data/discover'
import { externalHref } from '../../site'
import { imageFor } from '../../utils/images'
import Icon from '../common/Icon'
import Media from '../common/Media'
import Reveal from '../common/Reveal'

/** Every facility as a large picture tile. Tiles for the other website link across. */
export default function DiscoverGrid() {
  return (
    <ul className="discover">
      {discover.map((d, i) => {
        const href = externalHref(d.site, d.path)
        const body = (
          <>
            <Media src={imageFor(d.image)} label={d.title} showLabel={false} className="discover__media" />
            <span className="discover__shade" aria-hidden="true" />
            <span className="discover__text">
              <span className="discover__sub">{d.subtitle}</span>
              <span className="discover__title">{d.title}</span>
            </span>
            <span className="discover__go" aria-hidden="true"><Icon name="arrow" size={18} /></span>
          </>
        )
        return (
          <Reveal as="li" key={d.id} delay={(i % 4) * 70} className={`discover__item discover__item--${d.id}`}>
            {href ? <a href={href} className="discover__link">{body}</a> : <Link to={d.path} className="discover__link">{body}</Link>}
          </Reveal>
        )
      })}
    </ul>
  )
}
