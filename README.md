# Brisbane Islamic Centre & Sukoon Village — Websites

A **starting page** where visitors choose a project, plus two **separate
websites**, each with its own interface, navigation, routes, fonts and build,
developed from one shared React codebase:

```text
/          Starting page: two boxes, "Brisbane Islamic Centre" and "Sukoon Village"
/bic/      Brisbane Islamic Centre website
/sukoon/   Sukoon Village website
```


| | Brisbane Islamic Centre | Sukoon Village |
| --- | --- | --- |
| Character | Light & frosted white, navy text, official navy logo | Light, calm, residential, warm gold |
| Navigation | Frosted white bar, 4 dropdowns | Light floating bar, 2 dropdowns |
| Home hero | Full-bleed film/render | Split layout with an arched image window |
| Interior heroes | Full-bleed image with dark scrim | Split, light, arched image |
| Fonts | Fraunces + Manrope | Cormorant Garamond + Nunito Sans (17px base) |
| Main action | **Donate** | **Enquire** |
| Surfaces | White / translucent white; navy `#1C155C` for text and actions; white text only over photos | Warm white; espresso shades of `#CB9B61` for footer and dark bands |

Built with **React 19 + React Router 7 + Vite 8**. No UI framework.

---

## Commands

```bash
npm install

npm run dev:portal     # starting page   → http://localhost:5175  (links to the two dev servers below)
npm run dev:bic        # BIC website     → http://localhost:5173
npm run dev:sukoon     # Sukoon website  → http://localhost:5174
npm run dev            # same as dev:portal

npm run build          # everything → dist/ (starting page), dist/bic/, dist/sukoon/
npm run preview        # serve the full dist/ → http://localhost:4173
npm run lint
```

In development each part runs at `/` on its own port; run all three to click
through the whole journey. `npm run preview` serves the production build
exactly as deployed (starting page at `/`, sites under `/bic/` and `/sukoon/`).

### How it works
`VITE_SITE` in `.env.portal` / `.env.bic` / `.env.sukoon` decides what is
built; `src/main.jsx` loads only that app (`src/portal/Portal.jsx`,
`src/sites/bic/App.jsx` or `src/sites/sukoon/App.jsx`), so each build
contains only its own code. `VITE_BASE` sets the path each site is served
under (`/bic/`, `/sukoon/`); routing, assets and canonical URLs follow it.

### Starting page images
Put the BIC aerial render at **`src/assets/images/portal-bic.jpg`** (JPG, PNG
or WebP; about 1500 × 1101 px, under ~400 KB). It becomes the BIC box
background, shown in full: on desktop both boxes take the image's
proportions, and on mobile the image sits above the text. An optional
`portal-sukoon.jpg` works the same way. Without an image a box uses its brand
colours.

### Deployment
**One domain (default):** upload the whole `dist/` folder.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) route `/bic/*` and
`/sukoon/*` to their own `index.html`. Set `VITE_SITE_URL` (the domain
origin, e.g. `https://example.org`) in `.env.bic` and `.env.sukoon` to enable
canonical URLs and `sitemap.xml`.

**Separate domains (optional):** set `VITE_BASE=/` in a site's env file,
`VITE_SISTER_URL` and `VITE_PORTAL_URL` to the other addresses, and
`VITE_BIC_URL` / `VITE_SUKOON_URL` in `.env.portal`; then deploy each `dist/`
folder on its own.

Optional form endpoints go in `.env.*.local`: `VITE_CONTACT_ENDPOINT`,
`VITE_DONATION_ENDPOINT` (see `.env.example`). Without them the forms say
honestly that they are not yet connected.

---

## Routes

Paths below are relative to each site's base (`/bic/…`, `/sukoon/…`).

**Brisbane Islamic Centre**
```text
/  /about  /vision  /masjid-complex  /cultural-heritage-centre
/project-status  /project-updates  /project-funding
/events  /honoured-guests  /donate  /contact
```

