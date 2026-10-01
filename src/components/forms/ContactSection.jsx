import { site } from '../../site'
import { formatPhoneHref } from '../../utils/format'
import Icon from '../common/Icon'
import SocialLinks from '../common/SocialLinks'
import { Value } from '../common/Pending'
import Reveal from '../common/Reveal'
import ContactForm from './ContactForm'

export default function ContactSection() {
  const c = site.contact
  return (
    <div className="contact-layout">
      <Reveal className="contact-layout__details">
        <div className="contact-card glass-panel">
          <h3 className="contact-card__title">{site.name}</h3>
          <ul className="contact-card__list">
            <li><Icon name="pin" size={18} /><span><Value value={c.address} fallback="Address to be confirmed" /></span></li>
            <li><Icon name="phone" size={18} /><span>{c.phone ? <a href={formatPhoneHref(c.phone)}>{c.phone}</a> : <Value value={null} fallback="Phone to be confirmed" />}</span></li>
            <li><Icon name="mail" size={18} /><span>{c.email ? <a href={`mailto:${c.email}`}>{c.email}</a> : <Value value={null} fallback="Email to be confirmed" />}</span></li>
            {c.hours && <li><Icon name="clock" size={18} /><span>{c.hours}</span></li>}
          </ul>
          {c.mapEmbedUrl && <iframe className="contact-card__map" src={c.mapEmbedUrl} title={`Map — ${site.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />}
        </div>
        <div className="contact-card glass-panel">
          <h3 className="contact-card__title">Follow the journey</h3>
          <SocialLinks />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <ContactForm />
      </Reveal>
    </div>
  )
}
