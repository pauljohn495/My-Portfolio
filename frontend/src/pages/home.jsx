import { useCallback, useMemo, useState } from 'react'
import portfolioData from '../data/portfolioData.json'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import GitHubContributions from '../components/GitHubContributions'
import ProjectModal from '../components/ProjectModal'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import projectImage from '../assets/project.jpg'

const assetImages = {
  '../assets/project.jpg': projectImage,
}

function Home() {
  const { profile, personalProjects, socialLinks } = portfolioData
  const [activeProject, setActiveProject] = useState(null)

  const getImage = useCallback((path) => assetImages[path] || projectImage, [])
  const closeProject = useCallback(() => setActiveProject(null), [])
  const githubUrl = useMemo(
    () => socialLinks.find((link) => link.name === 'GitHub')?.url || 'https://github.com/',
    [socialLinks],
  )

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="portfolio-page page-shell">
        <aside className="profile-column" aria-label="Profile and navigation">
          <div className="profile-sticky">
            <Hero profile={profile} socialLinks={socialLinks} />
            <Navbar />
          </div>
        </aside>

        <div className="content-column">
          <main id="main-content">
            <About profile={profile} />
            <Projects projects={personalProjects} getImage={getImage} onOpen={setActiveProject} />
            <GitHubContributions githubUrl={githubUrl} />
            <Contact email={profile.email} socialLinks={socialLinks} />
          </main>
          <Footer socialLinks={socialLinks} email={profile.email} />
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} image={getImage(activeProject.image)} onClose={closeProject} />
      )}
    </>
  )
}

export default Home
