# Mero — Restructure & Landing Page Improvement

**Date:** 2026-04-02  
**Status:** Approved  

---

## Overview

Transform the current monolithic `index.html` (1,338 lines) into a modular, Vite-powered multi-page site. Each section becomes a self-contained module (HTML + CSS + JS). A separate `/products` page handles the full catalog. The structure maps directly to Next.js components when that migration happens.

---

## Architecture

### Build Tool
**Vite** — handles HTML assembly, CSS/JS imports, dev server with HMR, and production build output. No framework. Still vanilla HTML/CSS/JS + GSAP + Lenis.

### Folder Structure

```
src/
  layout/
    nav/
      nav.html
      nav.css
      nav.js
    footer/
      footer.html
      footer.css
    cursor/
      cursor.js
      cursor.css
    preloader/
      preloader.html
      preloader.css
      preloader.js

  sections/
    hero/
    trust-bar/
    marquee/
    productos/         ← featured only (3–5 cards)
    categorias/
    arma-rig/
    como/
    eventos/           ← new
    galeria/
    statement/
    por-que/
    newsletter/
    products-hero/     ← products page only
    products-filters/  ← products page only
    products-grid/     ← products page only

  shared/
    tokens.css         ← CSS variables, reset, scrollbar, focus states
    animations.js      ← GSAP setup, Lenis init, shared animation helpers
    icons.js           ← SVG icon helper (reusable across sections)

  pages/
    index.html         ← landing page entry point
    products.html      ← catalog page entry point
```

### Assembly Pattern
Vite has native multi-page support — each `.html` file in `src/pages/` is its own entry point. Section HTML partials are assembled using **`vite-plugin-html`** (EJS syntax), so `index.html` uses `<%- include('../sections/hero/hero.html') %>` to pull in each section. CSS is imported per-section inside each section's JS file (`import './hero.css'`). `shared/tokens.css` is imported first in `animations.js` so it loads before any section styles.

---

## Pages

### index.html — Landing Page

Section order (top to bottom):

| Section | Notes |
|---|---|
| Preloader | Unchanged |
| Nav | Unchanged — scrolled state, mobile menu |
| Cursor | Unchanged |
| Hero | Headline, two CTAs (WhatsApp + Ver Productos) |
| Trust Bar | Unchanged |
| Marquee | Unchanged |
| **Featured Products** | 3–5 hardcoded cards. Labels: Hot Deal · Best Value · New Arrival. "Ver todo" → /products |
| Categorías | Links to /products?cat=... |
| Arma Tu Rig | Fixed — interactive slot animation works correctly |
| Cómo Funciona | Unchanged |
| **Eventos** | New section — partnership event showcase |
| Galería de Rigs | Unchanged |
| Statement | Cinematic quote — unchanged |
| Por Qué Mero | Stats — unchanged |
| Newsletter | Unchanged |
| Footer | Unchanged |
| ~~Comunidad~~ | **Removed** |
| ~~Torneos~~ | **Replaced by Eventos** |

### products.html — Catalog Page (New)

| Section | Notes |
|---|---|
| Nav | Shared layout component |
| Cursor | Shared layout component |
| Products Hero | Simple page header — "Catálogo", current stock badge |
| Category Filters | Filter chips: All · CPU · GPU · RAM · SSD · Cooling. URL param `?cat=` pre-selects. JS filters grid client-side |
| Product Grid | Full catalog, hardcoded. Each card has WhatsApp CTA button |
| Footer | Shared layout component |

---

## Section Changes

### Featured Products (productos/)
- Reduced from 5-column full catalog to 3–5 highlight cards
- Each card gets a badge label: `HOT DEAL`, `BEST VALUE`, `NEW ARRIVAL`
- "Ver catálogo completo" button links to /products
- Cards still use existing `.prod-card` design — no visual change

### Eventos (new)
- Replaces Torneos section
- Shows the partnership event Mero organized
- Content options (pick one or combine):
  - TikTok embed (iframe) if video exists
  - Photo grid (2–3 images) if photos available
  - Event card with date, partner logo, location
- Design language: same retro-futurism border/card treatment as other sections

### Arma Tu Rig (fix)
- Current issue: slot animation sequence is broken — slots don't animate in correctly
- Fix: rewrite the slot power-on sequence in JS. Each slot lights up one at a time on a timer, with proper `.on` class toggling and flash animation
- The visual design stays the same — just the JS logic needs to work

### Categorías
- Add `href="/products?cat=cpu"` etc. to each cat-link
- No visual change

---

## Shared / tokens.css

Extract from current `index.html` `<style>`:
- `:root` CSS variables
- Reset (`*, *::before, *::after`)
- Scrollbar styles
- `:focus-visible` styles
- `.sec-label`, `.sec-title`, `.btn-primary`, `.btn-ghost`, `.icon-svg` — shared UI primitives

---

## Shared / animations.js

Extract from current inline `<script>`:
- Lenis smooth scroll init
- GSAP + ScrollTrigger registration
- Shared fade-in scroll reveal helper used by multiple sections

---

## Products Page — Filter Logic

Client-side only. JS reads `?cat=` URL param on load and activates the matching filter chip. Filter chips toggle `.active` class and show/hide `.prod-card` elements by their `data-cat` attribute. No server required.

---

## What Does NOT Change

- Visual design language — Retro-Futurism, all colors, fonts, animations
- GSAP + Lenis — same libraries, same feel
- Custom cursor behavior
- Preloader sequence
- Mobile nav
- All existing section designs (hero, trust bar, marquee, galeria, statement, por-que, newsletter, footer, como)

---

## Out of Scope

- Google Sheets integration (Phase 1+)
- WhatsApp order flow automation (Phase 1+)
- Any backend or database
- React / Next.js migration (future)
- Product detail pages
