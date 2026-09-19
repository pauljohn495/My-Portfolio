# John Paul Tagalog — Portfolio

A responsive developer portfolio built with React, Vite, Tailwind CSS, shadcn/ui, and Anime.js, with persistent light and dark themes.

## Local development

```bash
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` for code-quality checks.

## GitHub Activity configuration

The contribution calendar requests `/api/github-contributions`. That Vercel Function calls GitHub’s GraphQL API, so the GitHub token is never included in the browser bundle.

Copy `.env.example` to `.env.local` and configure:

```bash
GITHUB_USERNAME=pauljohn495
GITHUB_TOKEN=your_github_personal_access_token
```

Use `npx vercel dev` when testing the frontend and Vercel Function together locally. Add the same variables in the Vercel project’s Environment Variables settings before deploying. Never prefix the token with `VITE_`.

Successful contribution responses are cached at Vercel’s edge for one hour and can be served stale while they revalidate in the background.

## Updating portfolio content

Projects, skills, certificates, social links, and journey entries are kept in `src/data/portfolioData.json`. Add the relevant image to `src/assets`, import it in `src/pages/home.jsx`, and map its data path in `assetImages` when adding a new visual.

The reusable page sections are in `src/components`, while global design tokens and responsive styles are in `src/index.css`.

Anime.js powers the coordinated hero and project-carousel entrance sequences. Motion is automatically skipped when a visitor enables reduced-motion preferences. Theme selection follows the system preference on first visit and is stored locally after the visitor uses the navigation toggle.

## Contact form

The form validates in the browser and prepares an email in the visitor’s configured email application. It does not claim a message was sent without a server-side form provider.
