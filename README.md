# Varun weds Prarita — Wedding E-Invite

A mobile-first React wedding invitation website for the celebrations of
**Varun & Prarita**, 26th November 2026 · Utopia Resort, Sanchi (Vidisha).

**Live site:** https://varunwedsprarita.netlify.app

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

## Structure

```
index.html                 — Vite entry (meta, font preloads)
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

Netlify builds and deploys on every push to the production branch
(`claude/wedding-invite-website-fpk0yi`); build settings are pinned in `netlify.toml`.
A manual GitHub Pages workflow remains available from the Actions tab as backup.
