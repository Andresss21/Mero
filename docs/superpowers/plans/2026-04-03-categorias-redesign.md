# Categorías Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the basic horizontal-card grid in the Categorías section with a 3×2 icon-tile grid featuring corner-trace hover effects and a GPU hot-accent treatment.

**Architecture:** Two files rewritten in place — `categorias.html` (new card structure with `.cat-card` class) and `categorias.css` (full rewrite with corner-trace `::before`/`::after` hover, CTA max-height reveal, GPU `.gpu` modifier). No JS logic. `main.js` already targets `.cat-card` for scroll animations and cursor — no changes needed there.

**Tech Stack:** Vanilla HTML/CSS, CSS custom properties, clip-path, CSS transitions. No JS required.

---

## File Map

| File | Action |
|---|---|
| `src/sections/categorias/categorias.html` | **Rewrite** — new card structure, `.cat-card` class, `.gpu` on GPU card |
| `src/sections/categorias/categorias.css` | **Rewrite** — 3×2 grid, corner-trace hover, CTA reveal, GPU modifier |
| `src/sections/categorias/categorias.js` | **No change** — already just `import './categorias.css'` |

---

## Task 1: Rewrite categorias.html

**Files:**
- Modify: `src/sections/categorias/categorias.html`

- [ ] **Step 1: Replace the file with the new markup**

The working directory is `.worktrees/vite-restructure` inside the project root. Overwrite the file with:

