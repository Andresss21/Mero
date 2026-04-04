# Arma Tu Rig Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Arma Tu Rig section into a pinned scroll experience — sidebar left tracks 6 components, feature panel right shows the active one with icon, name, specs, and CTA; scrubbing forward/back activates/deactivates components with a glitch transition.

**Architecture:** Three files rewritten — HTML (new sidebar+panel structure), CSS (pin layout + glitch animation + sidebar active states), JS (ScrollTrigger pin+scrub+onUpdate replacing old GSAP timeline). One line added in `main.js` for the section header reveal. GSAP is a CDN global (`window.gsap`, `window.ScrollTrigger`) — do NOT import from 'gsap'.

**Tech Stack:** Vanilla HTML/CSS, GSAP 3 ScrollTrigger (CDN via `window.gsap`/`window.ScrollTrigger`), no framework, no bundler test runner — verification is visual in browser.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `.worktrees/vite-restructure/src/sections/arma-rig/arma-rig.html` | Full rewrite | Sidebar list (6 items) + panel (6 stages with icon/name/sep/specs/CTA) |
| `.worktrees/vite-restructure/src/sections/arma-rig/arma-rig.css` | Full rewrite | Pin layout, sidebar active states, stage transitions, glitch animation, responsive |
| `.worktrees/vite-restructure/src/sections/arma-rig/arma-rig.js` | Full rewrite | ScrollTrigger pin+scrub, updateStage(), glitch class toggle |
| `.worktrees/vite-restructure/src/main.js` | 1 line added | revealOnScroll for `#rig-arena` section header |

---

## Task 1: HTML — Sidebar + Panel Structure

**Files:**
- Rewrite: `.worktrees/vite-restructure/src/sections/arma-rig/arma-rig.html`

- [ ] **Step 1: Open browser preview**

```bash
cd .worktrees/vite-restructure && npm run dev
```

Navigate to `http://localhost:5173`. Scroll to the current Arma Tu Rig section — note the existing chassis grid layout. This is what you're replacing.

- [ ] **Step 2: Rewrite arma-rig.html**

Replace the entire file with:

