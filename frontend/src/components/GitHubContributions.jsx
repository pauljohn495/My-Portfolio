import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import ContributionGrid from './github/ContributionGrid'
import { Skeleton } from '@/components/ui/skeleton'

function ContributionLegend() {
  return (
    <div className="contribution-legend" aria-label="Contribution intensity from less to more">
      <span>Less</span>
      {[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} aria-hidden="true" />)}
      <span>More</span>
    </div>
  )
}

function GitHubActivitySkeleton() {
  return (
    <div className="github-frame github-frame--loading" aria-label="Loading GitHub activity" aria-busy="true">
      <Skeleton className="github-summary-skeleton" />
      <Skeleton className="github-calendar-skeleton" />
    </div>
  )
}

function GitHubContributions({ githubUrl }) {
  const [activity, setActivity] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    const loadActivity = async () => {
      try {
        const response = await fetch('/api/github-contributions', { signal: controller.signal })
        if (!response.ok) throw new Error(`GitHub activity request failed with status ${response.status}.`)
        const data = await response.json()
        setActivity(data)
        setStatus('success')
      } catch (error) {
        if (error.name === 'AbortError') return
        setStatus('error')
      }
    }

    loadActivity()
    return () => controller.abort()
  }, [])

  return (
    <section className="github-section" id="github-activity" aria-labelledby="github-activity-title">
      <div className="section-heading-row github-heading">
        <div>
          <p className="section-label">Open source</p>
          <h2 id="github-activity-title">GitHub Activity</h2>
          <p className="section-description">A look at what I’ve been building lately.</p>
        </div>
        <a className="text-link" href={activity?.profileUrl || githubUrl} target="_blank" rel="noreferrer">
          View GitHub <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      {status === 'loading' && <GitHubActivitySkeleton />}

      {status === 'success' && activity && (
        <div className="github-frame">
          <div className="github-summary">
            <span><SiGithub aria-hidden="true" /> @{activity.username}</span>
            <strong>{activity.totalContributions.toLocaleString()} contributions in the last year</strong>
          </div>
          <ContributionGrid months={activity.months} weeks={activity.weeks} />
          <div className="github-footer"><ContributionLegend /></div>
        </div>
      )}

      {status === 'error' && (
        <div className="github-frame github-fallback" role="status">
          <SiGithub aria-hidden="true" />
          <div><h3>Activity is taking a short break.</h3><p>The contribution calendar could not be loaded, but my GitHub profile is still available.</p></div>
        </div>
      )}
    </section>
  )
}

export default GitHubContributions
