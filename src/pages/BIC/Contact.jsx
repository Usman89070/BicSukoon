import Reveal from '../../components/common/Reveal'
import SectionHeader from '../../components/common/SectionHeader'
import ContactSection from '../../components/forms/ContactSection'
import VideoFeature from '../../components/video/VideoFeature'
import ProjectShell from '../shared/ProjectShell'

export default function BicContact() {
  return (
    <ProjectShell project="bic" title="Contact Brisbane Islamic Centre" heading="Contact Us" description="Get in touch with the Brisbane Islamic Centre team." lead="We would love to hear from you." crumb="Contact Us" heroSize="sm">
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Get in touch" title="Send us a message" />
          <ContactSection project="bic" />
        </div>
      </section>
      <section className="section section--tight">
        <div className="container"><Reveal variant="scale"><VideoFeature id="contact" ratio="21 / 9" /></Reveal></div>
      </section>
    </ProjectShell>
  )
}
