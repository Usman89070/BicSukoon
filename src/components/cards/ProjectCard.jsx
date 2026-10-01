import { Link } from 'react-router-dom'
import { cx } from '../../utils/format'
import Logo from '../common/Logo'
import Media from '../common/Media'
import Icon from '../common/Icon'
import Reveal from '../common/Reveal'

/** Landing project card: logo, media, glass overlay, project accent. */
export default function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal variant="scale" delay={delay} className={cx('project-card', project.theme)}>
      <Link to={project.path} className="project-card__link" aria-label={`Explore ${project.name}`}>
        <div className="project-card__media">
          {project.media.video ? (
            <video autoPlay muted loop playsInline preload="none" aria-hidden="true"><source src={project.media.video} /></video>
          ) : (
            <Media src={project.media.image} label={project.media.label} />
          )}
        </div>
        <div className="project-card__shade" />
        <div className="project-card__body glass">
          <div className="project-card__head">
            <Logo project={project.id} showName={false} size={52} />
            <span className="project-card__eyebrow">{project.eyebrow}</span>
          </div>
          <h3 className="project-card__title">{project.name}</h3>
          <p className="project-card__intro">{project.intro}</p>
          <p className="project-card__desc">{project.description}</p>
          <span className="project-card__cta">
            Explore {project.short} <Icon name="arrow" size={18} />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
