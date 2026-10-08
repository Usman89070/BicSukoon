import { imageFor } from '../utils/images'

/**
 * Video library. Each entry is reusable via <VideoFeature id="…" />.
 *
 * Videos are NOT bundled with the site (they are too large). Each entry
 * names a `file` inside its website's own folder on the server:
 *   /videos/bic/<file>     → public_html/videos/bic/<file>
 *   /videos/sukoon/<file>  → public_html/videos/sukoon/<file>
 * or the same folders inside bic-videos/ next to public_html (kept on redeploys).
 * Until the file is uploaded, a "Video coming soon" placeholder is shown.
 * Set VITE_VIDEO_URL to load videos from somewhere else (e.g. a CDN).
 *
 * `background: true` films play silently behind a home hero; all others
 * load only when the visitor presses play.
 * Optional: `youtubeId` instead of a file.
 */
const BASE = (import.meta.env.VITE_VIDEO_URL || '/videos').replace(/\/$/, '')
export const videoUrl = (path) => (path ? `${BASE}/${path.split('/').map(encodeURIComponent).join('/')}` : null)

const bicPoster = imageFor(['hero-bic', 'site-300DPIbic'])
const sukoonPoster = imageFor(['hero-sukoon', 'site-300DPISukoon'])

/** film(folder, …): folder is 'bic' or 'sukoon'. */
const film = (folder, title, caption, file, extra = {}) => ({ title, caption, duration: null, file: `${folder}/${file}`, src: videoUrl(`${folder}/${file}`), poster: null, ...extra })

export const videos = {
  hero: film('bic', 'Brisbane Islamic Centre', 'Hero film', 'bic-hero.mp4', { poster: bicPoster, background: true }),
  masjid: film('bic', 'The Masjid Complex', 'Architectural film', 'BIC(centreH).mp4', { poster: bicPoster }),
  status: film('bic', 'Project Status', 'Progress film', 'bic-project-status.mp4'),
  update2026: film('bic', '2026 Update', 'Project update film', 'bic-update-2026.mp4'),
  funding: film('bic', 'Project Funding', 'Why your support matters', 'bic-funding.mp4'),
  guests: film('bic', 'Honoured Guests', 'Guest highlights', 'bic-honoured-guests.mp4'),
  donate: film('bic', 'Donate Now', 'Support the vision', 'bic-donate.mp4'),
  events: film('bic', 'Events', 'Community moments', 'bic-events.mp4'),
  about: film('bic', 'About Us', 'Our story', 'bic-about.mp4'),
  contact: film('bic', 'Contact Us', 'Get in touch', 'bic-contact.mp4'),
  tank: film('bic', '200,000L underground tank', 'Completed works', '20KL(watertank).mp4'),
  // Site-picture pins (BIC home and Vision): played when a pin is hovered or tapped
  pinCommunityHall: film('bic', 'Community Hall', 'Site film', 'pin-community-hall.mp4', { poster: bicPoster }),
  pinQmchc: film('bic', 'Queensland Muslim Cultural and Heritage Centre', 'Site film', 'pin-qmchc.mp4', { poster: bicPoster }),
  pinMasjid: film('bic', 'Masjid', 'Site film', 'pin-masjid.mp4', { poster: bicPoster }),
  pinCafe: film('bic', 'Café, outdoor dining area and gyms', 'Site film', 'pin-cafe-gyms.mp4', { poster: bicPoster }),
  sukoon: film('sukoon', 'Sukoon Village', 'Village film', 'sukooonFull.mp4', { poster: sukoonPoster }),
  sukoonHero: film('sukoon', 'Sukoon Village', 'Hero film', 'sukoon-hero.mp4', { poster: sukoonPoster, background: true }),
}
