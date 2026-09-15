# Cases

Every case is one JSON file in this folder, the file name is the URL slug: `content/work/new-platform-for-acme.json` becomes `/nl/work/new-platform-for-acme/` and `/en/work/new-platform-for-acme/`.

The Work pages, the navigation item and the sitemap entries only appear once at least one case has `"published": true`. Only add real projects, with permission from the client.

```json
{
  "published": false,
  "title": { "nl": "…", "en": "…" },
  "client": "Client name",
  "summary": { "nl": "One sentence for cards and meta descriptions", "en": "…" },
  "context": { "nl": ["Paragraph", "…"], "en": ["…"] },
  "problem": { "nl": ["…"], "en": ["…"] },
  "approach": { "nl": ["…"], "en": ["…"] },
  "result": { "nl": ["…"], "en": ["…"] },
  "metrics": [{ "value": "…", "label": { "nl": "…", "en": "…" } }],
  "members": ["thijs-broerse"],
  "technologies": ["TypeScript", "React"],
  "quote": { "text": { "nl": "…", "en": "…" }, "author": "Name", "role": { "nl": "…", "en": "…" } },
  "images": [{ "src": "/images/work/slug/screenshot.jpg", "alt": { "nl": "…", "en": "…" }, "width": 1600, "height": 1000 }]
}
```

`members` refers to file names in `content/team/`, so the case links to their profiles and their profiles link back.
