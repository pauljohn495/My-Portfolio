import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

function Journey({ timeline, certificates, getImage, onCertificateOpen }) {
  return (
    <section className="section" id="experience">
      <div className="page-shell reveal">
        <SectionHeading eyebrow="My journey" title="From fundamentals to full-stack" copy="A chronological view of the academic projects and technical milestones that shaped my development path." align="split" />
        <div className="journey-grid">
          <div className="timeline">
            {timeline.map((item, index) => (
              <article className="timeline-item" key={`${item.date}-${item.title}`}>
                <div className="timeline-marker"><span>0{timeline.length - index}</span></div>
                <div><time>{item.date}</time><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
          <aside className="credentials" aria-labelledby="credentials-title">
            <p className="eyebrow">Credentials</p><h3 id="credentials-title">Certificates and achievements</h3><p>Certificates earned across different fields through coursework, training, and continuous learning.</p>
            <div className="certificate-list">
              {certificates.map((certificate) => (
                <button key={certificate.title} type="button" onClick={() => onCertificateOpen({ ...certificate, resolvedImage: getImage(certificate.image) })}>
                  <span><small>{certificate.issuer}</small>{certificate.title}</span><ArrowUpRight aria-hidden="true" />
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Journey
