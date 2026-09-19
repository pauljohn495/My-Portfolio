import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ProjectCard from './ProjectCard'

function Projects({ projects, getImage, onOpen }) {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, 2)

  return (
    <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading-row">
        <div>
          <p className="section-label">Selected work</p>
          <h2 id="projects-title">Recent Projects</h2>
        </div>
        {projects.length > 2 && (
          <button className="text-link" type="button" onClick={() => setShowAll((current) => !current)} aria-expanded={showAll}>
            {showAll ? 'Show less' : 'See all'} <ArrowRight aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            image={getImage(project.image)}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects
