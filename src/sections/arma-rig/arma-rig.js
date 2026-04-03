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
