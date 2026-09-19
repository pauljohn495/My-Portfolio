function ContributionStats({ totalContributions, publicRepositories, followers }) {
  const stats = [
    ['Contributions', totalContributions],
    ['Public repositories', publicRepositories],
    ['Followers', followers],
  ]

  return (
    <dl className="github-stats" aria-label="GitHub statistics">
      {stats.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{Number(value).toLocaleString()}</dd>
        </div>
      ))}
    </dl>
  )
}

export default ContributionStats
