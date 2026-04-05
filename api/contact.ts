export const config = { runtime: 'edge' }

// In-memory rate limit store: IP → last successful submission timestamp (ms)
// Per-isolate caveat: resets on cold starts and is not shared across Edge instances.
// Acceptable for a portfolio site — primary protection is server-side credentials.
const rateLimitStore = new Map<string, number>()
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  const now = Date.now()
  const last = rateLimitStore.get(ip)
  if (last !== undefined && now - last < RATE_LIMIT_WINDOW_MS) {
    return json({ error: 'Too many requests. Please wait a few minutes before trying again.' }, 429)
  }

  let name: string, email: string, message: string
  try {
    const body = await req.json()
    name = body.name
    email = body.email
    message = body.message
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  if (!name?.trim() || name.trim().length > 100) {
    return json({ error: 'Invalid name' }, 400)
  }
  if (!EMAIL_RE.test(email?.trim()) || email.trim().length > 254) {
    return json({ error: 'Invalid email' }, 400)
  }
  if (!message?.trim() || message.trim().length > 5000) {
    return json({ error: 'Invalid message' }, 400)
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const userId = process.env.EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !userId) {
    return json({ error: 'Email service not configured' }, 500)
  }

  const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        from_name: name.trim(),
        from_email: email.trim(),
        message: message.trim(),
      },
    }),
  })

  if (!emailRes.ok) {
    return json({ error: 'Failed to send email' }, 502)
  }

  rateLimitStore.set(ip, now)
  return json({ ok: true }, 200)
}
