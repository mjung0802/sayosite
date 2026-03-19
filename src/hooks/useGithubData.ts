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

const USERNAME = 'mjung0802'

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

function buildHeatmap(events: Array<{ type: string; created_at: string }>): HeatmapCell[] {
  // Build 12 weeks of data (84 days), oldest first
  const now = new Date()
  const cells: HeatmapCell[] = []
  const commitsByDate: Record<string, number> = {}

  // Count push events by date
  for (const event of events) {
    if (event.type === 'PushEvent') {
      const date = event.created_at.split('T')[0]
      commitsByDate[date] = (commitsByDate[date] || 0) + 1
    }
  }

  // Build grid: 12 weeks × 7 days
  for (let week = 0; week < 12; week++) {
    for (let day = 0; day < 7; day++) {
      const daysBack = (11 - week) * 7 + (6 - day)
      const date = new Date(now)
      date.setDate(date.getDate() - daysBack)
      const dateStr = date.toISOString().split('T')[0]
      cells.push({
        date: dateStr,
        count: commitsByDate[dateStr] || 0,
        weekIndex: week,
        dayIndex: day,
      })
    }
  }

  return cells
}

function getCommitsThisWeek(cells: HeatmapCell[]): number {
  // Last 7 cells = last 7 days
  return cells.slice(-7).reduce((sum, c) => sum + c.count, 0)
}

async function fetchEvents() {
  const res = await fetch(`https://api.github.com/users/${USERNAME}/events/public`)
  if (!res.ok) throw new Error('GitHub API error')
  return res.json()
}

async function fetchUser() {
  const res = await fetch(`https://api.github.com/users/${USERNAME}`)
  if (!res.ok) throw new Error('GitHub API error')
  return res.json()
}

export function useGithubData(): GithubData {
  const eventsQuery = useQuery({
    queryKey: ['github-events', USERNAME],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  })

  const userQuery = useQuery({
    queryKey: ['github-user', USERNAME],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  })

  const isError = eventsQuery.isError || userQuery.isError
  const isLoading = eventsQuery.isLoading || userQuery.isLoading

  const heatmapData = eventsQuery.data
    ? buildHeatmap(eventsQuery.data)
    : buildHeatmap([]) // empty grid on error/loading

  const commitsThisWeek = getCommitsThisWeek(heatmapData)

  const lastPushed = userQuery.data?.updated_at
    ? formatRelativeTime(userQuery.data.updated_at)
    : 'recently'

  return { heatmapData, commitsThisWeek, lastPushed, isError, isLoading }
}