**Sukoon Village**
```text
/  /vision  /seniors-living  /lifestyle-centre  /childcare-centre
/project-status  /project-updates  /contact
```

Route lists for the sitemap live in `src/sites/<site>/routes.js`. Keep them
in sync with each site's `App.jsx`.

---

## Project structure

```text
src/
├── portal/             Starting page (Portal.jsx) + optional box images (media.js)
├── sites/
│   ├── bic/            App.jsx (routes), routes.js, Hero.jsx, pages/ (Home, About,
│   │                   Funding, Events, Guests, Donate)
│   └── sukoon/         App.jsx (routes), routes.js, Hero.jsx, pages/ (Home)
├── templates/          Page templates both sites fill with their own data:
│                       FacilityPage, VisionPage, StatusPage, UpdatesPage,
│                       ContactPage, PageShell, CtaBand, NotFound
├── components/         Shared building blocks (nav, footer, video, masterplan,
│                       timeline, journal, forms, donation, cards, …)
├── data/               ALL CONTENT, see below
├── site.js             SITE_ID + the current site's config
├── layouts/  hooks/  utils/
└── styles/             tokens.css (both identities), base, components, sections,
                        bic.css (BIC light interface), sukoon.css (Sukoon interface), portal.css (starting page)
```

---

## Logos & colours

Colours were sampled from the official logos in `src/assets/logos/`:
BIC `#1C155C` (indigo-navy) and Sukoon `#CB9B61` (gold) + white. All derived
text colours pass WCAG AA (details in `src/styles/tokens.css`).

| File | Use |
| --- | --- |
| `bic.png` | Official navy, for light backgrounds |
| `bic-white.png` | Reversed to white, for dark backgrounds |
| `sukoon.png` | Official white + gold, for dark backgrounds |
| `sukoon-dark.png` | White parts recoloured to espresso, gold kept; for the light Sukoon nav |

The two reversed variants were generated from the official files. Replace
them with official artwork (ideally SVG) if available.

---

## Updating content (no UI changes needed)

| What | File |
| --- | --- |
| Per-site name, menu, CTA, contact details, socials, legal, enquiry topics, features | `data/sites.js` |
| Facilities (Masjid, Heritage Centre, Seniors Living, Lifestyle, Childcare) | `data/facilities.js` |
| Masterplans (one per site; hotspots, shapes, official image) | `data/masterplan.js` |
| Project updates (each tagged `project: 'bic' \| 'sukoon'`) | `data/updates.js` |
| Timelines (per site) | `data/timeline.js` |
| Events, honoured guests (BIC) | `data/events.js`, `data/guests.js` |
| Videos | `data/videos.js` |
| Donation settings, allocations (filtered per site), impact, transparency | `data/donation.js` |
| Funding figures (BIC) | `data/funding.js` |
| Vision pillars & home stories (per site) | `data/vision.js` |

**Sukoon donations** are off (`features.donate: false`, CTA = Enquire)
because no Sukoon donation programme has been confirmed. To enable them, add
a `/donate` route to `src/sites/sukoon/App.jsx`, set `features.donate: true`
and point `cta` at `/donate`.

Remove the two `placeholder: true` sample entries in `data/updates.js` and the
placeholder milestones in `data/timeline.js` when official ones arrive.

---

## Content integrity

No official information has been invented. Names, dates, statistics, funding
figures, guest details, addresses, contact and payment details are `null` or
empty and render as clearly marked "to be confirmed" placeholders.
Descriptive copy is draft wording based on the brief, to be replaced with
official wording.

## Accessibility & performance

Semantic landmarks, one `<h1>` per page, skip link, focus states, labelled
form fields with inline errors, keyboard-operable menus, hotspots and dialogs,
Escape to close, `prefers-reduced-motion`. Route-level code splitting, lazy
images, videos load only on play, and per-page title, description, Open Graph
and canonical tags.