```html
<section id="rig-arena">
  <div class="rig-header">
    <div class="sec-label">Configurador</div>
    <h2 class="sec-title">Arma Tu Rig</h2>
  </div>

  <div class="rig-body">

    <!-- ── SIDEBAR (25%) ── -->
    <ul class="rig-sidebar" aria-label="Componentes del rig">

      <li class="rig-sidebar-item active" data-stage="0">
        <span class="rig-sb-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </span>
        <span class="rig-sb-name">CPU</span>
      </li>

      <li class="rig-sidebar-item" data-stage="1">
        <span class="rig-sb-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </span>
        <span class="rig-sb-name">GPU</span>
      </li>

      <li class="rig-sidebar-item" data-stage="2">
        <span class="rig-sb-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </span>
        <span class="rig-sb-name">RAM</span>
      </li>

      <li class="rig-sidebar-item" data-stage="3">
        <span class="rig-sb-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="80" height="60" rx="8" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="88" cy="60" r="14" stroke="currentColor" stroke-width="2"/>
            <circle cx="88" cy="60" r="5" fill="currentColor" opacity="0.5"/>
            <line x1="30" y1="46" x2="62" y2="46" stroke="currentColor" stroke-width="2"/>
            <line x1="30" y1="56" x2="56" y2="56" stroke="currentColor" stroke-width="2"/>
            <line x1="30" y1="66" x2="62" y2="66" stroke="currentColor" stroke-width="2"/>
            <line x1="30" y1="76" x2="52" y2="76" stroke="currentColor" stroke-width="2"/>
          </svg>
        </span>
        <span class="rig-sb-name">SSD</span>
      </li>

      <li class="rig-sidebar-item" data-stage="4">
        <span class="rig-sb-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </span>
        <span class="rig-sb-name">Cooling</span>
      </li>

      <li class="rig-sidebar-item" data-stage="5">
        <span class="rig-sb-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="35" width="90" height="50" rx="8" stroke="currentColor" stroke-width="2.5"/>
            <line x1="30" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
            <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
            <line x1="30" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
            <circle cx="87" cy="78" r="8" stroke="currentColor" stroke-width="2"/>
            <circle cx="87" cy="78" r="3" fill="currentColor" opacity="0.6"/>
          </svg>
        </span>
        <span class="rig-sb-name">PSU</span>
      </li>

    </ul><!-- /rig-sidebar -->

    <!-- ── FEATURE PANEL (75%) ── -->
    <div class="rig-panel">

      <div class="rig-stage active" data-stage="0">
        <div class="rig-stage-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div class="rig-stage-name">CPU</div>
        <div class="rig-stage-sep"></div>
        <ul class="rig-stage-specs">
          <li>Hasta 24 núcleos de rendimiento</li>
          <li>Soporte DDR5 y PCIe 5.0</li>
          <li>Gráficos integrados incluidos</li>
          <li>Overclocking desbloqueado</li>
        </ul>
        <a href="https://wa.me/50300000000?text=Hola%2C+quiero+armar+mi+rig" class="rig-stage-cta" target="_blank" rel="noopener">Arma el tuyo →</a>
      </div>

      <div class="rig-stage" data-stage="1">
        <div class="rig-stage-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div class="rig-stage-name">GPU</div>
        <div class="rig-stage-sep"></div>
        <ul class="rig-stage-specs">
          <li>Hasta 24GB VRAM dedicada</li>
          <li>DLSS 3 y Ray Tracing en tiempo real</li>
          <li>Interfaz PCIe 4.0 x16</li>
          <li>Rendimiento 4K sin compromisos</li>
        </ul>
        <a href="https://wa.me/50300000000?text=Hola%2C+quiero+armar+mi+rig" class="rig-stage-cta" target="_blank" rel="noopener">Arma el tuyo →</a>
      </div>

      <div class="rig-stage" data-stage="2">
        <div class="rig-stage-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div class="rig-stage-name">RAM</div>
        <div class="rig-stage-sep"></div>
        <ul class="rig-stage-specs">
          <li>DDR5-6000 de alta frecuencia</li>
          <li>Hasta 128GB de capacidad</li>
          <li>Perfil XMP 3.0 incluido</li>
          <li>Baja latencia para gaming</li>
        </ul>
        <a href="https://wa.me/50300000000?text=Hola%2C+quiero+armar+mi+rig" class="rig-stage-cta" target="_blank" rel="noopener">Arma el tuyo →</a>
      </div>

      <div class="rig-stage" data-stage="3">
        <div class="rig-stage-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="80" height="60" rx="8" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="88" cy="60" r="14" stroke="currentColor" stroke-width="2"/>
            <circle cx="88" cy="60" r="5" fill="currentColor" opacity="0.5"/>
            <line x1="30" y1="46" x2="62" y2="46" stroke="currentColor" stroke-width="2"/>
            <line x1="30" y1="56" x2="56" y2="56" stroke="currentColor" stroke-width="2"/>
            <line x1="30" y1="66" x2="62" y2="66" stroke="currentColor" stroke-width="2"/>
            <line x1="30" y1="76" x2="52" y2="76" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="rig-stage-name">SSD</div>
        <div class="rig-stage-sep"></div>
        <ul class="rig-stage-specs">
          <li>PCIe 4.0 NVMe M.2 2280</li>
          <li>Velocidades hasta 7,000 MB/s</li>
          <li>Capacidad hasta 4TB</li>
          <li>Sin tiempos de carga</li>
        </ul>
        <a href="https://wa.me/50300000000?text=Hola%2C+quiero+armar+mi+rig" class="rig-stage-cta" target="_blank" rel="noopener">Arma el tuyo →</a>
      </div>

      <div class="rig-stage" data-stage="4">
        <div class="rig-stage-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div class="rig-stage-name">Cooling</div>
        <div class="rig-stage-sep"></div>
        <ul class="rig-stage-specs">
          <li>AIO 120 / 240 / 360mm disponibles</li>
          <li>Torres de aire de alto rendimiento</li>
          <li>Rodamientos silenciosos</li>
          <li>Compatible LGA1700 y AM5</li>
        </ul>
        <a href="https://wa.me/50300000000?text=Hola%2C+quiero+armar+mi+rig" class="rig-stage-cta" target="_blank" rel="noopener">Arma el tuyo →</a>
      </div>

      <div class="rig-stage" data-stage="5">
        <div class="rig-stage-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="35" width="90" height="50" rx="8" stroke="currentColor" stroke-width="2.5"/>
            <line x1="30" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
            <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
            <line x1="30" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3"/>
            <circle cx="87" cy="78" r="8" stroke="currentColor" stroke-width="2"/>
            <circle cx="87" cy="78" r="3" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
        <div class="rig-stage-name">PSU</div>
        <div class="rig-stage-sep"></div>
        <ul class="rig-stage-specs">
          <li>80+ Gold / Platinum certificado</li>
          <li>Hasta 1200W de potencia</li>
          <li>Totalmente modular</li>
          <li>Protección OVCP, SCP y OTP</li>
        </ul>
        <a href="https://wa.me/50300000000?text=Hola%2C+quiero+armar+mi+rig" class="rig-stage-cta" target="_blank" rel="noopener">Arma el tuyo →</a>
      </div>

    </div><!-- /rig-panel -->

  </div><!-- /rig-body -->
</section>
```

