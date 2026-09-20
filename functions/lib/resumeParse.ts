/**
 * Resume → plain text extraction and structured field parsing.
 * Runs on Cloudflare Pages Functions (no native PDF libs).
 */

export interface ParsedResume {
  text: string
  fullName: string
  email: string
  phone: string
  location: string
  education: string
  experience: string
  skills: string
  summary: string
  /** All non-empty structured fields + raw length meta */
  fields: Record<string, string>
}

const EMAIL_RE =
  /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+/g

const PHONE_RE =
  /(?:(?:\+|00)\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}(?:\s*(?:ext\.?|x)\s*\d+)?/gi

function decodeUtf8(bytes: Uint8Array): string {
  try {
    return new TextDecoder('utf-8', { fatal: false }).decode(bytes)
  } catch {
    let s = ''
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
    return s
  }
}

/** Keep printable / common whitespace characters. */
function sanitizeText(raw: string, max = 120_000): string {
  return String(raw || '')
    .replace(/\u0000/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

/** Extract readable Latin strings from binary (PDF / DOC heuristic). */
function extractReadableStrings(bytes: Uint8Array): string {
  const chunks: string[] = []
  let buf = ''
  for (let i = 0; i < bytes.length; i++) {
    const c = bytes[i]
    const printable = c === 9 || c === 10 || c === 13 || (c >= 32 && c <= 126)
    if (printable) {
      buf += String.fromCharCode(c)
    } else if (buf.length >= 4) {
      chunks.push(buf)
      buf = ''
    } else {
      buf = ''
    }
  }
  if (buf.length >= 4) chunks.push(buf)

  // Prefer PDF text-ish lines (skip pure binary noise tokens)
  const filtered = chunks
    .map((s) => s.replace(/\\\(/g, '(').replace(/\\\)/g, ')'))
    .filter((s) => /[A-Za-z]{3,}/.test(s))
    .filter((s) => !/^[%\/]/.test(s.trim()) || /[A-Za-z]{8,}/.test(s))

  return filtered.join('\n')
}

/** Pull text nodes from DOCX XML if uncompressed fragments appear in the binary. */
function extractDocxXmlText(raw: string): string {
  const parts: string[] = []
  const re = /<w:t[^>]*>([^<]*)<\/w:t>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(raw)) !== null) {
    if (m[1]) parts.push(m[1])
  }
  if (parts.length) return parts.join(' ')
  return ''
}

export async function extractResumeText(
  fileName: string,
  contentType: string,
  buffer: ArrayBuffer,
): Promise<string> {
  const name = String(fileName || '').toLowerCase()
  const type = String(contentType || '').toLowerCase()
  const bytes = new Uint8Array(buffer)

  if (name.endsWith('.txt') || type.startsWith('text/')) {
    return sanitizeText(decodeUtf8(bytes))
  }

  // DOCX is a ZIP; try UTF-8 decode + XML tags first, then string scrape
  if (name.endsWith('.docx') || type.includes('wordprocessingml')) {
    const asText = decodeUtf8(bytes)
    const xmlText = extractDocxXmlText(asText)
    if (xmlText.length > 40) return sanitizeText(xmlText)
    return sanitizeText(extractReadableStrings(bytes))
  }

  // PDF / DOC / unknown: binary string scrape
  const scraped = extractReadableStrings(bytes)
  if (scraped.length > 40) return sanitizeText(scraped)

  // Last resort full decode
  return sanitizeText(decodeUtf8(bytes))
}

function sectionAfter(text: string, headers: string[], stopHeaders: string[]): string {
  const lower = text.toLowerCase()
  let start = -1
  let matchedLen = 0
  for (const h of headers) {
    const idx = lower.search(new RegExp('(?:^|\n)\s*' + h.replace(/\s+/g, '\\s+') + '\s*[:\n]', 'i'))
    if (idx >= 0 && (start < 0 || idx < start)) {
      start = idx
      matchedLen = h.length
    }
  }
  if (start < 0) return ''
  let body = text.slice(start)
  // drop header line
  const nl = body.indexOf('\n')
  body = nl >= 0 ? body.slice(nl + 1) : body.slice(matchedLen)
  let end = body.length
  for (const s of stopHeaders) {
    const idx = body.search(new RegExp('(?:^|\n)\s*' + s.replace(/\s+/g, '\\s+') + '\s*[:\n]', 'i'))
    if (idx >= 0 && idx < end) end = idx
  }
  return body.slice(0, end).trim().slice(0, 4000)
}

export function structureResumeText(text: string): ParsedResume {
  const clean = sanitizeText(text)
  const lines = clean.split('\n').map((l) => l.trim()).filter(Boolean)

  const emails = Array.from(new Set((clean.match(EMAIL_RE) || []).map((e) => e.toLowerCase())))
  const email = emails[0] || ''

  let phone = ''
  const phones = clean.match(PHONE_RE) || []
  for (const p of phones) {
    const digits = p.replace(/\D/g, '')
    if (digits.length >= 10 && digits.length <= 15) {
      phone = p.trim()
      break
    }
  }

  // Heuristic name: first non-email line with 2–5 words, mostly letters
  let fullName = ''
  for (const line of lines.slice(0, 12)) {
    if (EMAIL_RE.test(line)) continue
    if (PHONE_RE.test(line) && line.replace(/\D/g, '').length >= 10) continue
    const words = line.split(/\s+/)
    if (words.length >= 2 && words.length <= 5 && /^[A-Za-z][A-Za-z.'\-\s]+$/.test(line) && line.length < 60) {
      fullName = line
      break
    }
  }

  const stop = [
    'experience',
    'work experience',
    'employment',
    'education',
    'skills',
    'projects',
    'certifications',
    'summary',
    'profile',
    'contact',
  ]

  const education = sectionAfter(clean, ['education', 'academic background', 'qualifications'], stop)
  const experience = sectionAfter(
    clean,
    ['experience', 'work experience', 'employment history', 'professional experience'],
    stop,
  )
  const skills = sectionAfter(clean, ['skills', 'technical skills', 'core competencies'], stop)
  const summary = sectionAfter(clean, ['summary', 'professional summary', 'profile', 'objective'], stop)

  // Location: line with city/country keywords near top
  let location = ''
  for (const line of lines.slice(0, 20)) {
    if (/\b(philippines|manila|cebu|united states|usa|canada|uk|london|singapore|remote)\b/i.test(line)) {
      location = line.slice(0, 120)
      break
    }
  }

  const fields: Record<string, string> = {}
  if (fullName) fields.fullName = fullName
  if (email) fields.email = email
  if (phone) fields.phone = phone
  if (location) fields.location = location
  if (education) fields.education = education
  if (experience) fields.experience = experience
  if (skills) fields.skills = skills
  if (summary) fields.summary = summary
  fields.resumeTextLength = String(clean.length)

  return {
    text: clean,
    fullName,
    email,
    phone,
    location,
    education,
    experience,
    skills,
    summary,
    fields,
  }
}

export async function parseResumeFile(
  fileName: string,
  contentType: string,
  buffer: ArrayBuffer,
): Promise<ParsedResume> {
  const text = await extractResumeText(fileName, contentType, buffer)
  if (!text || text.length < 20) {
    return {
      text: text || '',
      fullName: '',
      email: '',
      phone: '',
      location: '',
      education: '',
      experience: '',
      skills: '',
      summary: '',
      fields: { notice: 'Could not extract enough text from this file. Prefer a text-based PDF or DOCX.' },
    }
  }
  return structureResumeText(text)
}
