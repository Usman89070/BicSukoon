import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { masterplan } from '../../data/masterplan'
import { facilities } from '../../data/facilities'
import { projects } from '../../data/projects'
import { useEscape } from '../../hooks/useEscape'
import { cx } from '../../utils/format'
import Icon from '../common/Icon'
import Media from '../common/Media'
import { Value } from '../common/Pending'
import MasterplanSchematic from './MasterplanSchematic'

/** Resolve a location against its facility so data lives in one place. */
function resolve(loc) {
  const f = loc.facility ? facilities[loc.facility] : null
  return {
    ...loc,
    title: loc.title ?? f?.title,
    description: loc.description ?? f?.summary,
    status: loc.status !== undefined ? loc.status : f?.status ?? null,
    image: loc.image ?? f?.media.image ?? null,
    path: loc.path ?? f?.path ?? projects[loc.project].path,
  }
}

export default function Masterplan({ project: initialFilter = 'all', compact = false }) {
  const [filter, setFilter] = useState(initialFilter)
  const [activeId, setActiveId] = useState(null)
  const panelRef = useRef(null)
  const lastTrigger = useRef(null)

  const locations = useMemo(() => masterplan.locations.map(resolve), [])
  const visible = locations.filter((l) => filter === 'all' || l.project === filter)
  const active = locations.find((l) => l.id === activeId)

  const close = useCallback(() => {
    setActiveId(null)
    lastTrigger.current?.focus()
  }, [])
  useEscape(Boolean(active), close)

  const select = (id, e) => {
    lastTrigger.current = e.currentTarget
    setActiveId(id)
    requestAnimationFrame(() => panelRef.current?.focus())
  }

  return (
    <div className={cx('masterplan', compact && 'masterplan--compact')}>
      <div className="masterplan__toolbar glass" role="group" aria-label="Filter masterplan">
        {[
          { id: 'all', label: 'All areas' },
          { id: 'bic', label: 'Brisbane Islamic Centre' },
          { id: 'sukoon', label: 'Sukoon Village' },
        ].map((f) => (
          <button key={f.id} type="button" className={cx('chip', f.id !== 'all' && `theme-${f.id}`, filter === f.id && 'is-active')} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.id !== 'all' && <span className="chip__dot" aria-hidden="true" />}
            {f.label}
          </button>
        ))}
      </div>

      <div className="masterplan__stage">
        <div className="masterplan__map">
          {masterplan.image ? (
            <img src={masterplan.image} alt={masterplan.imageAlt} loading="lazy" decoding="async" />
          ) : (
            <MasterplanSchematic />
          )}
          {visible.map((l, i) => (
            <button
              key={l.id}
              type="button"
              className={cx('hotspot', `theme-${l.project}`, activeId === l.id && 'is-active')}
              style={{ left: `${l.x}%`, top: `${l.y}%`, '--i': i }}
              onClick={(e) => select(l.id, e)}
              aria-label={`${l.title} — view details`}
              aria-haspopup="dialog"
            >
              <span className="hotspot__pulse" aria-hidden="true" />
              <span className="hotspot__dot" aria-hidden="true" />
              <span className="hotspot__label">{l.title}</span>
            </button>
          ))}
        </div>

        <aside
          ref={panelRef}
          className={cx('masterplan__panel glass', active && `is-open theme-${active.project}`)}
          role="dialog"
          aria-modal="false"
          aria-label={active ? active.title : 'Location details'}
          tabIndex={-1}
          hidden={!active}
        >
          {active && (
            <>
              <button type="button" className="masterplan__close" onClick={close} aria-label="Close details">
                <Icon name="close" size={20} />
              </button>
              <Media src={active.image} label={active.title} ratio="16 / 10" className="masterplan__panel-media" />
              <div className="masterplan__panel-body">
                <p className="eyebrow">{projects[active.project].name}</p>
                <h3 className="masterplan__panel-title">{active.title}</h3>
                <p className="masterplan__panel-text">{active.description}</p>
                <dl className="masterplan__meta">
                  <dt>Status</dt>
                  <dd><Value value={active.status} fallback="Status to be confirmed" /></dd>
                </dl>
                <Link to={active.path} className="btn btn--primary btn--sm">
                  <span>Learn more</span> <Icon name="arrow" size={16} className="btn__icon" />
                </Link>
              </div>
            </>
          )}
        </aside>
      </div>

      {masterplan.isIndicative && <p className="masterplan__note">Indicative schematic — not to scale. The official masterplan will replace this view once supplied.</p>}

      <ul className="masterplan__legend">
        {visible.map((l) => (
          <li key={l.id} className={`theme-${l.project}`}>
            <button type="button" onClick={(e) => select(l.id, e)} className={cx(activeId === l.id && 'is-active')}>
              <span className="chip__dot" aria-hidden="true" />
              {l.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
