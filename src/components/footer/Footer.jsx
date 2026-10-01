import { Link } from 'react-router-dom'
import { contacts, site } from '../../data/site'
import { primaryNav } from '../../data/navigation'
import Logo from '../common/Logo'
import Button from '../common/Button'
import SocialLinks from '../common/SocialLinks'
import Pattern from '../common/Pattern'
import { Value } from '../common/Pending'

export default function Footer() {
  const year = new Date().getFullYear()
  const bic = primaryNav.find((n) => n.project === 'bic')
  const sv = primaryNav.find((n) => n.project === 'sukoon')

  return (
    <footer className="footer">
      <Pattern className="footer__pattern" opacity={0.05} scale={90} />
      <div className="container">
        <div className="footer__cta glass">
          <div>
            <p className="eyebrow">Support the Vision</p>
            <p className="footer__cta-title">Help build the future of our community.</p>
          </div>
          <div className="footer__cta-actions">
            <Button to="/donate" variant="primary" icon="heart">Donate Now</Button>
            <Button to="/project-updates" variant="glass">Project Updates</Button>
          </div>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logos">
              <Logo project="bic" height={40} />
              <Logo project="sukoon" height={40} />
            </div>
            <p className="footer__tagline">{site.tagline}</p>
            <SocialLinks />
          </div>

          <nav aria-label="Brisbane Islamic Centre" className="footer__col theme-bic">
            <p className="footer__heading">Brisbane Islamic Centre</p>
            <ul>{bic.groups.flatMap((g) => g.links).map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </nav>

          <nav aria-label="Sukoon Village" className="footer__col theme-sukoon">
            <p className="footer__heading">Sukoon Village</p>
            <ul>{sv.groups.flatMap((g) => g.links).map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </nav>

          <div className="footer__col">
            <p className="footer__heading">Explore</p>
            <ul>
              <li><Link to="/vision">Vision</Link></li>
              <li><Link to="/project-updates">Project Updates</Link></li>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <p className="footer__heading footer__heading--spaced">Contact</p>
            <address className="footer__contact">
              <span><Value value={contacts.bic.address} fallback="Address to be confirmed" /></span>
              <span>{contacts.bic.email ? <a href={`mailto:${contacts.bic.email}`}>{contacts.bic.email}</a> : <Value value={null} fallback="Email to be confirmed" />}</span>
              {contacts.bic.phone && <a href={`tel:${contacts.bic.phone.replace(/\s/g, '')}`}>{contacts.bic.phone}</a>}
            </address>
          </div>
        </div>

        <div className="footer__base">
          <p>© {year} {site.copyrightHolder ?? site.name}{site.registrationNumber ? ` · ${site.registrationNumber}` : ''}</p>
          {site.legalLinks.length > 0 && (
            <ul className="footer__legal">
              {site.legalLinks.map((l) => <li key={l.href}><Link to={l.href}>{l.label}</Link></li>)}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
