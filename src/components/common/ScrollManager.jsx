import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll to top on navigation, or to #hash when present. Pages load lazily,
 * so the target is looked for again for a moment until it appears.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let tries = 0
    let timer
    const find = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (++tries < 20) timer = setTimeout(find, 100)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    find()
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}
