export const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export const PHONE_CHAR_RE = /^[+]?[\d\s().-]{7,25}$/
export const URL_RE = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i

export interface FormValidationState {
  name?: string
  company?: string
  email?: string
  phone?: string
  country?: string
  category?: string
  service?: string
  description?: string
  budget?: string
  websiteUrl?: string
  position?: string
  specialization?: string
  availability?: string
  education?: string
  experience?: string
  portfolio?: string
  accurate?: string
  privacy?: string
}

export function validateName(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'Full name is required.'
  if (trimmed.length < 2) return 'Full name must be at least 2 characters.'
  if (!/[a-zA-ZÀ-ÿ]/.test(trimmed)) return 'Full name must include valid alphabetical characters.'
  return undefined
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'Email address is required.'
  if (!EMAIL_RE.test(trimmed)) return 'Please enter a valid email address (e.g., name@company.com).'
  return undefined
}

export function validatePhone(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'Contact phone number is required.'
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 7) {
    return 'Phone number must have at least 7 digits.'
  }
  if (digits.length > 15) {
    return 'Phone number cannot exceed 15 digits.'
  }
  if (!PHONE_CHAR_RE.test(trimmed)) {
    return 'Please enter a valid phone number (digits, spaces, hyphens, parentheses, optional leading +).'
  }
  return undefined
}

export function validateCountry(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'Country / location is required.'
  if (trimmed.length < 2) return 'Country name must be at least 2 characters.'
  return undefined
}

export function validateCategory(value: string): string | undefined {
  if (!value || !value.trim()) return 'Please select an inquiry category.'
  return undefined
}

export function validateService(value: string): string | undefined {
  if (!value || !value.trim()) return 'Please select a specific service or consultation type.'
  return undefined
}

export function validateDescription(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return 'Project description is required.'
  if (trimmed.length < 15) {
    const remaining = 15 - trimmed.length
    return `Please enter at least 15 characters describing your requirements (${remaining} more needed).`
  }
  if (trimmed.length > 4000) return 'Description cannot exceed 4,000 characters.'
  return undefined
}

export function validateWebsiteUrl(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (!URL_RE.test(trimmed)) {
    return 'Please enter a valid website URL (e.g., https://example.com).'
  }
  return undefined
}

export function validateCheckbox(checked: boolean, message: string): string | undefined {
  if (!checked) return message
  return undefined
}

export function validateSingleField(
  key: keyof FormValidationState,
  value: unknown,
  kind: 'SERVICES' | 'CAREERS',
  extra?: { hasResume?: boolean; formValues?: Record<string, unknown> },
): string | undefined {
  switch (key) {
    case 'name':
      return validateName(String(value || ''))
    case 'email':
      return validateEmail(String(value || ''))
    case 'phone':
      return validatePhone(String(value || ''))
    case 'country':
      return validateCountry(String(value || ''))
    case 'category':
      return kind === 'SERVICES' ? validateCategory(String(value || '')) : undefined
    case 'service':
      return kind === 'SERVICES' ? validateService(String(value || '')) : undefined
    case 'description':
      return kind === 'SERVICES' ? validateDescription(String(value || '')) : undefined
    case 'websiteUrl':
      return validateWebsiteUrl(String(value || ''))
    case 'position':
      return kind === 'CAREERS' && !String(value || '').trim()
        ? 'Position applied for is required.'
        : undefined
    case 'specialization':
      return kind === 'CAREERS' && !String(value || '').trim()
        ? 'Please select a skills specialization.'
        : undefined
    case 'availability':
      return kind === 'CAREERS' && !String(value || '').trim()
        ? 'Availability / notice period is required.'
        : undefined
    case 'education':
      return kind === 'CAREERS' && !String(value || '').trim()
        ? 'Highest education level is required.'
        : undefined
    case 'experience':
      if (kind !== 'CAREERS') return undefined
      if (!String(value || '').trim()) return 'Relevant work experience is required.'
      if (String(value || '').trim().length < 15) {
        return 'Please provide at least 15 characters summarizing your experience.'
      }
      return undefined
    case 'portfolio':
      if (kind !== 'CAREERS') return undefined
      if (!extra?.hasResume && !String(value || '').trim()) {
        return 'Please upload a resume or provide a portfolio/LinkedIn profile URL.'
      }
      if (String(value || '').trim()) {
        return validateWebsiteUrl(String(value || ''))
      }
      return undefined
    case 'accurate':
      return validateCheckbox(Boolean(value), 'You must confirm that the provided information is accurate.')
    case 'privacy':
      return validateCheckbox(Boolean(value), 'You must agree to the Privacy Policy to proceed.')
    default:
      return undefined
  }
}

export function validateIntakeForm(
  form: {
    name: string
    company: string
    email: string
    phone: string
    country: string
    category: string
    service: string
    description: string
    budget: string
    websiteUrl: string
    contactMethod: string
    position: string
    specialization: string
    availability: string
    experience: string
    education: string
    skills: string
    portfolio: string
    additional: string
    accurate: boolean
    privacy: boolean
  },
  kind: 'SERVICES' | 'CAREERS',
  hasResume: boolean = false,
): FormValidationState {
  const errors: FormValidationState = {}

  // Common contact fields
  const nameErr = validateName(form.name)
  if (nameErr) errors.name = nameErr

  const emailErr = validateEmail(form.email)
  if (emailErr) errors.email = emailErr

  const phoneErr = validatePhone(form.phone)
  if (phoneErr) errors.phone = phoneErr

  const countryErr = validateCountry(form.country)
  if (countryErr) errors.country = countryErr

  if (kind === 'SERVICES') {
    const catErr = validateCategory(form.category)
    if (catErr) errors.category = catErr

    const srvErr = validateService(form.service)
    if (srvErr) errors.service = srvErr

    const descErr = validateDescription(form.description)
    if (descErr) errors.description = descErr

    const urlErr = validateWebsiteUrl(form.websiteUrl)
    if (urlErr) errors.websiteUrl = urlErr
  } else if (kind === 'CAREERS') {
    if (!form.position.trim()) errors.position = 'Position applied for is required.'
    if (!form.specialization.trim()) errors.specialization = 'Please select a skills specialization.'
    if (!form.availability.trim()) errors.availability = 'Availability / notice period is required.'
    if (!form.education.trim()) errors.education = 'Highest education level is required.'
    if (!form.experience.trim()) {
      errors.experience = 'Relevant work experience is required.'
    } else if (form.experience.trim().length < 15) {
      errors.experience = 'Please provide at least 15 characters summarizing your experience.'
    }
    if (!hasResume && !form.portfolio.trim()) {
      errors.portfolio = 'Please upload a resume or provide a portfolio/LinkedIn profile URL.'
    } else if (form.portfolio.trim()) {
      const pUrlErr = validateWebsiteUrl(form.portfolio)
      if (pUrlErr) errors.portfolio = pUrlErr
    }
  }

  const accurateErr = validateCheckbox(form.accurate, 'You must confirm that the provided information is accurate.')
  if (accurateErr) errors.accurate = accurateErr

  const privacyErr = validateCheckbox(form.privacy, 'You must agree to the Privacy Policy to proceed.')
  if (privacyErr) errors.privacy = privacyErr

  return errors
}
