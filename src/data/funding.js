/**
 * Official funding information. ALL values are null until supplied.
 * When `target` and `raised` are both set, a progress indicator appears.
 */
export const funding = {
  currency: 'AUD',
  target: null,
  raised: null,
  asOf: null, // 'yyyy-mm-dd'
  needs: [
    { id: 'why', title: 'Why funding is needed', body: 'Community support makes it possible to move each stage of the development forward.' },
    { id: 'supports', title: 'What funding supports', body: 'Contributions support the design, approval and construction of the facilities in the precinct.' },
    { id: 'development', title: 'Project development needs', body: 'Specific development needs will be published here as they are officially confirmed.', pending: true },
  ],
}
