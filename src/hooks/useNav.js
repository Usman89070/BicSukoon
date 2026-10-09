import { site } from '../site'
import { formatDate } from '../utils/format'
import { useEvents } from './useEvents'

const MAX_EVENTS_IN_MENU = 8

/**
 * The website's menu (data/sites.js) with live entries filled in: the
 * Events menu lists each event added in the admin panel as its own page
 * (newest first), plus "All events" when there are more than fit.
 */
export function useNav() {
  const { events } = useEvents()
  if (!site.nav.some((n) => n.dynamic === 'events')) return site.nav
  const byDate = [...events].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  const eventLinks = byDate.slice(0, MAX_EVENTS_IN_MENU).map((e) => ({ label: e.title, to: `/events/${e.id}`, text: e.date ? formatDate(e.date) : undefined }))
  if (byDate.length > MAX_EVENTS_IN_MENU) eventLinks.push({ label: 'All events', to: '/events', text: `See all ${byDate.length} events` })
  return site.nav.map((n) => (n.dynamic === 'events' ? { ...n, children: eventLinks } : n))
}
