function About({ profile, id = 'about', children }) {
  return (
    <section className="content-section about-section" id={id} aria-labelledby={`${id}-title`}>
      <p className="section-label">About</p>
      <h2 id={`${id}-title`}>{profile.shortName}</h2>
      <p className="about-copy">
        I’m an Information Technology student and software developer focused on building practical,
        user-friendly applications. My work spans modern frontend and backend development, turning
        academic ideas and real needs into dependable digital experiences.
      </p>
      {children && <div className="about-details">{children}</div>}
    </section>
  )
}

export default About
