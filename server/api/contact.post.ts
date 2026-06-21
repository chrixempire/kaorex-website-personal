/**
 * Contact form submission endpoint.
 *
 * Validates the payload server-side and returns { ok: true } on success.
 * Wire the `// TODO: deliver` block to your email provider / CRM
 * (e.g. Resend, Postmark, a Slack webhook, or an internal API).
 */
interface ContactPayload {
  firstName?: string
  lastName?: string
  email?: string
  dialCode?: string
  phone?: string
  company?: string
  country?: string
  describes?: string
  message?: string
  hearAbout?: string
  consent?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)

  const required: Array<[keyof ContactPayload, string]> = [
    ['email', 'Email is required'],
    ['company', 'Company name is required'],
    ['country', 'Please select a country'],
    ['describes', 'Please tell us what best describes you'],
    ['message', 'A message is required'],
    ['hearAbout', 'Please let us know how you heard about us'],
  ]

  const errors: Record<string, string> = {}
  for (const [field, msg] of required) {
    if (!body?.[field] || String(body[field]).trim() === '') errors[field] = msg
  }
  if (body?.email && !EMAIL_RE.test(body.email.trim())) {
    errors.email = 'Enter a valid email address'
  }
  if (!body?.consent) {
    errors.consent = 'Please accept the privacy policy to continue'
  }

  if (Object.keys(errors).length) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: { errors },
    })
  }

  // TODO: deliver the request (email / CRM / webhook). For now we just log it.
  console.info('[contact] new request from', body.email, '—', body.company)

  return { ok: true }
})
