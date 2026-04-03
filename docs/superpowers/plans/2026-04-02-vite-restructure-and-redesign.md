# Mero — Vite Restructure + Approved Section Redesigns

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the monolithic `index.html` to a modular Vite project and implement all approved section redesigns (Hero, Nav, Marquee, Featured Products) plus new purple-black theme tokens.

**Architecture:** Hybrid module structure — layout chrome (nav, footer, cursor, preloader) in `src/layout/`, feature sections in `src/sections/`, shared CSS tokens and JS utilities in `src/shared/`. Vite assembles pages via `vite-plugin-html` EJS includes. No framework — vanilla HTML/CSS/JS + GSAP + Lenis.

**Tech Stack:** Vite 5, vite-plugin-html, GSAP 3, Lenis 1, vanilla JS/CSS, Node 18+

---

## File Map

### New files (created)
```
package.json
vite.config.js
src/shared/tokens.css
src/shared/animations.js
src/layout/cursor/cursor.css
src/layout/cursor/cursor.js
src/layout/preloader/preloader.html
src/layout/preloader/preloader.css
src/layout/preloader/preloader.js
src/layout/nav/nav.html
src/layout/nav/nav.css
src/layout/nav/nav.js
src/layout/footer/footer.html
src/layout/footer/footer.css
src/sections/hero/hero.html
src/sections/hero/hero.css
src/sections/hero/hero.js
src/sections/trust-bar/trust-bar.html
src/sections/trust-bar/trust-bar.css
src/sections/marquee/marquee.html
src/sections/marquee/marquee.css
src/sections/productos/productos.html
src/sections/productos/productos.css
src/sections/productos/productos.js
src/sections/categorias/categorias.html
src/sections/categorias/categorias.css
src/sections/categorias/categorias.js
src/sections/arma-rig/arma-rig.html
src/sections/arma-rig/arma-rig.css
src/sections/arma-rig/arma-rig.js
src/sections/como/como.html
src/sections/como/como.css
src/sections/eventos/eventos.html
src/sections/eventos/eventos.css
src/sections/galeria/galeria.html
src/sections/galeria/galeria.css
src/sections/statement/statement.html
src/sections/statement/statement.css
src/sections/por-que/por-que.html
src/sections/por-que/por-que.css
src/sections/newsletter/newsletter.html
src/sections/newsletter/newsletter.css
index.html                  ← Vite entry point (EJS includes)
```

### Deleted after migration
```
index.html (original monolith — replaced by new modular index.html)
cards-preview.html (brainstorm artifact)
```

### Kept as-is
```
public/logo/*
public/products/*
```

---

## Task 1: Vite project setup

**Files:**
- Create: `package.json`
- Create: `vite.config.js`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "mero",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "vite-plugin-html": "^3.2.2"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, no errors.

- [ ] **Step 3: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    createHtmlPlugin({ minify: false })
  ],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})
```

- [ ] **Step 4: Verify Vite starts**

Run: `npm run dev`
Expected: Server starts at `http://localhost:5173`. Ctrl+C to stop — we'll add content in next tasks.

- [ ] **Step 5: Commit**

```bash
git add package.json vite.config.js package-lock.json
git commit -m "feat: add Vite project setup with vite-plugin-html"
```

---

## Task 2: Shared tokens — new purple-black theme

**Files:**
- Create: `src/shared/tokens.css`

- [ ] **Step 1: Create tokens.css**

Extract all shared CSS from the old `index.html` `<style>` block and update the background tokens to the new purple-black palette.

```css
/* ─── RESET ──────────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* ─── VARIABLES ──────────────────────────────────── */
:root {
  --bg:      #0C0A14;
  --bg2:     #100D1C;
  --primary: #5BC4E5;
  --sec:     #3BA8CC;
  --hot:     #F43F5E;
  --text:    #E2E8F0;
  --dim:     #6b7fa3;
  --fh:      'Russo One', sans-serif;
  --fu:      'Chakra Petch', monospace;
}

html { overflow-x: hidden; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--fu);
  cursor: none;
  overflow-x: hidden;
}

/* CRT scanlines */
body::before {
  content: ''; position: fixed; inset: 0;
  background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.07) 2px,rgba(0,0,0,.07) 4px);
  pointer-events: none; z-index: 9998;
}

/* Vignette */
body::after {
  content: ''; position: fixed; inset: 0;
  background: radial-gradient(ellipse at center,transparent 55%,rgba(0,0,12,.55) 100%);
  pointer-events: none; z-index: 9997;
}

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 2px; }

/* ─── FOCUS ───────────────────────────────────────── */
:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; box-shadow: 0 0 0 4px rgba(91,196,229,.2); }

/* ─── SHARED PRIMITIVES ──────────────────────────── */
.sec-label {
  display: inline-flex; align-items: center; gap: .7rem;
  font-size: .67rem; font-weight: 600; letter-spacing: .24em; text-transform: uppercase;
  color: var(--primary); margin-bottom: .9rem;
}
.sec-label::before { content: ''; display: block; width: 28px; height: 1px; background: var(--primary); box-shadow: 0 0 6px var(--primary); }
.sec-label.center::before { display: none; }

.sec-title { font-family: var(--fh); font-size: clamp(2rem,5vw,3.6rem); line-height: 1.08; margin-bottom: 3.5rem; }

.btn-primary {
  display: inline-flex; align-items: center; gap: .55rem;
  font-family: var(--fu); font-size: .82rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--bg); background: var(--primary); padding: .88rem 2rem; text-decoration: none;
  clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
  position: relative; overflow: hidden; transition: box-shadow .25s;
}
.btn-primary::before {
  content: ''; position: absolute; inset: 0;
  background: rgba(255,255,255,.22);
  transform: translateX(-100%) skewX(-18deg); transition: transform .4s;
}
.btn-primary:hover::before { transform: translateX(160%) skewX(-18deg); }
.btn-primary:hover { box-shadow: 0 0 32px rgba(91,196,229,.55); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: .55rem;
  font-family: var(--fu); font-size: .82rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  color: var(--primary); background: transparent; border: 1px solid rgba(91,196,229,.38); padding: .88rem 2rem;
  text-decoration: none; clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
  transition: background .25s, border-color .25s, box-shadow .25s;
}
.btn-ghost:hover { border-color: var(--primary); background: rgba(91,196,229,.07); box-shadow: 0 0 22px rgba(91,196,229,.18); }

.icon-svg {
  fill: none; stroke: var(--primary);
  stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
  flex-shrink: 0;
}

/* ─── RESPONSIVE BASE ────────────────────────────── */
@media (max-width: 768px) {
  *, *::before, *::after { cursor: auto !important; }
  a, button, [role="button"] { cursor: pointer !important; }
  #cur-dot, #cur-ring { display: none; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/tokens.css
git commit -m "feat: add shared design tokens with purple-black theme"
```

