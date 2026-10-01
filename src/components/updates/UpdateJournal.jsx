import { useMemo, useState } from 'react'
import { updates } from '../../data/updates'
import { facilities } from '../../data/facilities'
import { projects } from '../../data/projects'
import { cx, formatDate, sortByDateDesc } from '../../utils/format'
import Media from '../common/Media'
import Reveal from '../common/Reveal'
import Pending from '../common/Pending'
import EmptyState from '../common/EmptyState'
import VideoFeature from '../video/VideoFeature'

/** Architectural development journal — newest → oldest. */
export default function UpdateJournal({ project, showFilter = !project, limit }) {
  const [filter, setFilter] = useState(project ?? 'all')
  const list = useMemo(() => {
    const sorted = sortByDateDesc(updates).filter((u) => filter === 'all' || u.project === filter)
    return limit ? sorted.slice(0, limit) : sorted
  }, [filter, limit])

  return (
    <div className="journal">
      {showFilter && (
        <div className="journal__filter" role="group" aria-label="Filter updates by project">
          {[{ id: 'all', label: 'All updates' }, ...Object.values(projects).map((p) => ({ id: p.id, label: p.name }))].map((f) => (
            <button key={f.id} type="button" className={cx('chip', f.id !== 'all' && `theme-${f.id}`, filter === f.id && 'is-active')} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.id !== 'all' && <span className="chip__dot" aria-hidden="true" />}
              {f.label}
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
            const area = u.area ? facilities[u.area] : null
            return (
              <li key={u.id} className={cx('journal__entry', `theme-${u.project}`)}>
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
                    <span className="tag tag--project">{projects[u.project].name}</span>
                    {area && <span className="tag">{area.shortTitle ?? area.title}</span>}
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
