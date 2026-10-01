import { cx } from '../../utils/format'

/** Clearly identifiable placeholder for official information not yet supplied. */
export default function Pending({ children = 'To be confirmed', className, block = false }) {
  const Tag = block ? 'div' : 'span'
  return (
    <Tag className={cx('pending', block && 'pending--block', className)}>
      <span className="pending__dot" aria-hidden="true" />
      {children}
    </Tag>
  )
}

/** Renders value or a Pending badge when null/empty. */
export function Value({ value, fallback = 'To be confirmed' }) {
  if (value === null || value === undefined || value === '') return <Pending>{fallback}</Pending>
  return value
}