---

## Task 3: Shared animations.js

**Files:**
- Create: `src/shared/animations.js`

- [ ] **Step 1: Create animations.js**

```js
import '../shared/tokens.css'

export let lenis = null

export function initLenis() {
  lenis = new window.Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false
  })
  window.gsap.ticker.add(t => lenis.raf(t * 1000))
  window.gsap.ticker.lagSmoothing(0)
  lenis.on('scroll', window.ScrollTrigger.update)
  return lenis
}

export function revealOnScroll(targets, options = {}) {
  const defaults = { opacity: 0, y: 40, stagger: 0.12, duration: 0.65, ease: 'power3.out' }
  const cfg = { ...defaults, ...options }
  window.gsap.from(targets, {
    scrollTrigger: { trigger: targets, start: 'top 85%' },
    opacity: cfg.opacity,
    y: cfg.y,
    stagger: cfg.stagger,
    duration: cfg.duration,
    ease: cfg.ease
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/animations.js
git commit -m "feat: add shared animations module (Lenis + GSAP helpers)"
```

---

## Task 4: Cursor module

**Files:**
- Create: `src/layout/cursor/cursor.css`
- Create: `src/layout/cursor/cursor.js`

- [ ] **Step 1: Create cursor.css**

```css
#cur-dot {
  position: fixed; width: 6px; height: 6px;
  background: var(--primary); border-radius: 50%;
  pointer-events: none; z-index: 10000;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 12px var(--primary), 0 0 24px rgba(91,196,229,.4);
  transition: width .15s, height .15s, background .2s;
}
#cur-ring {
  position: fixed; width: 34px; height: 34px;
  border: 1.5px solid rgba(91,196,229,.55); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%,-50%);
  transition: width .3s, height .3s, border-color .3s;
}
body.chov #cur-dot { width: 10px; height: 10px; background: var(--hot); box-shadow: 0 0 16px var(--hot); }
body.chov #cur-ring { width: 52px; height: 52px; border-color: var(--primary); }
```

- [ ] **Step 2: Create cursor.js**

```js
import './cursor.css'

export function initCursor() {
  const MOB = window.innerWidth < 768
  if (MOB) return

  const dot = document.getElementById('cur-dot')
  const ring = document.getElementById('cur-ring')
  let mx = 0, my = 0, rx = 0, ry = 0

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY
    dot.style.left = mx + 'px'; dot.style.top = my + 'px'
  });

  (function loop() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
    requestAnimationFrame(loop)
  })()

  document.querySelectorAll('a,button,.cat-card,.prod-card,.rig-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('chov'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('chov'))
  })
}
```

- [ ] **Step 3: Commit**

```bash
git add src/layout/cursor/
git commit -m "feat: add cursor layout module"
```

---

## Task 5: Preloader module

**Files:**
- Create: `src/layout/preloader/preloader.html`
- Create: `src/layout/preloader/preloader.css`
- Create: `src/layout/preloader/preloader.js`

- [ ] **Step 1: Create preloader.html**

```html
<div id="preloader">
  <img id="pre-logo" src="/logo/mero-logo-white.png" alt="Mero">
  <div id="pre-boot">
    <span id="b1">// MERO OS v2.0 — inicializando...</span>
    <span id="b2" class="ok">// Cargando catálogo de componentes</span>
    <span id="b3" class="ok">// Conectando inventario en tiempo real</span>
    <span id="b4" class="ok">// Verificando precios vs mercado</span>
    <span id="b5" style="color:#fff">// Sistema listo. Bienvenido.</span>
  </div>
  <div id="pre-bar-wrap"><div id="pre-bar"></div></div>
  <div id="pre-pct">0%</div>
</div>
```

- [ ] **Step 2: Create preloader.css**

```css
#preloader {
  position: fixed; inset: 0; background: #000010;
  z-index: 100000; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 1.75rem;
}
#pre-logo { width: 180px; opacity: 0; filter: drop-shadow(0 0 24px rgba(91,196,229,.7)); transition: opacity .7s; }
#pre-boot { font-family: var(--fu); font-size: .72rem; color: var(--primary); text-align: left; width: min(420px,88vw); }
#pre-boot span { display: block; opacity: 0; line-height: 1.9; transition: opacity .3s; }
#pre-boot .ok::after { content: '  [OK]'; color: #00ff88; }
#pre-bar-wrap { width: min(420px,88vw); height: 2px; background: rgba(91,196,229,.15); }
#pre-bar { height: 100%; width: 0%; background: var(--primary); box-shadow: 0 0 8px var(--primary); }
#pre-pct { font-family: var(--fu); font-size: .65rem; color: var(--primary); letter-spacing: .2em; }
```

- [ ] **Step 3: Create preloader.js**

```js
import './preloader.css'

export function initPreloader(onDone) {
  const pre = document.getElementById('preloader')
  const preBar = document.getElementById('pre-bar')
  const prePct = document.getElementById('pre-pct')

  setTimeout(() => { document.getElementById('pre-logo').style.opacity = '1' }, 80)
  ;[1,2,3,4,5].forEach((n, i) => {
    setTimeout(() => { document.getElementById('b' + n).style.opacity = '1' }, [150,500,900,1300,1700][i])
  })

  let pct = 0
  const pt = setInterval(() => {
    pct += Math.random() * 18 + 4
    if (pct >= 100) {
      pct = 100; clearInterval(pt)
      setTimeout(() => dismiss(pre, onDone), 350)
    }
    preBar.style.width = pct + '%'
    prePct.textContent = Math.floor(pct) + '%'
  }, 130)
}

function dismiss(pre, onDone) {
  pre.style.transition = 'opacity .75s ease, transform .75s ease'
  pre.style.opacity = '0'
  pre.style.transform = 'translateY(-18px)'
  setTimeout(() => { pre.style.display = 'none'; onDone() }, 750)
}
```

- [ ] **Step 4: Commit**

```bash
git add src/layout/preloader/
git commit -m "feat: add preloader layout module"
```

---

## Task 6: Nav module — redesigned

