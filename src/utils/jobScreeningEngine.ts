/**
 * Job Screening (AI Initial Interview) engine — separate from AVA.
 * Controlled career/hiring knowledge only.
 */

import {
  HIRING_STEPS,
  ROLE_SUMMARIES,
  SCREENING_GUIDELINES,
  SCREENING_THEMES,
  roleBlurb,
} from '../data/jobScreeningKnowledge'

export interface ScreeningReply {
  text: string
}

function detectTrack(q: string): 'tech' | 'ops' | 'cx' | null {
  if (/(tech|software|developer|engineer|devops|cloud|full.?stack|qa|cyber)/.test(q)) return 'tech'
  if (/(ops|operations|hr|human resource|accounting|finance|payroll|recruit)/.test(q)) return 'ops'
  if (/(cx|customer|support|help.?desk|chat|voice|bpo|service)/.test(q)) return 'cx'
  return null
}

export function generateScreeningResponse(rawQuery: string): ScreeningReply {
  const query = rawQuery.trim()
  const q = query.toLowerCase()

  if (!query) {
    return {
      text: 'I am ready when you are. You can say which role track interests you: Technology, Business Operations, or Customer Experience.',
    }
  }

  if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(q)) {
    return {
      text:
        'Hello — I am OPERAVA’s AI Initial Interview assistant for job screening.\n\n' +
        'I can explain our career tracks, hiring steps, and ask a few fit questions. This is not a final hiring decision.\n\n' +
        'Which area are you exploring?\n1. Technology\n2. Business Operations\n3. Customer Experience',
    }
  }

  if (q.includes('who are you') || q.includes('what are you') || q.includes('what can you do')) {
    return {
      text:
        'I am the OPERAVA AI Job Screening assistant (initial interview).\n\n' +
        'I help with:\na. Role tracks and typical assignments\nb. Hiring process overview\nc. Light screening questions about your background\n\n' +
        'I do not replace a formal application. Apply at ' +
        SCREENING_GUIDELINES.formalApplyUrl +
        ' when you are ready.',
    }
  }

  if (q.includes('hiring process') || q.includes('recruitment process') || q.includes('steps') || q.includes('how do i apply')) {
    return {
      text:
        'OPERAVA hiring flow:\n\n' +
        HIRING_STEPS.map((s, i) => `${i + 1}. ${s}`).join('\n') +
        '\n\nFormal applications: ' +
        SCREENING_GUIDELINES.formalApplyUrl +
        '\nCareers overview: ' +
        SCREENING_GUIDELINES.careersUrl,
    }
  }

  if (q.includes('list role') || q.includes('open position') || q.includes('vacancies') || q.includes('what roles') || q === '1' || q === '2' || q === '3') {
    if (q === '1') return { text: roleBlurb('tech') }
    if (q === '2') return { text: roleBlurb('ops') }
    if (q === '3') return { text: roleBlurb('cx') }
    return {
      text:
        'Current executive tracks:\n\n' +
        ROLE_SUMMARIES.map(
          (r, i) =>
            `${i + 1}. ${r.shortTitle} — ${r.location}\n   ${r.desc.slice(0, 120)}…`,
        ).join('\n\n') +
        '\n\nReply with 1, 2, or 3 — or name a track — for more detail.',
    }
  }

  const track = detectTrack(q)
  if (track && (q.includes('tell me') || q.includes('about') || q.includes('role') || q.includes('position') || q.length < 40)) {
    const themes = SCREENING_THEMES[track] || []
    return {
      text:
        roleBlurb(track) +
        '\n\nScreening themes for this track:\n' +
        themes.map((t, i) => `${i + 1}. ${t}`).join('\n') +
        '\n\nShare a short summary of your experience in this area (years, tools, and a recent example).',
    }
  }

  if (q.includes('salary') || q.includes('compensation') || q.includes('pay') || q.includes('rate')) {
    return {
      text:
        'Compensation depends on role, experience, and assignment. I do not publish salary bands in this screening chat.\n\n' +
        'After you apply formally, Talent Acquisition can discuss packages when appropriate. Email: ' +
        SCREENING_GUIDELINES.talentEmail,
    }
  }

  if (q.includes('remote') || q.includes('location') || q.includes('work from')) {
    return {
      text:
        'OPERAVA roles are typically ' +
        SCREENING_GUIDELINES.locations +
        '. Specific arrangement depends on the assignment and client delivery needs.',
    }
  }

  if (q.includes('apply') || q.includes('application') || q.includes('submit resume')) {
    return {
      text:
        'To formally apply, use the OPERAVA application form (email verification required):\n' +
        SCREENING_GUIDELINES.formalApplyUrl +
        '\n\nYou can continue this screening chat for role fit questions, then complete the form when ready.',
    }
  }

  if (q.includes('guarantee') || q.includes('hired') || q.includes('will i get')) {
    return {
      text: SCREENING_GUIDELINES.notAFinalDecision,
    }
  }

  // Experience-style free text — acknowledge and probe lightly
  if (query.length > 80 || /\b(years?|experience|worked|i am|i've|i have)\b/.test(q)) {
    return {
      text:
        'Thank you for sharing that background.\n\n' +
        'Next screening questions:\n' +
        '1. Which track fits you best — Technology, Business Operations, or Customer Experience?\n' +
        '2. What is your strongest specialization in that track?\n' +
        '3. Are you available for full-time remote work, and when could you start?\n\n' +
        'Answer in short bullets if you prefer. When you are ready for a formal application: ' +
        SCREENING_GUIDELINES.formalApplyUrl,
    }
  }

  return {
    text:
      'I can help with OPERAVA job screening only — roles, hiring steps, and light initial-interview questions.\n\n' +
      'Try: "list roles", "technology track", "hiring process", or describe your experience in a few sentences.\n\n' +
      'Formal apply: ' +
      SCREENING_GUIDELINES.formalApplyUrl,
  }
}
