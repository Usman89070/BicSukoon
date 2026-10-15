/**
 * Current Status page films (ids from data/videos.js). The FIRST film of each
 * website is the large player and always stays; the rest are the row under
 * it. That row is managed in the admin panel ("Current Status Videos") —
 * this list is only its starting point (see components/video/FilmPlaylist.jsx).
 */
export const statusFilms = {
  bic: ['newBeginnings', 'masjid', 'pinMasjid', 'pinQmchc', 'pinCommunityHall', 'pinCafe', 'tank', 'update2026'],
  sukoon: ['sukoonStatus', 'sukoon', 'pinSeniorsLiving', 'pinChildcare', 'sukoonUpdate'],
}
