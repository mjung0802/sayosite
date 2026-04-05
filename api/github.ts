export const config = { runtime: 'edge' }

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

const USERNAME = 'mjung0802'

const CONTRIBUTIONS_QUERY = `
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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return json({ error: 'GitHub token not configured' }, 500)
  }

  let from: string, to: string
  try {
    const body = await req.json()
    from = body.from
    to = body.to
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  if (!from || !to || typeof from !== 'string' || typeof to !== 'string') {
    return json({ error: 'Missing required fields: from, to' }, 400)
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: USERNAME, from, to },
    }),
  })

  const data = await response.json()
  return json(data, response.status)
}
