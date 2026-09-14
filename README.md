# Bigger Boat

The website of [biggerboat.nl](https://biggerboat.nl): a group of independent web developers, software engineers, technical consultants and creative coders.

## How it works

Plain HTML, CSS and JavaScript. There is no build step and nothing to install.

- `index.html` holds the whole page, including every crew member
- `style.css` has all the styling
- `script.js` shuffles the crew on every visit and lets the fish swim
- `images/` holds the artwork, the original design files live in `docs/design`

To preview locally, serve the folder with any static server, for example `python3 -m http.server` and open http://localhost:8000.

## Adding yourself to the crew

Copy an `<article class="boatie">` block in `index.html` and fill in your own details. There is no general contact form, everyone lists their own email, phone and links. Former members get `class="boatie is-alumni"`, which adds the "Unavailable" ribbon and sorts them to the bottom.

## Hosting

GitHub Pages serves the `main` branch as is, so every push to `main` is live within a minute. The custom domain is set in `CNAME`.
