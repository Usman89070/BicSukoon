import { pillars } from '../../data/vision'
import { SITE_ID } from '../../site'
import { facilities } from '../../data/facilities'
import { cx } from '../../utils/format'
import Media from '../common/Media'
import Reveal from '../common/Reveal'
import FacilityLink from '../common/FacilityLink'

/** The four themes as premium cards. `detailed` adds facility links. */
export default function VisionPillars({ detailed = false, className }) {
  const list = pillars[SITE_ID]
  return (
    <div className={cx('pillars', detailed && 'pillars--detailed', className)}>
      {list.map((p, i) => (
        <Reveal key={p.id} delay={i * 90} className="pillar">
          <Media src={p.media.image} label={`${p.title} imagery`} className="pillar__media" showLabel={false} />
          <div className="pillar__scrim" />
          <div className="pillar__body">
            <span className="pillar__index" aria-hidden="true">0{i + 1}</span>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__line">{p.line}</p>
            {detailed && (
              <>
                <p className="pillar__text">{p.body}</p>
                <ul className="pillar__links">
                  {p.facilities.map((id) => (
                    <li key={id}>
                      <FacilityLink facility={facilities[id]}>{facilities[id].shortTitle ?? facilities[id].title}</FacilityLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
