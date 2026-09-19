import { ArrowRight } from 'lucide-react'
import ProjectCard from './ProjectCard'

function Projects({ projects, getImage, onOpen, preview = false, onViewAll, children }) {
  const visibleProjects = preview ? projects.slice(0, 2) : projects

  return (
    <section className="content-section projects-section" id={preview ? 'recent-projects' : 'projects'} aria-labelledby={preview ? 'recent-projects-title' : 'projects-title'}>
      <div className="section-heading-row">
        <div>
          <p className="section-label">Selected work</p>
          <h2 id={preview ? 'recent-projects-title' : 'projects-title'}>{preview ? 'Recent Projects' : 'Projects'}</h2>
        </div>
        {preview && (
          <button className="text-link" type="button" onClick={onViewAll}>
            See all <ArrowRight aria-hidden="true" />
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
      {children}
    </section>
  )
}

export default Projects
