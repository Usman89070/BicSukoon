import { NavLink } from 'react-router-dom'

/** Sticky in-section navigation for BIC / Sukoon sub-pages. */
export default function SubNav({ label, links }) {
  return (
    <nav className="subnav" aria-label={label}>
      <div className="subnav__inner container">
        <ul>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
