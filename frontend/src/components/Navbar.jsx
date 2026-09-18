import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#home" aria-label="John Paul Tagalog, home"><span>JP</span><b>.</b></a>
        <div id="mobile-navigation" className={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {navItems.map((item, index) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
              <span>0{index + 1}</span>{item}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setIsOpen(false)}>Let&apos;s talk</a>
        </div>
        <button className="menu-button" type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setIsOpen((current) => !current)}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
