import { ArrowUpRight } from 'lucide-react'

function Credentials({ certificates, getImage, onOpen }) {
  return (
    <section className="about-subsection credentials-block" aria-labelledby="credentials-title">
      <p className="section-label">Credentials</p>
      <h3 id="credentials-title">Certificates and achievements</h3>
      <p>Coursework, training, and certificates from the different fields I continue to explore.</p>
      <div className="credential-list">
        {certificates.map((certificate) => (
          <button
            key={certificate.title}
            type="button"
            onClick={() => onOpen({ ...certificate, resolvedImage: getImage(certificate.image) })}
          >
            <span><small>{certificate.issuer}</small>{certificate.title}</span>
            <ArrowUpRight aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  )
}

export default Credentials
