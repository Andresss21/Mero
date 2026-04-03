# Categorías Section — Redesign Spec

**Date:** 2026-04-03
**Section:** `src/sections/categorias/`
**Branch:** `feature/vite-restructure`

---

## Goal

Redesign the Categorías section from its current basic horizontal-card grid into a polished 3×2 icon-tile grid that matches the Retro-Futurism design language of the rest of the site.

---

## Layout

**Desktop (>768px):** 3×2 grid, all 6 cards equal width and height.

**Tablet (≤768px):** 2×3 grid (2 columns).

**Mobile (≤480px):** 1 column stack.

Section padding: `8rem 8vw`. Background: `var(--bg2)` (unchanged).

---

## Card Structure

Each card is a `<a class="cat-card">` link to `/products.html?cat=<slug>`.

```
┌─────────────────────┐
│                     │  ← clip-path chamfer (top-right + bottom-left corners)
│   ┌───────────┐     │
│   │  SVG icon │     │  ← icon-wrap: framed box, centered
│   └───────────┘     │
│                     │
│   CATEGORY NAME     │  ← Russo One, ~1rem
│   subcategory       │  ← small caps, --dim color
│   ──────────────    │  ← thin separator
│   120+ modelos      │  ← tiny count, muted cyan
│                     │
│  [ Explorar → ]     │  ← CTA, hidden by default, reveals on hover
└─────────────────────┘
```

All text and icon content is always visible. Only the CTA is hidden until hover.

---

## GPU Featured Treatment

GPU card uses `--hot` (`#F43F5E`) instead of `--primary` (`#5BC4E5`) for:
- Icon stroke color
- Icon-wrap border and background tint
- Corner trace lines
- CTA text and border

No badge or label needed — the color change is the signal.

---

## Hover State: Corner Trace

On hover, two glowing lines animate from the top-left corner:
1. **Top edge:** A line extends right across the full card width
2. **Left edge:** Simultaneously, a line extends down ~55% of card height

Both are `2px` thick, `var(--primary)` color (or `var(--hot)` for GPU), with a `box-shadow` glow.

Implemented via `::before` (top line) and `::after` (left line) pseudo-elements starting at `width: 0` / `height: 0` and transitioning to full size on `:hover`.

**Also on hover:**
- Icon-wrap border brightens (`rgba(91,196,229,.4)`)
- Icon opacity → 1, gets `drop-shadow(0 0 6px rgba(91,196,229,.4))`
- Card border lightens slightly
- Subtle background tint: `rgba(91,196,229,.025)`
- CTA slides up via `translateY(100%) → translateY(0)` with `overflow: hidden` on a wrapper

**Transition timing:** `0.35s cubic-bezier(.16,1,.3,1)` for the corner trace lines; `0.25s ease` for opacity/color changes.

---

## CTA Reveal

The "Explorar →" button sits inside a `.cat-cta-wrap` div with `overflow: hidden` and fixed height.

```css
.cat-cta-wrap { overflow: hidden; height: 0; transition: height .3s ease; }
.cat-card:hover .cat-cta-wrap { height: 28px; } /* or use max-height */
```

Alternatively: `translateY(100%)` on the button itself inside a clipped container.

Button style: small caps, `--primary` color, thin border with clip-path chamfer, no fill. Same pattern as `.btn-ghost` but smaller (`font-size: .58rem`, `padding: .28rem .75rem`).

---

## Scroll Entrance Animation

Cards animate in via GSAP on scroll. `main.js` already calls:

```js
revealOnScroll('.cat-card', { y: 55, stagger: .1, duration: .65 })
```

The new HTML must use `.cat-card` as the class on each `<a>` element (replacing `.cat-link`).

Also animate the section header:
```js
revealOnScroll('#categorias .sec-label, #categorias .sec-title', { x: -24, stagger: .1, duration: .6 })
```

---

## Files to Modify

| File | Change |
|---|---|
| `src/sections/categorias/categorias.html` | Rewrite card markup — new structure, `.cat-card` class |
| `src/sections/categorias/categorias.css` | Full rewrite — new grid, corner trace hover, CTA reveal |
| `src/sections/categorias/categorias.js` | Import only (no logic needed) |
| `src/main.js` | Update `.cat-link` → `.cat-card` in `initCursor()` hover targets |

---

## Self-Review

- No contradictions between layout and hover spec
- CTA reveal method: use `max-height` transition on `.cat-cta-wrap` (`0 → 2rem`) — simpler than height animation, avoids layout reflow
- GPU color override is additive — base card styles use `--primary`, GPU card overrides with `--hot` via a `.gpu` modifier class on the `<a>` element
- Scroll animation class is `.cat-card` throughout — consistent with `main.js`
- Responsive breakpoints are explicit: 3-col → 2-col at 768px → 1-col at 480px
