import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function CertificateModal({ certificate, onClose }) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="certificate-dialog" aria-describedby="certificate-description">
        <DialogHeader className="certificate-dialog-header">
          <p className="eyebrow">{certificate.issuer}</p>
          <DialogTitle id="certificate-title">{certificate.title}</DialogTitle>
          <DialogDescription id="certificate-description" className="sr-only">Certificate preview issued by {certificate.issuer}.</DialogDescription>
        </DialogHeader>
        <img src={certificate.resolvedImage} alt={`${certificate.title} certificate`} loading="lazy" decoding="async" />
      </DialogContent>
    </Dialog>
  )
}

export default CertificateModal
