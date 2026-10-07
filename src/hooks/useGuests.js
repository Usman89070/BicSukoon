import { useEffect, useState } from 'react'
import { guests as builtIn } from '../data/guests'

/** Admin panel API (PHP, see server/). Set VITE_API_URL when it lives elsewhere. */
const API = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

/**
 * Guests saved in the admin panel, or the built-in list until the panel has
 * been used (or when the API is unavailable, e.g. in development).
 */
export function useGuests() {
  const [list, setList] = useState(builtIn)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${API}/guests.php`, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.guests)) {
          setList(data.guests.map((g) => ({ ...g, photoUrl: g.photo ? `${API}/${g.photo}` : null })))
        }
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return list
}
