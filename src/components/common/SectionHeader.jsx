import { cx } from '../../utils/format'
import Reveal from './Reveal'

export default function SectionHeader({ eyebrow, title, intro, align = 'left', as: H = 'h2', className, children }) {
  return (
    <Reveal className={cx('section-header', `section-header--${align}`, className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H className="section-title">{title}</H>
      {intro && <p className="section-intro">{intro}</p>}
      {children}
    </Reveal>
  )
}
