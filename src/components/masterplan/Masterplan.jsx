import { useCallback, useMemo, useRef, useState } from 'react'
import { masterplans } from '../../data/masterplan'
import { facilities } from '../../data/facilities'
import { SITE_ID, site } from '../../site'
import { useEscape } from '../../hooks/useEscape'
import { cx } from '../../utils/format'
import Icon from '../common/Icon'
import Media from '../common/Media'
import { Value } from '../common/Pending'
import MasterplanSchematic, { VIEW_W, VIEW_H } from './MasterplanSchematic'
import FacilityLink from '../common/FacilityLink'

/** Resolve a location against its facility so wording lives in one place. */
function resolve(loc) {
  const f = loc.facility ? facilities[loc.facility] : null
  const s = loc.shape
  return {
    ...loc,
    title: loc.title ?? f?.title,
    description: loc.description ?? f?.summary,
    status: loc.status !== undefined ? loc.status : f?.status ?? null,
    image: loc.image ?? f?.media.image ?? null,
    path: loc.path ?? f?.path ?? null,
    project: loc.path ? undefined : f?.project,
    x: loc.x ?? (s ? ((s.x + s.w / 2) / VIEW_W) * 100 : 50),
    y: loc.y ?? (s ? ((s.y + s.h / 2) / VIEW_H) * 100 : 50),
  }
}

/** Interactive masterplan for the current website. */
export default function Masterplan() {
  const plan = masterplans[SITE_ID]
  const [activeId, setActiveId] = useState(null)
  const panelRef = useRef(null)
  const lastTrigger = useRef(null)

  const locations = useMemo(() => plan.locations.map(resolve), [plan])
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
    <div className="masterplan">
      <div className="masterplan__stage">
        <div className="masterplan__map">
          {plan.image ? (
            <img src={plan.image} alt={plan.imageAlt} loading="lazy" decoding="async" />
          ) : (
            <MasterplanSchematic plan={plan} activeId={activeId} />
          )}
          {locations.map((l, i) => (
            <button
              key={l.id}
              type="button"
              className={cx('hotspot', l.future && 'hotspot--future', activeId === l.id && 'is-active')}
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
          className={cx('masterplan__panel glass', active && 'is-open')}
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
                <p className="eyebrow">{site.name}</p>
                <h3 className="masterplan__panel-title">{active.title}</h3>
                <p className="masterplan__panel-text">{active.description}</p>
                <dl className="masterplan__meta">
                  <dt>Status</dt>
                  <dd><Value value={active.status} fallback="Status to be confirmed" /></dd>
                </dl>
                {active.path && (
                  <FacilityLink to={active.path} project={active.project} className="btn btn--primary btn--sm">
                    <span>Learn more</span> <Icon name="arrow" size={16} className="btn__icon" />
                  </FacilityLink>
                )}
              </div>
            </>
          )}
        </aside>
      </div>

      {plan.isIndicative && (
        <p className="masterplan__note">Indicative schematic, not to scale. The official masterplan will replace this view once supplied.</p>
      )}

      <ul className="masterplan__legend">
        {locations.map((l) => (
          <li key={l.id}>
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
