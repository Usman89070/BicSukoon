import { Link, useLocation } from 'react-router-dom'
import { site } from '../../site'
import Icon from './Icon'

const QUICK = ['facebook', 'whatsapp']

/**
 * Sticky "Donate" button in the bottom-right corner on every page and every
 * screen size (BIC only, where donations are open), with the Facebook and
 * WhatsApp links under it. It opens the Donate page, or on the Donate page
 * jumps to the donation box.
 */
export default function DonateTab() {
  const { pathname } = useLocation()
  if (!site.features.donate) return null
  const links = QUICK.map((id) => site.socials.find((s) => s.id === id && s.href)).filter(Boolean)
  return (
    <div className="sticky-actions">
      <Link to={pathname === '/donate' ? '/donate#donate-form' : '/donate'} className="donate-tab" aria-label="Donate">
        <Icon name="heart" size={16} />
        <span>Donate</span>
      </Link>
      {links.length > 0 && (
        <ul className="sticky-actions__social">
          {links.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={`sticky-actions__link sticky-actions__link--${s.id}`} aria-label={`${s.label} (opens in a new tab)`}>
                <Icon name={s.id} size={20} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
