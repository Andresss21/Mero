import './arma-rig.css'

export function initArmaRig() {
  const items   = document.querySelectorAll('.rig-sidebar-item')
  const stages  = document.querySelectorAll('.rig-stage')
  const panel   = document.querySelector('.rig-panel')
  if (!panel) return

  let currentStage  = -1
  let glitchTimer   = null
  let initialized   = false

  function updateStage(idx) {
    idx = Math.min(5, Math.max(0, idx))
    if (idx === currentStage) return

    currentStage = idx

    // Skip glitch on initial load — just set the stage directly
    if (!initialized) {
      initialized = true
      stages.forEach((s, i) => s.classList.toggle('active', i === idx))
      items.forEach((it, i) => it.classList.toggle('active', i === idx))
      if (idx === 1) panel.classList.add('hot')
      else panel.classList.remove('hot')
      return
    }

    // Glitch overlay — cancel any pending swap, start fresh
    clearTimeout(glitchTimer)
    panel.classList.add('rig-glitch')

    glitchTimer = setTimeout(() => {
      // Swap content and color together
      stages.forEach((s, i) => s.classList.toggle('active', i === idx))
      items.forEach((it, i) => it.classList.toggle('active', i === idx))
      if (idx === 1) panel.classList.add('hot')
      else panel.classList.remove('hot')
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

  // Start at stage 0 (no glitch on initial load)
  updateStage(0)
}
