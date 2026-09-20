# John Paul Tagalog — Portfolio

A responsive developer portfolio built with React, Vite, Tailwind CSS, and focused shadcn/ui primitives. It includes persistent light and dark themes, accessible project and certificate dialogs, and live GitHub contribution data.

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

## Vercel deployment

Set the Vercel project’s Root Directory to `frontend`. Vercel detects Vite automatically, runs `npm install` from the lockfile, builds the frontend, and deploys `api/github-contributions.js` as `/api/github-contributions`. Configure both GitHub environment variables before deploying.

## Updating portfolio content

Projects, skills, certificates, and social links are kept in `src/data/portfolioData.json`. Add the relevant image to `src/assets`, import it in `src/pages/home.jsx`, and map its data path in `assetImages` when adding a new visual.

The reusable page sections are in `src/components`, while global design tokens and responsive styles are in `src/index.css`.

Page changes use the browser View Transition API when available and fall back to a CSS entrance animation. Motion is automatically minimized when a visitor enables reduced-motion preferences. Theme selection follows the system preference on first visit and is stored locally after the visitor uses the navigation toggle.
