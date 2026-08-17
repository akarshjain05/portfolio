# Akarsh — Portfolio

A code-editor-themed personal portfolio built with React, Vite, and React Router.
The whole site is styled to look like a dark IDE — a sidebar file tree and tab bar
double as the site navigation, and each "file" is a section of the portfolio
(Home, About, Projects, Skills, Contact, README).

## Quick start

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). That's it — every
page, the sidebar, the tabs, and the contact form all work out of the box.

Other commands:

```bash
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
npm run lint      # check for JS/React issues
```

## Before you deploy — customize your content

Everything personal (your bio, links, projects, skills, and education) lives
in **one file**: `src/data/portfolioData.js`. Open it and update these
placeholders:

- [ ] `socials` — swap in your real GitHub, LinkedIn, LeetCode, Codeforces,
      and email links
- [ ] `projects[].github` / `projects[].live` — point at your real repos and
      any live demo URLs
- [ ] `education` — fill in your exact dates (currently set to "In progress")
- [ ] `skillGroups` — the percentages are self-rated placeholders; adjust
      them (or the categories) to match how you'd actually rate yourself
- [ ] Add or remove projects/skills freely — every card and skill bar is
      generated from this file, so the UI updates automatically

The contact form (`src/pages/Contact.jsx`) works via a `mailto:` link out of
the box — pressing send opens the visitor's email client with the message
pre-filled, addressed to whatever email you set in `socials`. No backend or
API key required. If you'd rather receive submissions directly in an inbox
without the visitor needing a mail client, swap that handler for a service
like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/).

## Adding a new page

1. Add an entry to the `files` array in `src/data/portfolioData.js`
   (this drives the sidebar, tab bar, breadcrumb, and status-bar language tag).
2. Create the page component in `src/pages/`.
3. Add a matching `<Route>` in `src/App.jsx`.

## Deploying

This is a client-side-routed single-page app, so your host needs to serve
`index.html` for unknown paths (otherwise refreshing `/projects` 404s).
That's already handled for you:

- **Vercel** — `vercel.json` is included; just import the repo.
- **Netlify** — `public/_redirects` is included; set the build command to
  `npm run build` and the publish directory to `dist`.
- **GitHub Pages** — needs extra config for client-side routing (either a
  `404.html` redirect trick or switching to `HashRouter` in `src/main.jsx`).

## Project structure

```
src/
  data/portfolioData.js   # <- all your editable content lives here
  components/
    shell/                # the IDE chrome (title bar, sidebar, tabs, status bar)
    icons.jsx             # icon lookup for file types & social links
  pages/                  # Home, About, Projects, Skills, Contact, Readme, NotFound
  hooks/useClock.js       # live status-bar clock
```

## Tech

React 19 · Vite · React Router · lucide-react · react-icons
