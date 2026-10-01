import { useEffect, useRef } from 'react'

/** Lightweight parallax via a CSS variable; disabled for reduced motion. */
export function useParallax(strength = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -strength
      el.style.setProperty('--parallax', `${offset.toFixed(1)}px`)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [strength])
  return ref
}
