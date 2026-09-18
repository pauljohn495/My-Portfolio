import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = window.localStorage.getItem('portfolio-theme')
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f5f2' : '#101216')
    try { window.localStorage.setItem('portfolio-theme', theme) } catch { /* Theme still works without persistence. */ }
  }, [theme])

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#home" aria-label="John Paul Tagalog, home"><span>JP</span><b>.</b></a>
        <div className="nav-actions">
          <div id="mobile-navigation" className={`nav-links ${isOpen ? 'is-open' : ''}`}>
            {navItems.map((item, index) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                <span>0{index + 1}</span>{item}
              </a>
            ))}
          </div>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Sun className="theme-icon theme-icon--sun" aria-hidden="true" />
            <Moon className="theme-icon theme-icon--moon" aria-hidden="true" />
          </button>
          <button className="menu-button" type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setIsOpen((current) => !current)}>
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
