# Brisbane Islamic Centre & Sukoon Village — Websites

A **starting page** where visitors choose a project, plus two **separate
websites**, each with its own interface, navigation, routes, fonts and build,
developed from one shared React codebase:

```text
/          Starting page: screen split into two full-height photos, BIC and Sukoon Village
/bic/      Brisbane Islamic Centre website
/sukoon/   Sukoon Village website
```


| | Brisbane Islamic Centre | Sukoon Village |
| --- | --- | --- |
| Character | Light & frosted white, navy text, official navy logo | Light, calm, residential, warm gold |
| Navigation | Frosted white bar, 4 dropdowns | Light floating bar, 2 dropdowns |
| Home hero | Full-screen render / film, short headline | Full-screen render / film, short headline |
| Interior heroes | Light split, rounded image frame | Split, light, arched image |
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

### Photos and renders (drop-in)
Put JPG, PNG or WebP files in `src/assets/images/` with these names and they
appear automatically (until then a labelled placeholder is shown):

| File name starts with | Where it shows |
| --- | --- |
| `portal-bic`, `portal-sukoon` | Starting page, full-screen halves (falls back to the `site-300DPI…` renders) |
| `hero-bic`, `hero-sukoon` | Full-screen home hero (falls back to the `site-300DPI…` renders) |
| `facility-masjid`, `facility-qmchc`, `facility-community-hall`, `facility-cafe`, `facility-gyms`, `facility-childcare` | "Everything in one place" facility tiles |
| `progress-sukoon-drive`, `progress-existing-structure`, `progress-underground-tank` | "Already built" panels |

Use wide images (about 2400px) for the hero and starting page. Videos (MP4
URL or file) go in `src/data/videos.js`: `hero` and `sukoon` play full screen
behind the home heroes, `masjid` and `sukoon` are the home page films.

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

**Hostinger (and other Apache/LiteSpeed hosts):** framework preset *Vite*,
build command `npm run build`, output directory `dist`. No environment
variables are required. The build writes `dist/.htaccess`, which routes
`/bic/*` and `/sukoon/*` to their own app so page links and refreshes work.

### Admin panel (Honoured Guests)
`/admin/` is a small PHP panel (in `server/`, copied into `dist/` by the
build) for adding, editing, reordering, hiding and deleting honoured guests
and uploading their portraits. Changes show on `/bic/honoured-guests`
immediately; no rebuild needed.

- Needs PHP 8 (Hostinger web hosting has it). Sign in with username `admin`;
  the starting password is given separately. Change it under "Change password".
- Data and photos are saved in a `bic-data/` folder **next to** `public_html`,
  so redeploying never wipes them. If that folder cannot be created, create it
  in Hostinger's File Manager (the panel shows a warning until then).
- "Download backup" exports the list as JSON.
- Until the first change is saved, the website shows the list built from
  `src/data/guests.js`.

**Optional form endpoints:** `VITE_CONTACT_ENDPOINT` and
`VITE_DONATION_ENDPOINT` (any URL that accepts a JSON POST, e.g. Formspree).
Set them in the host's environment variables or in `.env.bic.local` /
`.env.sukoon.local`. Without them the forms say honestly that they are not
yet connected, and nothing is sent anywhere.

---

## Routes

Paths below are relative to each site's base (`/bic/…`, `/sukoon/…`).

**Brisbane Islamic Centre**
```text
/  /about  /vision  /masjid-complex  /cultural-heritage-centre
/community-hall  /cafe  /gyms
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
| Facilities (Masjid, QMCHC, Community Hall, Café, Gyms, Seniors Living, Lifestyle, Childcare) | `data/facilities.js` |
| Facility tiles on both home pages | `data/discover.js` |
| Completed works ("Already built") | `data/progress.js` |
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
