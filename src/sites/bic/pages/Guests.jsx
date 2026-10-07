import { guests, guestsIntro } from '../../../data/guests'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import GuestGrid from '../../../components/guests/GuestGrid'
import VideoFeature from '../../../components/video/VideoFeature'
import PageShell from '../../../templates/PageShell'
import { heroImage } from '../images'

export default function BicGuests() {
  return (
    <PageShell
      title="Honoured Guests"
      description="Renowned Ulema, Islamic scholars and dignitaries who have visited and pledged their support for the Brisbane Islamic Centre."
      lead={`${guests.length} renowned scholars and dignitaries, local and international, have visited and pledged their support.`}
      media={{ image: heroImage, label: 'Brisbane Islamic Centre' }}
    >
      <section className="section">
        <div className="container container--wide">
          <div className="guests-intro">
            <SectionHeader eyebrow="With gratitude" title={guestsIntro.title} />
            <Reveal className="guests-intro__text" delay={80}><p>{guestsIntro.text}</p></Reveal>
          </div>
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
