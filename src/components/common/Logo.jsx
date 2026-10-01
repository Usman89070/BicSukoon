import { logos } from '../../data/brand'
import { cx } from '../../utils/format'

/**
 * Official project logo.
 * tone: 'dark' → variant for dark backgrounds (default), 'light' → for light backgrounds.
 * height: rendered height in px (Sukoon is optically scaled — see data/brand.js).
 */
export default function Logo({ project, tone = 'dark', height = 32, className, decorative = false }) {
  const logo = logos[project]
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
