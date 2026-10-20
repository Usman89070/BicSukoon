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
}

export const timeline = {
  bic: [
    { id: 'sd-start', group: 'Sukoon Drive – Construction & Completion (Estimated 2027)', state: 'upcoming', label: 'Projected', when: '2026', title: 'Sukoon Drive – Construction commencement' },
    { id: 'sd-end', group: 'Sukoon Drive – Construction & Completion (Estimated 2027)', state: 'upcoming', label: 'Estimated', when: '2027', title: 'Sukoon Drive – Estimated completion' },
    { id: 'bic-construction', group: "Brisbane Islamic Centre – Construction & Completion (Estimated End of 2029, Insha'Allah)", state: 'upcoming', label: 'Projected', when: 'Mid-2027', title: "Construction to resume mid-2027, with completion by the end of 2029, Insha'Allah." },
  ],
  sukoon: [
    { id: 'sv-1', state: 'completed', title: 'Milestone to be confirmed', date: null, description: 'Completed milestones will be listed here.', placeholder: true },
    { id: 'sv-2', state: 'current', title: 'Current stage to be confirmed', date: null, description: 'The current stage of the project will be shown here.', placeholder: true },
    { id: 'sv-3', state: 'upcoming', title: 'Upcoming milestone to be confirmed', date: null, description: 'Upcoming milestones will be listed here once officially announced.', placeholder: true },
  ],
}
