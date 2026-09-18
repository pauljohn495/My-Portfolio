import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

function CertificateModal({ certificate, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title">
        <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Close certificate"><X aria-hidden="true" /></button>
        <p className="eyebrow">{certificate.issuer}</p><h2 id="certificate-title">{certificate.title}</h2>
        <img src={certificate.resolvedImage} alt={certificate.title} />
      </section>
    </div>
  )
}

export default CertificateModal
