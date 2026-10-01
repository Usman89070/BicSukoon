import { useMemo, useState } from 'react'
import { updates } from '../../data/updates'
import { facilities, facilitiesFor } from '../../data/facilities'
import { SITE_ID } from '../../site'
import { cx, formatDate, sortByDateDesc } from '../../utils/format'
import Media from '../common/Media'
import Reveal from '../common/Reveal'
import Pending from '../common/Pending'
import EmptyState from '../common/EmptyState'
import VideoFeature from '../video/VideoFeature'

/** Development journal for the current website — newest → oldest, filterable by area. */
export default function UpdateJournal({ showFilter = true, limit }) {
  const [area, setArea] = useState('all')
  const own = useMemo(() => sortByDateDesc(updates).filter((u) => u.project === SITE_ID), [])
  const areas = facilitiesFor(SITE_ID).filter((f) => own.some((u) => u.area === f.id))
  const list = useMemo(() => {
    const filtered = own.filter((u) => area === 'all' || u.area === area)
    return limit ? filtered.slice(0, limit) : filtered
  }, [own, area, limit])

  return (
    <div className="journal">
      {showFilter && areas.length > 1 && (
        <div className="journal__filter" role="group" aria-label="Filter updates by area">
          {[{ id: 'all', title: 'All updates' }, ...areas].map((f) => (
            <button key={f.id} type="button" className={cx('chip', area === f.id && 'is-active')} aria-pressed={area === f.id} onClick={() => setArea(f.id)}>
              {f.shortTitle ?? f.title}
            </button>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <EmptyState icon="layers" title="Updates are on the way">
          Official project updates will be published here as the development progresses.
        </EmptyState>
      ) : (
        <ol className="journal__list">
          {list.map((u) => {
            const areaOf = u.area ? facilities[u.area] : null
            return (
              <li key={u.id} className="journal__entry">
                <Reveal className="journal__rail">
                  <span className="journal__node" aria-hidden="true" />
                  {u.date ? (
                    <time dateTime={u.date} className="journal__date">{formatDate(u.date)}</time>
                  ) : (
                    <Pending>Date TBC</Pending>
                  )}
                </Reveal>
                <Reveal as="article" className="journal__card glass-panel" delay={80} aria-labelledby={`upd-${u.id}`}>
                  <div className="journal__tags">
                    {areaOf && <span className="tag tag--project">{areaOf.shortTitle ?? areaOf.title}</span>}
                    {u.placeholder && <Pending>Sample entry</Pending>}
                  </div>
                  <h3 id={`upd-${u.id}`} className="journal__title">{u.title}</h3>
                  <p className="journal__summary">{u.summary}</p>
                  {u.body?.map((p, i) => <p key={i} className="journal__body">{p}</p>)}

                  {u.video ? (
                    <VideoFeature id={u.video} className="journal__video" />
                  ) : u.images?.length ? (
                    <div className={cx('journal__gallery', u.images.length > 1 && 'is-multi')}>
                      {u.images.map((img) => <Media key={img.src} src={img.src} alt={img.alt} ratio="16 / 10" />)}
                    </div>
                  ) : (
                    <Media label="Update imagery" ratio="16 / 8" className="journal__placeholder" />
                  )}

                  {u.progress && (
                    <div className="progress" role="group" aria-label={`${u.progress.label} progress`}>
                      <div className="progress__head"><span>{u.progress.label}</span><span>{u.progress.value}%</span></div>
                      <div className="progress__track" role="progressbar" aria-valuenow={u.progress.value} aria-valuemin={0} aria-valuemax={100}>
                        <span className="progress__bar" style={{ '--value': `${u.progress.value}%` }} />
                      </div>
                    </div>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
