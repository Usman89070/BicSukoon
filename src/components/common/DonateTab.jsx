import { Link, useLocation } from 'react-router-dom'
import { site } from '../../site'
import Icon from './Icon'

/**
 * Sticky "Donate" tab fixed to the left edge of the screen on every page
 * and every screen size (BIC only, where donations are open); it stays in
 * view while scrolling. It opens the Donate page, or on the Donate page
 * jumps to the donation box.
 */
export default function DonateTab() {
  const { pathname } = useLocation()
  if (!site.features.donate) return null
  return (
    <Link to={pathname === '/donate' ? '/donate#donate-form' : '/donate'} className="donate-tab" aria-label="Donate">
      <Icon name="heart" size={16} />
      <span>Donate</span>
    </Link>
  )
}