**Files:**
- Create: `src/layout/nav/nav.html`
- Create: `src/layout/nav/nav.css`
- Create: `src/layout/nav/nav.js`

- [ ] **Step 1: Create nav.html**

```html
<!-- CURSOR -->
<div id="cur-dot"></div>
<div id="cur-ring"></div>

<!-- MOBILE DRAWER -->
<div id="mob-nav">
  <div id="mob-nav-inner">
    <div id="mob-nav-top">
      <img src="/logo/mero-logo-white.png" alt="Mero" id="mob-logo">
      <button id="mob-close" aria-label="Cerrar menú">✕</button>
    </div>
    <nav id="mob-links">
      <a href="#categorias"><span class="mob-num">01</span><span class="mob-label">Categorías</span><span class="mob-arrow">→</span></a>
      <a href="#como"><span class="mob-num">02</span><span class="mob-label">Cómo funciona</span><span class="mob-arrow">→</span></a>
      <a href="/products.html"><span class="mob-num">03</span><span class="mob-label">Productos</span><span class="mob-arrow">→</span></a>
    </nav>
    <a href="https://wa.me/50300000000" class="mob-cta" target="_blank" rel="noopener">Cotizar por WhatsApp</a>
    <div id="mob-tagline">MERO · PC COMPONENTS · SV</div>
  </div>
</div>
<div id="mob-overlay"></div>

<!-- NAV -->
<nav id="nav">
  <a class="nav-logo" href="/"><img src="/logo/mero-logo-white.png" alt="Mero"></a>
  <ul class="nav-links">
    <li><a href="#categorias">Categorías</a></li>
    <li><a href="#como">Cómo funciona</a></li>
    <li><a href="/products.html">Productos</a></li>
  </ul>
  <a href="https://wa.me/50300000000" class="nav-cta" target="_blank" rel="noopener">WhatsApp</a>
  <button class="hamburger" id="hamburger" aria-label="Abrir menú">
    <span></span><span></span><span></span>
  </button>
</nav>
```

- [ ] **Step 2: Create nav.css**

```css
/* ─── NAV ─────────────────────────────────────────── */
nav#nav {
  position: fixed; top: 0; width: 100%;
  padding: 1.2rem 6vw; display: flex; align-items: center; justify-content: space-between;
  z-index: 1000; transition: background .35s, backdrop-filter .35s;
  border-bottom: 1px solid transparent;
}
nav#nav.scrolled {
  background: rgba(12,10,20,.88);
  backdrop-filter: blur(14px);
  border-color: rgba(91,196,229,.15);
}

/* Scan line — animates in once on scroll entry */
nav#nav.scrolled::after {
  content: '';
  position: absolute; bottom: -1px; left: 0;
  height: 1px; width: 100%;
  background: linear-gradient(90deg, transparent, rgba(91,196,229,.6), rgba(91,196,229,.2));
  box-shadow: 0 0 8px rgba(91,196,229,.35);
  transform-origin: left;
  animation: nav-scan .6s cubic-bezier(.22,1,.36,1) forwards;
}
@keyframes nav-scan {
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
}

.nav-logo img { height: 30px; filter: drop-shadow(0 0 8px rgba(91,196,229,.45)); }
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-links a {
  font-size: .75rem; font-weight: 500; letter-spacing: .13em; text-transform: uppercase;
  color: var(--dim); text-decoration: none; position: relative; transition: color .2s;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -3px; left: 0;
  width: 0; height: 1px; background: var(--primary); box-shadow: 0 0 6px var(--primary); transition: width .3s;
}
.nav-links a:hover { color: var(--primary); }
.nav-links a:hover::after { width: 100%; }

.nav-cta {
  font-family: var(--fu); font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--bg); background: var(--primary); padding: .5rem 1.35rem; text-decoration: none;
  clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
  transition: background .2s, box-shadow .2s;
}
.nav-cta:hover { background: #fff; box-shadow: 0 0 24px rgba(91,196,229,.55); }

.hamburger { display: none; flex-direction: column; gap: 5px; padding: 4px; background: none; border: none; cursor: pointer; }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--primary); transition: all .3s; }

/* ─── MOBILE OVERLAY ─────────────────────────────── */
#mob-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  z-index: 998; opacity: 0; pointer-events: none;
  transition: opacity .35s;
}
#mob-overlay.show { opacity: 1; pointer-events: all; }

/* ─── MOBILE DRAWER ──────────────────────────────── */
#mob-nav {
  position: fixed; top: 0; right: 0; bottom: 0; width: 82%;
  background: var(--bg2); border-left: 1px solid rgba(91,196,229,.15);
  z-index: 999;
  transform: translateX(100%); transition: transform .45s cubic-bezier(.16,1,.3,1);
}
#mob-nav.open { transform: translateX(0); }
#mob-nav-inner {
  height: 100%; display: flex; flex-direction: column;
  padding: 1.5rem 1.5rem 2rem;
}
#mob-nav-top {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 2.5rem;
}
#mob-logo { height: 24px; filter: drop-shadow(0 0 6px rgba(91,196,229,.4)); }
#mob-close {
  font-size: .65rem; color: var(--dim); background: none; border: 1px solid rgba(91,196,229,.15);
  padding: .3rem .65rem; letter-spacing: .15em; cursor: pointer; transition: color .2s, border-color .2s;
}
#mob-close:hover { color: var(--primary); border-color: rgba(91,196,229,.4); }

#mob-links { display: flex; flex-direction: column; gap: 0; flex: 1; }
#mob-links a {
  display: flex; align-items: center; gap: 1rem;
  padding: .85rem 0; border-bottom: 1px solid rgba(255,255,255,.05);
  text-decoration: none; transition: color .2s;
}
#mob-links a:hover { color: var(--primary); }
#mob-links a:hover .mob-arrow { color: var(--primary); transform: translateX(4px); }
.mob-num { font-family: var(--fh); font-size: .58rem; color: rgba(91,196,229,.35); min-width: 1.8rem; }
.mob-label { font-family: var(--fh); font-size: 1.1rem; color: var(--text); flex: 1; }
.mob-arrow { color: rgba(91,196,229,.25); font-size: .8rem; transition: transform .2s, color .2s; }

.mob-cta {
  font-family: var(--fu); font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--bg); background: var(--primary); padding: .7rem;
  text-align: center; text-decoration: none;
  clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
  margin-bottom: .6rem;
}
#mob-tagline {
  text-align: center; font-size: .52rem; letter-spacing: .18em;
  text-transform: uppercase; color: rgba(91,196,229,.2);
}

/* ─── RESPONSIVE ─────────────────────────────────── */
@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  nav#nav { padding: 1rem 5vw; }
}
```

