import { Braces, CloudCog, Database } from 'lucide-react'
import SectionHeading from './SectionHeading'

const categoryIcons = [Braces, Database, CloudCog]

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
                <div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
