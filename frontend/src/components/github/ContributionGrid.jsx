import ContributionCell from './ContributionCell'

const weekdayLabels = [
  { label: 'Mon', row: 2 },
  { label: 'Wed', row: 4 },
  { label: 'Fri', row: 6 },
]

function ContributionGrid({ months, weeks }) {
  const days = weeks.flatMap((week) => week.contributionDays)
  const dayIndexByDate = new Map(days.map((day, index) => [day.date, index]))

  const handleCellKeyDown = (event, currentIndex) => {
    const moves = {
      ArrowRight: 7,
      ArrowLeft: -7,
      ArrowDown: 1,
      ArrowUp: -1,
      Home: -currentIndex,
      End: days.length - currentIndex - 1,
    }
    if (!(event.key in moves)) return

    event.preventDefault()
    const nextIndex = Math.min(days.length - 1, Math.max(0, currentIndex + moves[event.key]))
    document.querySelector(`[data-contribution-index="${nextIndex}"]`)?.focus()
  }

  return (
    <div className="contribution-scroll" tabIndex="0" aria-label="GitHub contribution calendar. Scroll horizontally to view all dates.">
      <div className="contribution-calendar" role="group" aria-label="GitHub contributions from the last 12 months">
        <div className="contribution-month-spacer" aria-hidden="true" />
        <div className="contribution-months" aria-hidden="true">
          {months.map((month) => (
            <span key={`${month.year}-${month.firstDay}`} style={{ gridColumn: `span ${Math.max(1, month.totalWeeks)}` }}>{month.name.slice(0, 3)}</span>
          ))}
        </div>
        <div className="contribution-weekdays" aria-hidden="true">
          {weekdayLabels.map(({ label, row }) => <span key={label} style={{ gridRow: row }}>{label}</span>)}
        </div>
        <div className="contribution-weeks">
          {weeks.map((week) => (
            <div className="contribution-week" key={week.firstDay}>
              {week.contributionDays.map((day) => {
                const index = dayIndexByDate.get(day.date)
                return <ContributionCell key={day.date} day={day} index={index} isFirst={index === 0} onKeyDown={handleCellKeyDown} />
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContributionGrid
