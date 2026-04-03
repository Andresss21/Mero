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
