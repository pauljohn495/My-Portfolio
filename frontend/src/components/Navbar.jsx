import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navItems = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
  { label: 'Contact', target: 'contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems
        .map(({ target }) => document.getElementById(target))
        .filter(Boolean)
        .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }))
        .sort((a, b) => a.top - b.top)

      const current = sections.filter(({ top }) => top <= 130).at(-1) || sections[0]
      if (current) setActiveSection(current.id)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolvedTheme === 'light' ? '#f4f5f2' : '#101216')
  }, [resolvedTheme])

  const handleNavigation = (target) => {
    setActiveSection(target)
    setIsOpen(false)
  }

  const navigationLinks = navItems.map(({ label, target }) => (
    <a
      key={target}
      href={`#${target}`}
      className={activeSection === target ? 'is-active' : ''}
      aria-current={activeSection === target ? 'page' : undefined}
      onClick={() => handleNavigation(target)}
    >
      {label}
    </a>
  ))

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <div className="nav-actions">
          <NavigationMenu viewport={false} className="desktop-navigation">
            <NavigationMenuList className="nav-links">
              {navItems.map(({ label, target }) => (
                <NavigationMenuItem key={target}>
                  <NavigationMenuLink
                    href={`#${target}`}
                    active={activeSection === target}
                    className={activeSection === target ? 'is-active' : ''}
                    aria-current={activeSection === target ? 'page' : undefined}
                    onClick={() => handleNavigation(target)}
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            className="theme-toggle"
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={resolvedTheme === 'light'}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Sun className="theme-icon theme-icon--sun" aria-hidden="true" />
            <Moon className="theme-icon theme-icon--moon" aria-hidden="true" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="menu-button" type="button" variant="ghost" size="icon" aria-label="Open navigation">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="mobile-nav-sheet" showCloseButton={false} aria-describedby="mobile-nav-description">
              <SheetHeader className="mobile-nav-header">
                <div>
                  <SheetTitle>Navigate</SheetTitle>
                  <SheetDescription id="mobile-nav-description">Explore John Paul&apos;s portfolio.</SheetDescription>
                </div>
                <SheetClose asChild>
                  <Button type="button" variant="ghost" size="icon" aria-label="Close navigation"><X aria-hidden="true" /></Button>
                </SheetClose>
              </SheetHeader>
              <div id="mobile-navigation" className="mobile-nav-links">{navigationLinks}</div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
