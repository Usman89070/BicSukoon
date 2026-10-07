import { videos } from '../../../data/videos'
import { imageFor } from '../../../utils/images'
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

const heroImage = imageFor(['hero-sukoon', 'site-300DPISukoon', 'portal-sukoon'])

/** Sukoon home: big visuals first, short copy. */
export default function SukoonHome() {
  return (
    <>
      <Seo />
      <StageHero
        eyebrow="Sukoon Village"
        title={<>A village for <em>every stage</em> of life.</>}
        image={heroImage}
        film={videos.sukoon}
        label="Village render"
        actions={[
          { label: 'Explore the village', href: '#facilities', variant: 'light', icon: 'arrow' },
          { label: 'Enquire', to: '/contact', variant: 'glass', icon: 'mail' },
        ]}
      />

      <section className="section sv-welcome">
        <div className="container">
          <Reveal className="sv-welcome__inner">
            <p className="sv-welcome__word">Sukoon</p>
            <p className="sv-welcome__text">means <em>peace</em>.</p>
          </Reveal>
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

      <section id="facilities" className="section" aria-labelledby="facilities-title">
        <div className="container container--wide">
          <SectionHeader eyebrow="Facilities" title={<span id="facilities-title">Everything in one place.</span>} />
          <DiscoverGrid />
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="film-title">
        <div className="container container--wide">
          <SectionHeader eyebrow="The film" title={<span id="film-title">See the village come to life.</span>} />
          <Reveal variant="scale"><VideoFeature id="sukoon" ratio="21 / 9" className="video--wide" /></Reveal>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="mp-title">
        <div className="container">
          <SectionHeader eyebrow="Masterplan" title={<span id="mp-title">Explore the village.</span>} />
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
