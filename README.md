# fjgtalampas.github.io

Personal site for Francis Jason Talampas, hosted on GitHub Pages. It is plain HTML, CSS and JavaScript with no build step.

| Page | Purpose |
| --- | --- |
| [`index.html`](index.html) | Link hub: profile plus social accounts |
| [`profile.html`](profile.html) | Professional profile: impact, experience, capabilities, credentials |
| [`404.html`](404.html) | Not-found page served by GitHub Pages |

## Layout

```
index.html, profile.html, 404.html   pages
styles.css                           shared design tokens and profile styles (light, dark and print)
links.css                            link hub styles (also used by 404.html)
site.js                              shared behaviour: year, mobile menu, nav highlighting, print expansion
fonts/                               self-hosted Inter (SIL OFL, see Inter-LICENSE.txt)
images/                              optimized portraits (WebP + JPEG) and the 1200x630 social card
favicon.svg, favicon.ico, apple-touch-icon.png
robots.txt, sitemap.xml
```

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Updating content

- **Years of experience** are computed in the browser from `data-years-since="2013-08"` on the stat in `profile.html`. The text inside is the no-JavaScript fallback; update it when the number changes.
- **Images:** keep the `-288/-432` (avatar) and `-400/-800` (profile) sizes, each as `.webp` and `.jpeg`. The social card is `images/og-image.jpeg` (1200x630).
- **New pages** need an entry in `sitemap.xml`.

## Checks

`.github/workflows/checks.yml` runs on every push, pull request and weekly:

- HTML validation with [html-validate](https://html-validate.org) (rules in `.htmlvalidate.json`)
- Link checking with [lychee](https://github.com/lycheeverse/lychee)
