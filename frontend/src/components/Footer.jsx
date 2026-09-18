function Footer({ socialLinks }) {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div><a className="wordmark" href="#home"><span>JP</span><b>.</b></a><p>Software Developer</p></div>
        <nav aria-label="Footer navigation"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Journey</a></nav>
        <div className="footer-socials">{socialLinks.map((link) => <a key={link.name} href={link.url} target="_blank" rel="noreferrer">{link.name}</a>)}</div>
      </div>
      <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} John Paul T. Tagalog</span><span>Designed &amp; developed by John Paul Tagalog</span></div>
    </footer>
  )
}

export default Footer
