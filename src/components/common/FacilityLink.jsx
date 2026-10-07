import { Link } from 'react-router-dom'
import { externalHref } from '../../site'

/** Link to a facility page, on this website or (when it lives there) the other one. */
export default function FacilityLink({ facility, to, project, children, ...rest }) {
  const path = to ?? facility?.path
  const href = externalHref(project ?? facility?.project, path)
  return href ? <a href={href} {...rest}>{children}</a> : <Link to={path} {...rest}>{children}</Link>
}
