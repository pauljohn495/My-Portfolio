import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const contributionLevels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

function ContributionCell({ day, index, isFirst, onKeyDown }) {
  const contributionLabel = `${day.contributionCount} ${day.contributionCount === 1 ? 'contribution' : 'contributions'}`
  const formattedDate = dateFormatter.format(new Date(`${day.date}T00:00:00Z`))
  const accessibleLabel = `${contributionLabel} on ${formattedDate}.`

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="contribution-cell"
          type="button"
          data-level={contributionLevels[day.contributionLevel] ?? 0}
          data-contribution-index={index}
          tabIndex={isFirst ? 0 : -1}
          aria-label={accessibleLabel}
          onKeyDown={(event) => onKeyDown(event, index)}
        />
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={7} className="contribution-tooltip">
        <strong>{formattedDate}</strong>
        <span>{contributionLabel}</span>
      </TooltipContent>
    </Tooltip>
  )
}

export default ContributionCell
