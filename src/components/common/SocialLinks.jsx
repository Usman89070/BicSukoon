import { socials } from '../../data/site'
import { cx } from '../../utils/format'
import Icon from './Icon'
import Pending from './Pending'

/** Clickable social icons — only official accounts with an href are rendered. */
export default function SocialLinks({ className, showPending = true }) {
  const active = socials.filter((s) => s.href)
  if (!active.length) {
    return showPending ? <Pending className={className}>Official social accounts to be added</Pending> : null
  }
  return (
    <ul className={cx('socials', className)}>
      {active.map((s) => (
        <li key={s.id}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="socials__link">
            <Icon name={s.id} size={20} />
          </a>
        </li>
      ))}
    </ul>
  )
}
