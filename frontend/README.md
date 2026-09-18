# John Paul Tagalog — Portfolio

A dark, responsive developer portfolio built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` for code-quality checks.

## Updating portfolio content

Projects, skills, certificates, social links, and journey entries are kept in `src/data/portfolioData.json`. Add the relevant image to `src/assets`, import it in `src/pages/home.jsx`, and map its data path in `assetImages` when adding a new visual.

The reusable page sections are in `src/components`, while global design tokens and responsive styles are in `src/index.css`.

## Contact form

The form validates in the browser and prepares an email in the visitor’s configured email application. It does not claim a message was sent without a server-side form provider.
