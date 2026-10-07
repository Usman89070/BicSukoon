import { videos } from '../../../data/videos'
import Seo from '../../../components/common/Seo'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import SocialLinks from '../../../components/common/SocialLinks'
import Masterplan from '../../../components/masterplan/Masterplan'
import VideoFeature from '../../../components/video/VideoFeature'
import StageHero from '../../../components/showcase/StageHero'
import DiscoverGrid from '../../../components/showcase/DiscoverGrid'
import CompletedWorks from '../../../components/showcase/CompletedWorks'
import { heroImage } from '../images'

/** BIC home: big visuals first, short copy. */
export default function BicHome() {
  return (
    <>
      <Seo />
      <StageHero
        eyebrow="Brisbane Islamic Centre"
        title={<>A landmark for faith and heritage <em>in Brisbane.</em></>}
        image={heroImage}
        film={videos.hero}
        label="BIC aerial render"
        actions={[
          { label: 'Explore the facilities', href: '#facilities', variant: 'light', icon: 'arrow' },
          { label: 'Donate', to: '/donate', variant: 'glass', icon: 'heart' },
        ]}
      />

      <section id="facilities" className="section" aria-labelledby="facilities-title">
        <div className="container container--wide">
          <SectionHeader eyebrow="Facilities" title={<span id="facilities-title">Everything in one place.</span>} />
          <DiscoverGrid />
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="done-title">
        <div className="container container--wide">
          <SectionHeader eyebrow="Progress you can see" title={<span id="done-title">Already built.</span>} intro="This is not just an idea on paper.">
            <Button to="/project-status" variant="glass" icon="arrow">Project status</Button>
          </SectionHeader>
          <CompletedWorks />
        </div>
      </section>

      <section className="section" aria-labelledby="film-title">
        <div className="container container--wide">
          <SectionHeader eyebrow="The film" title={<span id="film-title">See it come to life.</span>} />
          <Reveal variant="scale"><VideoFeature id="masjid" ratio="21 / 9" className="video--wide" /></Reveal>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="mp-title">
        <div className="container">
          <SectionHeader eyebrow="Masterplan" title={<span id="mp-title">Explore the site.</span>} />
          <Masterplan />
        </div>
      </section>

      <section className="section section--tight social-band">
        <div className="container social-band__inner">
          <p className="social-band__title">Follow the journey</p>
          <SocialLinks />
        </div>
      </section>
    </>
  )
}
