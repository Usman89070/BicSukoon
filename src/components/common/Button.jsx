import { Link } from 'react-router-dom'
import { cx } from '../../utils/format'
import Icon from './Icon'

/**
 * variant: 'primary' | 'glass' | 'ghost' | 'light'
 * Renders <Link> for internal `to`, <a> for `href`, otherwise <button>.
 */
export default function Button({ to, href, variant = 'primary', size, icon, iconLeft, children, className, ...rest }) {
  const cls = cx('btn', `btn--${variant}`, size && `btn--${size}`, className)
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} className="btn__icon" />}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>
  return <button type="button" className={cls} {...rest}>{content}</button>
}
