import { useId, useState } from 'react'
import { site } from '../../site'
import { endpoints, isEmail, submitForm } from '../../utils/forms'
import Icon from '../common/Icon'

export default function ContactForm() {
  const uid = useId()
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: site.enquiryTopics[0], message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!isEmail(form.email)) e.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 5) e.message = 'Please enter a message.'
    setErrors(e)
    if (Object.keys(e).length) return
    setStatus('sending')
    const res = await submitForm(endpoints.contact, { ...form, site: site.id })
    setStatus(res.ok ? 'done' : res.reason)
  }

  if (status === 'done') {
    return (
      <div className="form-success glass-panel" role="status">
        <Icon name="check" size={32} />
        <h3>Thank you for getting in touch.</h3>
        <p>Your message has been sent. The team will respond as soon as possible.</p>
      </div>
    )
  }

  const err = (k) => errors[k] && <p className="field__error" id={`${uid}-${k}-err`}>{errors[k]}</p>
  const aria = (k) => ({ 'aria-invalid': Boolean(errors[k]), 'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined })

  return (
    <form className="contact-form glass-panel" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Full name</label>
          <input id={`${uid}-name`} autoComplete="name" value={form.name} onChange={set('name')} {...aria('name')} required />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-email`}>Email</label>
          <input id={`${uid}-email`} type="email" autoComplete="email" value={form.email} onChange={set('email')} {...aria('email')} required />
          {err('email')}
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone <span className="field__opt">(optional)</span></label>
          <input id={`${uid}-phone`} type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-topic`}>Enquiry about</label>
          <select id={`${uid}-topic`} value={form.topic} onChange={set('topic')}>
            {site.enquiryTopics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${uid}-message`}>Message</label>
        <textarea id={`${uid}-message`} rows={5} value={form.message} onChange={set('message')} {...aria('message')} required />
        {err('message')}
      </div>
      <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
        <Icon name="arrow" size={18} className="btn__icon" />
      </button>
      <div aria-live="polite">
        {status === 'not-configured' && <p className="form-notice">The contact form is not yet connected to an inbox. Official contact details will be published shortly.</p>}
        {status === 'error' && <p className="form-notice form-notice--error">Your message could not be sent. Please try again.</p>}
      </div>
    </form>
  )
}
