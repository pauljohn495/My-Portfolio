import { ArrowUpRight } from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { SiGithub } from 'react-icons/si'

const socialIcons = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedinIn,
}

function About({ profile, id = 'about', socialLinks = [], children }) {
  const featuredSocials = socialLinks.filter((link) => socialIcons[link.name])

  return (
    <section className="content-section about-section" id={id} aria-labelledby={`${id}-title`}>
      <p className="section-label">About</p>
      <h2 id={`${id}-title`}>{profile.shortName}</h2>
      <p className="about-copy">
        I’m an Information Technology student and software developer focused on building practical,
        user-friendly applications. My work spans modern frontend and backend development, turning
        academic ideas and real needs into dependable digital experiences.
      </p>
      {featuredSocials.length > 0 && (
        <div className="about-social-links" aria-label="Professional profiles">
          {featuredSocials.map((link) => {
            const Icon = socialIcons[link.name]
            return (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
                <Icon aria-hidden="true" />
                {link.name}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )
          })}
        </div>
      )}
      {children && <div className="about-details">{children}</div>}
    </section>
  )
}

export default About
