import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SocialLinks from './SocialLinks'

function Footer({ socialLinks, email }) {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div><a className="wordmark" href="#home"><span>JP</span><b>.</b></a><p>Software Developer</p></div>
        <nav aria-label="Footer navigation"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Journey</a></nav>
        <div className="footer-actions">
          <SocialLinks links={socialLinks.filter((link) => ['GitHub', 'LinkedIn'].includes(link.name))} email={email} className="footer-socials" />
          <Button asChild variant="ghost" size="sm" className="back-to-top"><a href="#home">Back to top <ArrowUp aria-hidden="true" /></a></Button>
        </div>
      </div>
      <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} John Paul T. Tagalog</span><span>Designed &amp; developed by John Paul Tagalog</span></div>
    </footer>
  )
}

export default Footer
