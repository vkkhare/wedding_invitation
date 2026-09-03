# Varun weds Prarita — Wedding E-Invite

A mobile-first React wedding invitation website for the celebrations of
**Varun & Prarita**, 26th November 2026 · Utopia Resort, Sanchi (Vidisha).

**Live site:** https://praritawedsvarun.online

## Stack

React 18 + Vite, with **Framer Motion** driving the parallax (scroll-linked
`useScroll`/`useTransform` layers) and the scroll-reveal transitions.

## Features

- Full-screen **video hero**: attach the wedding film at `public/assets/hero.mp4`
  and it plays behind the titles with a scroll-linked zoom/drift. Until the film
  is attached, a painted parallax scene (dusk sky, palace domes, rising sky
  lanterns) stands in automatically.
- Smooth scroll-reveal chapters: Ganesh invocation, couple introduction, live
  **countdown**, event cards for all three days, RSVP.
- **WhatsApp RSVP** button, tap-to-call numbers, Google Maps directions, and an
  Add-to-Calendar link for the big day.
- Fully responsive, honors `prefers-reduced-motion`, self-hosted fonts (no
  third-party requests) so it renders identically for every guest.

## Two invitations, one site

The same invitation is sent from both sides of the family:

| URL | Sent by | Reads |
| --- | --- | --- |
| `praritawedsvarun.online` | the groom's family | Varun weds Prarita, hosted by the Khares |
| `praritawedsvarun.online/bride` | the bride's family | Prarita weds Varun, hosted by the Agrawals |

Both are the same page — the same sealed envelope opens it, the same hero,
schedule, venue, countdown and music follow. Only the voice changes: whose
name is read first, whose parents invite you, Ma's blessing over the hero, the
special request, the RSVP numbers, the hashtag and the sign-off.

**Every one of those lines lives in `src/content.js`** — `GROOM` and `BRIDE`,
side by side. Nothing else needs editing to change a name, a number or a line
of the schedule. Fields left `null` (the bride side's elders and special
request, for now) simply drop their block rather than printing a placeholder,
so the page stays whole until the family sends the words.

The two pages are built from `index.html` and `bride/index.html` — a second
Vite entry that exists so `/bride` has its own `<title>` and og: card, since
WhatsApp reads those from the HTML and never runs the app. Both load the same
`src/main.jsx`, which reads the side off the URL (`?side=bride` forces it
anywhere, handy for previews).

Because the bride's page is served one level down, references to files in
`public/` are root-absolute (`/assets/…`); the site therefore expects to be
served from a domain root, which `public/CNAME` guarantees.

## Structure

```
index.html                 — Vite entry (meta, font preloads)
bride/index.html           — the bride's entry → /bride (own title + og: card)
src/content.js             — every line that differs between the two sides
src/App.jsx                — page assembly + loading veil
src/components/Hero.jsx    — video + parallax layers (Framer Motion)
src/components/…           — Invocation, Couple, Countdown, Events, Family, Footer, Reveal
src/styles.css             — design system (maroon/gold palette, damask, type scale)
public/css/fonts.css       — self-hosted @font-face declarations
public/assets/monogram.png — VP monogram (transparent gold)
public/assets/fonts/       — Great Vibes, Marcellus, Cormorant Garamond, Noto Serif Devanagari
public/assets/hero.mp4     — (attach) the hero film, muted-autoplay friendly
```

## Develop

```
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Hosting

GitHub Pages, from `.github/workflows/deploy.yml` — it builds and publishes
on every push to `main`, and can also be run by hand from the Actions tab.
Free, with no bandwidth credits to run out and no host badge on the page.

The site is served at **praritawedsvarun.online**. `public/CNAME` carries the
domain into `dist/`, so every deploy re-asserts it; delete that file and
Pages will fall back to the github.io address. GitHub issues the HTTPS
certificate itself once DNS resolves.

`vite.config.js` sets `base: './'`, so the bundle's own files resolve
relatively from either page. Files served straight out of `public/` are
referenced from the root (`/assets/…`) instead, so they resolve the same
whether the reader is on `/` or on `/bride/` — which does assume the site
sits at a domain root, as `public/CNAME` keeps it.

`netlify.toml` is left in place should Netlify ever be wanted again; it is
inert while Pages is doing the serving.
