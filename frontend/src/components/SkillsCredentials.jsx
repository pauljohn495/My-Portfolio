import Skills from './Skills'
import Credentials from './Credentials'

function SkillsCredentials({ techStack, certificates, getImage, onCertificateOpen }) {
  return (
    <section className="content-section skills-credentials-section" id="skills" aria-labelledby="skills-credentials-title">
      <p className="section-label">Profile</p>
      <h2 id="skills-credentials-title">Skills &amp; Credentials</h2>
      <p className="section-description">The technologies I use and the certifications supporting my continued learning.</p>
      <div className="about-details">
        <Skills techStack={techStack} />
        <Credentials certificates={certificates} getImage={getImage} onOpen={onCertificateOpen} />
      </div>
    </section>
  )
}

export default SkillsCredentials
