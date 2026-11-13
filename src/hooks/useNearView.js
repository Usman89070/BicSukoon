import { useEffect, useState } from 'react'

let pageLoaded = typeof document !== 'undefined' && document.readyState === 'complete'
if (!pageLoaded && typeof window !== 'undefined') window.addEventListener('load', () => (pageLoaded = true), { once: true })

/**
 * True once the element is near the screen (within `margin`) and the page's
 * own pictures have finished loading, so videos never compete with the first
 * pictures for the connection. Stays true afterwards.
 */
export function useNearView(margin = '300px') {
  const [el, setEl] = useState(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    if (!el || near) return
    let seen = false
    let cancelled = false
    const ready = () => !cancelled && seen && pageLoaded && setNear(true)
    const onLoad = () => ready()
    window.addEventListener('load', onLoad, { once: true })
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          seen = true
          io.disconnect()
          ready()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      window.removeEventListener('load', onLoad)
    }
  }, [el, near, margin])
  return [setEl, near]
}
