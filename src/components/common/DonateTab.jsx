import { Link, useLocation } from 'react-router-dom'
import { site } from '../../site'
import Icon from './Icon'

/**
 * "Donate" tab fixed to the left edge of the screen on every page (BIC
 * only, where donations are open); it stays in view while scrolling and
 * opens the Donate page. Hidden on the Donate page itself.
 */
export default function DonateTab() {
  const { pathname } = useLocation()
  if (!site.features.donate || pathname === '/donate') return null
  return (
    <Link to="/donate" className="donate-tab" aria-label="Donate">
      <Icon name="heart" size={16} />
      <span>Donate</span>
    </Link>
  )
}