- [ ] **Step 3: Verify HTML structure in browser**

With `npm run dev` running, navigate to the Arma Tu Rig section. You should see a raw unstyled layout — sidebar list of 6 items on the left, and the CPU stage content visible (others stacked on top). No styling yet. Confirm no console errors.

- [ ] **Step 4: Commit**

```bash
cd .worktrees/vite-restructure
git add src/sections/arma-rig/arma-rig.html
git commit -m "feat(arma-rig): rewrite HTML — sidebar + 6-stage panel structure"
```

---

## Task 2: CSS — Layout, Active States, Glitch Animation

**Files:**
- Rewrite: `.worktrees/vite-restructure/src/sections/arma-rig/arma-rig.css`

- [ ] **Step 1: Rewrite arma-rig.css**

Replace the entire file with:

```css
/* ─── ARMA TU RIG ─────────────────────────────────── */
#rig-arena {
  padding: 8rem 8vw;
  background: var(--bg);
}

.rig-header { margin-bottom: 3.5rem; }
.rig-header .sec-title { margin-bottom: 0; }

/* ─── BODY SPLIT ─────────────────────────────────── */
.rig-body {
  display: flex;
  gap: 3rem;
  align-items: stretch;
  min-height: 480px;
}

/* ─── SIDEBAR (25%) ──────────────────────────────── */
.rig-sidebar {
  list-style: none;
  width: 25%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .25rem;
}

.rig-sidebar-item {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .75rem 1rem .75rem 1.2rem;
  position: relative;
  cursor: default;
  transition: background .2s ease;
  border-radius: 2px;
}

/* Left bar */
.rig-sidebar-item::before {
  content: '';
  position: absolute; top: 0; left: 0;
  width: 3px; height: 100%;
  background: var(--primary);
  opacity: 0;
  transition: opacity .2s ease;
}

.rig-sidebar-item.active {
  background: rgba(91,196,229,.05);
}
.rig-sidebar-item.active::before { opacity: 1; }

/* GPU item */
.rig-sidebar-item[data-stage="1"].active {
  background: rgba(244,63,94,.05);
}
.rig-sidebar-item[data-stage="1"].active::before {
  background: var(--hot);
}

/* Sidebar icon */
.rig-sb-icon {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: rgba(91,196,229,.35);
  transition: color .2s ease, opacity .2s ease;
}
.rig-sb-icon svg { width: 100%; height: 100%; }

.rig-sidebar-item.active .rig-sb-icon { color: var(--primary); }
.rig-sidebar-item[data-stage="1"].active .rig-sb-icon { color: var(--hot); }

/* Sidebar name */
.rig-sb-name {
  font-family: var(--fu);
  font-size: .75rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--dim);
  transition: color .2s ease;
}
.rig-sidebar-item.active .rig-sb-name { color: var(--text); }

/* ─── FEATURE PANEL (75%) ────────────────────────── */
.rig-panel {
  flex: 1;
  position: relative;
  min-height: 480px;
  border: 1px solid rgba(91,196,229,.1);
  background: rgba(91,196,229,.02);
  clip-path: polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px));
  padding: 3rem;
  overflow: hidden;
}

/* ─── GLITCH OVERLAY ─────────────────────────────── */
.rig-panel::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(91,196,229,.06) 2px,
    rgba(91,196,229,.06) 4px
  );
  pointer-events: none;
  opacity: 0;
}

.rig-panel.hot::after {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(244,63,94,.06) 2px,
    rgba(244,63,94,.06) 4px
  );
}

.rig-panel.rig-glitch::after {
  animation: glitch-flash .2s steps(1) forwards;
}

@keyframes glitch-flash {
  0%   { opacity: 1; transform: translateX(0); }
  25%  { opacity: .6; transform: translateX(-2px); }
  50%  { opacity: 1; transform: translateX(2px); }
  75%  { opacity: .5; transform: translateX(0); }
  100% { opacity: 0; }
}

/* ─── STAGES ─────────────────────────────────────── */
.rig-stage {
  position: absolute; inset: 0;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease;
}

.rig-stage.active {
  opacity: 1;
  pointer-events: auto;
}

/* ─── STAGE ICON ─────────────────────────────────── */
.rig-stage-icon {
  width: 120px; height: 120px;
  color: var(--primary);
}
.rig-stage[data-stage="1"] .rig-stage-icon { color: var(--hot); }
.rig-stage-icon svg { width: 100%; height: 100%; }

/* ─── STAGE NAME ─────────────────────────────────── */
.rig-stage-name {
  font-family: var(--fh);
  font-size: 3rem;
  letter-spacing: .04em;
  color: var(--text);
  line-height: 1;
}

/* ─── STAGE SEPARATOR ────────────────────────────── */
.rig-stage-sep {
  width: 40px; height: 2px;
  background: var(--primary);
}
.rig-stage[data-stage="1"] .rig-stage-sep { background: var(--hot); }

/* ─── STAGE SPECS ────────────────────────────────── */
.rig-stage-specs {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .45rem;
}

.rig-stage-specs li {
  font-family: var(--fu);
  font-size: .85rem;
  color: var(--dim);
  line-height: 1.8;
}

.rig-stage-specs li::before {
  content: '· ';
  color: var(--primary);
}
.rig-stage[data-stage="1"] .rig-stage-specs li::before { color: var(--hot); }

/* ─── STAGE CTA ──────────────────────────────────── */
.rig-stage-cta {
  display: inline-block;
  font-family: var(--fu);
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--primary);
  text-decoration: none;
  border: 1px solid rgba(91,196,229,.3);
  padding: .5rem 1.2rem;
  clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
  transition: border-color .25s, background .25s;
  align-self: flex-start;
}
.rig-stage-cta:hover {
  border-color: rgba(91,196,229,.6);
  background: rgba(91,196,229,.06);
}

.rig-stage[data-stage="1"] .rig-stage-cta {
  color: var(--hot);
  border-color: rgba(244,63,94,.3);
}
.rig-stage[data-stage="1"] .rig-stage-cta:hover {
  border-color: rgba(244,63,94,.6);
  background: rgba(244,63,94,.06);
}

/* ─── RESPONSIVE ─────────────────────────────────── */
@media (max-width: 900px) {
  .rig-body {
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Sidebar becomes horizontal dot row */
  .rig-sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: .6rem;
    min-height: unset;
  }

  .rig-sidebar-item {
    width: 8px; height: 8px;
    padding: 0;
    border-radius: 50%;
    background: rgba(91,196,229,.2);
    gap: 0;
  }
  .rig-sidebar-item::before { display: none; }
  .rig-sidebar-item.active { background: var(--primary); }
  .rig-sidebar-item[data-stage="1"].active { background: var(--hot); }
  .rig-sb-icon, .rig-sb-name { display: none; }

  .rig-panel { min-height: 420px; }
}

@media (max-width: 480px) {
  #rig-arena { padding: 5rem 5vw; }

  .rig-stage-icon { width: 80px; height: 80px; }
  .rig-stage-name { font-size: 2rem; }

  /* Show only first 2 specs on mobile */
  .rig-stage-specs li:nth-child(n+3) { display: none; }
}

/* ─── ACCESSIBILITY ──────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .rig-panel.rig-glitch::after { animation: none; opacity: 0; }
  .rig-stage { transition: none; }
  .rig-sidebar-item,
  .rig-sidebar-item::before,
  .rig-sb-icon,
  .rig-sb-name { transition: none; }
}
```

