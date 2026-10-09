import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { externalHref, site } from '../../site'
import { useScrolled } from '../../hooks/useScrolled'
import { useLockBody } from '../../hooks/useLockBody'
import { useEscape } from '../../hooks/useEscape'
import { useNav } from '../../hooks/useNav'
import { cx } from '../../utils/format'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import Button from '../common/Button'

/**
 * Floating glass navigation for the current website (BIC or Sukoon).
 * Menu items, logo, CTA and tone (dark / light) come from data/sites.js.
 */
export default function Navbar() {
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const closeTimer = useRef(0)
  const hoverOpened = useRef(false)
  const navRef = useRef(null)
  const tone = site.navTone
  // a menu with no entries yet (e.g. Events before any is added) is a plain link
  const nav = useNav().map((n) => (n.children && !n.children.length ? { label: n.label, to: n.to } : n))

  const closeAll = useCallback(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [])

  // Close menus on route change (derived-state pattern instead of an effect).
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpenMenu(null)
    setMobileOpen(false)
  }

  useLockBody(mobileOpen)
  useEscape(Boolean(openMenu) || mobileOpen, closeAll)

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
    hoverOpened.current = true
    setOpenMenu(label)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      hoverOpened.current = false
      setOpenMenu(null)
    }, 160)
  }
  // When a hover (or a tap's emulated hover) has just opened the menu, the
  // click that follows keeps it open instead of toggling it shut. Relies on a
  // ref, not state, because the hover update may not have rendered yet.
  const onToggle = (label) => {
    if (hoverOpened.current) {
      hoverOpened.current = false
      setOpenMenu(label)
      return
    }
    setOpenMenu((m) => (m === label ? null : label))
  }
  const groupActive = (item) => item.children.some((c) => !externalHref(c.site, c.to) && pathname === c.to)

  return (
    <header className={cx('nav', `nav--${tone}`, scrolled && 'nav--scrolled', mobileOpen && 'nav--mobile-open')} ref={navRef}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="nav__bar">
        <Link to="/" className="nav__brand" aria-label={`${site.name} — Home`}>
          <Logo project={site.id} tone={tone === 'light' ? 'light' : 'dark'} height={30} decorative />
        </Link>

        <nav className="nav__primary" aria-label="Primary">
          <ul className="nav__list">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label} className="nav__item" onMouseEnter={() => open(item.label)} onMouseLeave={scheduleClose}>
                  {item.to ? (
                    // a menu whose label is itself a page (Gallery): click opens the page
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => cx('nav__link', (isActive || groupActive(item)) && 'is-active')}
                      aria-haspopup="true"
                      aria-expanded={openMenu === item.label}
                      aria-controls={`menu-${item.label}`}
                      onFocus={() => open(item.label)}
                    >
                      {item.label}
                      <Icon name="chevron" size={14} className="nav__chev" />
                    </NavLink>
                  ) : (
                    <button
                      type="button"
                      className={cx('nav__link', groupActive(item) && 'is-active')}
                      aria-expanded={openMenu === item.label}
                      aria-controls={`menu-${item.label}`}
                      onClick={() => onToggle(item.label)}
                    >
                      {item.label}
                      <Icon name="chevron" size={14} className="nav__chev" />
                    </button>
                  )}
                  <div id={`menu-${item.label}`} className={cx('dropdown', openMenu === item.label && 'is-open')}>
                    <ul>
                      {item.children.map((c) => {
                        const body = (
                          <>
                            <span className="dropdown__label">{c.label}</span>
                            {c.text && <span className="dropdown__text">{c.text}</span>}
                          </>
                        )
                        const href = externalHref(c.site, c.to)
                        return (
                          <li key={c.label}>
                            {href ? (
                              <a href={href} className="dropdown__link">{body}</a>
                            ) : (
                              <NavLink to={c.to} end className="dropdown__link">{body}</NavLink>
                            )}
                          </li>
                        )
                      })}
                    </ul>
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
          <Button to={site.cta.to} href={site.cta.href} target={site.cta.target} rel={site.cta.rel} variant="primary" size="sm" className="nav__cta">{site.cta.label}</Button>
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

      <div id="mobile-menu" className={cx('mobile-menu', mobileOpen && 'is-open')} aria-hidden={!mobileOpen} inert={!mobileOpen}>
        <nav aria-label="Mobile" className="mobile-menu__inner">
          <ul>
            {nav.map((item, i) => (
              <li key={item.label} style={{ '--i': i }}>
                {item.children ? (
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
                        {item.to && <li><NavLink to={item.to} end>{item.allLabel ?? item.label}</NavLink></li>}
                        {item.children.map((c) => {
                          const href = externalHref(c.site, c.to)
                          return <li key={c.label}>{href ? <a href={href}>{c.label}</a> : <NavLink to={c.to} end>{c.label}</NavLink>}</li>
                        })}
                      </ul>
                    </div>
                  </>
                ) : (
                  <NavLink to={item.to} end={item.to === '/'} className="mobile-menu__link">{item.label}</NavLink>
                )}
              </li>
            ))}
          </ul>
          <Button to={site.cta.to} href={site.cta.href} target={site.cta.target} rel={site.cta.rel} variant="primary" className="mobile-menu__cta" icon={site.cta.icon}>{site.cta.label}</Button>
        </nav>
      </div>
    </header>
  )
}
