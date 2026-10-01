/**
 * Abstract, clearly non-literal site schematic used until the official
 * masterplan / aerial image is supplied. It intentionally does not depict
 * real building footprints.
 */
export default function MasterplanSchematic() {
  return (
    <svg className="schematic" viewBox="0 0 1000 620" role="img" aria-label="Indicative site schematic (not to scale)">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity=".07" />
        </pattern>
        <radialGradient id="glowBic" cx="35%" cy="40%" r="40%">
          <stop offset="0" stopColor="var(--bic-primary-light)" stopOpacity=".55" />
          <stop offset="1" stopColor="var(--bic-primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowSv" cx="72%" cy="58%" r="42%">
          <stop offset="0" stopColor="var(--sv-primary-light)" stopOpacity=".5" />
          <stop offset="1" stopColor="var(--sv-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1000" height="620" fill="var(--ink-800)" />
      <rect width="1000" height="620" fill="url(#grid)" style={{ color: 'var(--ivory)' }} />
      <rect width="1000" height="620" fill="url(#glowBic)" />
      <rect width="1000" height="620" fill="url(#glowSv)" />
      {/* Access road */}
      <path d="M-20 560 C 220 520, 380 600, 520 470 S 820 330, 1020 380" fill="none" stroke="var(--ivory)" strokeOpacity=".16" strokeWidth="26" strokeLinecap="round" />
      <path d="M-20 560 C 220 520, 380 600, 520 470 S 820 330, 1020 380" fill="none" stroke="var(--ivory)" strokeOpacity=".3" strokeWidth="1.5" strokeDasharray="10 12" />
      {/* Site boundary */}
      <path d="M70 70 L 940 50 L 960 560 L 90 590 Z" fill="none" stroke="var(--ivory)" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 6" />
      {/* Zones */}
      <g fill="var(--bic-primary)" fillOpacity=".28" stroke="var(--bic-accent)" strokeOpacity=".55">
        <rect x="120" y="110" width="380" height="330" rx="26" />
      </g>
      <g fill="var(--sv-primary)" fillOpacity=".28" stroke="var(--sv-accent)" strokeOpacity=".55">
        <rect x="530" y="110" width="400" height="430" rx="26" />
      </g>
      <g fill="none" stroke="var(--ivory)" strokeOpacity=".22">
        <rect x="160" y="160" width="160" height="140" rx="10" />
        <rect x="360" y="120" width="120" height="100" rx="10" />
        <rect x="560" y="280" width="200" height="140" rx="10" />
        <rect x="760" y="140" width="140" height="120" rx="10" />
        <rect x="540" y="440" width="160" height="80" rx="10" />
        <circle cx="300" cy="380" r="34" />
        <circle cx="850" cy="440" r="40" />
      </g>
      <g fontFamily="var(--font-body)" fontSize="13" letterSpacing="3" fill="var(--ivory)" fillOpacity=".55">
        <text x="140" y="470">BRISBANE ISLAMIC CENTRE</text>
        <text x="550" y="570">SUKOON VILLAGE</text>
      </g>
      <g transform="translate(920 600)" fill="var(--ivory)" fillOpacity=".5" fontFamily="var(--font-body)" fontSize="12">
        <path d="M0 -40 L6 -24 L0 -28 L-6 -24 Z" />
        <text x="-4" y="-8">N</text>
      </g>
    </svg>
  )
}
