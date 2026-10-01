import { projects } from '../../data/projects'
import SectionHeader from '../../components/common/SectionHeader'
import ContactSection from '../../components/forms/ContactSection'
import ProjectShell from './ProjectShell'

export default function ProjectContactPage({ project }) {
  const p = projects[project]
  return (
    <ProjectShell project={project} title={`Contact ${p.name}`} heading="Contact Us" description={`Get in touch with the ${p.name} team.`} lead="We would love to hear from you." crumb="Contact" heroSize="sm">
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Get in touch" title="Send us a message" />
          <ContactSection project={project} />
        </div>
      </section>
    </ProjectShell>
  )
}
