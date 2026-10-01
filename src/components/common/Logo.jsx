import { site } from '../../data/site'
import { cx } from '../../utils/format'

const marks = {
  bic: { initials: 'BIC', name: 'Brisbane Islamic Centre' },
  sukoon: { initials: 'SV', name: 'Sukoon Village' },
}

/**
 * Official logo when supplied in site.logos, otherwise a restrained
 * typographic placeholder mark (not an attempt to recreate the real logo).
 */
export default function Logo({ project = 'bic', showName = true, className, size = 44 }) {
  const src = site.logos[project]
  const mark = marks[project]
  if (src) {
    return <img src={src} alt={mark.name} className={cx('logo-img', className)} style={{ height: size }} />
  }
  return (
    <span className={cx('logo-mark', `theme-${project}`, className)}>
      <span className="logo-mark__badge" style={{ width: size, height: size }} aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M24 4l5.6 14.4L44 24l-14.4 5.6L24 44l-5.6-14.4L4 24l14.4-5.6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <span>{mark.initials}</span>
      </span>
      {showName && <span className="logo-mark__name">{mark.name}</span>}
      <span className="sr-only">{showName ? '' : mark.name} (logo placeholder)</span>
    </span>
  )
}
