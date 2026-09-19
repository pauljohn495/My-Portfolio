import { useEffect, useState } from 'react'
import { CircleUserRound, FolderKanban, Home, Mail, Moon, Sun } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Home', target: 'home', icon: Home },
  { label: 'About', target: 'about', icon: CircleUserRound },
  { label: 'Projects', target: 'projects', icon: FolderKanban },
  { label: 'GitHub', target: 'github-activity', icon: SiGithub },
  { label: 'Contact', target: 'contact', icon: Mail },
]

function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const updateActiveSection = () => {
      if (window.scrollY < 80) {
        setActiveSection('home')
        return
      }

      const current = navItems
        .filter(({ target }) => target !== 'home')
        .map(({ target }) => document.getElementById(target))
        .filter(Boolean)
        .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }))
        .filter(({ top }) => top <= 180)
        .at(-1)

      setActiveSection(current?.id || 'home')
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      resolvedTheme === 'light' ? '#f5f4f1' : '#090909',
    )
  }, [resolvedTheme])

  return (
    <div className="profile-navigation">
      <nav aria-label="Primary navigation">
        {navItems.map(({ label, target, icon: Icon }, index) => (
          <a
            key={target}
            href={`#${target}`}
            className={activeSection === target ? 'is-active' : ''}
            aria-current={activeSection === target ? 'page' : undefined}
            onClick={() => setActiveSection(target)}
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
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {resolvedTheme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </Button>
      </div>
    </div>
  )
}

export default Navbar
