function Footer({ socialLinks, email }) {
  const linkedin = socialLinks.find((link) => link.name === 'LinkedIn')
  const github = socialLinks.find((link) => link.name === 'GitHub')

  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} John Paul T. Tagalog</span>
      <nav aria-label="Footer links">
        {github && <a href={github.url} target="_blank" rel="noreferrer">GitHub</a>}
        {linkedin && <a href={linkedin.url} target="_blank" rel="noreferrer">LinkedIn</a>}
        <a href={`mailto:${email}`}>Email</a>
      </nav>
    </footer>
  )
}

export default Footer
