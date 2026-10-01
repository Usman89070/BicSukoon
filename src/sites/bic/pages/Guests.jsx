import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import GuestGrid from '../../../components/guests/GuestGrid'
import VideoFeature from '../../../components/video/VideoFeature'
import PageShell from '../../../templates/PageShell'

export default function BicGuests() {
  return (
    <PageShell title="Honoured Guests" description="Distinguished guests who have visited and supported the Brisbane Islamic Centre." lead="Distinguished visitors who have shared in the journey.">
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="With gratitude" title="Our honoured guests" />
          <GuestGrid />
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Watch" title="Guest highlights" align="center" />
          <Reveal variant="scale"><VideoFeature id="guests" /></Reveal>
        </div>
      </section>
    </PageShell>
  )
}
