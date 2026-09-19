import { useEffect, useRef, useState } from 'react'
import { animate, onScroll, stagger } from 'animejs'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import GitHubContributions from './GitHubContributions'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

function Projects({ projects, getImage, onOpen, githubUrl }) {
  const carouselRef = useRef(null)
  const [carouselApi, setCarouselApi] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideCount, setSlideCount] = useState(projects.length)

  useEffect(() => {
    if (!carouselApi) return undefined
    const updateSelectedProject = () => {
      setActiveIndex(carouselApi.selectedScrollSnap())
      setSlideCount(carouselApi.scrollSnapList().length)
    }
    updateSelectedProject()
    carouselApi.on('select', updateSelectedProject)
    carouselApi.on('reInit', updateSelectedProject)
    return () => {
      carouselApi.off('select', updateSelectedProject)
      carouselApi.off('reInit', updateSelectedProject)
    }
  }, [carouselApi])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const cardsScrollObserver = onScroll({ target: carousel, enter: 'bottom-=80 top', sync: 'play', repeat: false })
    const contentScrollObserver = onScroll({ target: carousel, enter: 'bottom-=40 top', sync: 'play', repeat: false })
    const cardsAnimation = animate(carousel.querySelectorAll('.project-card'), {
      opacity: { from: 0 }, duration: 620, delay: stagger(90), ease: 'out(3)', autoplay: cardsScrollObserver,
    })
    const contentAnimation = animate(carousel.querySelectorAll('.project-card-content > *'), {
      opacity: { from: 0 }, y: { from: 16 }, duration: 520, delay: stagger(28), ease: 'out(3)', autoplay: contentScrollObserver,
    })

    return () => {
      cardsAnimation.revert()
      contentAnimation.revert()
      cardsScrollObserver.revert()
      contentScrollObserver.revert()
    }
  }, [])

  return (
    <section className="section section--surface" id="projects">
      <div className="page-shell projects-heading reveal">
        <SectionHeading eyebrow="Selected work" title="Projects I've built" copy="Academic and personal projects that reflect my progression from foundational programming to full-stack systems. Swipe or use the controls to explore." align="split" />
      </div>

      <Carousel ref={carouselRef} setApi={setCarouselApi} opts={{ align: 'start', loop: false }} className="projects-carousel page-shell">
        <div className="carousel-controls" aria-label="Project carousel controls">
          <p><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(slideCount).padStart(2, '0')}</p>
          <div><CarouselPrevious /><CarouselNext /></div>
        </div>
        <CarouselContent className="projects-track">
          {projects.map((project, index) => (
            <CarouselItem className="project-carousel-item basis-1/3" key={project.title} aria-label={`${index + 1} of ${projects.length}`}>
              <ProjectCard project={project} index={index} image={getImage(project.image)} onOpen={onOpen} isActive={index === activeIndex} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="carousel-progress" aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / slideCount) * 100}%` }} /></div>
      </Carousel>

      <GitHubContributions githubUrl={githubUrl} embedded />
    </section>
  )
}

export default Projects
