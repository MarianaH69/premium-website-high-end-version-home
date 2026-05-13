# Tony Heneine CPA Website

Premium static website for Tony Heneine CPA, designed for a professional financial advisory and accounting practice in Lebanon.

## Project Structure

```text
.
├── index.html
├── about.html
├── services.html
├── contact.html
├── styles.css
├── script.js
├── sanity.js
├── insights.js
├── article.js
├── featured-insight.js
├── server.js
├── vercel.json
├── assets/
└── studio/
```

## Run Locally

This is a static website. You can open `index.html` directly, or run the local server:

```bash
node server.js
```

Then visit:

```text
http://127.0.0.1:4173
```

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload all project files and folders.
3. Go to repository `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.

GitHub Pages will publish the website from `index.html`.

## Deploy on Vercel

This is a static website and works on Vercel without a build step.

1. Import the GitHub repository into Vercel.
2. Leave the build command empty.
3. Leave the output directory empty or set it to the project root.
4. Deploy.

`vercel.json` is included for clean URLs and basic headers.

## Sanity CMS

This site is connected to Sanity using:

```text
projectId: xl6gm198
dataset: production
```

CMS-powered pages:

- `insights.html`: searchable article archive with categories
- `article.html?slug=your-article-slug`: dynamic article page
- Homepage featured insight section
- Professional fallback articles are shown automatically if Sanity has no published content yet.

Sanity Studio lives in:

```text
studio/
```

To run Studio:

```bash
cd studio
npm install
npm run dev
```

To make articles appear on the public website, create categories and articles in Sanity Studio. If the website cannot load articles from GitHub Pages, add your GitHub Pages domain to your Sanity project's CORS settings.

## Newsletter / Brevo

The newsletter section is injected by `script.js` before the footer on every page.

The form is ready for Brevo integration. In `script.js`, replace the newsletter form behavior with your Brevo embed or form endpoint where marked by the Brevo integration comment.

## Notes

- The website is dependency-free.
- The public website fetches published articles from Sanity at runtime.
- The WhatsApp CTA uses `https://wa.me/9613242225`.
- The contact email is `antoineheneine@gmail.com`.
