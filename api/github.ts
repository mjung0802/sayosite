export const config = { runtime: 'edge' }

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
    return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let from: string, to: string
  try {
    const body = await req.json()
    from = body.from
    to = body.to
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!from || !to || typeof from !== 'string' || typeof to !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing required fields: from, to' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
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
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
