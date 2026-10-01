import { funding } from '../../data/funding'
import { formatCurrency, formatDate } from '../../utils/format'
import { useReveal } from '../../hooks/useReveal'
import Pending from '../common/Pending'

/** Shows progress ONLY when official target & raised figures exist. */
export default function FundingProgress() {
  const [ref, visible] = useReveal()
  const hasFigures = funding.target != null && funding.raised != null
  if (!hasFigures) {
    return (
      <div className="funding-progress glass-panel">
        <p className="eyebrow">Funding progress</p>
        <p className="funding-progress__empty">Official funding figures will be displayed here once published.</p>
        <Pending>Target and amount raised to be confirmed</Pending>
      </div>
    )
  }
  const pct = Math.min(100, Math.round((funding.raised / funding.target) * 100))
  return (
    <div className="funding-progress glass-panel" ref={ref}>
      <p className="eyebrow">Funding progress</p>
      <div className="funding-progress__figures">
        <strong>{formatCurrency(funding.raised, funding.currency)}</strong>
        <span>raised of {formatCurrency(funding.target, funding.currency)}</span>
      </div>
      <div className="progress__track progress__track--lg" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Funding progress">
        <span className="progress__bar" style={{ '--value': visible ? `${pct}%` : '0%' }} />
      </div>
      <p className="funding-progress__asof">{pct}% {funding.asOf && `· as of ${formatDate(funding.asOf)}`}</p>
    </div>
  )
}