```html
<section id="categorias">
  <div class="cat-header">
    <div class="sec-label">Catálogo</div>
    <h2 class="sec-title">Categorías</h2>
  </div>

  <div class="cat-grid">

    <a href="/products.html?cat=cpu" class="cat-card" data-cat="cpu">
      <div class="cat-icon-wrap">
        <svg class="cat-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="30" y="30" width="60" height="60" rx="6" stroke="currentColor" stroke-width="2.5"/>
          <rect x="44" y="44" width="32" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
          <line x1="20" y1="45" x2="30" y2="45" stroke="currentColor" stroke-width="2"/>
          <line x1="20" y1="57" x2="30" y2="57" stroke="currentColor" stroke-width="2"/>
          <line x1="20" y1="69" x2="30" y2="69" stroke="currentColor" stroke-width="2"/>
          <line x1="90" y1="45" x2="100" y2="45" stroke="currentColor" stroke-width="2"/>
          <line x1="90" y1="57" x2="100" y2="57" stroke="currentColor" stroke-width="2"/>
          <line x1="90" y1="69" x2="100" y2="69" stroke="currentColor" stroke-width="2"/>
          <line x1="45" y1="20" x2="45" y2="30" stroke="currentColor" stroke-width="2"/>
          <line x1="57" y1="20" x2="57" y2="30" stroke="currentColor" stroke-width="2"/>
          <line x1="69" y1="20" x2="69" y2="30" stroke="currentColor" stroke-width="2"/>
          <line x1="45" y1="90" x2="45" y2="100" stroke="currentColor" stroke-width="2"/>
          <line x1="57" y1="90" x2="57" y2="100" stroke="currentColor" stroke-width="2"/>
          <line x1="69" y1="90" x2="69" y2="100" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <div class="cat-name">CPU</div>
      <div class="cat-slug">Procesadores</div>
      <div class="cat-sep"></div>
      <div class="cat-count">120+ modelos disponibles</div>
      <div class="cat-cta-wrap"><span class="cat-cta">Explorar →</span></div>
    </a>

    <a href="/products.html?cat=gpu" class="cat-card gpu" data-cat="gpu">
      <div class="cat-icon-wrap">
        <svg class="cat-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="15" y="38" width="90" height="44" rx="6" stroke="currentColor" stroke-width="2.5"/>
          <rect x="28" y="50" width="22" height="20" rx="3" stroke="currentColor" stroke-width="2"/>
          <rect x="58" y="50" width="22" height="20" rx="3" stroke="currentColor" stroke-width="2"/>
          <line x1="30" y1="82" x2="30" y2="96" stroke="currentColor" stroke-width="2"/>
          <line x1="46" y1="82" x2="46" y2="96" stroke="currentColor" stroke-width="2"/>
          <line x1="62" y1="82" x2="62" y2="96" stroke="currentColor" stroke-width="2"/>
          <line x1="78" y1="82" x2="78" y2="96" stroke="currentColor" stroke-width="2"/>
          <circle cx="93" cy="60" r="7" stroke="currentColor" stroke-width="2"/>
          <line x1="93" y1="53" x2="93" y2="38" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>
        </svg>
      </div>
      <div class="cat-name">GPU</div>
      <div class="cat-slug">Tarjetas Gráficas</div>
      <div class="cat-sep"></div>
      <div class="cat-count">85+ modelos disponibles</div>
      <div class="cat-cta-wrap"><span class="cat-cta">Explorar →</span></div>
    </a>

    <a href="/products.html?cat=ram" class="cat-card" data-cat="ram">
      <div class="cat-icon-wrap">
        <svg class="cat-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="35" y="22" width="18" height="76" rx="4" stroke="currentColor" stroke-width="2.5"/>
          <rect x="67" y="22" width="18" height="76" rx="4" stroke="currentColor" stroke-width="2.5"/>
          <rect x="39" y="30" width="10" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="39" y="44" width="10" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="39" y="58" width="10" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="71" y="30" width="10" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="71" y="44" width="10" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="71" y="58" width="10" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <line x1="16" y1="98" x2="104" y2="98" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
        </svg>
      </div>
      <div class="cat-name">RAM</div>
      <div class="cat-slug">Memoria</div>
      <div class="cat-sep"></div>
      <div class="cat-count">60+ kits disponibles</div>
      <div class="cat-cta-wrap"><span class="cat-cta">Explorar →</span></div>
    </a>

    <a href="/products.html?cat=ssd" class="cat-card" data-cat="ssd">
      <div class="cat-icon-wrap">
        <svg class="cat-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="20" y="30" width="80" height="60" rx="8" stroke="currentColor" stroke-width="2.5"/>
          <circle cx="88" cy="60" r="14" stroke="currentColor" stroke-width="2"/>
          <circle cx="88" cy="60" r="5" fill="currentColor" opacity="0.5"/>
          <line x1="30" y1="46" x2="62" y2="46" stroke="currentColor" stroke-width="2"/>
          <line x1="30" y1="56" x2="56" y2="56" stroke="currentColor" stroke-width="2"/>
          <line x1="30" y1="66" x2="62" y2="66" stroke="currentColor" stroke-width="2"/>
          <line x1="30" y1="76" x2="52" y2="76" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <div class="cat-name">SSD</div>
      <div class="cat-slug">Almacenamiento</div>
      <div class="cat-sep"></div>
      <div class="cat-count">70+ opciones disponibles</div>
      <div class="cat-cta-wrap"><span class="cat-cta">Explorar →</span></div>
    </a>

    <a href="/products.html?cat=cooling" class="cat-card" data-cat="cooling">
      <div class="cat-icon-wrap">
        <svg class="cat-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="60" cy="60" r="28" stroke="currentColor" stroke-width="2.5"/>
          <circle cx="60" cy="60" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="60" y1="22" x2="60" y2="42" stroke="currentColor" stroke-width="2"/>
          <line x1="60" y1="78" x2="60" y2="98" stroke="currentColor" stroke-width="2"/>
          <line x1="22" y1="60" x2="42" y2="60" stroke="currentColor" stroke-width="2"/>
          <line x1="78" y1="60" x2="98" y2="60" stroke="currentColor" stroke-width="2"/>
          <line x1="36" y1="36" x2="50" y2="50" stroke="currentColor" stroke-width="1.5"/>
          <line x1="70" y1="70" x2="84" y2="84" stroke="currentColor" stroke-width="1.5"/>
          <line x1="84" y1="36" x2="70" y2="50" stroke="currentColor" stroke-width="1.5"/>
          <line x1="36" y1="84" x2="50" y2="70" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>
      <div class="cat-name">Cooling</div>
      <div class="cat-slug">Refrigeración</div>
      <div class="cat-sep"></div>
      <div class="cat-count">40+ soluciones disponibles</div>
      <div class="cat-cta-wrap"><span class="cat-cta">Explorar →</span></div>
    </a>

    <a href="/products.html?cat=psu" class="cat-card" data-cat="psu">
      <div class="cat-icon-wrap">
        <svg class="cat-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="15" y="35" width="90" height="50" rx="8" stroke="currentColor" stroke-width="2.5"/>
          <line x1="30" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
          <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
          <line x1="30" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
          <circle cx="87" cy="78" r="8" stroke="currentColor" stroke-width="2"/>
          <circle cx="87" cy="78" r="3" fill="currentColor" opacity="0.6"/>
        </svg>
      </div>
      <div class="cat-name">PSU</div>
      <div class="cat-slug">Fuentes de Poder</div>
      <div class="cat-sep"></div>
      <div class="cat-count">30+ modelos disponibles</div>
      <div class="cat-cta-wrap"><span class="cat-cta">Explorar →</span></div>
    </a>

  </div>
</section>
```

