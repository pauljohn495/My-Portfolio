import React, { useEffect, useState } from 'react'
import profile from '../assets/2x2.jpg'
import { Button } from '../components/ui/button'
import portfolioData from '../data/portfolioData.json'
import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, Mail, Moon, Sun } from 'lucide-react'


const projectImages = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', { eager: true })

const Home = () => {
  const { techStack, skillLevels, experienceTimeline, personalProjects, socialLinks, certificates } = portfolioData
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

  const certificateImage = (imagePath) => getProjectImage(imagePath)

  const borderClass = isDarkMode ? 'border-slate-700/70' : 'border-gray-100'
  const mutedTextClass = isDarkMode ? 'text-slate-400' : 'text-gray-500'
  const bodyTextClass = isDarkMode ? 'text-slate-300' : 'text-gray-600'
  const headingTextClass = isDarkMode ? 'text-slate-50' : 'text-gray-900'
  const cardClass = isDarkMode ? 'border-slate-700/70 bg-slate-800/55 shadow-sm shadow-black/20' : 'border-gray-200 bg-gray-50'
  const panelClass = isDarkMode ? 'border-slate-700/70 bg-slate-900/70' : 'border-gray-200 bg-white'
  const pillClass = isDarkMode ? 'border-slate-600/80 bg-slate-950/35 text-slate-200' : 'border-gray-300 bg-white text-gray-700'
  const softBadgeClass = isDarkMode ? 'border-sky-400/25 bg-sky-400/10 text-sky-200' : 'border-black/10 bg-black/5 text-gray-600'

  const renderProjectCard = (project) => (
    <button
      key={project.title}
      type="button"
      onClick={() => openProjectModal(project)}
      className={`group flex h-full min-h-[260px] w-full flex-col rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 focus:outline-none focus:ring-2 ${isDarkMode ? 'border-slate-700/70 bg-slate-800/55 hover:border-sky-400/35 hover:bg-slate-800 focus:ring-sky-300/40' : 'border-gray-200 bg-gray-50 focus:ring-black/20'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.25em] ${mutedTextClass}`}>{project.type}</p>
          <h2 className={`mt-2 text-base font-semibold ${headingTextClass}`}>{project.title}</h2>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${isDarkMode ? 'border-gray-600 text-gray-300 group-hover:border-sky-300 group-hover:text-sky-200' : 'border-gray-300 text-gray-600 group-hover:border-sky-500 group-hover:text-sky-700'}`}>
          View work
        </span>
      </div>

      <img
        src={getProjectImage(project.image)}
        alt={project.title}
        className={`mt-4 h-32 w-full rounded-xl border object-cover transition duration-500 group-hover:scale-[1.01] ${borderClass}`}
      />

      <p className={`mt-3 line-clamp-2 text-xs leading-5 ${bodyTextClass}`}>{project.description}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className={`rounded-full border px-2 py-1 text-[10px] font-medium ${pillClass}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </button>
  )

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#09111f] text-slate-100' : 'bg-[#f2f3f5] text-black'}`}>
      <div className="fixed inset-x-0 top-0 -z-0 h-80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/15 via-transparent to-transparent dark:from-sky-400/20" />
      <div className={`relative z-10 mx-auto w-full max-w-[1040px] border shadow-[0_24px_70px_-35px_rgba(0,0,0,0.32)] md:my-8 md:rounded-[2rem] ${isDarkMode ? 'border-slate-700/80 bg-slate-900/95 shadow-black/50' : 'border-gray-200 bg-white'}`}>
        <div className={`relative flex flex-col gap-5 border-b px-5 py-7 sm:min-h-[210px] sm:flex-row sm:items-center sm:px-8 ${isDarkMode ? 'border-slate-700/70 bg-slate-900/70' : 'border-gray-100 bg-white'} md:rounded-t-[2rem]`}>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => setIsDarkMode((current) => !current)}
            className={`absolute right-4 top-4 sm:right-6 ${isDarkMode ? 'border-slate-600 bg-slate-800 text-sky-100 hover:border-sky-300 hover:bg-sky-300 hover:text-slate-950' : 'border-black bg-white text-black hover:bg-black hover:text-white'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <img
              src={profile}
              alt="Profile"
              className="h-[116px] w-[116px] rounded-2xl border-4 border-white/80 object-cover shadow-lg shadow-black/10 dark:border-gray-700 sm:h-[148px] sm:w-[148px]"
            />
            <div className="flex flex-col justify-center text-center sm:text-left">
              <p className={`mb-1 text-[10px] font-bold uppercase tracking-[0.28em] ${isDarkMode ? 'text-sky-300' : 'text-sky-700'}`}>IT student · portfolio</p>
              <h1 className="text-3xl font-bold tracking-tight">John Paul T. Tagalog</h1>
              <p className={`mt-1 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Full-stack developer in progress</p>
              <div className="mt-2 flex items-center justify-center gap-1.5 sm:justify-start">
                <Mail className={`size-3.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <a
                  href="mailto:johnpaultagalog@gmail.com"
                  className={`text-xs transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                >
                  johnpaultagalog@gmail.com
                </a>
              </div>
              <p className={`mt-4 max-w-xl text-sm leading-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I build practical web experiences and keep sharpening my <br></br> full-stack craft, one thoughtful project at a time.
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-center gap-2 sm:absolute sm:bottom-4 sm:right-6 sm:mt-0 sm:items-end">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find me online</p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  asChild
                  variant="outline"
                  size="sm"
                  className={`${isDarkMode ? 'border-slate-600 bg-slate-800/70 text-slate-100 hover:border-sky-300 hover:bg-sky-300 hover:text-slate-950' : 'border-black bg-white text-black hover:bg-black hover:text-white'}`}
                >
                  <a href={normalizeUrl(social.url)} target="_blank" rel="noreferrer">
                    {social.name}<ArrowUpRight className="size-3" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid gap-0 border-b lg:grid-cols-[2fr_1fr] lg:grid-rows-1 ${borderClass}`}>
          <div className={`border-b p-5 lg:border-r ${borderClass}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Code2 className="size-5 text-sky-600 dark:text-sky-300" /><h1 className="text-2xl font-bold tracking-tight">Tech Stack</h1></div>
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

          <div className={`flex h-full flex-col border-b p-5 ${borderClass}`}>
            <div className="flex items-center gap-2"><BriefcaseBusiness className="size-5 text-sky-600 dark:text-sky-300" /><h1 className="text-2xl font-bold tracking-tight">Experience</h1></div>
            <div className={`mt-5 max-h-[260px] flex-1 min-h-0 space-y-6 overflow-y-auto pr-2 text-sm ${bodyTextClass}`}>
              {experienceTimeline.map((item, index) => (
                <div key={item.date} className="relative pl-6">
                  {index < experienceTimeline.length - 1 && (
                    <div className={`absolute bottom-[-1.25rem] left-[5px] top-4 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`} />
                  )}
                  <div className={`absolute left-0 top-2 h-3 w-3 rounded-full border-2 ${isDarkMode ? 'border-sky-300 bg-slate-900 shadow-[0_0_0_4px_rgba(14,165,233,0.1)]' : 'border-black bg-white'}`} />
                  <div className="ml-2">
                    <p className={`text-xs uppercase tracking-[0.2em] ${mutedTextClass}`}>{item.date}</p>
                    <p className={`mt-1 font-semibold ${headingTextClass}`}>{item.title}</p>
                    <p className={`mt-1 leading-6 ${bodyTextClass}`}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`border-b p-5 lg:border-r ${borderClass}`}>
            <h1 className="text-2xl font-bold tracking-tight">Skills</h1>
            <div className={`mt-5 space-y-5 text-sm ${bodyTextClass}`}>
              {skillLevels.map((skill) => (
                <div key={skill.title}>
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${headingTextClass}`}>{skill.title}</p>
                    <p className={`text-sm ${mutedTextClass}`}>{skill.level}%</p>
                  </div>
                  <div className={`mt-2 h-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full ${isDarkMode ? 'bg-gradient-to-r from-sky-400 to-cyan-200' : 'bg-black'}`} style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-5 ${borderClass}`}>
            <div className="flex items-center gap-2"><GraduationCap className="size-5 text-sky-600 dark:text-sky-300" /><h1 className="text-2xl font-bold tracking-tight">Certificates</h1></div>
            <div className="mt-5 space-y-3">
              {certificates.map((certificate, index) => (
                <Button
                  key={certificate.title}
                  type="button"
                  variant={index === 0 ? 'default' : 'outline'}
                  onClick={() => openCertificateModal(certificate)}
                  className={index === 0
                    ? `${isDarkMode ? 'border-sky-300 bg-sky-300 text-slate-950 shadow-lg shadow-sky-950/40 hover:bg-sky-200' : 'border-black bg-black text-white hover:bg-white hover:text-black'}`
                    : `${isDarkMode ? 'border-slate-600 bg-slate-800/70 text-slate-100 hover:border-sky-300 hover:bg-slate-800' : 'border-black bg-white text-black hover:bg-black hover:text-white'}`}
                >
                  {certificate.title}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-8 sm:px-5">
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div><p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${isDarkMode ? 'text-sky-300' : 'text-sky-700'}`}>Case studies</p><h1 className="mt-1 text-2xl font-bold tracking-tight">Personal Projects</h1></div>
            <p className={`text-sm ${mutedTextClass}`}>Click a project to explore</p>
          </div>

          <div className="mt-5 hidden sm:block">
            <div className={`h-[40rem] overflow-y-auto pr-2 ${isDarkMode ? 'scrollbar-thin scrollbar-thumb-gray-700' : ''}`}>
              <div className="grid gap-4 md:grid-cols-2">
                {personalProjects.map((project) => (
                  <div key={project.title} className="min-w-0">
                    {renderProjectCard(project)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 block sm:hidden">
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scroll-smooth">
              {personalProjects.map((project) => (
                <div key={project.title} className="w-full min-w-[14rem] shrink-0 snap-start">
                  {renderProjectCard(project)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className={`relative w-full max-w-3xl rounded-3xl border p-4 shadow-2xl sm:p-6 ${isDarkMode ? 'border-slate-700 bg-slate-900 shadow-black/60' : 'border-gray-300 bg-white'}`}>
            <button
              type="button"
              onClick={closeCertificateModal}
              className={`absolute right-4 top-4 rounded-full border p-2 transition ${isDarkMode ? 'border-slate-600 bg-slate-800 text-slate-200 hover:border-sky-300 hover:bg-slate-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'}`}
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
                src={certificateImage(activeCertificate.image)}
                alt={activeCertificate.title}
                className="max-h-[70vh] w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className={`relative w-full max-w-4xl rounded-3xl border p-4 shadow-2xl sm:p-6 ${isDarkMode ? 'border-slate-700 bg-slate-900 shadow-black/60' : 'border-gray-300 bg-white'}`}>
            <button
              type="button"
              onClick={closeProjectModal}
              className={`absolute right-4 top-4 rounded-full border p-2 transition ${isDarkMode ? 'border-slate-600 bg-slate-800 text-slate-200 hover:border-sky-300 hover:bg-slate-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'}`}
              aria-label="Close project modal"
            >
              ✕
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className={`overflow-hidden rounded-2xl border ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-300 bg-gray-100'}`}>
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
