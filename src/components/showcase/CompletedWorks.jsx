import { completedWorks } from '../../data/progress'
import { imageFor } from '../../utils/images'
import Icon from '../common/Icon'
import Media from '../common/Media'
import Reveal from '../common/Reveal'

/** Large photo panels of the works already finished on site. */
export default function CompletedWorks() {
  return (
    <ul className="done">
      {completedWorks.map((w, i) => (
        <Reveal as="li" key={w.id} delay={i * 90} variant="image" className="done__item">
          <Media src={imageFor(w.image)} label={w.label} className="done__media" />
          <span className="done__shade" aria-hidden="true" />
          <span className="done__badge"><Icon name="check" size={14} /> Completed</span>
          <h3 className="done__title">{w.title}</h3>
        </Reveal>
      ))}
    </ul>
  )
}
