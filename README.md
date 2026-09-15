# Bigger Boat

The website of [biggerboat.nl](https://biggerboat.nl): a collective of senior independent developers, engineers and technical leads.

## How it works

A small static site generator without dependencies. Node 22 is all you need, there is nothing to install.

```
npm run dev      # build, serve on http://localhost:8000 and rebuild on changes
npm run build    # build the site into dist/
npm run check    # build, then check headings, metadata, hreflang, structured data, links and the sitemap
npm run og       # regenerate the Open Graph images (needs Chrome)
npm run images   # turn team photos into responsive AVIF/WebP/JPEG (needs ffmpeg, cwebp, avifenc)
```

- `content/` holds the data: team members, cases and testimonials, one JSON file each
- `src/pages/` holds a module per page with its Dutch and English copy
- `src/layout.mjs` has the head (metadata, hreflang, JSON-LD), header and footer
- `src/styles/site.css` is inlined into every page
- `static/` is copied as is: fonts, images, favicon, `CNAME`
- `src/config.mjs` has the site-wide settings: the contact address, the company LinkedIn and analytics

Every page exists in Dutch (`/nl/…`) and English (`/en/…`). The root `/` sends visitors to their language and is the `x-default` for search engines.

## Adding yourself to the crew

1. Copy a file in `content/team/`, name it after yourself (`firstname-lastname.json`, this becomes your URL)
2. Fill in both `nl` and `en`. Use `careerStartYear` rather than `experienceYears`, it stays correct
3. Optional: add a photo as `content/team/photos/firstname-lastname.jpg`, run `npm run images` and set `"photo": true`
4. Run `npm run og` for your share image and `npm run check`

Your profile page, the team overview, the homepage, the numbers, the sitemap and the structured data all follow automatically. Set `"available": false` to take yourself off the site.

The site only shows numbers it can back up. The experience stats (combined and average years) appear by themselves once every member has filled in their experience. Don't write numbers into the copy by hand.

## Cases and testimonials

See `content/work/README.md` and `content/testimonials/README.md`. The Work pages and testimonial sections stay invisible until there is at least one real, published entry. Never add made-up clients, cases or quotes.

## Analytics

Off by default. Set `analytics` in `src/config.mjs` to load a privacy friendly, cookieless script (Plausible or compatible). The site then sends events for email and phone clicks, contact CTAs, team profile clicks, language switches and outbound links. Update the privacy page if you do.

## Hosting

GitHub Actions builds and checks every push. Pushes to `main` are deployed to GitHub Pages. In the repository settings, Pages needs to use **GitHub Actions** as its source. The custom domain is set in `static/CNAME`.
