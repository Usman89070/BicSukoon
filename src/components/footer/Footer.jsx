import { Link } from 'react-router-dom'
import { externalHref, site, urls } from '../../site'
import { formatPhoneHref } from '../../utils/format'
import Logo from '../common/Logo'
import Button from '../common/Button'
import Icon from '../common/Icon'
import SocialLinks from '../common/SocialLinks'
import Pattern from '../common/Pattern'
import { Value } from '../common/Pending'

/** Footer for the current website. The sister project appears only as a single outbound link. */
export default function Footer() {
  const year = new Date().getFullYear()
  const groups = site.nav.filter((n) => n.children)
  const singles = site.nav.filter((n) => !n.children && n.to !== '/')
  const { contact, legal, sister } = site
  const sisterUrl = sister.url ?? urls[sister.id]
  const tone = site.footerTone === 'light' ? 'light' : 'dark'

  return (
    <footer className={`footer footer--${tone}`}>
      <Pattern className="footer__pattern" opacity={0.05} scale={90} />
      <div className="container">
        <div className="footer__cta">
          <div>
            <p className="eyebrow">{site.features.donate ? 'Support the Vision' : 'Get in touch'}</p>
            <p className="footer__cta-title">
              {site.features.donate ? 'Help build the future of our community.' : 'We would love to hear from you.'}
            </p>
          </div>
          <div className="footer__cta-actions">
            <Button to={site.cta.to} href={site.cta.href} target={site.cta.target} rel={site.cta.rel} variant="primary" icon={site.cta.icon}>{site.features.donate ? 'Donate Now' : 'Enquire Now'}</Button>
            <Button to="/project-updates" variant="glass">Project Updates</Button>
          </div>
        </div>

        <div className="footer__grid" style={{ '--footer-cols': groups.length + 1 }}>
          <div className="footer__brand">
            <Logo project={site.id} tone={tone} height={44} />
            <p className="footer__tagline">{site.tagline}</p>
            <SocialLinks />
          </div>

          {groups.map((g) => (
            <nav key={g.label} aria-label={g.label} className="footer__col">
              <p className="footer__heading">{g.label}</p>
              <ul>
                {g.children.map((l) => {
                  const href = externalHref(l.site, l.to)
                  return <li key={l.label}>{href ? <a href={href}>{l.label}</a> : <Link to={l.to}>{l.label}</Link>}</li>
                })}
              </ul>
            </nav>
          ))}

          <div className="footer__col">
            <p className="footer__heading">Explore</p>
            <ul>{singles.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
            <p className="footer__heading footer__heading--spaced">Contact</p>
            <address className="footer__contact">
              <span><Value value={contact.address} fallback="Address to be confirmed" /></span>
              <span>{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <Value value={null} fallback="Email to be confirmed" />}</span>
              {contact.phone && <a href={formatPhoneHref(contact.phone)}>{contact.phone}</a>}
            </address>
          </div>
        </div>

        <div className="footer__links-out">
          <a className="footer__sister" href={urls.portal}>
            <Icon name="arrowLeft" size={16} />
            <span className="footer__sister-label">All projects</span>
          </a>
          {sisterUrl && (
            <a className="footer__sister" href={sisterUrl}>
              <span className="footer__sister-label">Also visit</span>
              <Logo project={sister.id} tone={tone} height={26} />
              <Icon name="arrow" size={16} />
            </a>
          )}
        </div>

        <div className="footer__base">
          <p>© {year} {legal.copyrightHolder ?? site.name}{legal.registrationNumber ? ` · ${legal.registrationNumber}` : ''}</p>
          {legal.links.length > 0 && (
            <ul className="footer__legal">
              {legal.links.map((l) => <li key={l.href}><Link to={l.href}>{l.label}</Link></li>)}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
