# Brisbane Islamic Centre & Sukoon Village — Websites

Two **separate websites**, each with its own interface, navigation, routes,
fonts and build, developed from one shared React codebase:

| | Brisbane Islamic Centre | Sukoon Village |
| --- | --- | --- |
| Character | Monumental, cinematic, deep navy | Light, calm, residential, warm gold |
| Navigation | Dark floating glass bar, 4 dropdowns | Light floating bar, 2 dropdowns |
| Home hero | Full-bleed film/render | Split layout with an arched image window |
| Interior heroes | Full-bleed image with dark scrim | Split, light, arched image |
| Fonts | Fraunces + Manrope | Cormorant Garamond + Nunito Sans (17px base) |
| Main action | **Donate** | **Enquire** |
| Darks | Navy shades of `#1C155C` | Espresso shades of `#CB9B61` |

Built with **React 19 + React Router 7 + Vite 8**. No UI framework.

---

## Commands

```bash
npm install

npm run dev:bic        # BIC website     → http://localhost:5173
npm run dev:sukoon     # Sukoon website  → http://localhost:5174
npm run dev            # same as dev:bic

npm run build          # builds both → dist/bic and dist/sukoon
npm run build:bic
npm run build:sukoon
npm run preview:bic    # → http://localhost:4173
npm run preview:sukoon # → http://localhost:4174
npm run lint
```

Run both dev servers at once to click the "Also visit" link in each footer
between the two sites.

### How the split works
`VITE_SITE` in `.env.bic` / `.env.sukoon` decides which website is built.
`src/main.jsx` mounts `src/sites/bic/App.jsx` or `src/sites/sukoon/App.jsx`;
the other site's pages are tree-shaken out of each build. `index.html`
receives the site's title, description, favicon, theme colour and fonts from
the same env file, and `<html data-site="…">` switches the design tokens.

### Deployment
Deploy `dist/bic` and `dist/sukoon` as **two separate static sites** (two
domains). Before building, set in each env file (or `.env.bic.local` /
`.env.sukoon.local`):

- `VITE_SITE_URL`: that site's public URL. Enables canonical/Open Graph
  URLs and generates `sitemap.xml` + `robots.txt`.
- `VITE_SISTER_URL`: the other site's URL, for the "Also visit" footer link.
  It is hidden when empty in production.

Both are SPAs: configure the host to fall back to `index.html`
(`public/_redirects` for Netlify and `vercel.json` for Vercel are included).

Optional form endpoints go in `.env.*.local`: `VITE_CONTACT_ENDPOINT`,
`VITE_DONATION_ENDPOINT` (see `.env.example`). Without them the forms say
honestly that they are not yet connected.

---

## Routes

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
                        sukoon.css (Sukoon-only interface)
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
