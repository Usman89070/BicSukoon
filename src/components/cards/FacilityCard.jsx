import { useState } from 'react'
import { videos } from '../../data/videos'
import { SITE_ID } from '../../site'
import { useVideoSrc } from '../../hooks/useVideoSrc'
import Media from '../common/Media'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import Reveal from '../common/Reveal'
import FacilityLink from '../common/FacilityLink'
import VideoLightbox from '../video/VideoLightbox'

/**
 * Facility card. When the facility has a film on the server, the picture
 * area shows the website's logo with a play button that opens the film in
 * the viewer; the rest of the card links to the facility page.
 */
export default function FacilityCard({ facility, delay = 0 }) {
  const film = facility.media.video ? videos[facility.media.video] : null
  const src = useVideoSrc(film?.src)
  const [watching, setWatching] = useState(false)
  const brand = SITE_ID === 'sukoon' ? 'sukoon' : 'bic'

  return (
    <Reveal delay={delay} className={`facility-card${src ? ' facility-card--video' : ''}`}>
      {src && (
        <button type="button" className={`facility-card__film video__thumb video__thumb--${brand}`} onClick={() => setWatching(true)} aria-label={`Play video: ${facility.title}`}>
          {(facility.media.image ?? film.poster) && <img className="video__thumb-photo" src={facility.media.image ?? film.poster} alt="" loading="lazy" decoding="async" />}
          <span className="facility-card__logo"><Logo project={brand} tone="dark" height={brand === 'sukoon' ? 58 : 46} decorative /></span>
          <span className="facility-card__play" aria-hidden="true"><Icon name="play" size={24} /></span>
        </button>
      )}
      <FacilityLink facility={facility} className="facility-card__link">
        {!src && <Media src={facility.media.image} label={facility.media.label} ratio="4 / 3" className="facility-card__media" />}
        <div className="facility-card__body">
          <span className="facility-card__pillar">{facility.pillar}</span>
          <h3 className="facility-card__title">{facility.title}</h3>
          <p className="facility-card__text">{facility.summary}</p>
          <span className="facility-card__more">Learn more <Icon name="arrow" size={16} /></span>
        </div>
      </FacilityLink>
      {watching && <VideoLightbox title={facility.title} tag={film.caption} src={src} poster={film.poster} onClose={() => setWatching(false)} />}
    </Reveal>
  )
}
