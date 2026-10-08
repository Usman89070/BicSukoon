# Videos

Each website has its own videos folder: **`videos/bic/`** for Brisbane
Islamic Centre and **`videos/sukoon/`** for Sukoon Village. The videos are
too large for GitHub, so upload them straight to the server (Hostinger File
Manager) into the right folder, using **exactly** these file names:

| Folder / file name | Where it plays |
| --- | --- |
| `bic/BIC(centreH).mp4` | The Masjid Complex film: BIC home page and Masjid Complex page |
| `bic/bic-hero.mp4` | Silent background film behind the BIC home hero |
| `sukoon/sukooonFull.mp4` | The Sukoon Village film: Sukoon home page and Sukoon Project Status page |
| `sukoon/sukoon-hero.mp4` | Short silent background film behind the Sukoon home hero |
| `bic/bic-project-status.mp4` | Project Status page |
| `bic/bic-update-2026.mp4` | Project update film |
| `bic/bic-funding.mp4` | Project Funding page |
| `bic/bic-honoured-guests.mp4` | Honoured Guests page |
| `bic/bic-donate.mp4` | Donate page |
| `bic/bic-events.mp4` | Events page |
| `bic/bic-about.mp4` | About page |
| `bic/bic-contact.mp4` | Contact page |

## Where to put them (either works)

1. `public_html/videos/bic/` and `public_html/videos/sukoon/`: simplest,
   but a full redeploy may replace them, so you would need to upload again.
2. `bic-videos/bic/` and `bic-videos/sukoon/`, with `bic-videos` **next to**
   `public_html` (not inside it): kept on every redeploy. Recommended.

Until a file is uploaded, the site shows a "Video coming soon" placeholder.
MP4 (H.264) plays in every browser. For the web, about 1080p and under
50 MB per minute is plenty; the background films (`bic/bic-hero.mp4`,
`sukoon/sukoon-hero.mp4`) should be short, silent loops, ideally under 15 MB.

Small videos may also be committed into this folder; the build copies them
to the site.
