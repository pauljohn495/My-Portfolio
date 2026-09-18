import { ArrowUpRight } from 'lucide-react'

function ProjectCard({ project, index, image, onOpen, isActive }) {
  return (
    <article className={`project-slide ${isActive ? 'is-active' : ''}`} style={{ '--card-index': index }}>
      <button className="project-card" type="button" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
        <span className="project-card-visual">
          <img src={image} alt="" loading="lazy" width="980" height="980" />
          <span className="project-number">0{index + 1}</span>
          {project.featured && <span className="featured-badge">Featured</span>}
          <span className="visual-watermark">{project.type}</span>
        </span>
        <span className="project-card-content">
          <span className="project-kicker"><b>0{index + 1}</b>{project.type}<i aria-hidden="true" />{project.featured ? 'Priority work' : 'Project'}</span>
          <strong className="project-title">{project.title}</strong>
          <span className="project-description">{project.description}</span>
          <span className="project-stack" aria-label="Technology stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</span>
          <span className="project-card-link">View project <ArrowUpRight aria-hidden="true" /></span>
        </span>
      </button>
    </article>
  )
}

export default ProjectCard
