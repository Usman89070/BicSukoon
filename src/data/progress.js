/**
 * Works already completed on site, shown on both home pages as proof that
 * the project is real and under way. Confirmed by the project team.
 * (Sukoon Drive is described as proposed in the latest copy, so it is not
 * listed here until it is complete.)
 *
 * Photos: add src/assets/images/<image>.jpg (or .png / .webp) and it appears
 * automatically. `image` may be { bic, sukoon } to show a different photo on
 * each website. `video` may point to an entry in data/videos.js.
 */
export const completedWorks = [
  {
    id: 'existing-structure',
    title: 'The existing structure',
    // each website can show its own photo
    image: { bic: 'progress-existing-structure', sukoon: ['sukoon-existing-structure', 'progress-existing-structure'] },
    label: 'Existing structure photo',
  },
  { id: 'underground-tank', title: '200,000L underground tank', image: 'progress-underground-tank', video: 'tank', label: 'Underground tank photo' },
]
