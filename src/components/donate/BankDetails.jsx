import { donation } from '../../data/donation'
import Icon from '../common/Icon'

/** Direct bank transfer details (official, from data/donation.js); nothing when not set. */
export default function BankDetails({ className = '' }) {
  const b = donation.payment.bankTransfer
  if (!b) return null
  const rows = [
    ['Account name', b.accountName],
    ['Bank', b.bank],
    ['BSB', b.bsb],
    ['Account number', b.accountNumber],
    ['SWIFT code', b.swift, 'For transfers from overseas'],
  ].filter(([, v]) => v)
  return (
    <div className={`bank glass-panel ${className}`.trim()}>
      <h3 className="bank__title"><Icon name="doc" size={20} /> Direct bank transfer</h3>
      <dl className="bank__list">
        {rows.map(([label, value, note]) => (
          <div key={label} className="bank__row">
            <dt>{label}</dt>
            <dd>
              {value}
              {note && <small>{note}</small>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
