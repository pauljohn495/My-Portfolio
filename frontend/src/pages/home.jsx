import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import portfolioData from '../data/portfolioData.json'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import GitHubContributions from '../components/GitHubContributions'
import Footer from '../components/Footer'
import projectImage from '../assets/project.jpg'
import aiCertificate from '../assets/ai certificate.png'
import introductionCertificate from '../assets/introduction.jpeg'
import routingCertificate from '../assets/routing.jpeg'

const SkillsCredentials = lazy(() => import('../components/SkillsCredentials'))
const ProjectModal = lazy(() => import('../components/ProjectModal'))
const CertificateModal = lazy(() => import('../components/CertificateModal'))
const Contact = lazy(() => import('../components/Contact'))

const validViews = new Set(['home', 'skills', 'projects', 'contact'])
const assetImages = {
  '../assets/project.jpg': projectImage,
  '../assets/ai certificate.png': aiCertificate,
  '../assets/introduction.jpeg': introductionCertificate,
  '../assets/routing.jpeg': routingCertificate,
}
const { profile, techStack, personalProjects, socialLinks, certificates } = portfolioData
const githubUrl = socialLinks.find((link) => link.name === 'GitHub')?.url || 'https://github.com/'

function getImage(path) {
  return assetImages[path] || projectImage
}

function getInitialView() {
  const hashView = window.location.hash.slice(1)
  if (hashView === 'about') return 'skills'
  return validViews.has(hashView) ? hashView : 'home'
}

function Home() {
  const [activeView, setActiveView] = useState(getInitialView)
  const [activeProject, setActiveProject] = useState(null)
  const [activeCertificate, setActiveCertificate] = useState(null)

  const transitionToView = useCallback((view) => {
    if (!validViews.has(view)) return

    const updateView = () => {
      flushSync(() => setActiveView(view))
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(updateView)
    } else {
      updateView()
    }
  }, [])

  const navigateTo = useCallback((view) => {
    if (!validViews.has(view) || view === activeView) return
    window.history.pushState(null, '', `#${view}`)
    transitionToView(view)
  }, [activeView, transitionToView])

  useEffect(() => {
    const syncView = () => transitionToView(getInitialView())
    window.addEventListener('popstate', syncView)
    return () => window.removeEventListener('popstate', syncView)
  }, [transitionToView])

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
            <Suspense fallback={null}>
              {activeView === 'home' && (
                <>
                  <About profile={profile} id="about" socialLinks={socialLinks} />
                  <Projects projects={personalProjects} getImage={getImage} onOpen={setActiveProject} preview onViewAll={() => navigateTo('projects')}>
                    <GitHubContributions githubUrl={githubUrl} />
                  </Projects>
                </>
              )}

              {activeView === 'skills' && (
                <SkillsCredentials
                  techStack={techStack}
                  certificates={certificates}
                  getImage={getImage}
                  onCertificateOpen={setActiveCertificate}
                />
              )}

              {activeView === 'projects' && (
                <Projects projects={personalProjects} getImage={getImage} onOpen={setActiveProject} />
              )}

              {activeView === 'contact' && <Contact email={profile.email} socialLinks={socialLinks} />}
            </Suspense>
          </main>
          <Footer socialLinks={socialLinks} email={profile.email} />
        </div>
      </div>

      <Suspense fallback={null}>
        {activeProject && <ProjectModal project={activeProject} image={getImage(activeProject.image)} onClose={() => setActiveProject(null)} />}
        {activeCertificate && <CertificateModal certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />}
      </Suspense>
    </>
  )
}

export default Home
