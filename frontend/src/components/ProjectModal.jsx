import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

function ProjectModal({ project, image, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previousActive = document.activeElement
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previousActive?.focus()
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Close project details"><X aria-hidden="true" /></button>
        <div className="modal-visual"><img src={image} alt="" width="980" height="980" /><span>{project.type}</span></div>
        <div className="modal-content">
          <p className="eyebrow">Project overview</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="modal-description">{project.description}</p>
          <div className="modal-detail-grid"><div><span>My role</span><strong>{project.role}</strong></div><div><span>Project type</span><strong>{project.type}</strong></div></div>
          <div className="modal-stack"><h3>Technology stack</h3><div>{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
          <p className="modal-note">Source and live-demo links are not published in the current portfolio.</p>
        </div>
      </section>
    </div>
  )
}

export default ProjectModal
