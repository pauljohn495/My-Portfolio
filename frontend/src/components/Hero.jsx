import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import profileImage from '../assets/portrait.jpg'
import resumePdf from '../assets/TAGALOG_ClassOf2026__issued.pdf'
import { Button } from '@/components/ui/button'
import SocialLinks from './SocialLinks'

function Hero({ profile, socialLinks }) {
  const featuredSocials = socialLinks.filter((link) => ['GitHub', 'LinkedIn'].includes(link.name))

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid page-shell">
        <div className="hero-copy anime-hero-copy">
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1 id="hero-title">John Paul<span>Tagalog</span></h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="portfolio-button portfolio-button--primary"><a href="#projects">View my work <ArrowUpRight aria-hidden="true" /></a></Button>
            <Button asChild size="lg" variant="outline" className="portfolio-button"><a href="#contact">Contact me</a></Button>
            <Button asChild size="lg" variant="ghost" className="portfolio-button portfolio-button--ghost"><a href={resumePdf} download>Download CV <Download aria-hidden="true" /></a></Button>
          </div>
          <SocialLinks links={featuredSocials} className="hero-socials" />
        </div>
        <div className="hero-portrait-wrap anime-portrait">
          <div className="portrait-grid" aria-hidden="true" />
          <p className="portrait-label portrait-label--top">Build with purpose</p>
          <p className="portrait-label portrait-label--bottom">Based in the Philippines</p>
          <div className="portrait-frame"><img src={profileImage} alt="John Paul Tagalog" width="900" height="900" fetchPriority="high" /></div>
          <a className="portrait-link" href="#about">About me <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDown aria-hidden="true" /></a>
    </section>
  )
}

export default Hero
