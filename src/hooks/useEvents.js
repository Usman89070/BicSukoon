import { useEffect, useState } from 'react'
import { events as builtIn } from '../data/events'
import { SITE_ID } from '../site'
import { API } from './useAdminList'

const normalise = (e) => ({
  id: String(e.id),
  title: e.title,
  date: e.date || null,
  time: e.time || null,
  location: e.location || null,
  body: e.body ?? e.description ?? '',
  photos: e.photos ?? (e.image?.src ? [e.image.src] : []),
})

/**
 * Events (each with a photo album) from the admin panel (Events tab), or the
 * built-in list until the panel has been used. `loaded` turns true once
 * the panel has answered (or failed), so pages can wait before saying
 * "not found".
 */
export function useEvents() {
  const [state, setState] = useState({ events: builtIn.filter((e) => !e.project || e.project === SITE_ID).map(normalise), loaded: false })
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${API}/events.php`, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.events)) {
          setState({ events: data.events.map((e) => normalise({ ...e, photos: e.photos.map((p) => `${API}/${p}`) })), loaded: true })
        } else {
          setState((s) => ({ ...s, loaded: true }))
        }
      })
      .catch(() => setState((s) => (ctrl.signal.aborted ? s : { ...s, loaded: true })))
    return () => ctrl.abort()
  }, [])
  return state
}
