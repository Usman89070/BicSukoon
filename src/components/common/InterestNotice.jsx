import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { site } from '../../site'
import { useEscape } from '../../hooks/useEscape'
import { useLockBody } from '../../hooks/useLockBody'
import Icon from './Icon'

const OPEN = 'interest-notice:open'

/**
 * Click handler for every Expressions of Interest link: when the site has a
 * notice (sites.js → interest.notice), the notice is shown first and the form
 * opens only after the visitor agrees. Otherwise the link opens as usual.
 */
export function onInterestClick(e) {
  if (site?.features.donate || !site?.interest?.notice) return
  e.preventDefault()
  window.dispatchEvent(new Event(OPEN))
}

function Paragraph({ p }) {
  if (typeof p === 'string') return <p>{p}</p>
  return (
    <p>
      {p.before}
      <a href={p.link.href} target="_blank" rel="noopener noreferrer">{p.link.label}</a>
      {p.after}
    </p>
  )
}

function Notice({ onClose }) {
  const { label, href, notice } = site.interest
  const agree = useRef(null)
  useLockBody(true)
  useEscape(true, onClose)
  useEffect(() => agree.current?.focus(), [])
  return createPortal(
    <div className="interest-notice" role="dialog" aria-modal="true" aria-labelledby="interest-notice-title" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="interest-notice__panel">
        <button type="button" className="interest-notice__close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} />
        </button>
        <p className="eyebrow">{label}</p>
        <h2 id="interest-notice-title" className="interest-notice__title">{notice.title}</h2>
        <div className="interest-notice__body">
          {notice.body.map((p, i) => <Paragraph key={i} p={p} />)}
        </div>
        <div className="interest-notice__actions">
          <a ref={agree} href={href} target="_blank" rel="noopener noreferrer" className="btn btn--primary" onClick={onClose}>
            <span>I agree, open the form</span>
            <Icon name="arrow" size={18} className="btn__icon" />
          </a>
          <button type="button" className="btn btn--ghost" onClick={onClose}><span>Cancel</span></button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** Shows the Expressions of Interest notice when a link asks for it (see onInterestClick). */
export default function InterestNotice() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener(OPEN, show)
    return () => window.removeEventListener(OPEN, show)
  }, [])
  return open && site.interest?.notice ? <Notice onClose={close} /> : null
}
