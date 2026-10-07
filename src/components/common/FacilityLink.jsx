import { Link } from 'react-router-dom'
import { SITE_ID, externalHref } from '../../site'

/**
 * Link to a facility page: on this website when the page exists here
 * (its project, or listed in `sites`), otherwise on the other website.
 */
export default function FacilityLink({ facility, to, project, children, ...rest }) {
  const path = to ?? facility?.path
  const local = facility?.sites?.includes(SITE_ID)
  const href = local ? null : externalHref(project ?? facility?.project, path)
  return href ? <a href={href} {...rest}>{children}</a> : <Link to={path} {...rest}>{children}</Link>
}
