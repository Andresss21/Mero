import './nav.css'

export function initNav(lenis) {
  const nav = document.getElementById('nav')
  let scanPlayed = false

  lenis.on('scroll', ({ scroll }) => {
    const isScrolled = scroll > 60
    if (isScrolled && !scanPlayed) {
      scanPlayed = true
    }
    if (!isScrolled) scanPlayed = false
    nav.classList.toggle('scrolled', isScrolled)
  })

  // Mobile drawer
  const mobNav = document.getElementById('mob-nav')
  const overlay = document.getElementById('mob-overlay')

  function openMenu() {
    mobNav.classList.add('open')
    overlay.classList.add('show')
    document.body.style.overflow = 'hidden'
  }
  function closeMenu() {
    mobNav.classList.remove('open')
    overlay.classList.remove('show')
    document.body.style.overflow = ''
  }

  document.getElementById('hamburger').addEventListener('click', openMenu)
  document.getElementById('mob-close').addEventListener('click', closeMenu)
  overlay.addEventListener('click', closeMenu)
  document.getElementById('mob-links').querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu)
  })
}
