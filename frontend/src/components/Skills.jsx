import { Braces, CloudCog, CodeXml, Database } from 'lucide-react'
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
import SectionHeading from './SectionHeading'
import { Badge } from '@/components/ui/badge'

const categoryIcons = [Braces, Database, CloudCog]
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
    <section className="section" id="skills">
      <div className="page-shell reveal">
        <SectionHeading eyebrow="My skills" title="Technologies I work with" copy="A growing toolkit shaped by coursework and hands-on project development." align="split" />
        <div className="skill-list">
          {Object.entries(techStack).map(([category, items], index) => {
            const Icon = categoryIcons[index]
            return (
              <div className="skill-row" key={category}>
                <div className="skill-category"><span className="skill-icon"><Icon aria-hidden="true" /></span><div><small>0{index + 1}</small><h3>{category}</h3></div></div>
                <div className="skill-tags">
                  {items.map((item) => {
                    const [TechnologyIcon = CodeXml, brandColor] = technologyIcons[item] || []
                    return (
                      <Badge
                        variant="outline"
                        className="tech-badge"
                        style={brandColor ? { '--tech-color': brandColor } : undefined}
                        title={item}
                        key={item}
                      >
                        <TechnologyIcon aria-hidden="true" />
                        <span>{item}</span>
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
