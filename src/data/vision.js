/**
 * Faith — Knowledge — Community — Legacy, told separately for each website.
 * `facilities` lists the facility ids (from facilities.js) that carry the theme.
 */
export const pillars = {
  bic: [
    { id: 'faith', title: 'Faith', line: 'A place to pray, reflect and belong.', body: 'Faith is the foundation of the Brisbane Islamic Centre, expressed through the Masjid Complex as a welcoming centre of worship.', facilities: ['masjid-complex'], media: { image: null } },
    { id: 'knowledge', title: 'Knowledge', line: 'Learning that connects generations.', body: 'The Queensland Muslim Cultural & Heritage Centre is a place to learn, share and understand.', facilities: ['cultural-heritage-centre'], media: { image: null } },
    { id: 'community', title: 'Community', line: 'Spaces that bring people together.', body: 'Both facilities are designed to welcome families, neighbours and visitors from across Brisbane.', facilities: ['masjid-complex', 'cultural-heritage-centre'], media: { image: null } },
    { id: 'legacy', title: 'Legacy', line: 'Building for those who come after us.', body: 'A heritage preserved and a centre built to serve the generations to come.', facilities: ['cultural-heritage-centre'], media: { image: null } },
  ],
  sukoon: [
    { id: 'faith', title: 'Faith', line: 'A community grounded in shared values.', body: 'Sukoon — peace — is a village shaped around the values its residents and families hold dear.', facilities: ['seniors-living'], media: { image: null } },
    { id: 'knowledge', title: 'Knowledge', line: 'Learning from the very beginning.', body: 'The Childcare Centre brings early learning and care into the heart of the village.', facilities: ['childcare-centre'], media: { image: null } },
    { id: 'community', title: 'Community', line: 'Connected at every stage of life.', body: 'Seniors Living and the Lifestyle Centre keep residents close to each other and to family.', facilities: ['seniors-living', 'lifestyle-centre'], media: { image: null } },
    { id: 'legacy', title: 'Legacy', line: 'Young and old, side by side.', body: 'A village where generations share everyday life — a legacy of care for the future.', facilities: ['childcare-centre', 'seniors-living'], media: { image: null } },
  ],
}

/** Short storytelling blocks for each home page. `pending` = awaiting official wording. */
export const story = {
  bic: [
    {
      id: 'who',
      eyebrow: 'Who we are',
      title: 'A centre built by and for the community.',
      body: 'Official organisational wording for this section will be supplied by the BIC team.',
      pending: true,
    },
    {
      id: 'what',
      eyebrow: 'What is being built',
      title: 'A Masjid Complex and a home for heritage.',
      body: 'The Masjid Complex and the Queensland Muslim Cultural & Heritage Centre — places for worship, learning and remembrance.',
    },
    {
      id: 'why',
      eyebrow: 'Why it matters',
      title: 'Faith and knowledge, side by side.',
      body: 'A place to pray, to learn and to share the story of Muslims in Queensland with the wider community.',
    },
    {
      id: 'future',
      eyebrow: 'The future vision',
      title: 'A legacy for the generations to come.',
      body: 'Built to welcome everyone — neighbours, visitors and the families of tomorrow.',
    },
  ],
  sukoon: [
    {
      id: 'living',
      eyebrow: 'Seniors Living',
      title: 'Living with dignity and peace.',
      body: 'A calm, supportive place to live that honours its residents’ values and keeps them close to family and community.',
    },
    {
      id: 'together',
      eyebrow: 'Lifestyle Centre',
      title: 'Every day, a reason to gather.',
      body: 'A shared heart for the village — somewhere to meet, take part and stay connected.',
    },
    {
      id: 'generations',
      eyebrow: 'Childcare Centre',
      title: 'Young and old, in one village.',
      body: 'Early learning and care at the heart of the village, so every stage of life is part of daily life.',
    },
  ],
}
