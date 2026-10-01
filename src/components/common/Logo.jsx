import { site } from '../../data/site'
import { cx } from '../../utils/format'

/**
 * Official project logo.
 * tone: 'dark' → variant for dark/navy backgrounds (default), 'light' → for ivory/white.
 * height: rendered height in px (Sukoon is optically scaled — see data/site.js).
 */
export default function Logo({ project = 'bic', tone = 'dark', height = 32, className, decorative = false }) {
  const logo = site.logos[project]
  const h = Math.round(height * (logo.scale ?? 1))
  const w = Math.round((logo.width / logo.height) * h)
  return (
    <img
      src={tone === 'light' ? logo.onLight : logo.onDark}
      alt={decorative ? '' : logo.name}
      width={w}
      height={h}
      className={cx('logo', `logo--${project}`, className)}
      decoding="async"
    />
  )
}
