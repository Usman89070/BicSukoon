/**
 * Project timelines. state: 'completed' | 'current' | 'upcoming'.
 * `when` is shown exactly as written (official wording); `date` (yyyy-mm-dd)
 * is used only when `when` is not given. Use ONLY official milestones.
 */
export const timelineIntro = {
  bic: {
    title: 'Historical Project timeline',
    text: 'This timeline summary briefly outlines the project from inception through to construction commencement.',
  },
}

export const timeline = {
  bic: [
    { id: 'bic-2007', state: 'completed', when: '2007', title: 'Brisbane Islamic Centre entity established' },
    { id: 'bic-2008', state: 'completed', when: '2008', title: 'Property at 161 Underwood Road, Eight Mile Plains acquired' },
    { id: 'bic-2008-2012', state: 'completed', when: '2008 – 2012', title: 'Preparatory work for Development Approval Application', description: 'Lodged in December 2012.' },
    { id: 'bic-2015-07-10', state: 'completed', when: '10 July 2015', title: 'Application declined by Brisbane City Council' },
    { id: 'bic-2015-07-20', state: 'completed', when: '20 July 2015', title: 'Appeal lodged in the Planning and Environmental Court' },
    { id: 'bic-2016-12-16', state: 'completed', when: '16 December 2016', title: 'Development Application Approval granted by the Court' },
    { id: 'bic-2017-06-30', state: 'completed', when: '30 June 2017', title: 'Vegetation and Earthworks Approval granted' },
    { id: 'bic-2017-2018', state: 'completed', when: 'December 2017 – August 2018', title: 'Vegetation cleared and earthworks completed' },
    { id: 'bic-2018-2019', state: 'completed', when: 'August 2018 – March 2019', title: 'Architectural and concept design', description: 'Consultants preparing plans for Building Approval.' },
    { id: 'bic-2020-06', state: 'completed', when: 'June 2020', title: 'Minor change Approval granted by Planning and Environmental Court' },
    { id: 'bic-2021-07', state: 'completed', when: 'July 2021', title: 'Awaiting Final operational works from the Council for building operational works to commence' },
    { id: 'bic-2021-09', state: 'completed', when: 'September 2021', title: 'Final Building operational works approved' },
    { id: 'bic-2021-12', state: 'completed', when: 'December 2021', title: 'Construction commenced' },
  ],
  sukoon: [
    { id: 'sv-1', state: 'completed', title: 'Milestone to be confirmed', date: null, description: 'Completed milestones will be listed here.', placeholder: true },
    { id: 'sv-2', state: 'current', title: 'Current stage to be confirmed', date: null, description: 'The current stage of the project will be shown here.', placeholder: true },
    { id: 'sv-3', state: 'upcoming', title: 'Upcoming milestone to be confirmed', date: null, description: 'Upcoming milestones will be listed here once officially announced.', placeholder: true },
  ],
}
