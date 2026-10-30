/**
 * BIC Privacy Policy (official wording, /privacy-policy on the BIC website).
 * Each section: { title, blocks }. A block is a paragraph (string),
 * { sub } a small heading, { ul: [...] } / { ol: [...] } a list,
 * { lead, text } a paragraph opening with a bold label, or
 * { link: { label, href } } a link line.
 */
export const privacy = {
  title: 'Privacy Policy',
  sections: [
    {
      title: 'Our Commitment to Privacy',
      blocks: [
        'Brisbane Islamic Centre (BIC) is a not-for-profit organisation dedicated to serving the Muslim community and wider Australian community through religious, educational, cultural, charitable and community activities.',
        'We respect the privacy of our members, donors, volunteers, visitors, supporters and facility users.',
        'We are committed to handling personal information responsibly, transparently and securely, in accordance with applicable Australian privacy legislation, including the Privacy Act 1988 (Cth) where applicable, and recognised privacy principles.',
        'This policy explains how BIC collects, uses, stores, protects and discloses personal information obtained through its website and associated online services.',
      ],
    },
    {
      title: 'Information We Collect',
      blocks: [
        'Depending on how you interact with BIC, we may collect:',
        { sub: 'Personal and contact information' },
        { ul: ['Name', 'Email address', 'Telephone number', 'Residential or postal address', 'Membership and registration details', 'Information voluntarily provided through website forms'] },
        { sub: 'Community participation information' },
        { ul: ['Event registrations', 'Educational and community program registrations', 'Volunteer applications', 'Facility bookings and enquiries', 'Membership applications', 'Community feedback and correspondence'] },
        { sub: 'Donations and payment information' },
        { ul: ['Donor or payer name', 'Contact details', 'Donation or payment amount', 'Payment purpose', 'Transaction date and reference', 'Receipt information'] },
        { sub: 'Technical website information' },
        { ul: ['IP address', 'Browser and device information', 'Website usage statistics', 'Cookies and related technical information'] },
        'BIC will seek to collect only information reasonably necessary for its legitimate activities.',
      ],
    },
    {
      title: 'How We Use Your Information',
      blocks: [
        'Personal information may be used to:',
        {
          ol: [
            'Manage community programs, religious activities and events.',
            'Process donations, fundraising contributions and other payments.',
            'Manage membership, volunteering and facility bookings.',
            'Issue receipts and payment confirmations.',
            'Respond to enquiries and requests.',
            'Communicate relevant BIC news, projects and activities.',
            'Maintain financial, accounting and administrative records.',
            'Meet applicable legal and regulatory requirements.',
            'Improve website functionality and services.',
            'Support the safe and effective operation of BIC facilities.',
          ],
        },
        'BIC will not sell, rent or trade personal information to third parties.',
      ],
    },
    {
      title: 'Online Payments and Donations',
      blocks: [
        'BIC may provide an online payment facility for donations, fundraising, event registrations, membership fees and facility bookings.',
        'Payments will be processed through a third-party payment gateway.',
        'BIC intends to use payment processing arrangements designed to protect financial information and comply with applicable payment industry security requirements.',
        'BIC does not intend to store complete credit or debit card numbers or card security codes on its own website or administrative systems.',
        'Payment providers may collect and process information necessary to authorise transactions, prevent fraud and meet their legal obligations.',
        'BIC may retain payment confirmation details, transaction references and financial records for accounting, audit and statutory purposes.',
        { lead: 'Donations and tax deductibility:', text: 'Donations to BIC are not automatically tax-deductible. Tax-deductible receipts will only be issued where the receiving entity and donation satisfy applicable Australian Deductible Gift Recipient (DGR) requirements.' },
      ],
    },
    {
      title: 'Confidentiality of Donors and Supporters',
      blocks: [
        'BIC respects the confidentiality of donors and supporters.',
        'Donor details will be used for legitimate purposes, including processing donations, issuing receipts, maintaining financial records and communicating about approved fundraising activities.',
        'Donor names will not be publicly acknowledged without appropriate permission.',
        'Requests for anonymity will be respected, subject to applicable financial reporting and legal requirements.',
      ],
    },
    {
      title: 'Religious and Sensitive Information',
      blocks: [
        'BIC recognises that religious affiliation and certain other personal details may constitute sensitive information under Australian privacy law.',
        'BIC will not require individuals to disclose their religious beliefs unless reasonably necessary for a particular service, activity or program.',
        'Where sensitive information is collected, BIC will obtain appropriate consent or rely on another lawful basis and apply additional confidentiality safeguards.',
      ],
    },
    {
      title: 'Disclosure to Third Parties',
      blocks: [
        'BIC may share limited personal information with authorised service providers where reasonably necessary, including:',
        { ul: ['Payment gateway providers and financial institutions', 'Website hosting and IT service providers', 'Accounting and auditing professionals', 'Event registration or booking service providers', 'Authorised administrative personnel', 'Government or regulatory authorities where legally required'] },
        'BIC will take reasonable steps to ensure information is handled appropriately by service providers.',
      ],
    },
    {
      title: 'Information Security',
      blocks: [
        'BIC will take reasonable steps to protect personal information from loss, misuse, interference, unauthorised access, modification and disclosure.',
        'Security measures may include restricted administrative access, password protection, secure website connections, system maintenance and appropriate internal procedures.',
        'No electronic system can be guaranteed to be entirely secure.',
      ],
    },
    {
      title: 'Cookies and Website Analytics',
      blocks: [
        'The BIC website may use cookies and website analytics tools to support website functionality, security and performance monitoring.',
        'Visitors may manage cookies through their browser settings.',
        'Where third-party analytics or tracking tools are used, information may also be processed under those providers’ privacy policies.',
      ],
    },
    {
      title: 'Children’s Information',
      blocks: [
        'BIC may organise educational, religious, recreational and community activities involving children.',
        'Where necessary, information about children will be collected with appropriate parental or guardian consent.',
        'BIC will take additional care to protect children’s information and restrict its use to legitimate organisational purposes.',
      ],
    },
    {
      title: 'Community Communications',
      blocks: [
        'BIC may communicate with members, donors, volunteers and supporters regarding community events, religious activities, educational programs, fundraising and organisational announcements.',
        'Promotional electronic communications will be managed in accordance with applicable Australian laws, including the Spam Act 2003 (Cth).',
        'Recipients may unsubscribe from promotional communications at any time.',
      ],
    },
    {
      title: 'Storage and Retention',
      blocks: [
        'Personal information will be retained only for as long as reasonably necessary for its intended purpose or to comply with applicable legal and financial obligations.',
        'Where information is no longer required, BIC will take reasonable steps to securely delete, destroy or de-identify it, unless lawful retention is required.',
      ],
    },
    {
      title: 'Overseas Data Processing',
      blocks: [
        'Some website, email, payment and technology providers may process or store information outside Australia.',
        'Where applicable, BIC will take reasonable steps to assess and manage privacy risks associated with overseas processing or disclosure.',
      ],
    },
    {
      title: 'Access and Correction',
      blocks: [
        'Individuals may request access to personal information held by BIC or request correction of inaccurate or outdated information.',
        'BIC may require reasonable identity verification before responding to such requests.',
        'Requests should be directed to the BIC Privacy Contact Officer.',
      ],
    },
    {
      title: 'Privacy Complaints',
      blocks: [
        'Privacy concerns or complaints may be submitted to BIC using the contact information below.',
        'BIC will review complaints fairly and aim to provide a response within 30 days.',
        'Where applicable, unresolved privacy complaints may be referred to the Office of the Australian Information Commissioner (OAIC).',
        { link: { lead: 'Website:', label: 'www.oaic.gov.au', href: 'https://www.oaic.gov.au' } },
      ],
    },
    {
      title: 'Data Breaches',
      blocks: [
        'BIC will investigate suspected breaches of personal information and take reasonable steps to contain and address any identified risks.',
        'Where legally required, BIC will notify affected individuals and relevant authorities in accordance with applicable data breach notification requirements.',
      ],
    },
    {
      title: 'External Websites',
      blocks: [
        'The BIC website may contain links to external websites or third-party services.',
        'BIC is not responsible for the privacy practices or content of external websites.',
        'Visitors are encouraged to review the privacy policies of those services.',
      ],
    },
    {
      title: 'Updates to This Policy',
      blocks: [
        'BIC may amend this Privacy Policy to reflect changes in its activities, technology, operational practices or legal requirements.',
        'The latest version will be published on the BIC website.',
      ],
    },
  ],
}