- [ ] **Step 2: Verify layout in browser**

Navigate to the Arma Tu Rig section. You should see:
- Section header ("Configurador" label + "Arma Tu Rig" title)
- Left sidebar with 6 items; CPU item has left bar + full opacity; others dim
- Right panel showing the CPU stage: large CPU icon, "CPU" in big type, separator line, 4 spec bullets, "Arma el tuyo →" button
- Other stages invisible (opacity: 0, stacked behind)

No scrolling interaction yet — JS is next.

- [ ] **Step 3: Commit**

```bash
cd .worktrees/vite-restructure
git add src/sections/arma-rig/arma-rig.css
git commit -m "feat(arma-rig): rewrite CSS — pin layout, sidebar states, glitch animation, responsive"
```

---

## Task 3: JS — ScrollTrigger Pin + Scrub + main.js Update

**Files:**
- Rewrite: `.worktrees/vite-restructure/src/sections/arma-rig/arma-rig.js`
- Modify: `.worktrees/vite-restructure/src/main.js` (add 1 line)

- [ ] **Step 1: Rewrite arma-rig.js**

Replace the entire file with:

```js
import './arma-rig.css'

export function initArmaRig() {
  const items   = document.querySelectorAll('.rig-sidebar-item')
  const stages  = document.querySelectorAll('.rig-stage')
  const panel   = document.querySelector('.rig-panel')
  if (!panel) return

  let currentStage = -1

  function updateStage(idx) {
    idx = Math.min(5, Math.max(0, idx))
    if (idx === currentStage) return

    const prev = currentStage
    currentStage = idx

    // Glitch overlay — add class, swap after 200ms, remove glitch
    panel.classList.add('rig-glitch')
    if (idx === 1) panel.classList.add('hot')
    else panel.classList.remove('hot')

    setTimeout(() => {
      if (prev >= 0) {
        stages[prev].classList.remove('active')
        items[prev].classList.remove('active')
      }
      stages[idx].classList.add('active')
      items[idx].classList.add('active')
      panel.classList.remove('rig-glitch')
    }, 200)
  }

  // Pin the section and scrub through 6 stages
  window.ScrollTrigger.create({
    trigger: '#rig-arena',
    pin: true,
    start: 'top top',
    end: '+=400%',
    scrub: 1.4,
    onUpdate: (self) => updateStage(Math.floor(self.progress * 6))
  })

  // Start at stage 0
  updateStage(0)
}
```

