/**
 * Shared state + behaviour for the contact form.
 *
 * Used by the desktop inline form (ContactSection) and the mobile modal
 * (ContactModal) so validation/submission live in one place; each surface
 * supplies its own (pixel-specific) markup.
 */
export function useContactForm() {
  const dialCodes = [
    { code: '+234', label: 'Nigeria (+234)' },
    { code: '+233', label: 'Ghana (+233)' },
    { code: '+254', label: 'Kenya (+254)' },
    { code: '+27', label: 'South Africa (+27)' },
    { code: '+1', label: 'United States (+1)' },
    { code: '+44', label: 'United Kingdom (+44)' },
  ]

  const countries = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'United States',
    'United Kingdom',
    'Canada',
    'United Arab Emirates',
    'Other',
  ]

  const describesOptions = [
    'Individual trader',
    'Business owner',
    'Financial institution',
    'Developer / Partner',
    'Other',
  ]

  const hearAboutOptions = [
    'Search engine',
    'Social media',
    'Friend or colleague',
    'News or article',
    'Other',
  ]

  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    dialCode: '+234',
    phone: '',
    company: '',
    country: '',
    describes: '',
    message: '',
    hearAbout: '',
    consent: false,
  })

  const errors = reactive<Record<string, string>>({})
  const submitting = ref(false)
  const submitted = ref(false)
  const submitError = ref('')

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    for (const key of Object.keys(errors)) delete errors[key]

    if (!form.email.trim()) errors.email = 'Email is required'
    else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address'
    if (!form.company.trim()) errors.company = 'Company name is required'
    if (!form.country) errors.country = 'Please select a country'
    if (!form.describes) errors.describes = 'Please select an option'
    if (!form.message.trim()) errors.message = 'A message is required'
    if (!form.hearAbout) errors.hearAbout = 'Please select an option'
    if (!form.consent) errors.consent = 'Please accept the privacy policy to continue'

    return Object.keys(errors).length === 0
  }

  async function onSubmit() {
    submitError.value = ''
    if (!validate()) return

    submitting.value = true
    try {
      await $fetch('/api/contact', { method: 'POST', body: { ...form } })
      submitted.value = true
    } catch (err: any) {
      const serverErrors = err?.data?.data?.errors as Record<string, string> | undefined
      if (serverErrors) Object.assign(errors, serverErrors)
      submitError.value = 'Something went wrong. Please try again.'
    } finally {
      submitting.value = false
    }
  }

  function reset() {
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      dialCode: '+234',
      phone: '',
      company: '',
      country: '',
      describes: '',
      message: '',
      hearAbout: '',
      consent: false,
    })
    for (const key of Object.keys(errors)) delete errors[key]
    submitted.value = false
    submitError.value = ''
  }

  /** Border colour for a field based on its error state. */
  function borderClass(name: string) {
    return errors[name] ? 'border-required' : 'border-line'
  }

  return {
    dialCodes,
    countries,
    describesOptions,
    hearAboutOptions,
    form,
    errors,
    submitting,
    submitted,
    submitError,
    validate,
    onSubmit,
    reset,
    borderClass,
  }
}
