import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

function ProjectCard({ project, index, image, onOpen, isActive }) {
  return (
    <article className={`project-slide ${isActive ? 'is-active' : ''}`} style={{ '--card-index': index }}>
      <Card className="project-card">
        <span className="project-card-visual">
          <img src={image} alt={`${project.title} project preview`} loading="lazy" decoding="async" width="980" height="980" />
          <span className="project-number">0{index + 1}</span>
          {project.featured && <Badge className="featured-badge">Featured</Badge>}
          <span className="visual-watermark">{project.type}</span>
        </span>
        <CardContent className="project-card-content">
          <span className="project-kicker"><b>0{index + 1}</b>{project.type}<i aria-hidden="true" />{project.featured ? 'Priority work' : 'Project'}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-stack" aria-label="Technology stack">{project.stack.map((tech) => <Badge variant="outline" className="project-badge" key={tech}>{tech}</Badge>)}</div>
        </CardContent>
        <CardFooter className="project-card-footer">
          <Button type="button" variant="ghost" className="project-card-link" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
            View project <ArrowUpRight aria-hidden="true" />
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}

export default ProjectCard
