import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'

function Projects({ projects, getImage, onOpen }) {
  return (
    <section className="section section--surface" id="projects">
      <div className="page-shell reveal">
        <SectionHeading eyebrow="Selected work" title="Projects I’ve built" copy="Academic and personal projects that reflect my progression from foundational programming to full-stack systems." align="split" />
        <div className="projects-list">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} image={getImage(project.image)} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  )
}

export default Projects
