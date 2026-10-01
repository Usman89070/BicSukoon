import bicLogo from '../assets/logos/bic.png'
import bicLogoWhite from '../assets/logos/bic-white.png'
import sukoonLogo from '../assets/logos/sukoon.png'
import sukoonLogoDark from '../assets/logos/sukoon-dark.png'

/**
 * Official logos. `onDark` / `onLight` pick the right variant for the
 * background. bic-white and sukoon-dark are colour reversals of the official
 * files (BIC navy → white; Sukoon white → deep espresso, gold unchanged).
 * Replace with official reversed artwork if the design team supplies it.
 */
export const logos = {
  bic: {
    name: 'Brisbane Islamic Centre',
    onLight: bicLogo,
    onDark: bicLogoWhite,
    width: 779,
    height: 173,
  },
  sukoon: {
    name: 'Sukoon Village — Seniors Living',
    onLight: sukoonLogoDark,
    onDark: sukoonLogo,
    width: 987,
    height: 267,
    // "peace" and "Seniors Living" sit above/below the wordmark, so it renders
    // slightly taller to look optically balanced.
    scale: 1.3,
  },
}
