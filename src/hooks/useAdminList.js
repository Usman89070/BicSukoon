import { useEffect, useState } from 'react'

/** Admin panel API (PHP, see server/). Set VITE_API_URL when it lives elsewhere. */
export const API = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

/**
 * A list managed in the admin panel (e.g. 'guests', 'board'), or the
 * built-in list until the panel has been used (or when the API is
 * unavailable, e.g. in development).
 */
export function useAdminList(name, builtIn) {
  const [list, setList] = useState(builtIn)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${API}/${name}.php`, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.[name])) {
          setList(data[name].map((g) => ({ ...g, photoUrl: g.photo ? `${API}/${g.photo}` : null })))
        }
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [name])
  return list
}
