/**
 * Project timelines. state: 'completed' | 'current' | 'upcoming'.
 * `when` is shown exactly as written (official wording); `date` (yyyy-mm-dd)
 * is used only when `when` is not given. Use ONLY official milestones.
 */
export const timelineIntro = {
  bic: {
    title: 'Projected Timeline',
    // shown in date order (soonest first), grouped under each heading
    ascending: true,
  },
  sukoon: {
    title: 'Sukoon Village Timeline',
    text: '', // no intro line
    ascending: true,
  },
}

export const timeline = {
  bic: [
    { id: 'sd-start', group: 'Sukoon Drive – Construction & Completion (Estimated 2027)', state: 'upcoming', label: 'Projected', when: '2026', title: 'Sukoon Drive – Construction commencement' },
    { id: 'sd-end', group: 'Sukoon Drive – Construction & Completion (Estimated 2027)', state: 'upcoming', label: 'Estimated', when: '2027', title: 'Sukoon Drive – Estimated completion' },
    { id: 'bic-restart', group: 'Brisbane Islamic Centre – Construction & Completion (Estimated End of 2029)', state: 'upcoming', label: 'Projected', when: 'Mid-2027', title: 'Brisbane Islamic Centre – Construction recommencement', description: "Construction to resume mid-2027, with completion by the end of 2029, Insha'Allah." },
    { id: 'bic-end', group: 'Brisbane Islamic Centre – Construction & Completion (Estimated End of 2029)', state: 'upcoming', label: 'Estimated', when: "End of 2029, Insha'Allah", title: 'Brisbane Islamic Centre – Estimated completion' },
  ],
  sukoon: [
    { id: 'sv-completion', state: 'upcoming', label: 'Estimated', when: "Early 2029, Insha'Allah", title: 'Sukoon Village – Estimated completion', description: "Completion early 2029 (approximately two years), Insha'Allah." },
  ],
}
