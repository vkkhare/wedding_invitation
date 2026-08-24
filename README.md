# Varun weds Prarita — Wedding E-Invite

A mobile-first wedding invitation website for the celebrations of **Varun & Prarita**,
26th November 2026 · Utopia Resort, Sanchi (Vidisha).

**Live site:** https://vkkhare.github.io/wedding_invitation/

## Features

- Full-screen animated **parallax hero** — dusk sky, palace silhouettes, rising sky
  lanterns and falling petals, each layer scrolling at its own depth.
- Smooth scroll-reveal transitions between chapters: Ganesh invocation, couple
  introduction, live **countdown** to the wedding day, event cards for all three
  days, and an RSVP section.
- **WhatsApp RSVP** button, tap-to-call numbers, Google Maps directions, and an
  Add-to-Calendar link for the big day.
- Fully responsive (phone → desktop), honors `prefers-reduced-motion`,
  self-hosted fonts (no third-party requests) so it renders identically for
  every guest.

## Structure

```
index.html          — the invitation (single page)
css/style.css       — design system (maroon/gold palette, damask, type scale)
css/fonts.css       — self-hosted @font-face declarations
js/main.js          — parallax, scroll reveals, countdown, loader
assets/monogram.png — VP monogram (transparent gold)
assets/fonts/       — Great Vibes, Marcellus, Cormorant Garamond, Noto Serif Devanagari
```

## Optional: real hero film

Drop a video at `assets/hero.mp4` (portrait or landscape, muted-autoplay friendly,
a few MB max) and it will automatically play behind the hero scene. Without it the
animated scene stands alone.

## Hosting

Deployed by GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages on
every push. If the first run reports Pages is not enabled, enable it once under
**Settings → Pages → Source: GitHub Actions**.