- [ ] **Step 3: Create nav.js**

```js
import './nav.css'

export function initNav(lenis) {
  const nav = document.getElementById('nav')
  let scanPlayed = false

  lenis.on('scroll', ({ scroll }) => {
    const isScrolled = scroll > 60
    if (isScrolled && !scanPlayed) {
      scanPlayed = true
    }
    if (!isScrolled) scanPlayed = false
    nav.classList.toggle('scrolled', isScrolled)
  })

  // Mobile drawer
  const mobNav = document.getElementById('mob-nav')
  const overlay = document.getElementById('mob-overlay')

  function openMenu() {
    mobNav.classList.add('open')
    overlay.classList.add('show')
    document.body.style.overflow = 'hidden'
  }
  function closeMenu() {
    mobNav.classList.remove('open')
    overlay.classList.remove('show')
    document.body.style.overflow = ''
  }

  document.getElementById('hamburger').addEventListener('click', openMenu)
  document.getElementById('mob-close').addEventListener('click', closeMenu)
  overlay.addEventListener('click', closeMenu)
  document.getElementById('mob-links').querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu)
  })
}
```

- [ ] **Step 4: Commit**

```bash
git add src/layout/nav/
git commit -m "feat: add nav module with scan-line scroll effect and mobile drawer"
```

---

## Task 7: Footer module

**Files:**
- Create: `src/layout/footer/footer.html`
- Create: `src/layout/footer/footer.css`

- [ ] **Step 1: Create footer.html**

Copy the `<footer>` HTML block verbatim from the original `index.html` (lines 1135–1177), updating image src to `/logo/mero-logo-white.png`.

- [ ] **Step 2: Create footer.css**

Copy all CSS rules under `/* ─── FOOTER ─────────────────────────────────────── */` from the original `index.html` `<style>` block verbatim.

- [ ] **Step 3: Commit**

```bash
git add src/layout/footer/
git commit -m "feat: add footer layout module"
```

---

## Task 8: Hero section — redesigned

**Files:**
- Create: `src/sections/hero/hero.html`
- Create: `src/sections/hero/hero.css`
- Create: `src/sections/hero/hero.js`

- [ ] **Step 1: Create hero.html**

```html
<section id="hero">
  <canvas id="hero-particles"></canvas>

  <div class="hero-content">
    <div class="hero-tag">Precios justos. Sin excusas.</div>
    <h1 class="hero-h1">
      El hardware que <span class="hl">querés</span><br>
      al precio que <span class="hl">merece</span>
    </h1>
    <p class="hero-sub">Componentes seleccionados. Verificados contra el mercado. Entregados en 48h.</p>
    <div class="hero-ctas">
      <a href="https://wa.me/50300000000" class="btn-primary" target="_blank" rel="noopener">
        <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
        Cotizar por WhatsApp
      </a>
      <a href="/products.html" class="btn-ghost">Ver Catálogo →</a>
    </div>
  </div>

  <div class="hero-terminal" id="hero-terminal">
    <div class="ht-header">// MERO_STATUS</div>
    <div class="ht-row"><span class="ht-key">STOCK</span><span class="ht-val live">● LIVE</span></div>
    <div class="ht-row"><span class="ht-key">PRODUCTOS</span><span class="ht-val" id="ht-productos">12</span></div>
    <div class="ht-row"><span class="ht-key">ENTREGA</span><span class="ht-val">48H</span></div>
    <div class="ht-row"><span class="ht-key">PRECIO</span><span class="ht-val">JUSTO</span></div>
    <div class="ht-cursor">█ READY_</div>
  </div>

  <div class="hero-scroll-ind">
    <div class="hero-scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>
```

- [ ] **Step 2: Create hero.css**

```css
#hero {
  min-height: 100vh; display: flex; align-items: center;
  padding: 0 8vw; position: relative; overflow: hidden;
  gap: 4rem;
}

/* Particle canvas */
#hero-particles {
  position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
}

/* Radial glow */
#hero::before {
  content: ''; position: absolute;
  top: 50%; left: 35%; transform: translate(-50%,-50%);
  width: 600px; height: 600px;
  background: radial-gradient(ellipse, rgba(91,196,229,.08) 0%, transparent 65%);
  pointer-events: none; z-index: 1;
}

.hero-content {
  position: relative; z-index: 2; max-width: 620px; flex: 1;
}

.hero-tag {
  display: inline-flex; align-items: center; gap: .6rem;
  font-size: .68rem; font-weight: 600; letter-spacing: .22em; text-transform: uppercase;
  color: var(--primary); margin-bottom: 1.4rem; opacity: 0;
}
.hero-tag::before { content: ''; display: block; width: 26px; height: 1px; background: var(--primary); box-shadow: 0 0 6px var(--primary); }

.hero-h1 {
  font-family: var(--fh); font-size: clamp(2.4rem,5.5vw,5rem);
  line-height: 1.04; margin-bottom: 1.4rem; opacity: 0;
}
.hero-h1 .hl { color: var(--primary); text-shadow: 0 0 40px rgba(91,196,229,.45); }

.hero-sub {
  font-size: clamp(.9rem,1.6vw,1.1rem); font-weight: 300;
  color: var(--dim); max-width: 480px; line-height: 1.7;
  margin-bottom: 2.2rem; opacity: 0;
}

.hero-ctas { display: flex; align-items: center; gap: 1.1rem; flex-wrap: wrap; opacity: 0; }

/* Terminal panel */
.hero-terminal {
  position: relative; z-index: 2; flex-shrink: 0;
  border: 1px solid rgba(91,196,229,.18);
  background: rgba(12,10,20,.85); backdrop-filter: blur(8px);
  padding: 1.4rem 1.5rem;
  clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
  min-width: 200px; opacity: 0;
}
.ht-header {
  font-size: .58rem; letter-spacing: .16em; color: rgba(91,196,229,.4);
  margin-bottom: .8rem; text-transform: uppercase;
}
.ht-row {
  display: flex; justify-content: space-between; gap: 1.5rem;
  font-size: .65rem; line-height: 2.1;
}
.ht-key { color: var(--dim); }
.ht-val { color: var(--primary); font-weight: 600; }
.ht-val.live { color: #00ff88; }
.ht-cursor {
  font-size: .58rem; color: rgba(91,196,229,.35);
  margin-top: .6rem; padding-top: .6rem;
  border-top: 1px solid rgba(91,196,229,.1);
  animation: cursor-blink 1.1s step-end infinite;
}
@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* Scroll indicator */
.hero-scroll-ind {
  position: absolute; bottom: 2.2rem; left: 8vw;
  display: flex; flex-direction: column; align-items: center; gap: .5rem;
  font-size: .62rem; letter-spacing: .2em; text-transform: uppercase;
  color: var(--dim); opacity: 0;
}
.hero-scroll-line {
  width: 1px; height: 38px;
  background: linear-gradient(to bottom, var(--primary), transparent);
  animation: scroll-pulse 2s ease-in-out infinite;
}
@keyframes scroll-pulse { 0%,100%{opacity:.3;transform:scaleY(.5)} 50%{opacity:1;transform:scaleY(1)} }

/* Responsive */
@media (max-width: 1024px) {
  #hero { gap: 2.5rem; padding: 0 6vw; }
  .hero-terminal { min-width: 180px; }
}
@media (max-width: 768px) {
  #hero { flex-direction: column; justify-content: center; padding: 6rem 5vw 4rem; gap: 2rem; }
  .hero-terminal { width: 100%; }
  .hero-scroll-ind { left: 50%; transform: translateX(-50%); }
}
```

