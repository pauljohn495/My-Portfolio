import { useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import SectionHeading from './SectionHeading'

function Contact({ email, socialLinks }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setStatus('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) nextErrors.message = 'Please add a little more detail (at least 10 characters).'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setStatus('Please check the highlighted fields.'); return }

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setStatus('Your message is ready in your email app.')
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="page-shell reveal">
        <SectionHeading eyebrow="Contact" title="Let’s build something together." />
        <div className="contact-grid">
          <div className="contact-copy">
            <p>I’m open to internship opportunities, junior developer roles, freelance work, and conversations about building useful software.</p>
            <a className="contact-email" href={`mailto:${email}`}><Mail aria-hidden="true" /><span>Email me directly<small>{email}</small></span></a>
            <div className="contact-socials">{socialLinks.map((social) => <a key={social.name} href={social.url} target="_blank" rel="noreferrer">{social.name}<ArrowUpRight aria-hidden="true" /></a>)}</div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Name</label><input id="name" name="name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Your name" />
                {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="email">Email</label><input id="email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />
                {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label><textarea id="message" name="message" value={form.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Tell me about the opportunity or project." rows="6" />
              {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
            </div>
            <div className="form-footer">
              <button className="button button--primary" type="submit">Prepare message <ArrowUpRight aria-hidden="true" /></button>
              <p className={status.startsWith('Your') ? 'form-status is-success' : 'form-status'} role="status">{status}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
