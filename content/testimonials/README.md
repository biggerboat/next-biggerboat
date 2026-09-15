# Testimonials

One JSON file per testimonial. The testimonials section on the homepage and on member profiles only renders once at least one entry has `"published": true`.

Only add real quotes from real clients, with their permission. Never add review or rating structured data for these.

```json
{
  "published": false,
  "quote": { "nl": "…", "en": "…" },
  "author": "Full name",
  "role": { "nl": "CTO", "en": "CTO" },
  "organisation": "Company",
  "members": ["thijs-broerse"]
}
```

`members` is optional and links the quote to the profiles of the people it is about.
