/**
 * Video library. Each entry is reusable via <VideoFeature id="…" />.
 * `src` (mp4/webm URL or imported asset) and `poster` are null until the
 * final videos are delivered — a professional placeholder is shown instead.
 * Optional: `sources: [{ src, type }]` for multiple formats, `youtubeId`.
 */
export const videos = {
  hero: { title: 'Brisbane Islamic Centre', caption: 'Hero film', duration: null, src: null, poster: null },
  masjid: { title: 'The Masjid Complex', caption: 'Architectural film', duration: null, src: null, poster: null },
  status: { title: 'Project Status', caption: 'Progress film', duration: null, src: null, poster: null },
  update2026: { title: '2026 Update', caption: 'Project update film', duration: null, src: null, poster: null },
  funding: { title: 'Project Funding', caption: 'Why your support matters', duration: null, src: null, poster: null },
  guests: { title: 'Honoured Guests', caption: 'Guest highlights', duration: null, src: null, poster: null },
  donate: { title: 'Donate Now', caption: 'Support the vision', duration: null, src: null, poster: null },
  events: { title: 'Events', caption: 'Community moments', duration: null, src: null, poster: null },
  about: { title: 'About Us', caption: 'Our story', duration: null, src: null, poster: null },
  contact: { title: 'Contact Us', caption: 'Get in touch', duration: null, src: null, poster: null },
  sukoon: { title: 'Sukoon Village', caption: 'Village film', duration: null, src: null, poster: null },
}
