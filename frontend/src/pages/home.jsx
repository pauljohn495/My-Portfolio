import React, { useState } from 'react'
import profile from '../assets/2x2.jpg'
import { Button } from '../components/ui/button'
import portfolioData from '../data/portfolioData.json'

const projectImages = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', { eager: true })

const Home = () => {
  const { techStack, skillLevels, experienceTimeline, personalProjects } = portfolioData
  const [activeProject, setActiveProject] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const frontendTech = techStack.frontend
  const backendTech = techStack.backend
  const cloudTech = techStack.cloud

  const getProjectImage = (imagePath) =>
    projectImages[imagePath]?.default || projectImages['../assets/project.jpg']?.default

  const openProjectModal = (project) => {
    setActiveProject(project)
    setActiveImageIndex(0)
  }

  const closeProjectModal = () => {
    setActiveProject(null)
    setActiveImageIndex(0)
  }

  const projectGallery = activeProject?.images?.length
    ? activeProject.images.map((imagePath) => getProjectImage(imagePath))
    : [getProjectImage(activeProject?.image)]

  return (
    <div className="bg-[#f5f5f5] font-sans text-black">
      <div className="mx-auto w-[900px] bg-white">
        <div className="flex h-[180px] items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-6">
            <img
              src={profile}
              alt="Profile"
              className="h-[150px] w-[150px] rounded-2xl border border-gray-100 object-cover"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold">John Paul T. Tagalog</h1>
              <p className="text-sm text-gray-500">Programmer</p>
              <p className="mt-4 max-w-xl text-center text-sm text-gray-700">
                I am an IT student focused on building <br></br> web apps and improving my full-stack skills.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-black bg-white text-black hover:bg-black hover:text-white">
              Download CV
            </Button>
            <Button variant="secondary" size="sm" className="border-black bg-black text-white hover:bg-white hover:text-black">
              Contact
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr] grid-rows-1 border-b border-gray-100">
          <div className="border-r border-b border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Tech Stack</h1>
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                Core tools
              </span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-gray-600">
              {[
                { title: 'Frontend', items: frontendTech, accent: 'from-sky-500/15 to-cyan-500/10' },
                { title: 'Backend', items: backendTech, accent: 'from-violet-500/15 to-fuchsia-500/10' },
                { title: 'DevOps & Cloud', items: cloudTech, accent: 'from-emerald-500/15 to-lime-500/10' },
              ].map((category) => (
                <div
                  key={category.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{category.title}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                      {category.items.length} tools
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row-span-1 flex h-full flex-col border-b border-gray-100 p-5">
            <h1 className="text-2xl font-bold">Experience</h1>
            <div className="mt-5 max-h-[260px] flex-1 min-h-0 space-y-6 overflow-y-auto pr-2 text-sm text-gray-700">
              {experienceTimeline.map((item, index) => (
                <div key={item.date} className="relative pl-6">
                  {index < experienceTimeline.length - 1 && (
                    <div className="absolute bottom-[-1.25rem] left-[5px] top-4 w-px bg-gray-300" />
                  )}
                  <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-black bg-white" />
                  <div className="ml-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.date}</p>
                    <p className="mt-1 font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 leading-6 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-r border-gray-100 p-5">
            <h1 className="text-2xl font-bold">Skills</h1>
            <div className="mt-5 space-y-5 text-sm text-gray-700">
              {skillLevels.map((skill) => (
                <div key={skill.title}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{skill.title}</p>
                    <p className="text-sm text-gray-500">{skill.level}%</p>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-black" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row-span-1 border-gray-100 p-5">
            <h1 className="text-2xl font-bold">Certificates</h1>
            <div className="mt-5 space-y-3">
              <Button asChild className="border-black bg-black text-white hover:bg-white hover:text-black">
                <a href="#" target="_blank" rel="noreferrer">Example certificate link</a>
              </Button>
              <Button variant="outline" asChild className="border-black bg-white text-black hover:bg-black hover:text-white">
                <a href="#" target="_blank" rel="noreferrer">Example credential preview</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="px-5 pb-8">
          <div className="mt-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Personal Projects</h1>
            <p className="text-sm text-gray-500">Selected work</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {personalProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => openProjectModal(project)}
                className="rounded-2xl border border-gray-300 bg-gray-50 p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{project.type}</p>
                    <h2 className="mt-2 text-lg font-semibold text-gray-900">{project.title}</h2>
                  </div>
                  <span className="rounded-full border border-black bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Featured
                  </span>
                </div>

                <img
                  src={getProjectImage(project.image)}
                  alt={project.title}
                  className="mt-4 h-40 w-full rounded-xl border border-gray-200 object-cover"
                />

                <p className="mt-3 text-sm leading-6 text-gray-600">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="relative w-full max-w-4xl rounded-3xl border border-gray-300 bg-white p-4 shadow-2xl sm:p-6">
            <button
              type="button"
              onClick={closeProjectModal}
              className="absolute right-4 top-4 rounded-full border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-100"
              aria-label="Close project modal"
            >
              ✕
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="overflow-hidden rounded-2xl border border-gray-300 bg-gray-100">
                  <img
                    src={projectGallery[activeImageIndex]}
                    alt={`${activeProject.title} preview ${activeImageIndex + 1}`}
                    className="h-72 w-full object-cover sm:h-80"
                  />
                </div>

                {projectGallery.length > 1 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {projectGallery.map((image, index) => (
                      <button
                        key={`${activeProject.title}-${index}`}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`overflow-hidden rounded-xl border-2 ${activeImageIndex === index ? 'border-black' : 'border-gray-200'}`}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="h-16 w-20 object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{activeProject.type}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-gray-900">{activeProject.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-gray-600">{activeProject.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-gray-300 bg-white px-3 py-1 text-[11px] font-medium text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {projectGallery.length > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((current) =>
                          current === 0 ? projectGallery.length - 1 : current - 1
                        )
                      }
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((current) =>
                          current === projectGallery.length - 1 ? 0 : current + 1
                        )
                      }
                      className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
