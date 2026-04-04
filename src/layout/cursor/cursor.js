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
