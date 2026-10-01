# Brisbane Islamic Centre & Sukoon Village — Website

A premium, data-driven React website for two connected community projects:
**Brisbane Islamic Centre (BIC)** and **Sukoon Village**, built around
**Faith — Knowledge — Community — Legacy**.

Built with **React 19 + React Router 7 + Vite 8**. No UI framework: a custom
design system using CSS tokens, restrained glassmorphism and lightweight
IntersectionObserver-based animation.

---

## Getting started

```bash
npm install
npm run dev       # local development → http://localhost:5173
npm run build     # production build → dist/ (+ sitemap.xml when VITE_SITE_URL is set)
npm run preview   # preview the production build
npm run lint
```

Copy `.env.example` to `.env` and fill in values when available:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public URL. Enables canonical/Open Graph URLs and generates `sitemap.xml` + `robots.txt` at build. |
| `VITE_CONTACT_ENDPOINT` | Any JSON POST endpoint (Formspree, serverless function, CRM webhook). Empty = the form honestly says it is not yet connected. |
| `VITE_DONATION_ENDPOINT` | Endpoint that receives donation intent before payment. Alternatively set `payment.checkoutUrl` in `src/data/donation.js`. |

### Deployment
It's a static SPA. `public/_redirects` (Netlify) and `vercel.json` (Vercel) are
included so deep links like `/sukoon-village/seniors-living` resolve.
For other hosts, configure a fallback to `index.html`.

---

## ⚠ Logos & colour system — action required

The official BIC and Sukoon Village logo files were **not in the repository**
when this site was built, so the brand colours are **provisional**.

1. Add the logo files (SVG preferred) to `src/assets/logos/`.
2. Register them in `src/data/site.js`:
   ```js
   import bicLogo from '../assets/logos/bic.svg'
   import sukoonLogo from '../assets/logos/sukoon.svg'
   logos: { bic: bicLogo, sukoon: sukoonLogo }
   ```
   The typographic placeholder marks are then replaced everywhere (nav, mega
   menu, project cards, footer).
3. Sample each logo's primary / secondary / accent colours and update **only**
   the `BRAND` block at the top of `src/styles/tokens.css`
   (`--bic-*` and `--sv-*`). Every component reads semantic tokens
   (`--primary`, `--accent`, …), so the whole site re-themes, including
   the subtle accent shift between BIC and Sukoon pages.

---

## Project structure

```text
src/
├── assets/            images/, videos/, logos/ (drop official media here)
├── components/
│   ├── common/        Button, Media (lazy image + render placeholder), Seo, Reveal,
│   │                  Pending, Logo, Icon, Pattern, SocialLinks, SubNav, …
│   ├── navigation/    Floating glass Navbar with mega menus + mobile menu
│   ├── hero/          Cinematic home Hero, interior PageHero
│   ├── cards/         ProjectCard (landing), FacilityCard
│   ├── video/         VideoFeature (poster-first, lazy, fullscreen, YouTube support)
│   ├── masterplan/    Interactive Masterplan + indicative schematic
│   ├── timeline/      Completed / current / upcoming Timeline
│   ├── updates/       UpdateJournal (Project Updates, newest → oldest)
│   ├── events/        EventList (upcoming / past computed from dates)
│   ├── guests/        GuestGrid
│   ├── donation/      DonationForm, AllocationCards, FundingProgress
│   ├── forms/         ContactForm, ContactSection
│   ├── story/         ProjectStory, VisionPillars
│   └── footer/
├── data/              ← ALL CONTENT LIVES HERE
├── hooks/             useReveal, useScrolled, useParallax, useLockBody, useEscape
├── layouts/           SiteLayout (nav, footer, project theme switching, Suspense)
├── pages/             Home, BIC/, SukoonVillage/, ProjectUpdates, Donate, Vision,
│                      Contact, NotFound, shared/ (data-driven page templates)
├── styles/            tokens.css, base.css, components.css, sections.css
└── utils/             format, forms (integration-ready submit), routes (sitemap)
```

## Routes

```text
/                               /project-updates      /donate
/vision                         /contact
/brisbane-islamic-centre        /vision /masjid-complex /cultural-heritage-centre
                                /project-status /project-funding /honoured-guests
                                /events /about /contact
/sukoon-village                 /vision /seniors-living /lifestyle-centre
                                /project-status /childcare-centre /contact
```

Each section is code-split (BIC and Sukoon each load as one chunk).

---

## Updating content (no UI changes needed)

| What | File | Notes |
| --- | --- | --- |
| Contact details, socials, legal, registration no. | `data/site.js` | `null` shows a "to be confirmed" badge. Social icons appear only when `href` is set. |
| Project intros | `data/projects.js` | |
| Facilities (Masjid, Heritage Centre, Seniors Living, …) | `data/facilities.js` | Drives facility pages, masterplan panels and donation cards. |
| Masterplan | `data/masterplan.js` | Set `image` to the official aerial/masterplan and adjust each hotspot's `x`/`y` (%). Set `isIndicative: false`. Append objects to add locations. |
| Project updates | `data/updates.js` | Append entries; sorted newest → oldest automatically. **Remove the two `placeholder: true` samples.** |
| Timeline | `data/timeline.js` | Replace placeholder milestones with official ones only. |
| Events | `data/events.js` | Upcoming/past computed from `date`. |
| Honoured guests | `data/guests.js` | |
| Videos | `data/videos.js` | Set `src` (or `sources`, or `youtubeId`) and `poster` per slot: hero, masjid, status, update2026, funding, guests, donate, events, about, contact, sukoon. |
| Donation settings | `data/donation.js` | Preset amounts, recurring support, payment provider / checkout URL, impact stats, transparency documents. |
| Funding figures | `data/funding.js` | Progress bar appears only when both `target` and `raised` are set. |
| Vision & story copy | `data/vision.js` | |

### Images
`<Media src={…} />` accepts a URL/import or `{ src, srcSet, sizes, alt }` for
responsive images. When `src` is missing, an art-directed architectural
placeholder labelled with the required asset is shown instead of a fake photo.

---

## Content integrity

No official information has been invented: names, dates, statistics, funding
amounts, targets, guest details, completion percentages, addresses, contact
details, payment details, bank details and registration numbers are all
`null`/empty and rendered as clearly identifiable placeholders. Descriptive
copy is introductory draft wording based on the project brief and should be
replaced with official wording as it is supplied.

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, skip link, visible focus states,
  labelled form fields with inline errors, `aria-expanded` menus, Escape to
  close menus/panels, keyboard-operable hotspots, `prefers-reduced-motion`.
- Glass surfaces sit over dark scrims (or near-opaque light panels) to keep
  text contrast high.
- Route-level code splitting, lazy images, videos load only on play,
  `preload="none"`/`metadata` on background video, rAF-throttled scroll effects.
- Per-page `<title>`, meta description, Open Graph/Twitter tags and canonical
  URLs (React 19 native head hoisting), sitemap generation at build.
