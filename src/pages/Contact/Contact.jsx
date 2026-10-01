import Seo from '../../components/common/Seo'
import SectionHeader from '../../components/common/SectionHeader'
import PageHero from '../../components/hero/PageHero'
import ContactSection from '../../components/forms/ContactSection'

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description="Contact the Brisbane Islamic Centre and Sukoon Village teams." />
      <PageHero eyebrow="Contact" title="Get in touch." lead="Questions about the projects, donations, events or media — we would love to hear from you." media={{ label: 'Contact imagery' }} breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} size="sm" />
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Both projects" title="Contact details & enquiry form" />
          <ContactSection />
        </div>
      </section>
    </>
  )
}
