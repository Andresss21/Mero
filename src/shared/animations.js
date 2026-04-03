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
