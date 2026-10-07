/**
 * BIC About page — wording and board from the Centre's former website
 * (bic.org.au/about-us). Layout: src/sites/bic/pages/About.jsx
 *
 * Board photos: src/assets/images/board/<id>.jpg (appear automatically).
 */
export const about = {
  title: 'About BIC',
  statements: [
    { label: 'The Vision', text: 'of the Brisbane Islamic Centre Board is to provide a place of worship for Muslims, and a place of learning and cultural awareness for both Muslims & Non-Muslims.' },
    { label: 'Our Fervent Hope', text: 'is to ensure that the teachings and message of Islam creates a spirit of understanding and harmony for the Muslim community in Brisbane in particular, but also in the Australian society as a whole.' },
    { label: 'Our Purpose', text: 'is to work with other faiths and communities to inform, educate and bring about closer co-operation between different teachings, cultures and customs.' },
    { label: 'Our Aim', text: 'is to encourage integration not separation, and understanding not ignorance about Islam & Muslims.' },
  ],
  heritage: [
    'From the time of the Prophet Muhammad (Peace be upon him) – the mosque has been the central focus of the Muslim community.',
    'Indeed, the Prophet’s mosque in Medina was not just a prayer facility. It was a multipurpose family-centered institution that served as a school, a meeting place, a venue for sport events and other celebrations.',
  ],
  objective: { label: 'Our Objective', text: 'is to build on this powerful heritage and help shape the identity of future generations of proud Australian Muslims.' },

  boardTitle: 'Brisbane Islamic Centre Board of Directors',
  board: [
    { id: 'kemal-omar', name: 'Kemal Omar', role: 'In Memoriam', memoriam: true },
    { id: 'faisal-hatia', name: 'Faisal Hatia', role: 'President' },
    { id: 'iqbal-sultan', name: 'Dr Iqbal Sultan', role: 'Vice President' },
    { id: 'imraan-price', name: 'Imraan Price', role: 'Secretary' },
    { id: 'malik-issadeen', name: 'Malik Issadeen', role: null },
    { id: 'farouk-adam', name: 'Farouk Adam', role: null },
    { id: 'ebrahim-motala', name: 'Ebrahim Motala', role: null },
    { id: 'hashim-hatia', name: 'Hashim Hatia', role: null },
  ],
  memoriam: [
    'Founding board member, Brother Mustafa Kemal Omar passed away in 2024. He was a cornerstone of the Muslim community in Brisbane. He tirelessly served in various capacities, including as a member of Crescents of Brisbane, Trustee of Kuraby Masjid and one of the founders of the Australian Muslim Advocacy Network (AMAN) as well as BIC.',
    'Despite his illness, Brother Kemal remained a passionate advocate for the Australian Muslim community. His dedication to Allah (SWT) and his unwavering commitment to serving the community will continue to inspire and benefit us all. He will be sadly missed by all of us involved at BIC.',
  ],

  gallery: [
    { image: ['about-gallery-1', 'hero-bic'], label: 'Masjid at night' },
    { image: 'about-gallery-2', label: 'Museum interior' },
    { image: 'about-gallery-3', label: 'Prayer hall interior' },
  ],
}
