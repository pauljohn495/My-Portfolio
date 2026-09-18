import SectionHeading from './SectionHeading'

function About({ projectCount, technologyCount, certificateCount }) {
  const stats = [
    { value: projectCount, label: 'Projects built' },
    { value: technologyCount, label: 'Technologies used' },
    { value: certificateCount, label: 'Cisco credentials' },
  ]

  return (
    <section className="section section--bordered" id="about">
      <div className="page-shell reveal">
        <SectionHeading eyebrow="About me" title="Learning by building real systems." copy="I’m an Information Technology student who enjoys turning ideas into practical, user-friendly software. My work spans academic systems, full-stack web applications, and an early Java game project." align="split" />
        <div className="about-grid">
          <p className="about-statement">I care about clear interfaces, dependable functionality, and the steady process of improving with every project.</p>
          <div className="stats-grid" aria-label="Portfolio highlights">
            {stats.map((stat) => <div className="stat" key={stat.label}><strong>{String(stat.value).padStart(2, '0')}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
