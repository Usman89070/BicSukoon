import { useId, useState } from 'react'
import { SITE_ID } from '../../site'
import { allocations, donation } from '../../data/donation'
import { cx, formatCurrency } from '../../utils/format'
import { endpoints, isEmail, submitForm } from '../../utils/forms'
import Icon from '../common/Icon'
import Pending from '../common/Pending'

/**
 * Integration-ready donation form. It collects intent and hands off to the
 * configured provider (hosted checkout URL or endpoint). No payment gateway,
 * bank details or account numbers are invented.
 */
export default function DonationForm() {
  const uid = useId()
  const [amount, setAmount] = useState(donation.presetAmounts[1] ?? donation.presetAmounts[0])
  const [custom, setCustom] = useState('')
  const [frequency, setFrequency] = useState('once')
  const [form, setForm] = useState({ name: '', email: '', allocation: 'general', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | not-configured | error

  const value = custom ? Number(custom) : amount
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const paymentReady = Boolean(donation.payment.checkoutUrl || endpoints.donation)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!isEmail(form.email)) e.email = 'Please enter a valid email address.'
    if (!value || value < donation.minimumAmount) e.amount = `Please enter an amount of at least ${formatCurrency(donation.minimumAmount, donation.currency)}.`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const payload = { ...form, amount: value, currency: donation.currency, frequency }
    if (donation.payment.checkoutUrl) {
      const url = new URL(donation.payment.checkoutUrl)
      url.searchParams.set('amount', String(value))
      url.searchParams.set('frequency', frequency)
      window.location.assign(url.toString())
      return
    }
    setStatus('sending')
    const res = await submitForm(endpoints.donation, payload)
    setStatus(res.ok ? 'done' : res.reason)
  }

  if (status === 'done') {
    return (
      <div className="form-success glass-panel" role="status">
        <Icon name="check" size={32} />
        <h3>Thank you, {form.name.split(' ')[0]}.</h3>
        <p>Your donation details have been received. You will be guided through the secure payment step.</p>
      </div>
    )
  }

  return (
    <form className="donate-form glass-panel" onSubmit={onSubmit} noValidate aria-describedby={`${uid}-note`}>
      <fieldset className="donate-form__set">
        <legend className="donate-form__legend"><span>1</span> Choose frequency</legend>
        <div className="segmented" role="radiogroup" aria-label="Donation frequency">
          {donation.frequencies.map((f) => {
            const disabled = f.requiresRecurringSupport && !donation.recurringSupported
            return (
              <label key={f.id} className={cx('segmented__opt', frequency === f.id && 'is-active', disabled && 'is-disabled')}>
                <input type="radio" name="frequency" value={f.id} checked={frequency === f.id} disabled={disabled} onChange={() => setFrequency(f.id)} />
                {f.label}
                {disabled && <small>Coming soon</small>}
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="donate-form__set">
        <legend className="donate-form__legend"><span>2</span> Select an amount ({donation.currency})</legend>
        <div className="amounts">
          {donation.presetAmounts.map((a) => (
            <label key={a} className={cx('amount', !custom && amount === a && 'is-active')}>
              <input type="radio" name="amount" value={a} checked={!custom && amount === a} onChange={() => { setAmount(a); setCustom('') }} />
              {formatCurrency(a, donation.currency)}
            </label>
          ))}
          <label className={cx('amount amount--custom', custom && 'is-active')}>
            <span className="sr-only">Custom amount</span>
            <span aria-hidden="true">$</span>
            <input type="number" inputMode="decimal" min={donation.minimumAmount} step="1" placeholder="Other amount" value={custom} onChange={(e) => setCustom(e.target.value)} aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? `${uid}-amount-err` : undefined} />
          </label>
        </div>
        {errors.amount && <p className="field__error" id={`${uid}-amount-err`}>{errors.amount}</p>}
      </fieldset>

      <fieldset className="donate-form__set">
        <legend className="donate-form__legend"><span>3</span> Your details</legend>
        <div className="field-row">
          <div className="field">
            <label htmlFor={`${uid}-name`}>Full name</label>
            <input id={`${uid}-name`} autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${uid}-name-err` : undefined} required />
            {errors.name && <p className="field__error" id={`${uid}-name-err`}>{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor={`${uid}-email`}>Email</label>
            <input id={`${uid}-email`} type="email" autoComplete="email" value={form.email} onChange={set('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${uid}-email-err` : undefined} required />
            {errors.email && <p className="field__error" id={`${uid}-email-err`}>{errors.email}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-alloc`}>Direct my support to</label>
          <select id={`${uid}-alloc`} value={form.allocation} onChange={set('allocation')}>
            <option value="general">Where it is needed most</option>
            {allocations.filter((a) => a.project === SITE_ID).map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-msg`}>Message or reference <span className="field__opt">(optional)</span></label>
          <textarea id={`${uid}-msg`} rows={3} value={form.message} onChange={set('message')} />
        </div>
      </fieldset>

      <fieldset className="donate-form__set">
        <legend className="donate-form__legend"><span>4</span> Payment</legend>
        <div className="payment-slot">
          <Icon name="layers" size={22} />
          {paymentReady ? (
            <p>You will continue to our secure payment provider to complete your donation.</p>
          ) : (
            <div>
              <p>Secure online payment will be connected here once the official payment provider is confirmed.</p>
              <Pending>Payment gateway to be confirmed</Pending>
            </div>
          )}
        </div>
      </fieldset>

      <div className="donate-form__footer">
        <p className="donate-form__total">
          <span>{frequency === 'monthly' ? 'Monthly donation' : 'Your donation'}</span>
          <strong>{value ? formatCurrency(value, donation.currency) : '—'}</strong>
        </p>
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
          <Icon name="heart" size={18} />
          <span>{status === 'sending' ? 'Processing…' : 'Donate Now'}</span>
        </button>
      </div>

      <div id={`${uid}-note`} aria-live="polite">
        {status === 'not-configured' && (
          <p className="form-notice">Online donations are not yet connected. Thank you for your patience — please check back soon or contact the team directly.</p>
        )}
        {status === 'error' && <p className="form-notice form-notice--error">Something went wrong. Please try again.</p>}
        {donation.taxDeductibleStatement && <p className="donate-form__fine">{donation.taxDeductibleStatement}</p>}
      </div>
    </form>
  )
}
