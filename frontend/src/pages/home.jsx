import React, { useEffect, useState } from 'react'
import profile from '../assets/2x2.jpg'
import { Button } from '../components/ui/button'
import portfolioData from '../data/portfolioData.json'
import ccna from '../assets/introduction.jpeg'
import ccna2 from '../assets/routing.jpeg'


const projectImages = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', { eager: true })

const Home = () => {
  const { techStack, skillLevels, experienceTimeline, personalProjects, socialLinks } = portfolioData
  const [activeProject, setActiveProject] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false

    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme) return savedTheme === 'dark'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light'
    window.localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

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

  const openCertificateModal = (certificate) => {
    setActiveCertificate(certificate)
  }

  const closeCertificateModal = () => {
    setActiveCertificate(null)
  }

  const projectGallery = activeProject?.images?.length
    ? activeProject.images.map((imagePath) => getProjectImage(imagePath))
    : [getProjectImage(activeProject?.image)]

  const normalizeUrl = (url) => {
    if (!url) return '#'
    return /^https?:\/\//i.test(url) ? url : `https://${url}`
  }

  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-100'
  const mutedTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-500'
  const bodyTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const headingTextClass = isDarkMode ? 'text-gray-100' : 'text-gray-900'
  const cardClass = isDarkMode ? 'border-gray-700 bg-[#222222]' : 'border-gray-200 bg-gray-50'
  const panelClass = isDarkMode ? 'border-gray-700 bg-[#1f1f1f]' : 'border-gray-200 bg-white'
  const pillClass = isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-200' : 'border-gray-300 bg-white text-gray-700'
  const softBadgeClass = isDarkMode ? 'border-gray-600 bg-gray-800/80 text-gray-300' : 'border-black/10 bg-black/5 text-gray-600'

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-gray-100' : 'bg-[#f5f5f5] text-black'}`}>
      <div className={`mx-auto w-[900px] border shadow-sm ${isDarkMode ? 'border-gray-700 bg-[#181818]' : 'border-gray-200 bg-white'}`}>
        <div className={`relative flex h-[180px] items-center justify-between border-b px-6 ${isDarkMode ? 'border-gray-700 bg-[#181818]' : 'border-gray-100 bg-white'}`}>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setIsDarkMode((current) => !current)}
            className={`absolute right-6 top-4 ${isDarkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black bg-white text-black hover:bg-black hover:text-white'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Button>
          <div className="flex items-center gap-6">
            <img
              src={profile}
              alt="Profile"
              className="h-[150px] w-[150px] rounded-2xl border border-gray-100 object-cover"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold">John Paul T. Tagalog</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Programmer</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>✉️</span>
                <a
                  href="mailto:johnpaultagalog@gmail.com"
                  className={`text-xs transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                >
                  johnpaultagalog@gmail.com
                </a>
              </div>
              <p className={`mt-4 max-w-xl text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I am an IT student focused on building <br></br> web apps and improving my full-stack skills.
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 right-6 flex flex-col items-end gap-2">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Social</p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  asChild
                  variant="outline"
                  size="sm"
                  className={`${isDarkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black bg-white text-black hover:bg-black hover:text-white'}`}
                >
                  <a href={normalizeUrl(social.url)} target="_blank" rel="noreferrer">
                    {social.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-[2fr_1fr] grid-rows-1 border-b ${borderClass}`}>
          <div className={`border-r border-b p-5 ${borderClass}`}>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Tech Stack</h1>
              <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] ${softBadgeClass}`}>
                Core tools
              </span>
            </div>
            <div className={`mt-5 grid gap-3 text-sm ${bodyTextClass}`}>
              {[
                { title: 'Frontend', items: frontendTech, accent: 'from-sky-500/15 to-cyan-500/10' },
                { title: 'Backend', items: backendTech, accent: 'from-violet-500/15 to-fuchsia-500/10' },
                { title: 'DevOps & Cloud', items: cloudTech, accent: 'from-emerald-500/15 to-lime-500/10' },
              ].map((category) => (
                <div
                  key={category.title}
                  className={`rounded-2xl border p-4 shadow-sm ${cardClass}`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-semibold ${headingTextClass}`}>{category.title}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${mutedTextClass}`}>
                      {category.items.length} tools
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full border px-3 py-1 text-xs font-medium shadow-sm ${pillClass}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`row-span-1 flex h-full flex-col border-b p-5 ${borderClass}`}>
            <h1 className="text-2xl font-bold">Experience</h1>
            <div className={`mt-5 max-h-[260px] flex-1 min-h-0 space-y-6 overflow-y-auto pr-2 text-sm ${bodyTextClass}`}>
              {experienceTimeline.map((item, index) => (
                <div key={item.date} className="relative pl-6">
                  {index < experienceTimeline.length - 1 && (
                    <div className={`absolute bottom-[-1.25rem] left-[5px] top-4 w-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                  )}
                  <div className={`absolute left-0 top-2 h-3 w-3 rounded-full border-2 ${isDarkMode ? 'border-gray-200 bg-[#1f1f1f]' : 'border-black bg-white'}`} />
                  <div className="ml-2">
                    <p className={`text-xs uppercase tracking-[0.2em] ${mutedTextClass}`}>{item.date}</p>
                    <p className={`mt-1 font-semibold ${headingTextClass}`}>{item.title}</p>
                    <p className={`mt-1 leading-6 ${bodyTextClass}`}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`border-r p-5 ${borderClass}`}>
            <h1 className="text-2xl font-bold">Skills</h1>
            <div className={`mt-5 space-y-5 text-sm ${bodyTextClass}`}>
              {skillLevels.map((skill) => (
                <div key={skill.title}>
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${headingTextClass}`}>{skill.title}</p>
                    <p className={`text-sm ${mutedTextClass}`}>{skill.level}%</p>
                  </div>
                  <div className={`mt-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`row-span-1 p-5 ${borderClass}`}>
            <h1 className="text-2xl font-bold">Certificates</h1>
            <div className="mt-5 space-y-3">
              <Button
                type="button"
                onClick={() => openCertificateModal({ title: 'CCNA: Introduction to Networks', image: ccna })}
                className={`${isDarkMode ? 'border-white bg-white text-black hover:bg-black hover:text-white' : 'border-black bg-black text-white hover:bg-white hover:text-black'}`}
              >
                CCNA: Introduction to Networks
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => openCertificateModal({ title: 'CCNA: Switching, Routing', image: ccna2 })}
                className={`${isDarkMode ? 'border-white bg-[#1f1f1f] text-white hover:bg-white hover:text-black' : 'border-black bg-white text-black hover:bg-black hover:text-white'}`}
              >
                CCNA: Switching, Routing
              </Button>
            </div>
          </div>
        </div>

        <div className="px-5 pb-8">
          <div className="mt-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Personal Projects</h1>
            <p className={`text-sm ${mutedTextClass}`}>Selected work</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {personalProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => openProjectModal(project)}
                className={`rounded-2xl border p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'border-gray-700 bg-[#222222] focus:ring-gray-500' : 'border-gray-300 bg-gray-50 focus:ring-black/20'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.25em] ${mutedTextClass}`}>{project.type}</p>
                    <h2 className={`mt-2 text-lg font-semibold ${headingTextClass}`}>{project.title}</h2>
                  </div>
                  <span className="rounded-full border border-black bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Featured
                  </span>
                </div>

                <img
                  src={getProjectImage(project.image)}
                  alt={project.title}
                  className={`mt-4 h-40 w-full rounded-xl border object-cover ${borderClass}`}
                />

                <p className={`mt-3 text-sm leading-6 ${bodyTextClass}`}>{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${pillClass}`}
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

      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className={`relative w-full max-w-3xl rounded-3xl border p-4 shadow-2xl sm:p-6 ${isDarkMode ? 'border-gray-700 bg-[#1f1f1f]' : 'border-gray-300 bg-white'}`}>
            <button
              type="button"
              onClick={closeCertificateModal}
              className={`absolute right-4 top-4 rounded-full border p-2 transition ${isDarkMode ? 'border-gray-600 bg-[#2a2a2a] text-gray-200 hover:bg-gray-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'}`}
              aria-label="Close certificate modal"
            >
              ✕
            </button>
            <div className="space-y-4">
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${mutedTextClass}`}>Certificate</p>
                <h2 className={`mt-2 text-2xl font-semibold ${headingTextClass}`}>{activeCertificate.title}</h2>
              </div>
              <img
                src={activeCertificate.image}
                alt={activeCertificate.title}
                className="max-h-[70vh] w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className={`relative w-full max-w-4xl rounded-3xl border p-4 shadow-2xl sm:p-6 ${isDarkMode ? 'border-gray-700 bg-[#1f1f1f]' : 'border-gray-300 bg-white'}`}>
            <button
              type="button"
              onClick={closeProjectModal}
              className={`absolute right-4 top-4 rounded-full border p-2 transition ${isDarkMode ? 'border-gray-600 bg-[#2a2a2a] text-gray-200 hover:bg-gray-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'}`}
              aria-label="Close project modal"
            >
              ✕
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className={`overflow-hidden rounded-2xl border ${isDarkMode ? 'border-gray-700 bg-[#2a2a2a]' : 'border-gray-300 bg-gray-100'}`}>
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
                        className={`overflow-hidden rounded-xl border-2 ${activeImageIndex === index ? (isDarkMode ? 'border-white' : 'border-black') : (isDarkMode ? 'border-gray-700' : 'border-gray-200')}`}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="h-16 w-20 object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className={`text-[10px] uppercase tracking-[0.25em] ${mutedTextClass}`}>{activeProject.type}</p>
                  <h2 className={`mt-2 text-2xl font-semibold ${headingTextClass}`}>{activeProject.title}</h2>
                  <p className={`mt-4 text-sm leading-7 ${bodyTextClass}`}>{activeProject.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-3 py-1 text-[11px] font-medium ${pillClass}`}
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
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isDarkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-100'}`}
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
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
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
