import { site } from '../site'
import { formatDate } from '../utils/format'
import { useEvents } from './useEvents'

const MAX_EVENTS_IN_MENU = 8

/**
 * The website's menu (data/sites.js) with live entries filled in: under
 * "Events" in the Community menu, each event added in the admin panel is
 * listed as its own page (newest first, up to MAX_EVENTS_IN_MENU).
 */
export function useNav() {
  const { events } = useEvents()
  if (!site.nav.some((n) => n.dynamic === 'events')) return site.nav
  const byDate = [...events].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  const eventLinks = byDate.slice(0, MAX_EVENTS_IN_MENU).map((e) => ({ label: e.title, to: `/events/${e.id}`, text: e.date ? formatDate(e.date) : undefined, sub: true }))
  return site.nav.map((n) => {
    if (n.dynamic !== 'events') return n
    const children = n.children.flatMap((c) => (c.to === '/events' ? [c, ...eventLinks] : [c]))
    return { ...n, children }
  })
}