- [ ] **Step 2: Add revealOnScroll for section header in main.js**

Open `.worktrees/vite-restructure/src/main.js`. Find the Categorías block:

```js
  // Categorías
  revealOnScroll('#categorias .sec-label, #categorias .sec-title', { x: -24, stagger: .1, duration: .6 })
  revealOnScroll('.cat-card', { y: 55, stagger: .1, duration: .65 })
```

Add the Arma Tu Rig header reveal immediately after it:

```js
  // Arma Tu Rig
  revealOnScroll('#rig-arena .sec-label, #rig-arena .sec-title', { x: -24, stagger: .1, duration: .6 })
```

The final block should look like:

```js
  // Categorías
  revealOnScroll('#categorias .sec-label, #categorias .sec-title', { x: -24, stagger: .1, duration: .6 })
  revealOnScroll('.cat-card', { y: 55, stagger: .1, duration: .65 })

  // Arma Tu Rig
  revealOnScroll('#rig-arena .sec-label, #rig-arena .sec-title', { x: -24, stagger: .1, duration: .6 })
```

- [ ] **Step 3: Verify scroll interaction in browser**

Navigate to the Arma Tu Rig section. Scroll down slowly:
- Section pins (page stops advancing, scroll position stays fixed)
- CPU → GPU → RAM → SSD → Cooling → PSU activate one by one
- Each transition: brief glitch scanline flash, then new stage fades in
- Sidebar left bar + active state tracks the current component
- GPU stage: icon, separator, spec bullets, CTA all use red (`var(--hot)`) color
- Scrolling back up: components deactivate in reverse (scrub is bidirectional)
- After all 6 stages, section unpins and normal scroll resumes

- [ ] **Step 4: Verify responsive**

Resize browser to 900px wide:
- Sidebar collapses to a horizontal row of 8px dots
- Active dot is filled cyan (or red for GPU)
- Panel takes full width

Resize to 480px:
- Icon shrinks to 80px
- Specs show only 2 bullets

- [ ] **Step 5: Commit**

```bash
cd .worktrees/vite-restructure
git add src/sections/arma-rig/arma-rig.js src/main.js
git commit -m "feat(arma-rig): rewrite JS — ScrollTrigger pin+scrub, glitch transitions, bidirectional"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Pinned scroll (`pin: true`, `end: '+=400%'`, `scrub: 1.4`)
- ✅ Bidirectional — `onUpdate` fires on scroll back, `updateStage` reverses
- ✅ Sidebar (25%) with 6 items, left bar active state, GPU uses `var(--hot)`
- ✅ Feature panel (75%) with 6 stages, absolute positioned, opacity transition
- ✅ Glitch: `.rig-glitch` class on panel triggers CSS animation, 200ms timeout swaps stage
- ✅ GPU hot color: `[data-stage="1"]` selectors in CSS + `.hot` class on panel for glitch scanlines
- ✅ Stage content: 120px icon, 3rem name, 40px separator, 4 spec bullets with `·` prefix, CTA
- ✅ Spec data: all 6 components with 4 bullets each matching spec table
- ✅ Responsive: 900px → dots sidebar, 480px → 80px icon, 2 specs
- ✅ `prefers-reduced-motion`: glitch animation disabled, transitions removed
- ✅ `main.js` update: revealOnScroll for `#rig-arena` header

**Placeholder scan:** No TBDs. All code is complete. WhatsApp number is a Phase 0 placeholder — intentional, not a plan failure.

**Type consistency:** `updateStage(idx)` is consistent across JS. `.rig-sidebar-item`, `.rig-stage`, `.rig-panel`, `.rig-glitch`, `.hot`, `.active` are consistent across HTML, CSS, and JS.
