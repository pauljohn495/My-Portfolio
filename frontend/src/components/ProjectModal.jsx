import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function ProjectModal({ project, image, onClose }) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="project-dialog" aria-describedby="project-modal-description">
        <div className="modal-visual"><img src={image} alt="" width="980" height="980" /><span>{project.type}</span></div>
        <div className="modal-content">
          <DialogHeader className="project-dialog-header">
            <p className="eyebrow">Project overview</p>
            <DialogTitle id="project-modal-title">{project.title}</DialogTitle>
            <DialogDescription id="project-modal-description" className="modal-description">{project.description}</DialogDescription>
          </DialogHeader>
          <div className="modal-detail-grid"><div><span>My role</span><strong>{project.role}</strong></div><div><span>Project type</span><strong>{project.type}</strong></div></div>
          <div className="modal-stack"><h3>Technology stack</h3><div>{project.stack.map((tech) => <Badge variant="outline" className="project-badge" key={tech}>{tech}</Badge>)}</div></div>
          <p className="modal-note">Source and live-demo links are not published in the current portfolio.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
