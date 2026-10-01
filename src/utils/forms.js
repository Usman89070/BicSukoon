/**
 * Integration-ready form submission. If no endpoint is configured the call
 * resolves with { ok: false, reason: 'not-configured' } so the UI can be
 * honest that the form is not yet connected — nothing is silently dropped.
 */
export async function submitForm(endpoint, payload) {
  if (!endpoint) return { ok: false, reason: 'not-configured' }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok ? { ok: true } : { ok: false, reason: 'error' }
  } catch {
    return { ok: false, reason: 'error' }
  }
}

export const endpoints = {
  contact: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  donation: import.meta.env.VITE_DONATION_ENDPOINT || '',
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
