import { useCallback, useEffect, useMemo, useState } from 'react'
import portfolioData from '../data/portfolioData.json'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Credentials from '../components/Credentials'
import Projects from '../components/Projects'
import GitHubContributions from '../components/GitHubContributions'
import ProjectModal from '../components/ProjectModal'
import CertificateModal from '../components/CertificateModal'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import projectImage from '../assets/project.jpg'
import introductionCertificate from '../assets/introduction.jpeg'
import routingCertificate from '../assets/routing.jpeg'

const validViews = new Set(['home', 'about', 'projects', 'contact'])
const assetImages = {
  '../assets/project.jpg': projectImage,
  '../assets/introduction.jpeg': introductionCertificate,
  '../assets/routing.jpeg': routingCertificate,
}

function getInitialView() {
  const hashView = window.location.hash.slice(1)
  return validViews.has(hashView) ? hashView : 'home'
}

function Home() {
  const { profile, techStack, personalProjects, socialLinks, certificates } = portfolioData
  const [activeView, setActiveView] = useState(getInitialView)
  const [activeProject, setActiveProject] = useState(null)
  const [activeCertificate, setActiveCertificate] = useState(null)

  const getImage = useCallback((path) => assetImages[path] || projectImage, [])
  const closeProject = useCallback(() => setActiveProject(null), [])
  const closeCertificate = useCallback(() => setActiveCertificate(null), [])
  const githubUrl = useMemo(
    () => socialLinks.find((link) => link.name === 'GitHub')?.url || 'https://github.com/',
    [socialLinks],
  )

  const navigateTo = useCallback((view) => {
    if (!validViews.has(view)) return
    window.history.pushState(null, '', `#${view}`)
    setActiveView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const syncView = () => setActiveView(getInitialView())
    window.addEventListener('popstate', syncView)
    return () => window.removeEventListener('popstate', syncView)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="portfolio-page page-shell">
        <aside className="profile-column" aria-label="Profile and navigation">
          <div className="profile-sticky">
            <Hero profile={profile} socialLinks={socialLinks} />
            <Navbar activeView={activeView} onNavigate={navigateTo} />
          </div>
        </aside>

        <div className="content-column">
          <main id="main-content" className="view-panel" key={activeView}>
            {activeView === 'home' && (
              <>
                <About profile={profile} id="home-overview" />
                <Projects projects={personalProjects} getImage={getImage} onOpen={setActiveProject} preview onViewAll={() => navigateTo('projects')} />
              </>
            )}

            {activeView === 'about' && (
              <About profile={profile}>
                <Skills techStack={techStack} />
                <Credentials certificates={certificates} getImage={getImage} onOpen={setActiveCertificate} />
              </About>
            )}

            {activeView === 'projects' && (
              <Projects projects={personalProjects} getImage={getImage} onOpen={setActiveProject}>
                <GitHubContributions githubUrl={githubUrl} />
              </Projects>
            )}

            {activeView === 'contact' && <Contact email={profile.email} socialLinks={socialLinks} />}
          </main>
          <Footer socialLinks={socialLinks} email={profile.email} />
        </div>
      </div>

      {activeProject && <ProjectModal project={activeProject} image={getImage(activeProject.image)} onClose={closeProject} />}
      {activeCertificate && <CertificateModal certificate={activeCertificate} onClose={closeCertificate} />}
    </>
  )
}

export default Home
