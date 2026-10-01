import { facilities, facilitiesFor } from '../../data/facilities'
import { videos } from '../../data/videos'
import SectionHeader from '../../components/common/SectionHeader'
import Reveal from '../../components/common/Reveal'
import Media from '../../components/common/Media'
import { Value } from '../../components/common/Pending'
import VideoFeature from '../../components/video/VideoFeature'
import FacilityCard from '../../components/cards/FacilityCard'
import ProjectShell from './ProjectShell'
import CtaBand from './CtaBand'

/** Generic, data-driven facility page (Masjid, Heritage Centre, Seniors, …). */
export default function FacilityPage({ id }) {
  const f = facilities[id]
  const related = facilitiesFor(f.project).filter((x) => x.id !== id)
  const videoId = f.media.video && videos[f.media.video] ? f.media.video : null

  return (
    <ProjectShell project={f.project} title={f.title} description={f.summary} eyebrow={f.eyebrow} lead={f.summary} media={f.media} crumb={f.shortTitle ?? f.title}>
      <section className="section">
        <div className="container facility-intro">
          <Reveal className="facility-intro__aside">
            <dl className="facts glass-panel">
              <div><dt>Project</dt><dd>{f.eyebrow}</dd></div>
              <div><dt>Theme</dt><dd>{f.pillar}</dd></div>
              <div><dt>Status</dt><dd><Value value={f.status} fallback="To be confirmed" /></dd></div>
            </dl>
          </Reveal>
          <div className="facility-intro__sections">
            {f.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 60} className="facility-block">
                <h2 className="facility-block__title">{s.heading}</h2>
                <p className="facility-block__text">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {videoId ? (
            <Reveal variant="scale"><VideoFeature id={videoId} /></Reveal>
          ) : (
            <div className="gallery">
              <Reveal variant="image" className="gallery__main"><Media label={`${f.title} — architectural render`} ratio="16 / 9" /></Reveal>
              <Reveal variant="image" delay={100}><Media label="Interior render" ratio="4 / 3" /></Reveal>
              <Reveal variant="image" delay={160}><Media label="Landscape render" ratio="4 / 3" /></Reveal>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--muted">
          <div className="container">
            <SectionHeader eyebrow="Explore further" title={`More from ${f.eyebrow}`} />
            <div className="card-grid">{related.map((r, i) => <FacilityCard key={r.id} facility={r} delay={i * 80} />)}</div>
          </div>
        </section>
      )}

      <CtaBand />
    </ProjectShell>
  )
}
