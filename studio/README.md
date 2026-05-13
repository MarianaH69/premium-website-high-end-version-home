# Sanity Studio

This folder contains the Sanity Studio for managing Insights / Articles.

## Setup

```bash
cd studio
npm install
npm run dev
```

The Studio uses:

```text
projectId: xl6gm198
dataset: production
```

## Content Types

- `article`: title, slug, excerpt, category, published date, featured flag, main image, body content, SEO fields.
- `category`: title, slug, description.

## Important

If the public website cannot load articles in the browser, add your GitHub Pages domain and local preview domain to the Sanity project CORS settings.
