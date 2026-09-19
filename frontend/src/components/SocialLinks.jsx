import { Code2, Globe2, Mail, Network } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const icons = {
  GitHub: Code2,
  LinkedIn: Network,
  Facebook: Globe2,
  Email: Mail,
}

function SocialLinks({ links, email, className = '' }) {
  const items = email ? [...links, { name: 'Email', url: `mailto:${email}` }] : links

  return (
    <div className={`social-icon-links ${className}`} aria-label="Social links">
      {items.map((link) => {
        const Icon = icons[link.name] || Code2
        const external = !link.url.startsWith('mailto:')
        return (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" className="social-icon-button">
                <a href={link.url} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={link.name}>
                  <Icon aria-hidden="true" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>{link.name}</TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}

export default SocialLinks
