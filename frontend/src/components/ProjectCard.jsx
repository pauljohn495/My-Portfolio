import { ArrowUpRight } from 'lucide-react'

function ProjectCard({ project, index, image, onOpen }) {
  return (
    <article className={`project-card ${project.featured ? 'project-card--featured' : ''}`}>
      <button className="project-visual" type="button" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
        <img src={image} alt="" loading="lazy" width="980" height="980" />
        <span className="project-number">0{index + 1}</span>
        {project.featured && <span className="featured-badge">Featured project</span>}
        <span className="project-visual-title">{project.title}</span>
      </button>
      <div className="project-info">
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-meta"><span>Role</span><strong>{project.role}</strong></div>
        <div className="project-stack" aria-label="Technology stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <button className="text-link" type="button" onClick={() => onOpen(project)}>View project <ArrowUpRight aria-hidden="true" /></button>
      </div>
    </article>
  )
}

export default ProjectCard
