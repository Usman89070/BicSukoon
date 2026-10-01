/**
 * Project Updates journal. Entries are sorted newest → oldest automatically
 * by `date` (ISO yyyy-mm-dd). Entries without a date sort last.
 *
 * To add an update, append an object:
 * {
 *   id: 'unique-slug',
 *   date: '2026-03-14',
 *   project: 'bic' | 'sukoon',
 *   area: 'masjid-complex',            // facility id (optional)
 *   title: 'Headline',
 *   summary: 'One or two sentences.',
 *   body: ['Paragraph…', 'Paragraph…'], // optional
 *   images: [{ src, alt }],             // optional
 *   video: 'videoId from videos.js',    // optional
 *   progress: { label: 'Structure', value: 40 } // ONLY official figures
 * }
 *
 * The entries below are clearly-marked SAMPLE templates (placeholder: true)
 * so the layout can be reviewed. Remove them when official updates arrive.
 */
export const updates = [
  {
    id: 'sample-bic-update',
    placeholder: true,
    date: null,
    project: 'bic',
    area: 'masjid-complex',
    title: 'Official project update to be published',
    summary: 'This is a sample entry showing how a Brisbane Islamic Centre update will appear. Replace it with the first official update.',
    images: [],
    video: 'update2026',
    progress: null,
  },
  {
    id: 'sample-sukoon-update',
    placeholder: true,
    date: null,
    project: 'sukoon',
    area: 'seniors-living',
    title: 'Sukoon Village update to be published',
    summary: 'This is a sample entry showing how a Sukoon Village update will appear. Replace it with the first official update.',
    images: [],
    video: null,
    progress: null,
  },
]
