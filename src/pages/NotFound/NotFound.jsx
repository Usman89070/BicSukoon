import Seo from '../../components/common/Seo'
import Button from '../../components/common/Button'
import Pattern from '../../components/common/Pattern'

export default function NotFound() {
  return (
    <section className="not-found">
      <Seo title="Page not found" noindex />
      <Pattern className="not-found__pattern" opacity={0.08} scale={90} />
      <div className="container not-found__inner">
        <p className="eyebrow eyebrow--light">404</p>
        <h1 className="page-hero__title">This page could not be found.</h1>
        <p className="page-hero__lead">The page may have moved. Let’s get you back on track.</p>
        <div className="btn-row">
          <Button to="/" variant="primary" icon="arrow">Back to home</Button>
          <Button to="/project-updates" variant="glass">Project Updates</Button>
        </div>
      </div>
    </section>
  )
}
