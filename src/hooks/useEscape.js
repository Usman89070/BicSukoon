import { useEffect } from 'react'

export function useEscape(active, onEscape) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && onEscape()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onEscape])
}
