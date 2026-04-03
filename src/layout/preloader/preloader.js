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
