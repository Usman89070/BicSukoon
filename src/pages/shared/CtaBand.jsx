import Button from '../../components/common/Button'
import Pattern from '../../components/common/Pattern'
import Reveal from '../../components/common/Reveal'

export default function CtaBand({
  eyebrow = 'Support the Vision',
  title = 'Help build the future.',
  text = 'Every contribution helps bring this vision closer for our community and for generations to come.',
  primary = { label: 'Donate Now', to: '/donate' },
  secondary = { label: 'Project Updates', to: '/project-updates' },
}) {
  return (
    <section className="cta-band section">
      <div className="container">
        <Reveal variant="scale" className="cta-band__inner">
          <Pattern className="cta-band__pattern" opacity={0.12} scale={80} />
          <div className="cta-band__content">
            <p className="eyebrow eyebrow--light">{eyebrow}</p>
            <h2 className="cta-band__title">{title}</h2>
            <p className="cta-band__text">{text}</p>
            <div className="cta-band__actions">
              <Button to={primary.to} variant="primary" icon="heart">{primary.label}</Button>
              {secondary && <Button to={secondary.to} variant="glass">{secondary.label}</Button>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
