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

  // Arma Tu Rig
  revealOnScroll('#rig-arena .sec-label, #rig-arena .sec-title', { x: -24, stagger: .1, duration: .6 })

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
