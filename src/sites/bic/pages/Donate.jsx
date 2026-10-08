import { pillars } from '../../../data/vision'
import { SITE_ID } from '../../../site'
import { impactStats, transparency, donateLink } from '../../../data/donation'
import { formatDate } from '../../../utils/format'
import Seo from '../../../components/common/Seo'
import SectionHeader from '../../../components/common/SectionHeader'
import Reveal from '../../../components/common/Reveal'
import Pending from '../../../components/common/Pending'
import Button from '../../../components/common/Button'
import Icon from '../../../components/common/Icon'
import PageHero from '../../../components/hero/PageHero'
import VideoFeature from '../../../components/video/VideoFeature'
import AllocationCards from '../../../components/donation/AllocationCards'
import FundingProgress from '../../../components/donation/FundingProgress'
import CtaBand from '../../../templates/CtaBand'

function TransparencyColumn({ title, items, empty, render }) {
  return (
    <div className="transparency__col glass-panel">
      <h3 className="transparency__title">{title}</h3>
      {items.length ? <ul className="doc-list">{items.map(render)}</ul> : <Pending>{empty}</Pending>}
    </div>
  )
}

export default function Donate() {
  return (
    <>
      <Seo title="Donate" description="Support the Brisbane Islamic Centre. Help build a legacy of Faith, Knowledge, Community and Legacy." />

      <PageHero
        eyebrow="Support the Vision"
        title="Help build a legacy for generations."
        lead="Your support helps bring a place of worship, learning and heritage to life — for today and for those who come after us."
        media={{ label: 'Donate film / architectural render' }}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Donate' }]}
        size="lg"
      >
        <Button {...donateLink} variant="primary" icon="heart" size="lg">Donate Now</Button>
        <Button href="#where" variant="glass">Where your support goes</Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Why support this project" title="Every contribution becomes part of something lasting." intro="Support connects directly to the four themes at the heart of the centre." />
          <div className="why-grid">
            {pillars[SITE_ID].map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="why-card glass-panel">
                <span className="why-card__num" aria-hidden="true">0{i + 1}</span>
                <h3 className="why-card__title">{p.title}</h3>
                <p className="why-card__text">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split split--center">
          <SectionHeader eyebrow="Watch" title="Why your support matters." intro="A short film on the vision and the community behind it." />
          <Reveal variant="scale"><VideoFeature id="donate" /></Reveal>
        </div>
      </section>

      <section className="section" id="where">
        <div className="container">
          <SectionHeader eyebrow="Where your support goes" title="Choose an area close to your heart." />
          <AllocationCards />
        </div>
      </section>

      <section className="section section--muted donate-section" id="donate-form">
        <div className="container donate-layout">
          <div className="donate-layout__aside">
            <SectionHeader eyebrow="Make a donation" title="Simple, secure giving." intro="Donations are made through the Brisbane Islamic Centre's official Square checkout." />
            <FundingProgress />
          </div>
          <Reveal className="donate-square glass-panel">
            <span className="donate-square__icon" aria-hidden="true"><Icon name="heart" size={28} /></span>
            <h3 className="donate-square__title">Donate to Brisbane Islamic Centre</h3>
            <p className="donate-square__text">You will be taken to Square's secure checkout to choose your amount and complete your donation.</p>
            <Button {...donateLink} variant="primary" icon="arrow" size="lg" className="donate-square__btn">Donate securely with Square</Button>
            <p className="donate-square__note"><Icon name="check" size={16} /> Opens in a new tab · Secure payment by Square</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Impact" title="What your support makes possible." />
          {impactStats.length ? (
            <dl className="impact">
              {impactStats.map((s, i) => (
                <Reveal key={s.id} delay={i * 80} className="impact__item">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </Reveal>
              ))}
            </dl>
          ) : (
            <Pending block>Impact statistics will be displayed here once official figures are published.</Pending>
          )}
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeader eyebrow="Transparency" title="Accountable to our community." intro="Funding information, milestones, financial updates and official documents will be shared here." />
          <div className="transparency">
            <TransparencyColumn title="Official documents" items={transparency.documents} empty="Documents to be published"
              render={(d) => <li key={d.id}><a href={d.href}><Icon name="doc" size={18} /> {d.title}{d.type && <small>{d.type}</small>}</a></li>} />
            <TransparencyColumn title="Development milestones" items={transparency.milestones} empty="Milestones to be published"
              render={(m) => <li key={m.id}>{m.title}{m.date && <small>{formatDate(m.date)}</small>}</li>} />
            <TransparencyColumn title="Financial updates" items={transparency.financialUpdates} empty="Financial updates to be published"
              render={(f) => <li key={f.id}>{f.title}{f.date && <small>{formatDate(f.date)}</small>}</li>} />
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Support the Vision" title="Help Build the Future." primary={{ label: 'Donate Now', ...donateLink, icon: 'heart' }} secondary={{ label: 'Explore the Vision', to: '/vision' }} />
    </>
  )
}