**Note:** SVG icons use `stroke="currentColor"` and `fill="currentColor"` so CSS `color` controls the icon color. GPU card has the `.gpu` modifier class.

- [ ] **Step 2: Commit**

```bash
cd .worktrees/vite-restructure
git add src/sections/categorias/categorias.html
git commit -m "feat: rewrite categorias HTML with icon-tile card structure"
```

---

## Task 2: Rewrite categorias.css

**Files:**
- Modify: `src/sections/categorias/categorias.css`

- [ ] **Step 1: Replace the file with the new styles**

```css
/* ─── CATEGORÍAS ─────────────────────────────────── */
#categorias { padding: 8rem 8vw; background: var(--bg2); }

.cat-header { margin-bottom: 3.5rem; }
.cat-header .sec-title { margin-bottom: 0; }

/* Grid */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* ─── BASE CARD ──────────────────────────────────── */
.cat-card {
  --accent: var(--primary);

  display: flex; flex-direction: column; align-items: center;
  padding: 1.6rem 1.2rem 1.2rem;
  background: var(--bg);
  border: 1px solid rgba(91,196,229,.1);
  clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
  text-decoration: none; color: var(--text);
  position: relative; overflow: hidden;
  gap: .55rem;
  transition: border-color .25s, background .25s, box-shadow .25s;
}

/* Corner trace — top edge */
.cat-card::before {
  content: '';
  position: absolute; top: 0; left: 0;
  width: 0; height: 2px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  transition: width .35s cubic-bezier(.16,1,.3,1);
}

/* Corner trace — left edge */
.cat-card::after {
  content: '';
  position: absolute; top: 0; left: 0;
  width: 2px; height: 0;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  transition: height .35s cubic-bezier(.16,1,.3,1) .04s;
}

.cat-card:hover {
  border-color: rgba(91,196,229,.2);
  background: rgba(91,196,229,.025);
  box-shadow: 0 4px 28px rgba(91,196,229,.07);
}
.cat-card:hover::before { width: 100%; }
.cat-card:hover::after  { height: 55%; }

/* GPU modifier */
.cat-card.gpu {
  --accent: var(--hot);
  border-color: rgba(244,63,94,.1);
  color: var(--hot);
}
.cat-card.gpu:hover {
  border-color: rgba(244,63,94,.2);
  background: rgba(244,63,94,.025);
  box-shadow: 0 4px 28px rgba(244,63,94,.07);
}

/* ─── ICON WRAP ──────────────────────────────────── */
.cat-icon-wrap {
  width: 58px; height: 58px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(91,196,229,.12);
  background: rgba(91,196,229,.04);
  border-radius: 2px;
  color: var(--primary);
  transition: border-color .25s, background .25s;
  flex-shrink: 0;
}
.cat-card.gpu .cat-icon-wrap {
  border-color: rgba(244,63,94,.15);
  background: rgba(244,63,94,.04);
  color: var(--hot);
}
.cat-card:hover .cat-icon-wrap {
  border-color: rgba(91,196,229,.35);
  background: rgba(91,196,229,.07);
}
.cat-card.gpu:hover .cat-icon-wrap {
  border-color: rgba(244,63,94,.35);
  background: rgba(244,63,94,.07);
}

.cat-icon {
  width: 34px; height: 34px;
  opacity: .65;
  transition: opacity .25s, filter .25s;
}
.cat-card:hover .cat-icon {
  opacity: 1;
  filter: drop-shadow(0 0 5px rgba(91,196,229,.45));
}
.cat-card.gpu:hover .cat-icon {
  filter: drop-shadow(0 0 5px rgba(244,63,94,.45));
}

/* ─── CARD TEXT ──────────────────────────────────── */
.cat-name {
  font-family: var(--fh); font-size: 1rem; letter-spacing: .04em;
  color: var(--text); margin-top: .2rem;
}
.cat-card.gpu .cat-name { color: var(--hot); }

.cat-slug {
  font-size: .55rem; letter-spacing: .18em; text-transform: uppercase;
  color: var(--dim);
}

.cat-sep {
  width: 100%; height: 1px;
  background: rgba(91,196,229,.08);
  margin: .15rem 0;
}
.cat-card.gpu .cat-sep { background: rgba(244,63,94,.08); }

.cat-count {
  font-size: .54rem; color: rgba(91,196,229,.45);
}
.cat-card.gpu .cat-count { color: rgba(244,63,94,.5); }

/* ─── CTA REVEAL ─────────────────────────────────── */
.cat-cta-wrap {
  overflow: hidden;
  max-height: 0;
  transition: max-height .3s ease;
  width: 100%;
  display: flex; justify-content: center;
  margin-top: .2rem;
}
.cat-card:hover .cat-cta-wrap { max-height: 2rem; }

.cat-cta {
  display: inline-block;
  font-family: var(--fu); font-size: .58rem; font-weight: 600;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--primary);
  border: 1px solid rgba(91,196,229,.25);
  padding: .28rem .85rem;
  clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
  white-space: nowrap;
  transition: border-color .2s, background .2s;
}
.cat-card:hover .cat-cta {
  border-color: rgba(91,196,229,.5);
  background: rgba(91,196,229,.06);
}
.cat-card.gpu .cat-cta {
  color: var(--hot);
  border-color: rgba(244,63,94,.25);
}
.cat-card.gpu:hover .cat-cta {
  border-color: rgba(244,63,94,.5);
  background: rgba(244,63,94,.06);
}

/* ─── RESPONSIVE ─────────────────────────────────── */
@media (max-width: 768px) {
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  #categorias { padding: 6rem 5vw; }
}
@media (max-width: 480px) {
  .cat-grid { grid-template-columns: 1fr; }
  .cat-card { flex-direction: row; align-items: center; gap: 1rem; padding: 1.1rem 1.2rem; }
  .cat-icon-wrap { flex-shrink: 0; }
  .cat-name { font-size: .9rem; }
  .cat-cta-wrap { display: none; }
}
```

