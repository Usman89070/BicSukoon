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
// one request per visit, shared by the menu, footer and pages
let request = null
const load = () =>
  (request ??= fetch(`${API}/events.php`, { headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => (Array.isArray(data?.events) ? data.events.map((e) => normalise({ ...e, photos: e.photos.map((p) => `${API}/${p}`) })) : null))
    .catch(() => null))

export function useEvents() {
  const [state, setState] = useState({ events: builtIn.filter((e) => !e.project || e.project === SITE_ID).map(normalise), loaded: false })
  useEffect(() => {
    let alive = true
    load().then((list) => alive && setState((st) => (list ? { events: list, loaded: true } : { ...st, loaded: true })))
    return () => {
      alive = false
    }
  }, [])
  return state
}
