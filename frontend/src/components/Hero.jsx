import { ArrowDown, ArrowUpRight, Code2, Network } from 'lucide-react'
import profileImage from '../assets/portrait.jpg'

function Hero({ profile, socialLinks }) {
  const github = socialLinks.find((link) => link.name === 'GitHub')
  const linkedin = socialLinks.find((link) => link.name === 'LinkedIn')

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid page-shell">
        <div className="hero-copy anime-hero-copy">
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1 id="hero-title">John Paul<span>Tagalog</span></h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#projects">View my work <ArrowUpRight aria-hidden="true" /></a>
            <a className="button button--secondary" href="#contact">Contact me</a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            {github && <a href={github.url} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /> GitHub</a>}
            {linkedin && <a href={linkedin.url} target="_blank" rel="noreferrer"><Network aria-hidden="true" /> LinkedIn</a>}
          </div>
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
