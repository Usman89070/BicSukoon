import { cx, formatDate } from '../../utils/format'
import Reveal from '../common/Reveal'
import Pending from '../common/Pending'

const stateLabel = { completed: 'Achieved', current: 'Current', upcoming: 'Upcoming' }

/** Data-driven project timeline (completed → current → upcoming). */
export default function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((m, i) => (
        <Reveal as="li" key={m.id} delay={Math.min(i, 3) * 100} className={cx('timeline__item', `is-${m.state}`)}>
          <span className="timeline__node" aria-hidden="true" />
          <div className="timeline__card glass-panel">
            <div className="timeline__meta">
              <span className={cx('status-pill', `status-pill--${m.state}`)}>{stateLabel[m.state]}</span>
              {m.when ? (
                <span className="timeline__when">{m.when}</span>
              ) : m.date ? (
                <time dateTime={m.date}>{formatDate(m.date, { month: 'long', year: 'numeric' })}</time>
              ) : (
                <Pending>Date TBC</Pending>
              )}
            </div>
            <h3 className="timeline__title">{m.title}</h3>
            {m.description && <p className="timeline__text">{m.description}</p>}
            {m.placeholder && <Pending>Placeholder — official milestone required</Pending>}
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
