import { funding } from '../../data/funding'
import { transparency } from '../../data/donation'
import SectionHeader from '../../components/common/SectionHeader'
import Reveal from '../../components/common/Reveal'
import Pending from '../../components/common/Pending'
import Button from '../../components/common/Button'
import FundingProgress from '../../components/donation/FundingProgress'
import AllocationCards from '../../components/donation/AllocationCards'
import VideoFeature from '../../components/video/VideoFeature'
import ProjectShell from '../shared/ProjectShell'
import CtaBand from '../shared/CtaBand'

export default function BicFunding() {
  return (
    <ProjectShell project="bic" title="Project Funding" description="Why funding is needed, what it supports and how the community can help build the Brisbane Islamic Centre." lead="Why funding is needed, what it supports and how you can help." crumb="Project Funding"
      heroActions={<Button to="/donate" variant="primary" icon="heart">Donate Now</Button>}>
      <section className="section">
        <div className="container split">
          <div className="stack">
            {funding.needs.map((n, i) => (
              <Reveal key={n.id} delay={i * 80} className="facility-block">
                <h2 className="facility-block__title">{n.title}</h2>
                <p className="facility-block__text">{n.body}</p>
                {n.pending && <Pending>Official information to be supplied</Pending>}
              </Reveal>
            ))}
          </div>
          <Reveal><FundingProgress /></Reveal>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="Watch" title="Why your support matters" align="center" />
          <Reveal variant="scale"><VideoFeature id="funding" /></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Where support goes" title="Every area of the precinct." />
          <AllocationCards />
        </div>
      </section>
      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Transparency" title="Official documents & updates" />
          {transparency.documents.length ? (
            <ul className="doc-list">{transparency.documents.map((d) => <li key={d.id}><a href={d.href}>{d.title}</a></li>)}</ul>
          ) : (
            <Pending block>Official funding documents will be published here.</Pending>
          )}
        </div>
      </section>
      <CtaBand />
    </ProjectShell>
  )
}
