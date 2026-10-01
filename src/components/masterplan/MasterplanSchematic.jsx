export const VIEW_W = 1000
export const VIEW_H = 620

/**
 * Abstract, clearly non-literal schematic drawn from the location shapes in
 * data/masterplan.js. Used only until the official masterplan image exists;
 * it intentionally does not depict real building footprints.
 */
export default function MasterplanSchematic({ plan, activeId }) {
  return (
    <svg className="schematic" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Indicative site schematic (not to scale)">
      <defs>
        <pattern id="mp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="var(--schematic-line)" strokeOpacity=".08" />
        </pattern>
        <radialGradient id="mp-glow" cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="var(--primary-light)" stopOpacity=".45" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} fill="var(--schematic-bg)" />
      <rect width={VIEW_W} height={VIEW_H} fill="url(#mp-grid)" />
      <rect width={VIEW_W} height={VIEW_H} fill="url(#mp-glow)" />

      {/* Access road */}
      <path d="M-20 585 C 260 560, 520 610, 760 560 S 960 520, 1020 535" fill="none" stroke="var(--schematic-line)" strokeOpacity=".14" strokeWidth="24" strokeLinecap="round" />
      <path d="M-20 585 C 260 560, 520 610, 760 560 S 960 520, 1020 535" fill="none" stroke="var(--schematic-line)" strokeOpacity=".3" strokeWidth="1.5" strokeDasharray="10 12" />

      {/* Site boundary */}
      <rect x="110" y="80" width="760" height="450" rx="28" fill="color-mix(in srgb, var(--primary) 18%, transparent)" stroke="var(--accent)" strokeOpacity=".5" strokeDasharray="5 7" />

      {plan.locations.map((l) => {
        const s = l.shape
        if (!s) return null
        const on = activeId === l.id
        const common = {
          fill: l.future ? 'none' : `color-mix(in srgb, var(--primary-light) ${on ? 38 : 16}%, transparent)`,
          stroke: 'var(--schematic-line)',
          strokeOpacity: on ? 0.9 : 0.4,
          strokeDasharray: l.future ? '6 6' : undefined,
          style: { transition: 'fill 300ms, stroke-opacity 300ms' },
        }
        return s.round ? (
          <circle key={l.id} cx={s.x + s.w / 2} cy={s.y + s.h / 2} r={Math.min(s.w, s.h) / 2} {...common} />
        ) : (
          <rect key={l.id} x={s.x} y={s.y} width={s.w} height={s.h} rx="14" {...common} />
        )
      })}

      <text x="130" y="512" fontFamily="var(--font-body)" fontSize="13" letterSpacing="3" fill="var(--schematic-line)" fillOpacity=".55">
        {plan.zoneLabel}
      </text>
      <g transform="translate(930 600)" fill="var(--schematic-line)" fillOpacity=".5" fontFamily="var(--font-body)" fontSize="12">
        <path d="M0 -40 L6 -24 L0 -28 L-6 -24 Z" />
        <text x="-4" y="-8">N</text>
      </g>
    </svg>
  )
}
