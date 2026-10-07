/**
 * Donation configuration. Nothing here is official financial information.
 * - presetAmounts are UI options only; confirm with the organisation.
 * - payment: set provider details once an official gateway is chosen.
 */
export const donation = {
  currency: 'AUD',
  presetAmounts: [50, 100, 250, 500, 1000],
  minimumAmount: 1,
  frequencies: [
    { id: 'once', label: 'One-time' },
    { id: 'monthly', label: 'Monthly', requiresRecurringSupport: true },
  ],
  recurringSupported: false, // set true once the payment provider supports it

  payment: {
    provider: null, // e.g. 'stripe' | 'paypal' | 'givenow' — not yet confirmed
    checkoutUrl: null, // hosted checkout link, if used
    bankTransfer: null, // { accountName, bsb, accountNumber, reference } — official only
  },

  taxDeductibleStatement: null, // official wording only
}

/** "Where your support goes" — configurable cards; each website shows only its own (by `project`). */
export const allocations = [
  { id: 'masjid-complex', title: 'Masjid Complex', project: 'bic', facility: 'masjid-complex' },
  { id: 'cultural-heritage-centre', title: 'Queensland Muslim Cultural Heritage Centre', project: 'bic', facility: 'cultural-heritage-centre' },
  { id: 'sukoon-village', title: 'Sukoon Village', project: 'sukoon', text: 'Supporting the village as a whole — from early childhood to later years.' },
  { id: 'seniors-living', title: 'Seniors Living', project: 'sukoon', facility: 'seniors-living' },
  { id: 'lifestyle-centre', title: 'Lifestyle Centre', project: 'sukoon', facility: 'lifestyle-centre' },
  { id: 'childcare-centre', title: 'Childcare Centre', project: 'bic', facility: 'childcare-centre' },
  { id: 'future-development', title: 'Future Development', project: 'bic', text: 'Helping the centre grow with the needs of the community.' },
]

/** Impact statistics — ONLY official figures. Empty = section shows placeholder. */
export const impactStats = []
// e.g. { id: 'donors', value: '1,200', label: 'Donors' }

/** Transparency documents & financial updates. */
export const transparency = {
  documents: [], // { id, title, date, href, type: 'PDF' }
  milestones: [], // { id, title, date }
  financialUpdates: [], // { id, title, date, summary }
}
