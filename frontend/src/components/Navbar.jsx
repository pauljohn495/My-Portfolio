import { useEffect } from 'react'
import { CircleUserRound, FolderKanban, Home, Mail, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Home', target: 'home', icon: Home },
  { label: 'About', target: 'about', icon: CircleUserRound },
  { label: 'Projects', target: 'projects', icon: FolderKanban },
  { label: 'Contact', target: 'contact', icon: Mail },
]

function Navbar({ activeView, onNavigate }) {
  const { resolvedTheme, setTheme } = useTheme()

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
