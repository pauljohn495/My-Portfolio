const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'
const ONE_DAY = 24 * 60 * 60 * 1000

const contributionQuery = `
  query PortfolioContributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      login
      url
      followers { totalCount }
      repositories(privacy: PUBLIC) { totalCount }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          months {
            name
            year
            firstDay
            totalWeeks
          }
          weeks {
            firstDay
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME

  if (!token || !username) {
    console.error('GitHub contributions API is missing GITHUB_TOKEN or GITHUB_USERNAME.')
    return response.status(503).json({ error: 'GitHub activity is temporarily unavailable.' })
  }

  const to = new Date()
  const from = new Date(to.getTime() - (364 * ONE_DAY))

  try {
    const githubResponse = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'john-paul-portfolio',
      },
      body: JSON.stringify({
        query: contributionQuery,
        variables: {
          username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    })

    const payload = await githubResponse.json()
    if (!githubResponse.ok || payload.errors?.length) {
      console.error('GitHub GraphQL request failed.', {
        status: githubResponse.status,
        errors: payload.errors?.map((error) => error.message),
      })
      return response.status(502).json({ error: 'GitHub activity is temporarily unavailable.' })
    }

    if (!payload.data?.user) {
      console.error(`GitHub user "${username}" was not found.`)
      return response.status(404).json({ error: 'GitHub activity is temporarily unavailable.' })
    }

    const { user } = payload.data
    const calendar = user.contributionsCollection.contributionCalendar

    response.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
    response.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return response.status(200).json({
      username: user.login,
      profileUrl: user.url,
      totalContributions: calendar.totalContributions,
      publicRepositories: user.repositories.totalCount,
      followers: user.followers.totalCount,
      months: calendar.months,
      weeks: calendar.weeks,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Unable to load GitHub contribution data.', error)
    return response.status(502).json({ error: 'GitHub activity is temporarily unavailable.' })
  }
}
