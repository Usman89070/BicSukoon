import { useId } from 'react'

/**
 * Subtle geometric (eight-point star lattice) pattern used as a decorative
 * layer. Colour comes from `currentColor` so it follows the project accent.
 */
export default function Pattern({ className, opacity = 0.12, scale = 64 }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%" style={{ opacity }}>
      <defs>
        <pattern id={`p${id}`} width={scale} height={scale} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d={`M${scale / 2} 4 L${scale * 0.62} ${scale * 0.38} L${scale - 4} ${scale / 2} L${scale * 0.62} ${scale * 0.62} L${scale / 2} ${scale - 4} L${scale * 0.38} ${scale * 0.62} L4 ${scale / 2} L${scale * 0.38} ${scale * 0.38} Z`} />
            <rect x={scale * 0.29} y={scale * 0.29} width={scale * 0.42} height={scale * 0.42} transform={`rotate(45 ${scale / 2} ${scale / 2})`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#p${id})`} />
    </svg>
  )
}
