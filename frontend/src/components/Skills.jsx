import { CodeXml } from 'lucide-react'
import { FaAws } from 'react-icons/fa6'
import {
  SiCss,
  SiExpress,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiRender,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
} from 'react-icons/si'

const technologyIcons = {
  React: [SiReact, '#61dafb'],
  JavaScript: [SiJavascript, '#f7df1e'],
  'Tailwind CSS': [SiTailwindcss, '#06b6d4'],
  'ShadCN UI': [SiShadcnui],
  HTML: [SiHtml5, '#e34f26'],
  CSS: [SiCss, '#663399'],
  FrankenUI: [CodeXml],
  'Node.js': [SiNodedotjs, '#5fa04e'],
  Express: [SiExpress],
  MongoDB: [SiMongodb, '#47a248'],
  MySQL: [SiMysql, '#4479a1'],
  PHP: [SiPhp, '#777bb4'],
  Supabase: [SiSupabase, '#3fcf8e'],
  Vercel: [SiVercel],
  Netlify: [SiNetlify, '#00c7b7'],
  AWS: [FaAws, '#ff9900'],
  Render: [SiRender, '#46e3b7'],
  GitHub: [SiGithub],
}

function Skills({ techStack }) {
  return (
    <section className="about-subsection technologies-block" aria-labelledby="technologies-title">
      <p className="section-label">Toolkit</p>
      <h3 id="technologies-title">Technologies I work with</h3>
      <div className="technology-groups">
        {Object.entries(techStack).map(([category, items]) => (
          <div className="technology-group" key={category}>
            <h4>{category}</h4>
            <ul>
              {items.map((item) => {
                const [TechnologyIcon = CodeXml, brandColor] = technologyIcons[item] || []
                return (
                  <li key={item} title={item} style={brandColor ? { '--tech-color': brandColor } : undefined}>
                    <TechnologyIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