- [ ] **Step 3: Create hero.js**

```js
import './hero.css'

export function initHeroParticles() {
  const canvas = document.getElementById('hero-particles')
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const pts = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .35,
    vy: -Math.random() * .45 - .1,
    r: Math.random() * 1.4 + .4,
    a: Math.random() * .55 + .1
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(91,196,229,${p.a})`
      ctx.shadowColor = '#5BC4E5'; ctx.shadowBlur = 4
      ctx.fill(); ctx.shadowBlur = 0
    })
    pts.forEach((a, i) => {
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j]
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(91,196,229,${((1 - d / 100) * .13).toFixed(2)})`
          ctx.lineWidth = .5; ctx.stroke()
        }
      }
    })
    requestAnimationFrame(draw)
  }
  draw()
}

export function animateHero() {
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (RM) {
    document.querySelectorAll('.hero-tag,.hero-h1,.hero-sub,.hero-ctas,.hero-scroll-ind,.hero-terminal')
      .forEach(el => { el.style.opacity = '1' })
    return
  }
  window.gsap.set(['.hero-tag','.hero-h1','.hero-sub','.hero-ctas','.hero-scroll-ind'], { opacity: 0, y: 28 })
  window.gsap.set('.hero-terminal', { opacity: 0, x: 20 })
  window.gsap.timeline({ delay: .15 })
    .to('.hero-tag',        { opacity:1, y:0, duration:.55, ease:'power2.out' })
    .to('.hero-h1',         { opacity:1, y:0, duration:.75, ease:'power3.out' }, '-=.3')
    .to('.hero-sub',        { opacity:1, y:0, duration:.55, ease:'power2.out' }, '-=.35')
    .to('.hero-ctas',       { opacity:1, y:0, duration:.55, ease:'power2.out' }, '-=.3')
    .to('.hero-terminal',   { opacity:1, x:0, duration:.6,  ease:'power3.out' }, '-=.4')
    .to('.hero-scroll-ind', { opacity:1, y:0, duration:.4 }, '-=.2')
}
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/hero/
git commit -m "feat: add hero section with particle bg and terminal panel"
```

---

## Task 9: Trust Bar module (unchanged)

**Files:**
- Create: `src/sections/trust-bar/trust-bar.html`
- Create: `src/sections/trust-bar/trust-bar.css`

- [ ] **Step 1: Create trust-bar.html**

Copy the `<div id="trust-bar">` block verbatim from the original `index.html`.

- [ ] **Step 2: Create trust-bar.css**

Copy all CSS rules under `/* ─── TRUST BAR ──────────────────────────────────── */` from the original `index.html` verbatim.

- [ ] **Step 3: Commit**

```bash
git add src/sections/trust-bar/
git commit -m "feat: add trust-bar section module"
```

---

## Task 10: Marquee module — redesigned

**Files:**
- Create: `src/sections/marquee/marquee.html`
- Create: `src/sections/marquee/marquee.css`

- [ ] **Step 1: Create marquee.html**

```html
<div id="marquee">
  <div class="mq-row">
    <div class="mq-inner">
      <span class="mq-item">MERO <span class="d">·</span></span>
      <span class="mq-item ac">CPU</span>
      <span class="mq-item"><span class="d">·</span> GPU <span class="d">·</span></span>
      <span class="mq-item">RAM <span class="d">·</span></span>
      <span class="mq-item ac">BUILDS ÉPICOS</span>
      <span class="mq-item"><span class="d">·</span> EL SALVADOR <span class="d">·</span></span>
      <span class="mq-item">GAMING <span class="d">·</span></span>
      <span class="mq-item ac">ALMACENAMIENTO</span>
      <span class="mq-item"><span class="d">·</span> COMPONENTES <span class="d">·</span></span>
      <!-- duplicate for seamless loop -->
      <span class="mq-item">MERO <span class="d">·</span></span>
      <span class="mq-item ac">CPU</span>
      <span class="mq-item"><span class="d">·</span> GPU <span class="d">·</span></span>
      <span class="mq-item">RAM <span class="d">·</span></span>
      <span class="mq-item ac">BUILDS ÉPICOS</span>
      <span class="mq-item"><span class="d">·</span> EL SALVADOR <span class="d">·</span></span>
      <span class="mq-item">GAMING <span class="d">·</span></span>
      <span class="mq-item ac">ALMACENAMIENTO</span>
      <span class="mq-item"><span class="d">·</span> COMPONENTES <span class="d">·</span></span>
    </div>
  </div>
  <div class="mq-row">
    <div class="mq-inner rev">
      <span class="mq-item"><span class="d">·</span> ARMA TU RIG <span class="d">·</span></span>
      <span class="mq-item ac">REFRIGERACIÓN</span>
      <span class="mq-item"><span class="d">·</span> GAMER <span class="d">·</span></span>
      <span class="mq-item">FUENTE <span class="d">·</span></span>
      <span class="mq-item ac">BUILT DIFFERENT</span>
      <span class="mq-item"><span class="d">·</span> MOTHERBOARD <span class="d">·</span></span>
      <span class="mq-item ac">PRO GAMING</span>
      <!-- duplicate -->
      <span class="mq-item"><span class="d">·</span> ARMA TU RIG <span class="d">·</span></span>
      <span class="mq-item ac">REFRIGERACIÓN</span>
      <span class="mq-item"><span class="d">·</span> GAMER <span class="d">·</span></span>
      <span class="mq-item">FUENTE <span class="d">·</span></span>
      <span class="mq-item ac">BUILT DIFFERENT</span>
      <span class="mq-item"><span class="d">·</span> MOTHERBOARD <span class="d">·</span></span>
      <span class="mq-item ac">PRO GAMING</span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Create marquee.css**

```css
#marquee {
  overflow: hidden; padding: 1.4rem 0;
  background: rgba(0,0,0,.15);
  position: relative;
}

