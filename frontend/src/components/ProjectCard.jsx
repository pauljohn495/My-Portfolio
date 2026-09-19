import { ArrowUpRight } from 'lucide-react'

function ProjectCard({ project, index, image, onOpen }) {
  return (
    <article className="project-item">
      <button className="project-preview" type="button" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
        <img src={image} alt={`${project.title} project preview`} loading="lazy" decoding="async" width="980" height="980" />
        <span>0{index + 1}</span>
      </button>
      <div className="project-content">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <button type="button" onClick={() => onOpen(project)} aria-label={`Open ${project.title}`}><ArrowUpRight aria-hidden="true" /></button>
        </div>
        <p>{project.description}</p>
        <ul className="project-stack" aria-label={`${project.title} technology stack`}>
          {project.stack.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
      </div>
    </article>
  )
}

export default ProjectCard
