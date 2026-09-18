function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'split' ? 'section-heading--split' : ''}`}>
      <div><p className="eyebrow">/ {eyebrow}</p><h2>{title}</h2></div>
      {copy && <p className="section-intro">{copy}</p>}
    </div>
  )
}

export default SectionHeading
