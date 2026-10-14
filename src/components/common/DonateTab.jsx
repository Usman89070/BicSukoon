import { site } from '../../site'
import { checkoutLink } from '../../data/donation'
import Icon from './Icon'

const QUICK = ['facebook', 'whatsapp']

/**
 * Sticky "Donate" button in the bottom-right corner on every page and every
 * screen size (BIC only, where donations are open), with the Facebook and
 * WhatsApp links under it, on the right. It opens the Square checkout (the
 * same link as "Donate securely with Square") in a new tab.
 */
export default function DonateTab() {
  if (!site.features.donate) return null
  const links = QUICK.map((id) => site.socials.find((s) => s.id === id && s.href)).filter(Boolean)
  return (
    <div className="sticky-actions">
      <a {...checkoutLink} className="donate-tab" aria-label="Donate securely with Square (opens in a new tab)">
        <Icon name="heart" size={16} />
        <span>Donate</span>
      </a>
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
