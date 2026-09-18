import { useEffect, useRef, useState } from 'react'
import { animate, onScroll, stagger } from 'animejs'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'

function Projects({ projects, getImage, onOpen }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const cardsScrollObserver = onScroll({ target: track, enter: 'bottom-=80 top', sync: 'play', repeat: false })
    const contentScrollObserver = onScroll({ target: track, enter: 'bottom-=40 top', sync: 'play', repeat: false })

    const cardsAnimation = animate(track.querySelectorAll('.project-card'), {
      opacity: { from: 0 },
      duration: 620,
      delay: stagger(90),
      ease: 'out(3)',
      autoplay: cardsScrollObserver,
    })

    const contentAnimation = animate(track.querySelectorAll('.project-card-content > *'), {
      opacity: { from: 0 },
      y: { from: 16 },
      duration: 520,
      delay: stagger(28),
      ease: 'out(3)',
      autoplay: contentScrollObserver,
    })

    return () => {
      cardsAnimation.revert()
      contentAnimation.revert()
      cardsScrollObserver.revert()
      contentScrollObserver.revert()
    }
  }, [])

  const scrollToProject = (index) => {
    const nextIndex = Math.max(0, Math.min(projects.length - 1, index))
    const track = trackRef.current
    const card = track?.children[nextIndex]
    const firstCard = track?.children[0]
    if (track && card && firstCard) track.scrollTo({ left: card.offsetLeft - firstCard.offsetLeft, behavior: 'smooth' })
    setActiveIndex(nextIndex)
  }

  const updateActiveProject = () => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children)
    const firstCard = cards[0]
    if (!firstCard) return
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
    const closestIndex = Math.round(track.scrollLeft / (firstCard.offsetWidth + gap))
    setActiveIndex(Math.max(0, Math.min(projects.length - 1, closestIndex)))
  }

  return (
    <section className="section section--surface" id="projects">
      <div className="page-shell projects-heading reveal">
        <SectionHeading eyebrow="Selected work" title="Projects I’ve built" copy="Academic and personal projects that reflect my progression from foundational programming to full-stack systems. Scroll sideways to explore." align="split" />
        <div className="carousel-controls" aria-label="Project carousel controls">
          <p><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(projects.length).padStart(2, '0')}</p>
          <div>
            <button type="button" onClick={() => scrollToProject(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous project"><ArrowLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => scrollToProject(activeIndex + 1)} disabled={activeIndex === projects.length - 1} aria-label="Next project"><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <div className="projects-carousel">
        <div className="projects-track" ref={trackRef} onScroll={updateActiveProject} tabIndex="0" aria-label="Scrollable project list">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} image={getImage(project.image)} onOpen={onOpen} isActive={index === activeIndex} />)}
        </div>
        <div className="carousel-progress page-shell" aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} /></div>
      </div>
    </section>
  )
}

export default Projects
