import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../utils/format'

/** Scroll-triggered reveal. variant: 'fade' | 'up' | 'scale' | 'image' */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className, children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={cx('reveal', `reveal--${variant}`, visible && 'is-visible', className)}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