- [ ] **Step 2: Verify the dev server renders the section correctly**

Run in the worktree:
```bash
npm run dev
```

Open `http://localhost:5173`, scroll to the Categorías section. Verify:
- 3×2 grid of vertical cards
- Icons centered in framed boxes
- GPU card is red-tinted
- On hover: corner trace lines animate, icon brightens, CTA slides in from below
- No CTA visible on default state

Kill the server (Ctrl+C).

- [ ] **Step 3: Commit**

```bash
git add src/sections/categorias/categorias.css
git commit -m "feat: redesign categorias section with icon tiles and corner-trace hover"
```

---

## Self-Review

**Spec coverage:**
- ✅ 3×2 grid layout with responsive breakpoints (3→2→1 col)
- ✅ Clip-path chamfer on cards
- ✅ Icon centered in framed box using `currentColor` for theme control
- ✅ GPU `.gpu` modifier using `--hot` for all accent colors
- ✅ Corner trace via `::before` (top) + `::after` (left) pseudo-elements
- ✅ CTA hidden by default, revealed via `max-height` transition
- ✅ `.cat-card` class matches existing `main.js` scroll animation selector
- ✅ Section background and padding unchanged (`var(--bg2)`, `8rem 8vw`)

**Placeholder scan:** None found.

**Type consistency:** `.cat-card`, `.gpu`, `.cat-icon-wrap`, `.cat-icon`, `.cat-cta-wrap`, `.cat-cta` — used consistently across HTML and CSS.
