import { ArrowUpRight } from 'lucide-react'
import profileImage from '../assets/2x2.jpg'

function Hero({ profile, socialLinks }) {
  const githubUrl = socialLinks.find((link) => link.name === 'GitHub')?.url || 'https://github.com/'
  const githubUsername = githubUrl.split('/').filter(Boolean).at(-1)

  return (
    <section className="profile-intro" id="home" aria-labelledby="profile-name">
      <img className="profile-avatar" src={profileImage} alt={`${profile.name} portrait`} width="112" height="112" fetchPriority="high" />
      <div className="profile-identity">
        <h1 id="profile-name">{profile.shortName}</h1>
        <a className="profile-handle" href={githubUrl} target="_blank" rel="noreferrer">
          @{githubUsername} <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <p className="profile-role">{profile.title}</p>
      <p className="availability"><span aria-hidden="true" />Available for opportunities</p>
    </section>
  )
}

export default Hero
