import SectionHeading from './SectionHeading'

const steps = [
  ['Understand', 'Clarify the problem, users, and core requirements.'],
  ['Design', 'Shape a clear flow and a focused interface.'],
  ['Develop', 'Build the system with practical, maintainable tools.'],
  ['Test', 'Check behavior, responsiveness, and usability.'],
  ['Improve', 'Refine the result through feedback and learning.'],
]

function Process() {
  return (
    <section className="section section--surface process-section">
      <div className="page-shell reveal">
        <SectionHeading eyebrow="How I build" title="A practical development process" />
        <div className="process-grid">
          {steps.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  )
}

export default Process
