import { useLocation } from 'react-router-dom'
import { site } from '../../data/site'

/**
 * Per-page metadata. React 19 hoists <title>, <meta> and <link> into <head>.
 */
export default function Seo({ title, description = site.defaultDescription, image = site.defaultOgImage, noindex = false }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${site.shortName}` : site.name
  const url = site.url ? `${site.url.replace(/\/$/, '')}${pathname}` : undefined
  const img = image && site.url && image.startsWith('/') ? `${site.url.replace(/\/$/, '')}${image}` : image
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {img && <meta property="og:image" content={img} />}
      <meta name="twitter:card" content={img ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
