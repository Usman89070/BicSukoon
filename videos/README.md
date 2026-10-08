# Videos

Videos are loaded by the website from `/videos/<file name>`. They are too
large for GitHub, so upload them straight to the server (Hostinger File
Manager), using **exactly** these file names:

| File name | Where it plays |
| --- | --- |
| `BIC(centreH).mp4` | The Masjid Complex film: BIC home page and Masjid Complex page |
| `bic-hero.mp4` | Silent background film behind the BIC home hero |
| `sukooonFull.mp4` | The Sukoon Village film: Sukoon home page and Sukoon Project Status page |
| `sukoon-hero.mp4` | Short silent background film behind the Sukoon home hero |
| `bic-project-status.mp4` | Project Status page |
| `bic-update-2026.mp4` | Project update film |
| `bic-funding.mp4` | Project Funding page |
| `bic-honoured-guests.mp4` | Honoured Guests page |
| `bic-donate.mp4` | Donate page |
| `bic-events.mp4` | Events page |
| `bic-about.mp4` | About page |
| `bic-contact.mp4` | Contact page |

## Where to put them (either works)

1. `public_html/videos/`: simplest, but a full redeploy may replace this
   folder, so you would need to upload again.
2. `bic-videos/`, **next to** `public_html` (not inside it): kept on every
   redeploy. Recommended.

Until a file is uploaded, the site shows a "Video coming soon" placeholder.
MP4 (H.264) plays in every browser. For the web, about 1080p and under
50 MB per minute is plenty; the background films (`bic-hero.mp4`,
`sukoon-hero.mp4`) should be short, silent loops, ideally under 15 MB.

Small videos may also be committed into this folder; the build copies them
to the site.
