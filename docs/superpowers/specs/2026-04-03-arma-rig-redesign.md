# Arma Tu Rig — Redesign Spec

**Date:** 2026-04-03
**Section:** `src/sections/arma-rig/`
**Branch:** `feature/vite-restructure`

---

## Goal

Redesign the Arma Tu Rig section into a pinned scroll experience where each of the 6 PC components is revealed one at a time as the user scrolls. Scrolling back reverses the reveal. Two-column layout: sidebar left (25%) tracks all 6 components; feature panel right (75%) displays the active component in detail.

---

## Scroll Mechanic

The section pins (`pin: true`) via GSAP ScrollTrigger. The scroll container is given enough `end` offset to scrub through 6 stages before unpinning.

```js
ScrollTrigger.create({
  trigger: '#rig-arena',
  pin: true,
  start: 'top top',
  end: '+=400%',
  scrub: 1.4,
  onUpdate: (self) => updateStage(Math.floor(self.progress * 6))
})
```

`updateStage(index)` activates component `index` (0–5). Fully bidirectional — scrolling back deactivates components in reverse.

The 6 stages map to: CPU (0), GPU (1), RAM (2), SSD (3), Cooling (4), PSU (5).

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│  SIDEBAR (25%)      │  FEATURE PANEL (75%)           │
│                     │                                │
│  > CPU              │  ┌────────────────────────┐   │
│    GPU              │  │   [Large SVG Icon]      │   │
│    RAM              │  │                         │   │
│    SSD              │  │   COMPONENT NAME        │   │
│    Cooling          │  │   ─────────────────     │   │
│    PSU              │  │   · Spec line 1         │   │
│                     │  │   · Spec line 2         │   │
│                     │  │   · Spec line 3         │   │
│                     │  │   · Spec line 4         │   │
│                     │  │                         │   │
│                     │  │   [ Arma el tuyo → ]    │   │
│                     │  └────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

Section padding: `8rem 8vw`. Background: `var(--bg)`.

---

## Sidebar (25%)

A vertical list of all 6 components. Each item: small SVG icon (same set as Categorías) + component name.

```html
<ul class="rig-sidebar">
  <li class="rig-sidebar-item" data-stage="0">
    <span class="rig-sb-icon"><!-- SVG --></span>
    <span class="rig-sb-name">CPU</span>
  </li>
  <!-- ... -->
</ul>
```

**Inactive state:** Icon opacity `.35`, name `var(--dim)`, no left bar.

**Active state (`.active` class):**
- Left bar: `3px` solid `var(--primary)` on the `::before` pseudo-element
- Icon opacity: `1`
- Name: `var(--text)` full opacity
- Subtle background tint: `rgba(91,196,229,.05)`
- GPU item (stage 1) uses `var(--hot)` for left bar and icon color

Transition: `0.2s ease` on opacity and color changes.

---

## Feature Panel (75%)

One `.rig-stage` element per component, all stacked via `position: absolute`. Active stage has `opacity: 1; pointer-events: auto`, others `opacity: 0; pointer-events: none`.

```html
<div class="rig-panel">
  <div class="rig-stage" data-stage="0">
    <div class="rig-stage-icon"><!-- Large SVG --></div>
    <div class="rig-stage-name">CPU</div>
    <div class="rig-stage-sep"></div>
    <ul class="rig-stage-specs">
      <li>Hasta 24 núcleos de rendimiento</li>
      <li>Soporte DDR5 y PCIe 5.0</li>
      <li>Gráficos integrados incluidos</li>
      <li>Overclocking desbloqueado</li>
    </ul>
    <a href="https://wa.me/..." class="rig-stage-cta">Arma el tuyo →</a>
  </div>
  <!-- stages 1-5 -->
</div>
```

**Icon size:** `120px × 120px`, `color: var(--primary)`. GPU stage: `color: var(--hot)`.

**Name:** `var(--fh)` (Russo One), `3rem`, `letter-spacing: .04em`, `color: var(--text)`.

**Separator:** `width: 40px; height: 2px; background: var(--primary)`. GPU: `var(--hot)`.

**Specs:** `var(--fu)` (Ubuntu Mono), `.85rem`, `color: var(--dim)`, `line-height: 1.8`, bulleted with `·` character.

**CTA:** Same pattern as `.btn-ghost` but full-width is not needed — inline block, `var(--primary)` border and text, clip-path chamfer. GPU stage: `var(--hot)`.

---

## Spec Data

| Component | Specs |
|---|---|
| CPU | Hasta 24 núcleos · Soporte DDR5 · PCIe 5.0 · Overclocking desbloqueado |
| GPU | Hasta 24GB VRAM · DLSS 3 · Ray tracing · PCIe 4.0 x16 |
| RAM | DDR5-6000 · Hasta 128GB · XMP 3.0 · Baja latencia |
| SSD | PCIe 4.0 NVMe · Hasta 7,000 MB/s · Hasta 4TB · M.2 2280 |
| Cooling | AIO 120/240/360mm · Torre de aire · Rodamientos silenciosos · Compatible LGA1700/AM5 |
| PSU | 80+ Gold/Platinum · Hasta 1200W · Totalmente modular · Protección OVCP/SCP |

---

## Glitch Transition

When `updateStage(index)` fires and the index changes, trigger a glitch effect before revealing the new stage:

1. Add `.rig-glitch` class to `.rig-panel` — this triggers a CSS animation: brief scanline overlay flash + opacity flicker on the outgoing stage.
2. After `200ms`, swap active stage (remove `.active` from old, add to new).
3. Remove `.rig-glitch` class.

