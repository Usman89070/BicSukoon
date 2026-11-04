import { facilities, facilitiesFor } from '../data/facilities'
import { videos } from '../data/videos'
import SectionHeader from '../components/common/SectionHeader'
import Reveal from '../components/common/Reveal'
import VideoFeature from '../components/video/VideoFeature'
import Media from '../components/common/Media'
import FacilityCard from '../components/cards/FacilityCard'
import PageShell from './PageShell'
import CtaBand from './CtaBand'

/** Data-driven facility page (Masjid Complex, Seniors Living, …). */
export default function FacilityPage({ id }) {
  const f = facilities[id]
  const related = facilitiesFor(f.project).filter((x) => x.id !== id)
  const videoId = f.media.video && videos[f.media.video] ? f.media.video : null

  return (
    <PageShell title={f.title} description={f.summary} eyebrow={f.pillar} lead={f.summary} media={f.media}>
      <section className="section">
        <div className="container facility-intro">
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

      {/* the facility's film; no "render coming soon" placeholders without one */}
      {/* the facility's film, else its large picture; no "render coming soon" placeholders */}
      {(videoId || f.photo) && (
        <section className="section section--tight">
          <div className="container">
            {videoId ? (
              <Reveal variant="scale"><VideoFeature id={videoId} /></Reveal>
            ) : (
              <Reveal variant="image"><Media src={f.photo} label={f.media.label} ratio="16 / 9" /></Reveal>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section section--muted">
          <div className="container">
            <SectionHeader eyebrow="Explore further" title="Also part of the project" />
            <div className="card-grid">{related.map((r, i) => <FacilityCard key={r.id} facility={r} delay={i * 80} />)}</div>
          </div>
        </section>
      )}

      <CtaBand />
    </PageShell>
  )
}
