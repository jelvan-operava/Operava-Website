/**
 * Controlled knowledge for OPERAVA AI Job Screening (Initial Interview).
 * Separate from AVA business assistant knowledge.
 */

import { CAREER_OPENINGS, SKILLS_SPECIALIZATIONS, type CareerPosition } from './careersData'

export const SCREENING_ASSISTANT_NAME = 'OPERAVA Screening'
export const SCREENING_ASSISTANT_ROLE = 'AI Initial Interview'

export const HIRING_STEPS = [
  'Application review',
  'AI initial interview (this session)',
  'Human screening / recruiter follow-up',
  'Practical skills assessment',
  'Technical or lead interview',
  'Offer and onboarding',
] as const

export const SCREENING_GUIDELINES = {
  purpose:
    'This is an AI-assisted initial interview for OPERAVA Global Solutions careers. It helps candidates understand roles and share fit signals before a human recruiter review.',
  notAFinalDecision:
    'This conversation does not guarantee a job offer. Final decisions are made by OPERAVA Talent Acquisition after formal application and human evaluation.',
  formalApplyUrl: 'https://www.operavaglobal.com/apply',
  careersUrl: 'https://www.operavaglobal.com/careers',
  talentEmail: 'talents@operavaglobal.com',
  locations: 'Remote / Hybrid — Philippines and global delivery contexts',
  employmentTypes: 'Full-time (including rotational shifts for CX tracks where applicable)',
}

export const ROLE_SUMMARIES = CAREER_OPENINGS.map((o) => ({
  code: o.code,
  title: o.title,
  shortTitle: o.shortTitle,
  location: o.location,
  level: o.level,
  type: o.type,
  desc: o.desc,
  assignments: o.assignments,
  specializations: SKILLS_SPECIALIZATIONS[o.title as CareerPosition] || [],
}))

/** Suggested screening themes by track — not scored automatically in UI */
export const SCREENING_THEMES: Record<string, string[]> = {
  tech: [
    'Relevant stack or systems experience',
    'How you approach debugging and delivery',
    'Remote collaboration and ownership',
    'Learning speed on unfamiliar tools',
  ],
  ops: [
    'Process accuracy and documentation habits',
    'HR, finance, or operations domain exposure',
    'Handling confidential information',
    'Prioritization under volume',
  ],
  cx: [
    'Customer empathy and clear communication',
    'Handling difficult or escalated cases',
    'Shift flexibility and channel experience',
    'Quality and CSAT mindset',
  ],
}

export function roleBlurb(code: 'tech' | 'ops' | 'cx' | string): string {
  const role = ROLE_SUMMARIES.find((r) => r.code === code)
  if (!role) {
    return (
      'OPERAVA hires across three executive tracks: Technology, Business Operations, and Customer Experience. ' +
      'Tell me which track interests you, or say "list roles".'
    )
  }
  return (
    `${role.title} (${role.shortTitle})\n` +
    `Location: ${role.location}\n` +
    `Level: ${role.level}\n` +
    `Type: ${role.type}\n\n` +
    `${role.desc}\n\n` +
    `Example assignment areas:\n` +
    role.assignments.map((a, i) => `${i + 1}. ${a}`).join('\n')
  )
}
