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
