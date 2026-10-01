import { SITE_ID, site } from '../site'
import Reveal from '../components/common/Reveal'
import SectionHeader from '../components/common/SectionHeader'
import ContactSection from '../components/forms/ContactSection'
import VideoFeature from '../components/video/VideoFeature'
import PageShell from './PageShell'

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      eyebrow="Get in touch"
      description={`Get in touch with the ${site.name} team.`}
      lead="Questions, enquiries or media — we would love to hear from you."
      heroSize="sm"
    >
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Get in touch" title="Send us a message" />
          <ContactSection />
        </div>
      </section>
      {SITE_ID === 'bic' && (
        <section className="section section--tight">
          <div className="container"><Reveal variant="scale"><VideoFeature id="contact" ratio="21 / 9" /></Reveal></div>
        </section>
      )}
    </PageShell>
  )
}
