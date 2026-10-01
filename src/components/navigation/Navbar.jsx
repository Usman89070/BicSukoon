import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '../../data/navigation'
import { useScrolled } from '../../hooks/useScrolled'
import { useLockBody } from '../../hooks/useLockBody'
import { useEscape } from '../../hooks/useEscape'
import { cx } from '../../utils/format'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import Button from '../common/Button'

export default function Navbar() {
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const closeTimer = useRef(0)
  const navRef = useRef(null)

  const closeAll = useCallback(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [])

  // Close menus on route change — derived-state pattern instead of an effect.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpenMenu(null)
    setMobileOpen(false)
  }

  useLockBody(mobileOpen)
  useEscape(Boolean(openMenu) || mobileOpen, closeAll)

  // Close desktop mega menu on outside click / touch
  useEffect(() => {
    if (!openMenu) return
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [openMenu])

  const open = (label) => {
    clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160)
  }

  const isSectionActive = (item) => item.to !== '/' && pathname.startsWith(item.to)

  return (
    <header className={cx('nav', scrolled && 'nav--scrolled', mobileOpen && 'nav--mobile-open')} ref={navRef}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="nav__bar glass">
        <Link to="/" className="nav__brand" aria-label="Brisbane Islamic Centre & Sukoon Village — Home">
          <Logo project="bic" showName={false} size={scrolled ? 36 : 42} />
          <span className="nav__brand-divider" aria-hidden="true" />
          <Logo project="sukoon" showName={false} size={scrolled ? 36 : 42} />
          <span className="nav__brand-text">
            <span>Brisbane Islamic Centre</span>
            <span>Sukoon Village</span>
          </span>
        </Link>

        <nav className="nav__primary" aria-label="Primary">
          <ul className="nav__list">
            {primaryNav.map((item) =>
              item.groups ? (
                <li
                  key={item.label}
                  className={cx('nav__item has-menu', item.project && `theme-${item.project}`)}
                  onMouseEnter={() => open(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className={cx('nav__link', isSectionActive(item) && 'is-active')}
                    aria-expanded={openMenu === item.label}
                    aria-controls={`mega-${item.project}`}
                    onClick={() => setOpenMenu((m) => (m === item.label ? null : item.label))}
                  >
                    {item.short ?? item.label}
                    <Icon name="chevron" size={14} className="nav__chev" />
                  </button>
                  <div
                    id={`mega-${item.project}`}
                    className={cx('mega glass', openMenu === item.label && 'is-open')}
                    onMouseEnter={() => open(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="mega__intro">
                      <Logo project={item.project} showName={false} size={48} />
                      <p className="mega__title">{item.label}</p>
                      <p className="mega__text">{item.intro}</p>
                      <Link to={item.to} className="mega__cta">
                        Explore {item.short ?? item.label} <Icon name="arrow" size={16} />
                      </Link>
                    </div>
                    {item.groups.map((g) => (
                      <div key={g.title} className="mega__group">
                        <p className="mega__group-title">{g.title}</p>
                        <ul>
                          {g.links.map((l) => (
                            <li key={l.to}>
                              <NavLink to={l.to} end className="mega__link">
                                {l.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.label} className="nav__item">
                  <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => cx('nav__link', isActive && 'is-active')}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="nav__actions">
          <Button to="/donate" variant="primary" size="sm" className="nav__donate">Donate</Button>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={cx('mobile-menu', mobileOpen && 'is-open')} aria-hidden={!mobileOpen} inert={!mobileOpen}>
        <nav aria-label="Mobile" className="mobile-menu__inner">
          <ul>
            {primaryNav.map((item, i) => (
              <li key={item.label} className={cx(item.project && `theme-${item.project}`)} style={{ '--i': i }}>
                {item.groups ? (
                  <>
                    <button
                      type="button"
                      className="mobile-menu__link"
                      aria-expanded={mobileSection === item.label}
                      onClick={() => setMobileSection((s) => (s === item.label ? null : item.label))}
                    >
                      {item.label}
                      <Icon name="chevron" size={20} className="mobile-menu__chev" />
                    </button>
                    <div className={cx('mobile-menu__sub', mobileSection === item.label && 'is-open')}>
                      <ul>
                        {item.groups.flatMap((g) => g.links).map((l) => (
                          <li key={l.to}>
                            <NavLink to={l.to} end>{l.label}</NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <NavLink to={item.to} end={item.to === '/'} className="mobile-menu__link">
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <Button to="/donate" variant="primary" className="mobile-menu__donate" icon="heart">Donate Now</Button>
        </nav>
      </div>
    </header>
  )
}
