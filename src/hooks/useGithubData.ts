import { useQuery } from '@tanstack/react-query'

export interface HeatmapCell {
  date: string       // YYYY-MM-DD
  count: number
  weekIndex: number  // 0 = oldest, 11 = newest
  dayIndex: number   // 0 = Sunday, 6 = Saturday
}

interface GithubData {
  heatmapData: HeatmapCell[]
  commitsThisWeek: number
  lastPushed: string  // human-readable, e.g. "2 hours ago"
  isError: boolean
  isLoading: boolean
}

interface ContributionDay {
  date: string
  contributionCount: number
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

const USERNAME = 'mjung0802'

const GITHUB_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      updatedAt
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minutes ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  return `${months} month${months !== 1 ? 's' : ''} ago`
}

function buildHeatmapFromCalendar(weeks: ContributionWeek[]): HeatmapCell[] {
  const last12 = weeks.slice(-12)
  const cells: HeatmapCell[] = []
  last12.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day, dayIndex) => {
      cells.push({
        date: day.date,
        count: day.contributionCount,
        weekIndex,
        dayIndex,
      })
    })
  })
  return cells
}

function getCommitsThisWeek(weeks: ContributionWeek[]): number {
  const lastWeek = weeks[weeks.length - 1]
  return lastWeek
    ? lastWeek.contributionDays.reduce((sum, d) => sum + d.contributionCount, 0)
    : 0
}

async function fetchGithubContributions() {
  const now = new Date()
  const from = new Date(now)
  from.setDate(from.getDate() - 84) // 12 weeks back

  const res = await fetch('/api/github', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GITHUB_QUERY,
      variables: {
        login: USERNAME,
        from: from.toISOString(),
        to: now.toISOString(),
      },
    }),
  })

  if (!res.ok) throw new Error('GitHub proxy error')
  const json = await res.json()
  if (json.errors) throw new Error('GitHub GraphQL error')
  return json.data
}

export function useGithubData(): GithubData {
  const query = useQuery({
    queryKey: ['github-contributions', USERNAME],
    queryFn: fetchGithubContributions,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  })

  const weeks: ContributionWeek[] =
    query.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []

  const heatmapData = buildHeatmapFromCalendar(weeks)
  const commitsThisWeek = getCommitsThisWeek(weeks)
  const lastPushed = query.data?.user?.updatedAt
    ? formatRelativeTime(query.data.user.updatedAt)
    : 'recently'

  return {
    heatmapData,
    commitsThisWeek,
    lastPushed,
    isError: query.isError,
    isLoading: query.isLoading,
  }
}
