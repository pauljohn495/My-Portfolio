import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import SectionHeading from './SectionHeading'
import ContributionGrid from './github/ContributionGrid'
import ContributionStats from './github/ContributionStats'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
    <Card className="github-card github-card--loading" aria-label="Loading GitHub activity" aria-busy="true">
      <CardContent>
        <div className="github-skeleton-stats">
          {[1, 2, 3].map((item) => <Skeleton className="github-stat-skeleton" key={item} />)}
        </div>
        <Skeleton className="github-calendar-skeleton" />
      </CardContent>
    </Card>
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
        console.error('Unable to display GitHub activity.', error)
        setStatus('error')
      }
    }

    loadActivity()
    return () => controller.abort()
  }, [])

  return (
    <section className="section github-section" id="github-activity" aria-labelledby="github-activity-title">
      <div className="page-shell github-activity-shell reveal">
        <div className="github-heading">
          <SectionHeading eyebrow="Open source" title="GitHub Activity" copy="A snapshot of what I’ve been building and contributing to." />
          <Button asChild variant="outline" className="github-link-button">
            <a href={activity?.profileUrl || githubUrl} target="_blank" rel="noreferrer">View GitHub <ExternalLink aria-hidden="true" /></a>
          </Button>
        </div>

        {status === 'loading' && <GitHubActivitySkeleton />}

        {status === 'success' && activity && (
          <Card className="github-card">
            <CardContent>
              <div className="github-card-header">
                <div className="github-profile-label"><SiGithub aria-hidden="true" /><span>@{activity.username}</span></div>
                <ContributionStats
                  totalContributions={activity.totalContributions}
                  publicRepositories={activity.publicRepositories}
                  followers={activity.followers}
                />
              </div>
              <ContributionGrid months={activity.months} weeks={activity.weeks} />
              <div className="github-card-footer">
                <p>{activity.totalContributions.toLocaleString()} contributions in the last year</p>
                <ContributionLegend />
              </div>
            </CardContent>
          </Card>
        )}

        {status === 'error' && (
          <Card className="github-card github-card--fallback" role="status">
            <CardContent>
              <SiGithub aria-hidden="true" />
              <div><h3>Activity is taking a short break.</h3><p>The contribution calendar could not be loaded, but my GitHub profile is still available.</p></div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

export default GitHubContributions
