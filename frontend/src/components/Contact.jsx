import { ArrowUpRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Contact({ email, socialLinks }) {
  const visibleSocials = socialLinks.filter((link) => ['GitHub', 'LinkedIn'].includes(link.name))

  return (
    <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
      <p className="section-label">Contact</p>
      <h2 id="contact-title">Let’s Connect!</h2>
      <p>I’m open to internships, junior developer opportunities, collaborations, and conversations about building useful software.</p>
      <Button asChild className="contact-cta">
        <a href={`mailto:${email}`}>Let’s Talk <Mail aria-hidden="true" /></a>
      </Button>
      <div className="contact-links">
        <a href={`mailto:${email}`}>{email}</a>
        {visibleSocials.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noreferrer">{link.name} <ArrowUpRight aria-hidden="true" /></a>
        ))}
      </div>
    </section>
  )
}

export default Contact