```css
.rig-panel.rig-glitch::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(91,196,229,.06) 2px,
    rgba(91,196,229,.06) 4px
  );
  animation: glitch-flash .2s steps(1) forwards;
}

@keyframes glitch-flash {
  0%   { opacity: 1; transform: translateX(0); }
  25%  { opacity: .6; transform: translateX(-2px); }
  50%  { opacity: 1; transform: translateX(2px); }
  75%  { opacity: .5; transform: translateX(0); }
  100% { opacity: 0; }
}
```

GPU stage: scanline color uses `rgba(244,63,94,.06)` — achieved by toggling a `.hot` modifier on `.rig-panel`.

---

## JS Implementation (`arma-rig.js`)

Replace the existing timeline-based approach with a `ScrollTrigger` + `onUpdate` approach:

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initArmaRig() {
  const items = document.querySelectorAll('.rig-sidebar-item');
  const stages = document.querySelectorAll('.rig-stage');
  const panel = document.querySelector('.rig-panel');
  let currentStage = -1;

  function updateStage(idx) {
    idx = Math.min(5, Math.max(0, idx));
    if (idx === currentStage) return;

    const prev = currentStage;
    currentStage = idx;

    // Glitch transition
    panel.classList.add('rig-glitch');
    if (stages[idx].dataset.stage === '1') panel.classList.add('hot');
    else panel.classList.remove('hot');

    setTimeout(() => {
      if (prev >= 0) {
        stages[prev].classList.remove('active');
        items[prev].classList.remove('active');
      }
      stages[idx].classList.add('active');
      items[idx].classList.add('active');
      panel.classList.remove('rig-glitch');
    }, 200);
  }

  ScrollTrigger.create({
    trigger: '#rig-arena',
    pin: true,
    start: 'top top',
    end: '+=400%',
    scrub: 1.4,
    onUpdate: (self) => updateStage(Math.floor(self.progress * 6))
  });

  // Activate first stage immediately
  updateStage(0);
}
```

---

## Section Header

```html
<div class="rig-header">
  <div class="sec-label">Configurador</div>
  <h2 class="sec-title">Arma Tu Rig</h2>
</div>
```

Header sits above the two-column split, full width. Scroll entrance via `revealOnScroll` in `main.js` (existing call stays as-is or is updated to match `#rig-arena .sec-label, #rig-arena .sec-title`).

---

## Full HTML Structure

```html
<section id="rig-arena">
  <div class="rig-header">
    <div class="sec-label">Configurador</div>
    <h2 class="sec-title">Arma Tu Rig</h2>
  </div>

  <div class="rig-body">

    <ul class="rig-sidebar">
      <li class="rig-sidebar-item active" data-stage="0">
        <span class="rig-sb-icon"><!-- CPU SVG --></span>
        <span class="rig-sb-name">CPU</span>
      </li>
      <li class="rig-sidebar-item" data-stage="1">
        <span class="rig-sb-icon"><!-- GPU SVG --></span>
        <span class="rig-sb-name">GPU</span>
      </li>
      <!-- RAM, SSD, Cooling, PSU -->
    </ul>

    <div class="rig-panel">
      <div class="rig-stage active" data-stage="0">
        <div class="rig-stage-icon"><!-- SVG 120px --></div>
        <div class="rig-stage-name">CPU</div>
        <div class="rig-stage-sep"></div>
        <ul class="rig-stage-specs">
          <li>Hasta 24 núcleos de rendimiento</li>
          <li>Soporte DDR5 y PCIe 5.0</li>
          <li>Gráficos integrados incluidos</li>
          <li>Overclocking desbloqueado</li>
        </ul>
        <a href="https://wa.me/50300000000?text=Hola%2C+quiero+armar+mi+rig" class="rig-stage-cta btn-ghost">Arma el tuyo →</a>
      </div>
      <!-- stages 1-5 -->
    </div>

  </div>
</section>
```

---

## Responsive

**≤ 900px (tablet):**
- `.rig-body` switches to `flex-direction: column`
- `.rig-sidebar` becomes a horizontal row of dot indicators (icon hidden, just a `6px` circle per item, active = filled `var(--primary)`)
- `.rig-panel` takes full width

**≤ 480px (mobile):**
- Specs list truncated to 2 bullets
- Icon size: `80px`
- Name: `2rem`

---

## Files to Modify

| File | Change |
|---|---|
| `src/sections/arma-rig/arma-rig.html` | Full rewrite — new sidebar + panel structure with 6 stages |
| `src/sections/arma-rig/arma-rig.css` | Full rewrite — pinned layout, sidebar active states, glitch animation, stage transitions |
| `src/sections/arma-rig/arma-rig.js` | Full rewrite — `ScrollTrigger` pin + scrub, `updateStage()`, glitch toggle |
| `src/main.js` | Update `initArmaRig()` call if needed; update `revealOnScroll` selector for header |

---

## Self-Review

- Spec mechanic (pin + scrub + `onUpdate`) is internally consistent — no timeline conflicts
- Glitch uses `setTimeout(200)` which may desync from scrub if user scrolls fast — acceptable; glitch is cosmetic, not structural
- GPU color override `.hot` on `.rig-panel` is additive — same pattern as Categorías `.gpu` modifier
- Sidebar dot fallback at ≤900px doesn't need the SVG icons — they're hidden, no dead markup
- WhatsApp link placeholder (`50300000000`) must be replaced with real number before production — noted
- `updateStage(0)` on init means CPU is always the starting state, consistent with scroll position = 0
