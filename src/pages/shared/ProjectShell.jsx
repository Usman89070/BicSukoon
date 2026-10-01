import { primaryNav } from '../../data/navigation'
import { projects } from '../../data/projects'
import Seo from '../../components/common/Seo'
import SubNav from '../../components/common/SubNav'
import PageHero from '../../components/hero/PageHero'

/** Consistent frame for every BIC / Sukoon page: SEO, hero, sticky sub-nav. */
export default function ProjectShell({ project, title, description, eyebrow, heading, lead, media, crumb, heroActions, heroSize = 'md', children }) {
  const p = projects[project]
  const nav = primaryNav.find((n) => n.project === project)
  const links = nav.groups.flatMap((g) => g.links)
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: p.name, to: p.path }, ...(crumb ? [{ label: crumb }] : [])]
  return (
    <div className={p.theme}>
      <Seo title={title} description={description} />
      <PageHero eyebrow={eyebrow ?? p.name} title={heading ?? title} lead={lead} media={media ?? p.media} breadcrumbs={breadcrumbs} size={heroSize}>
        {heroActions}
      </PageHero>
      <SubNav label={`${p.name} pages`} links={links} />
      {children}
    </div>
  )
}
