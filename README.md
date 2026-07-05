# A free, fast, and easy-to-edit portfolio website for artists and designers.

- Simply designed to showcase your work
- Fully static — pre-rendered HTML with optimized WebP images, no runtime API calls
- Easily updated via Airtable
- Code is free to use and edit without attribution

## Sample Sites

- [https://samt.work](https://samt.work) ([Airtable](https://airtable.com/shrqxhD3GnjQlmyZY))

_If you use this project to build your site, please [let me know](srticknor@gmail.com) so I can add it here!_

## How it works

Content lives in Airtable. At build time, `scripts/fetch-airtable.mjs` snapshots
every table, downloads all image attachments, and generates responsive WebP
variants. [Astro](https://astro.build) then pre-renders every page as static
HTML. The result is deployed to GitHub Pages — the live site never talks to
Airtable.

## Local development

```bash
npm install

# Snapshot Airtable content + images (writes src/data/ and public/media/)
AIRTABLE_API_KEY=your_read_only_key npm run fetch-data

npm run dev       # dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Deploying

Deployment is handled by `.github/workflows/deploy.yml`:

- Pushes to `main` build and deploy automatically.
- Airtable content changes are published by manually running the workflow
  from the GitHub Actions tab ("Run workflow").

One-time repo setup:

1. Add an `AIRTABLE_API_KEY` repository secret (a read-only key).
2. In Settings → Pages, set the source to "GitHub Actions".

## Updating content

Change the values in the Airtable base, then run the deploy workflow. The
About, Works, CV, Collections Index, and Installations Index tables drive the
menus and pages; column names should not be altered.
