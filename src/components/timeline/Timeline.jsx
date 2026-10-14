import { Fragment, useState } from 'react'
import { cx, formatDate } from '../../utils/format'
import { imageFor } from '../../utils/images'
import { SITE_ID } from '../../site'
import Icon from '../common/Icon'
import GalleryLightbox from '../gallery/GalleryLightbox'
import Reveal from '../common/Reveal'
import Pending from '../common/Pending'

const stateLabel = { completed: 'Achieved', current: 'Current', upcoming: 'Upcoming' }

/**
 * Data-driven project timeline. The data stays in date order (oldest →
 * newest); it is shown newest first unless `ascending`. Items with a `group`
 * get that heading above the first item of the group.
 */
export default function Timeline({ items, ascending = false }) {
  const [viewing, setViewing] = useState(null)
  const shown = ascending ? items : [...items].reverse()
  return (
    <>
    <ol className="timeline">
      {shown.map((m, i) => (
        <Fragment key={m.id}>
        {m.group && m.group !== shown[i - 1]?.group && (
          <Reveal as="li" className="timeline__group">
            <h3 className="timeline__group-title">{m.group}</h3>
          </Reveal>
        )}
        <Reveal as="li" delay={Math.min(i, 3) * 100} className={cx('timeline__item', `is-${m.state}`)}>
          <span className="timeline__node" aria-hidden="true" />
          <div className="timeline__card glass-panel">
            <div className="timeline__meta">
              <span className={cx('status-pill', `status-pill--${m.state}`)}>{m.label ?? stateLabel[m.state]}</span>
              {m.when ? (
                <span className="timeline__when">{m.when}</span>
              ) : m.date ? (
                <time dateTime={m.date}>{formatDate(m.date, { month: 'long', year: 'numeric' })}</time>
              ) : (
                <Pending>Date TBC</Pending>
              )}
            </div>
            <h4 className="timeline__title">{m.title}</h4>
            {(() => {
              const text = [].concat(m.description ?? [])
              const src = m.image && imageFor(m.image.key)
              const at = m.imageAfter ?? text.length
              const para = (t) => <p key={t} className="timeline__text">{t}</p>
              return (
                <>
                  {text.slice(0, at).map(para)}
                  {src && (
                    <button type="button" className="timeline__image" onClick={() => setViewing({ id: m.id, project: SITE_ID, kind: 'photo', title: m.title, tag: m.when ?? 'Timeline', src })} aria-label={`View larger: ${m.image.alt}`}>
                      <img src={src} alt={m.image.alt} loading="lazy" decoding="async" />
                      <span className="timeline__image-zoom" aria-hidden="true"><Icon name="expand" size={18} /></span>
                    </button>
                  )}
                  {text.slice(at).map(para)}
                </>
              )
            })()}
            {m.placeholder && <Pending>Placeholder — official milestone required</Pending>}
          </div>
        </Reveal>
        </Fragment>
      ))}
    </ol>
    {viewing && <GalleryLightbox items={[viewing]} index={0} onClose={() => setViewing(null)} onGo={() => {}} />}
    </>
  )
}
