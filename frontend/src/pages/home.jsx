import { useCallback, useEffect, useMemo, useState } from 'react'
import portfolioData from '../data/portfolioData.json'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import ProjectModal from '../components/ProjectModal'
import Journey from '../components/Journey'
import CertificateModal from '../components/CertificateModal'
import Process from '../components/Process'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import projectImage from '../assets/project.jpg'
import introductionCertificate from '../assets/introduction.jpeg'
import routingCertificate from '../assets/routing.jpeg'

const assetImages = {
  '../assets/project.jpg': projectImage,
  '../assets/introduction.jpeg': introductionCertificate,
  '../assets/routing.jpeg': routingCertificate,
}

function Home() {
  const { profile, techStack, experienceTimeline, personalProjects, socialLinks, certificates } = portfolioData
  const [activeProject, setActiveProject] = useState(null)
  const [activeCertificate, setActiveCertificate] = useState(null)

  const getImage = useCallback((path) => assetImages[path] || projectImage, [])
  const closeProject = useCallback(() => setActiveProject(null), [])
  const closeCertificate = useCallback(() => setActiveCertificate(null), [])
  const technologyCount = useMemo(() => new Set(Object.values(techStack).flat()).size, [techStack])

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero profile={profile} socialLinks={socialLinks} />
        <About projectCount={personalProjects.length} technologyCount={technologyCount} certificateCount={certificates.length} />
        <Skills techStack={techStack} />
        <Projects projects={personalProjects} getImage={getImage} onOpen={setActiveProject} />
        <Journey timeline={experienceTimeline} certificates={certificates} getImage={getImage} onCertificateOpen={setActiveCertificate} />
        <Process />
        <Contact email={profile.email} socialLinks={socialLinks} />
      </main>
      <Footer socialLinks={socialLinks} />
      {activeProject && <ProjectModal project={activeProject} image={getImage(activeProject.image)} onClose={closeProject} />}
      {activeCertificate && <CertificateModal certificate={activeCertificate} onClose={closeCertificate} />}
    </>
  )
}

export default Home