/* Edge fade masks */
#marquee::before, #marquee::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 120px;
  z-index: 2; pointer-events: none;
}
#marquee::before { left: 0; background: linear-gradient(90deg, var(--bg), transparent); }
#marquee::after  { right: 0; background: linear-gradient(270deg, var(--bg), transparent); }

.mq-row { display: flex; overflow: hidden; margin-bottom: .6rem; }
.mq-row:last-child { margin-bottom: 0; }

.mq-inner {
  display: flex; white-space: nowrap;
  animation: mq-fwd 24s linear infinite;
  will-change: transform;
}
.mq-inner.rev { animation: mq-rev 30s linear infinite; }

/* Pause on hover */
#marquee:hover .mq-inner { animation-play-state: paused; }

.mq-item {
  display: inline-flex; align-items: center; gap: 1.2rem;
  padding: 0 1.2rem;
  font-family: var(--fh); font-size: 1.1rem;
  color: var(--text); white-space: nowrap;
}
.mq-item .d { color: var(--primary); text-shadow: 0 0 10px var(--primary); }
.mq-item.ac {
  color: var(--primary);
  text-shadow: 0 0 18px rgba(91,196,229,.35);
}

@keyframes mq-fwd { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
@keyframes mq-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/marquee/
git commit -m "feat: add marquee section with edge masks and hover pause"
```

---

## Task 11: Featured Products module — fan cards

**Files:**
- Create: `src/sections/productos/productos.html`
- Create: `src/sections/productos/productos.css`
- Create: `src/sections/productos/productos.js`

- [ ] **Step 1: Create productos.html**

```html
<section id="productos">
  <div class="prod-header">
    <div>
      <div class="sec-label">Disponible ahora</div>
      <h2 class="sec-title">Drops de la semana</h2>
    </div>
    <a href="/products.html" class="prod-view-all">Ver catálogo completo →</a>
  </div>

  <div class="fan-stage">
    <div class="fan-card fc-left" data-badge-type="new">
      <img src="/products/Product 3.jpg" alt="Producto">
      <div class="fan-badge badge-new">NEW</div>
      <div class="fan-cta">
        <a href="https://wa.me/50300000000" class="btn-ghost" target="_blank" rel="noopener">Cotizar →</a>
      </div>
    </div>

    <div class="fan-card fc-mid" data-badge-type="hot">
      <img src="/products/Product 1.jpg" alt="Producto destacado">
      <div class="fan-badge badge-hot">★ HOT DEAL</div>
      <div class="fan-cta">
        <a href="https://wa.me/50300000000" class="btn-primary" target="_blank" rel="noopener">Lo quiero — WhatsApp →</a>
      </div>
    </div>

    <div class="fan-card fc-right" data-badge-type="value">
      <img src="/products/Product 2.jpg" alt="Producto">
      <div class="fan-badge badge-value">BEST VALUE</div>
      <div class="fan-cta">
        <a href="https://wa.me/50300000000" class="btn-ghost" target="_blank" rel="noopener">Cotizar →</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create productos.css**

```css
#productos { padding: 8rem 8vw; }

.prod-header {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 3rem; gap: 1rem; flex-wrap: wrap;
}
.prod-header .sec-title { margin-bottom: 0; }
.prod-view-all {
  font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  color: var(--primary); text-decoration: none;
  border-bottom: 1px solid rgba(91,196,229,.25); padding-bottom: .2rem;
  transition: border-color .2s;
}
.prod-view-all:hover { border-color: var(--primary); }

/* Fan stage */
.fan-stage {
  position: relative; height: 540px;
  display: flex; align-items: center; justify-content: center;
}

.fan-card {
  position: absolute; overflow: hidden;
  clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
  border: 1px solid rgba(91,196,229,.2);
  box-shadow: 0 16px 48px rgba(0,0,0,.7);
  transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s;
  cursor: pointer;
}
.fan-card img { width: 100%; display: block; transition: transform .4s; }
.fan-card:hover img { transform: scale(1.03); }
.fan-card:hover { z-index: 10 !important; }

.fc-left  { width: 265px; transform: rotate(-7deg) translateX(-145px); z-index: 1; }
.fc-mid   {
  width: 310px; z-index: 3;
  border-color: rgba(244,63,94,.35);
  box-shadow: 0 20px 60px rgba(0,0,0,.8), 0 0 40px rgba(244,63,94,.08);
}
.fc-right { width: 265px; transform: rotate(7deg) translateX(145px); z-index: 1; }

.fc-left:hover  { transform: rotate(-7deg) translateX(-145px) scale(1.05); }
.fc-mid:hover   { transform: scale(1.05); box-shadow: 0 24px 70px rgba(0,0,0,.9), 0 0 50px rgba(244,63,94,.14); }
.fc-right:hover { transform: rotate(7deg) translateX(145px) scale(1.05); }

/* Badges */
.fan-badge {
  position: absolute; top: .8rem; left: 0;
  font-family: var(--fu); font-size: .54rem; font-weight: 700;
  letter-spacing: .16em; text-transform: uppercase;
  padding: .26rem .8rem .26rem .55rem;
  clip-path: polygon(0 0,100% 0,calc(100% - 5px) 100%,0 100%);
}
.badge-hot   { background: var(--hot); color: #fff; }
.badge-value { background: var(--primary); color: var(--bg); }
.badge-new   { background: rgba(91,196,229,.12); color: var(--primary); border: 1px solid rgba(91,196,229,.3); border-left: none; }

/* CTA bar */
.fan-cta {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: rgba(12,10,20,.94); backdrop-filter: blur(10px);
  padding: .75rem .9rem; border-top: 1px solid rgba(91,196,229,.15);
  transform: translateY(100%); transition: transform .35s cubic-bezier(.16,1,.3,1);
}
.fan-card:hover .fan-cta { transform: translateY(0); }
.fan-cta .btn-primary, .fan-cta .btn-ghost { display: block; text-align: center; padding: .5rem; font-size: .7rem; }

/* Responsive */
@media (max-width: 768px) {
  .fan-stage { height: auto; flex-direction: column; gap: 1rem; }
  .fan-card { position: relative; width: 100% !important; transform: none !important; }
  .fc-left:hover, .fc-right:hover { transform: none !important; }
  .fan-cta { transform: translateY(0); }
}
```

- [ ] **Step 3: Create productos.js**

```js
import './productos.css'

export function initProductos() {
  // On mobile, all CTAs are visible by default (handled in CSS)
  // This module is reserved for future dynamic product loading
}
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/productos/
git commit -m "feat: add featured products section with fan/tilt card layout"
```

---

## Task 12: Migrate remaining sections unchanged

For each section below, copy the HTML block and CSS from the original `index.html`. No design changes.

**Sections:** categorias, arma-rig, como, galeria, statement, por-que, newsletter

- [ ] **Step 1: Categorias**

  - Copy `<section id="categorias">` block → `src/sections/categorias/categorias.html`
  - Copy CSS under `/* ─── CATEGORÍAS ─────────────────────────────────── */` → `src/sections/categorias/categorias.css`
  - Create `src/sections/categorias/categorias.js`:
  ```js
  import './categorias.css'
  ```
  - Update each `.cat-link` `href` to use `/products.html?cat=<slug>`

- [ ] **Step 2: Arma Tu Rig**

  - Copy `<section id="arma-rig">` block → `src/sections/arma-rig/arma-rig.html`
  - Copy CSS under `/* ─── ARMA TU RIG ────────────────────────────────── */` → `src/sections/arma-rig/arma-rig.css`
  - Create `src/sections/arma-rig/arma-rig.js`:
  ```js
  import './arma-rig.css'

  export function initArmaRig() {
    const MOB = window.innerWidth < 768
    if (MOB) return
    const slots = ['cpu','cool','ram','ssd','gpu','psu']
    const labels = [
      '// Procesador instalado.','// Refrigeración lista.',
      '// RAM sincronizada.','// SSD montado.',
      '// GPU encendida.','// PSU conectada — rig operativo.'
    ]
    const log = document.getElementById('rig-log')
    const readout = document.getElementById('rig-readout')
    const chassis = document.getElementById('rig-chassis')
    const rigTl = window.gsap.timeline({
      scrollTrigger: { trigger: '#arma-rig', start: 'top 70%', end: 'bottom 30%', scrub: 1.4 }
    })
    rigTl.from('#rig-arena', { opacity: 0, scale: .96, duration: .5 })
    slots.forEach((id, i) => {
      rigTl.to({}, { duration: .4, onStart: () => {
        const el = document.getElementById('rs-' + id)
        if (!el.classList.contains('on')) {
          el.classList.add('on', 'flash')
          log.textContent = labels[i]
          log.classList.add('active')
          setTimeout(() => el.classList.remove('flash'), 750)
        }
      }})
    })
    rigTl.to({}, { duration: .3, onStart: () => {
      chassis.classList.add('powered')
      readout.classList.add('show')
      log.textContent = '// RIG COMPLETADO. ENCENDELO.'
      window.gsap.to('.rig-slot.on', {
        boxShadow: '0 0 28px rgba(91,196,229,.5),inset 0 0 40px rgba(91,196,229,.1)',
        duration: .9, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: .15
      })
    }})
  }
  ```

- [ ] **Step 3: Cómo Funciona**

  - Copy `<section id="como">` block → `src/sections/como/como.html`
  - Copy CSS under `/* ─── CÓMO FUNCIONA ──────────────────────────────── */` → `src/sections/como/como.css`

- [ ] **Step 4: Eventos (placeholder)**

  - Create `src/sections/eventos/eventos.html`:
  ```html
  <section id="eventos">
    <div class="eventos-inner">
      <div class="sec-label">Nuestra comunidad</div>
      <h2 class="sec-title">Eventos</h2>
      <p style="color:var(--dim);font-size:.85rem">Próximamente — galería del primer evento Mero.</p>
    </div>
  </section>
  ```
  - Create `src/sections/eventos/eventos.css`:
  ```css
  #eventos { padding: 8rem 8vw; background: var(--bg2); }
  .eventos-inner { max-width: 900px; }
  ```

- [ ] **Step 5: Galería de Rigs**

  - Copy `<section id="galeria">` block → `src/sections/galeria/galeria.html`
  - Copy CSS under `/* ─── GALERÍA DE RIGS ────────────────────────────── */` → `src/sections/galeria/galeria.css`

- [ ] **Step 6: Statement**

  - Copy `<section id="statement">` block → `src/sections/statement/statement.html`
  - Copy CSS under `/* ─── CINEMATIC STATEMENT ────────────────────────── */` → `src/sections/statement/statement.css`

- [ ] **Step 7: Por Qué Mero**

  - Copy `<section id="por-que">` block → `src/sections/por-que/por-que.html`
  - Copy CSS under `/* ─── POR QUÉ STATS ──────────────────────────────── */` → `src/sections/por-que/por-que.css`

- [ ] **Step 8: Newsletter**

  - Copy `<section id="newsletter">` block → `src/sections/newsletter/newsletter.html`
  - Copy CSS under `/* ─── EMAIL CAPTURE ──────────────────────────────── */` → `src/sections/newsletter/newsletter.css`

- [ ] **Step 9: Commit all**

```bash
git add src/sections/
git commit -m "feat: migrate remaining sections to individual modules"
```

---

## Task 13: Assemble index.html

**Files:**
- Create: `index.html` (replaces the old monolith)

- [ ] **Step 1: Create new index.html**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Mero — La tienda de PC más poderosa de El Salvador. CPU, GPU, RAM, almacenamiento y más. Entrega en 48 horas.">
  <title>Mero — PC Components El Salvador</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Russo+One&display=swap" rel="stylesheet">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
</head>
<body>

  <%- include('./src/layout/preloader/preloader.html') %>
  <%- include('./src/layout/nav/nav.html') %>
  <%- include('./src/sections/hero/hero.html') %>
  <%- include('./src/sections/trust-bar/trust-bar.html') %>
  <%- include('./src/sections/marquee/marquee.html') %>
  <%- include('./src/sections/productos/productos.html') %>
  <%- include('./src/sections/categorias/categorias.html') %>
  <%- include('./src/sections/arma-rig/arma-rig.html') %>
  <%- include('./src/sections/como/como.html') %>
  <%- include('./src/sections/eventos/eventos.html') %>
  <%- include('./src/sections/galeria/galeria.html') %>
  <%- include('./src/sections/statement/statement.html') %>
  <%- include('./src/sections/por-que/por-que.html') %>
  <%- include('./src/sections/newsletter/newsletter.html') %>
  <%- include('./src/layout/footer/footer.html') %>

  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create src/main.js — the single JS entry point**

```js
import { initPreloader } from './layout/preloader/preloader.js'
import { initCursor }    from './layout/cursor/cursor.js'
import { initLenis, revealOnScroll } from './shared/animations.js'
import { initNav }       from './layout/nav/nav.js'
import { initHeroParticles, animateHero } from './sections/hero/hero.js'
import { initArmaRig }   from './sections/arma-rig/arma-rig.js'

import './sections/trust-bar/trust-bar.css'
import './sections/marquee/marquee.css'
import './sections/productos/productos.css'
import './sections/categorias/categorias.css'
import './sections/como/como.css'
import './sections/eventos/eventos.css'
import './sections/galeria/galeria.css'
import './sections/statement/statement.css'
import './sections/por-que/por-que.css'
import './sections/newsletter/newsletter.css'
import './layout/footer/footer.css'

window.gsap.registerPlugin(window.ScrollTrigger)

initHeroParticles()

initPreloader(() => {
  const lenis = initLenis()
  initNav(lenis)
  initCursor()
  animateHero()
  initArmaRig()

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (RM) return

  // Trust bar
  revealOnScroll('.trust-item', { y: 12, stagger: .08, duration: .5 })

  // Categorías
  revealOnScroll('#categorias .sec-label, #categorias .sec-title', { x: -24, stagger: .1, duration: .6 })
  revealOnScroll('.cat-card', { y: 55, stagger: .1, duration: .65 })

  // Productos fan
  window.gsap.from('.fan-card', {
    scrollTrigger: { trigger: '.fan-stage', start: 'top 82%' },
    opacity: 0, y: 60, stagger: .15, duration: .7, ease: 'power3.out'
  })

  // Cómo funciona
  revealOnScroll('#como .sec-label, #como .sec-title', { x: -24, stagger: .1, duration: .6 })
  revealOnScroll('.step-card', { y: 50, stagger: .18, duration: .7 })

  // Statement
  window.ScrollTrigger.create({
    trigger: '#statement', start: 'top 70%', once: true,
    onEnter: () => {
      window.gsap.to('.statement-q1', { clipPath: 'inset(0 0% 0 0)', duration: .9, ease: 'power3.out' })
      window.gsap.to('.statement-q2', { clipPath: 'inset(0 0% 0 0)', duration: 1,  ease: 'power3.out', delay: .3 })
      window.gsap.from('.statement-attr', { opacity: 0, y: 16, duration: .6, delay: .9 })
    }
  })

  // Stats counters
  revealOnScroll('.stat-card', { y: 48, stagger: .13, duration: .65 })
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target
    window.ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        window.gsap.to({ n: 0 }, { n: target, duration: 1.8, ease: 'power2.out',
          onUpdate() { el.textContent = Math.floor(this.targets()[0].n) }
        })
      }
    })
  })

  // Galería
  revealOnScroll('#galeria .sec-label, #galeria .sec-title', { x: -24, stagger: .1, duration: .6 })
  revealOnScroll('.rig-card', { y: 50, stagger: .14, duration: .7 })

  // Newsletter
  revealOnScroll('.newsletter-tag, .newsletter-h2, .newsletter-sub, .email-form', { y: 28, stagger: .1, duration: .6 })

  document.fonts.ready.then(() => window.ScrollTrigger.refresh())
})
```

- [ ] **Step 3: Verify dev server shows the assembled page**

Run: `npm run dev`  
Open: `http://localhost:5173`  
Expected: Full landing page renders — preloader runs, then hero with particles and terminal panel, all sections visible.

- [ ] **Step 4: Commit**

```bash
git add index.html src/main.js
git commit -m "feat: assemble index.html with Vite EJS includes and main.js entry"
```

---

## Task 14: Responsive CSS — migrate to tokens.css

**Files:**
- Modify: `src/shared/tokens.css`

- [ ] **Step 1: Append responsive rules to tokens.css**

Append the `@media` blocks from the original `index.html` (lines 553–608) to the bottom of `src/shared/tokens.css`, updating any section-specific selectors that are now covered per-module. Remove duplicates between section modules and this file.

- [ ] **Step 2: Verify mobile layout**

Open: `http://localhost:5173` at 375px width  
Expected: Nav hamburger visible, mobile drawer opens, all sections stack correctly.

- [ ] **Step 3: Commit**

```bash
git add src/shared/tokens.css
git commit -m "fix: migrate responsive CSS to shared tokens"
```

---

## Task 15: Clean up and production build

**Files:**
- Delete: `cards-preview.html`

- [ ] **Step 1: Delete brainstorm artifact**

```bash
rm cards-preview.html
```

- [ ] **Step 2: Run production build**

Run: `npm run build`  
Expected: `dist/` created, no errors. Check `dist/index.html` has all sections inlined.

- [ ] **Step 3: Preview production build**

Run: `npm run preview`  
Open: `http://localhost:4173`  
Expected: Full landing page works identically to dev.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Vite restructure with approved section redesigns"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Vite + vite-plugin-html assembly
- ✅ Hybrid folder structure (layout/ + sections/ + shared/)
- ✅ New purple-black theme tokens (#0C0A14 / #100D1C)
- ✅ Hero: particles + terminal panel + new headline
- ✅ Nav: scan-line scroll effect + mobile side drawer
- ✅ Trust bar: unchanged
- ✅ Marquee: larger type + edge masks + hover pause
- ✅ Featured products: fan/tilt cards with hover CTA
- ✅ Comunidad: removed
- ✅ Torneos: replaced by Eventos placeholder
- ✅ Categorías: links updated to /products.html?cat=...
- ✅ Arma Tu Rig: extracted to own module (JS unchanged — fix deferred)
- ✅ All remaining sections migrated unchanged
- ✅ Production build verified

**Sections pending (deferred to next session):**
- Products page (products.html) — not yet designed
- Remaining section redesigns (categorias, arma-rig, eventos, galeria, statement, etc.)
