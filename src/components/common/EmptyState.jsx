import Icon from './Icon'
import Pattern from './Pattern'

export default function EmptyState({ icon = 'star', title, children, action }) {
  return (
    <div className="empty-state glass-panel">
      <Pattern className="empty-state__pattern" opacity={0.08} />
      <span className="empty-state__icon"><Icon name={icon} size={26} /></span>
      <h3 className="empty-state__title">{title}</h3>
      {children && <p className="empty-state__text">{children}</p>}
      {action}
    </div>
  )
}
