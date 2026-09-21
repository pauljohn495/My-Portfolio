import { useEffect, useState } from 'react'
import { CircleUserRound, FolderKanban, Home, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Home', target: 'home', icon: Home },
  { label: 'Skills & Credentials', target: 'skills', icon: CircleUserRound },
  { label: 'Projects', target: 'projects', icon: FolderKanban },
  { label: 'Contact', target: 'contact', icon: Mail },
]

const mobileNavItems = [navItems[0], navItems[2], navItems[1], navItems[3]]

function Navbar({ activeView, onNavigate }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      resolvedTheme === 'light' ? '#f5f4f1' : '#070809',
    )
  }, [resolvedTheme])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 900px)')
    const closeOnDesktop = (event) => {
      if (!event.matches) setMobileMenuOpen(false)
    }

    mobileQuery.addEventListener('change', closeOnDesktop)
    return () => mobileQuery.removeEventListener('change', closeOnDesktop)
  }, [])

  const navigateFromMobileMenu = (event, target) => {
    event.preventDefault()
    setMobileMenuOpen(false)
    onNavigate(target)
  }

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <>
      <div className="profile-navigation">
        <nav aria-label="Primary navigation">
          {navItems.map(({ label, target, icon: Icon }, index) => (
            <a
              key={target}
              href={`#${target}`}
              className={activeView === target ? 'is-active' : ''}
              aria-current={activeView === target ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(target)
              }}
            >
              <span><Icon aria-hidden="true" />{label}</span>
              <kbd>{index + 1}</kbd>
            </a>
          ))}
        </nav>
        <div className="rail-controls">
          <span>© {new Date().getFullYear()}</span>
          <Button
            className="rail-theme-toggle"
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {resolvedTheme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <DialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogPrimitive.Trigger asChild>
          <Button
            className="mobile-menu-trigger"
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <Menu aria-hidden="true" />
          </Button>
        </DialogPrimitive.Trigger>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="mobile-nav-overlay" />
          <DialogPrimitive.Content
            id="mobile-navigation-drawer"
            className="mobile-nav-drawer"
            aria-describedby="mobile-navigation-description"
          >
            <div className="mobile-nav-header">
              <DialogPrimitive.Title>Navigation</DialogPrimitive.Title>
              <DialogPrimitive.Description id="mobile-navigation-description" className="sr-only">
                Choose a portfolio section or change the color theme.
              </DialogPrimitive.Description>
              <DialogPrimitive.Close asChild>
                <Button
                  className="mobile-nav-close"
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close navigation menu"
                >
                  <X aria-hidden="true" />
                </Button>
              </DialogPrimitive.Close>
            </div>

            <nav className="mobile-nav-list" aria-label="Mobile navigation">
              {mobileNavItems.map(({ label, target, icon: Icon }) => (
                <a
                  key={target}
                  href={`#${target}`}
                  className={activeView === target ? 'is-active' : ''}
                  aria-current={activeView === target ? 'page' : undefined}
                  onClick={(event) => navigateFromMobileMenu(event, target)}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </nav>

            <div className="mobile-nav-footer">
              <span>© {new Date().getFullYear()}</span>
              <Button
                className="mobile-theme-toggle"
                type="button"
                variant="ghost"
                onClick={toggleTheme}
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {resolvedTheme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
                <span>{resolvedTheme === 'light' ? 'Dark mode' : 'Light mode'}</span>
              </Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  )
}

export default Navbar
