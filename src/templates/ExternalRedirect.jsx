import { useEffect } from 'react'

/** Sends visitors to a page that now lives on the other website. */
export default function ExternalRedirect({ href, label }) {
  useEffect(() => {
    window.location.replace(href)
  }, [href])
  return (
    <section className="section">
      <div className="container">
        <p>
          This page has moved to <a href={href}>{label}</a>.
        </p>
      </div>
    </section>
  )
}
