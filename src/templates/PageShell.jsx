import Seo from '../components/common/Seo'
import PageHero from '../components/hero/PageHero'

/** Standard interior page frame: SEO, hero with breadcrumbs, content. */
export default function PageShell({ title, description, eyebrow, heading, lead, media, heroActions, heroSize = 'md', children }) {
  return (
    <>
      <Seo title={title} description={description} />
      <PageHero
        eyebrow={eyebrow}
        title={heading ?? title}
        lead={lead}
        media={media ?? { label: `${title} imagery` }}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: heading ?? title }]}
        size={heroSize}
      >
        {heroActions}
      </PageHero>
      {children}
    </>
  )
}
