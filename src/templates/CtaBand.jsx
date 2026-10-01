import { site } from '../site'
import Button from '../components/common/Button'
import Pattern from '../components/common/Pattern'
import Reveal from '../components/common/Reveal'

const defaults = {
  bic: {
    eyebrow: 'Support the Vision',
    title: 'Help build the future.',
    text: 'Every contribution helps bring the Brisbane Islamic Centre closer for our community and for generations to come.',
    primary: { label: 'Donate Now', to: '/donate', icon: 'heart' },
    secondary: { label: 'Project Updates', to: '/project-updates' },
  },
  sukoon: {
    eyebrow: 'Find out more',
    title: 'A place to belong, at every stage of life.',
    text: 'Register your interest or ask us anything about Sukoon Village — we would love to hear from you.',
    primary: { label: 'Enquire Now', to: '/contact', icon: 'mail' },
    secondary: { label: 'Project Updates', to: '/project-updates' },
  },
}

export default function CtaBand(props) {
  const { eyebrow, title, text, primary, secondary } = { ...defaults[site.id], ...props }
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
              <Button to={primary.to} variant="primary" icon={primary.icon}>{primary.label}</Button>
              {secondary && <Button to={secondary.to} variant="glass">{secondary.label}</Button>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
