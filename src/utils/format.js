export function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-AU', opts)
}

export function formatCurrency(value, currency = 'AUD', maximumFractionDigits = 0) {
  if (value == null || value === '') return null
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency, maximumFractionDigits }).format(value)
}

/** Newest → oldest; undated entries last. */
export function sortByDateDesc(items) {
  return [...items].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })
}

export function isUpcoming(iso) {
  if (!iso) return true
  const today = new Date().toISOString().slice(0, 10)
  return iso >= today
}

export const cx = (...parts) => parts.filter(Boolean).join(' ')
