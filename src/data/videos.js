import { imageFor } from '../utils/images'

/**
 * Video library. Each entry is reusable via <VideoFeature id="…" />.
 *
 * Videos are NOT bundled with the site (they are too large). Each entry
 * names a `file` that is loaded from the videos folder on the server:
 *   /videos/<file>   → public_html/videos/<file>
 *                      or bic-videos/<file> next to public_html (kept on redeploys)
 * Until the file is uploaded, a "Video coming soon" placeholder is shown.
 * Set VITE_VIDEO_URL to load videos from somewhere else (e.g. a CDN).
 *
 * `background: true` films play silently behind a home hero; all others
 * load only when the visitor presses play.
 * Optional: `youtubeId` instead of a file.
 */
const BASE = (import.meta.env.VITE_VIDEO_URL || '/videos').replace(/\/$/, '')
export const videoUrl = (file) => (file ? `${BASE}/${encodeURIComponent(file)}` : null)

const bicPoster = imageFor(['hero-bic', 'site-300DPIbic'])
const sukoonPoster = imageFor(['hero-sukoon', 'site-300DPISukoon'])

const film = (title, caption, file, extra = {}) => ({ title, caption, duration: null, file, src: videoUrl(file), poster: null, ...extra })

export const videos = {
  hero: film('Brisbane Islamic Centre', 'Hero film', 'bic-hero.mp4', { poster: bicPoster, background: true }),
  masjid: film('The Masjid Complex', 'Architectural film', 'BIC(centreH).mp4', { poster: bicPoster }),
  status: film('Project Status', 'Progress film', 'bic-project-status.mp4'),
  update2026: film('2026 Update', 'Project update film', 'bic-update-2026.mp4'),
  funding: film('Project Funding', 'Why your support matters', 'bic-funding.mp4'),
  guests: film('Honoured Guests', 'Guest highlights', 'bic-honoured-guests.mp4'),
  donate: film('Donate Now', 'Support the vision', 'bic-donate.mp4'),
  events: film('Events', 'Community moments', 'bic-events.mp4'),
  about: film('About Us', 'Our story', 'bic-about.mp4'),
  contact: film('Contact Us', 'Get in touch', 'bic-contact.mp4'),
  sukoon: film('Sukoon Village', 'Village film', 'sukoon-village.mp4', { poster: sukoonPoster, background: true }),
}
