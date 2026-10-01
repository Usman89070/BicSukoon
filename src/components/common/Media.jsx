import { cx } from '../../utils/format'
import Pattern from './Pattern'

/**
 * Responsive, lazy-loaded image. When `src` is missing it renders an
 * art-directed architectural placeholder (never a fake photo) labelled so
 * editors can see exactly which asset is still required.
 *
 * src may be a string or { src, srcSet, sizes, alt }.
 */
export default function Media({ src, alt = '', label, className, eager = false, ratio, showLabel = true, sizes, srcSet }) {
  const style = ratio ? { aspectRatio: ratio } : undefined
  const resolved = typeof src === 'object' && src ? src : { src, srcSet, sizes, alt }

  if (resolved.src) {
    return (
      <div className={cx('media', className)} style={style}>
        <img
          src={resolved.src}
          srcSet={resolved.srcSet}
          sizes={resolved.sizes}
          alt={resolved.alt ?? alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : undefined}
        />
      </div>
    )
  }

  return (
    <div className={cx('media media--placeholder', className)} style={style} role="img" aria-label={label ? `Placeholder: ${label}` : 'Image placeholder'}>
      <Pattern className="media__pattern" opacity={0.16} />
      <svg className="media__arch" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M40 300V170h70v130M290 300V150h80v150" opacity=".35" />
          <path d="M140 300V140c0-40 27-72 60-80 33 8 60 40 60 80v160" opacity=".7" />
          <path d="M165 300V160c0-26 15-46 35-52 20 6 35 26 35 52v140" opacity=".45" />
          <path d="M200 60V38" opacity=".6" />
          <circle cx="200" cy="33" r="4" opacity=".6" />
          <path d="M0 300h400" opacity=".5" />
          <path d="M54 300V122h12v178M54 122l6-18 6 18" opacity=".35" />
        </g>
      </svg>
      {showLabel && label && (
        <span className="media__label">
          <span className="media__dot" aria-hidden="true" />
          {label} · coming soon
        </span>
      )}
    </div>
  )
}
