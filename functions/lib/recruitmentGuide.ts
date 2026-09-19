/** Next interview question from profile gaps (server + client safe). */

export interface ProfileSnapshot {
  name?: string
  phone?: string
  education?: string
  experienceYears?: string
  experienceSummary?: string
  skills?: string[]
  positionSpecific?: string
  availability?: string
  startDate?: string
  additional?: string
}

export function nextInterviewPrompt(
  profile: ProfileSnapshot,
  positionTitle: string,
): { category: string; prompt: string; complete: boolean } {
  if (!profile.experienceYears && !profile.experienceSummary) {
    return {
      category: 'experience',
      complete: false,
      prompt: `Thank you. For the ${positionTitle} track, how many years of relevant professional experience do you have, and what was your most recent role?`,
    }
  }
  if (!profile.education) {
    return {
      category: 'education',
      complete: false,
      prompt:
        'Thank you. What is your highest level of education or most relevant training or certification?',
    }
  }
  if (!profile.skills || profile.skills.length < 2) {
    return {
      category: 'skills',
      complete: false,
      prompt:
        'Which tools, platforms, or technical skills do you use most often? List at least two.',
    }
  }
  if (!profile.positionSpecific) {
    return {
      category: 'position',
      complete: false,
      prompt: `Share one concrete example of work related to ${positionTitle} — a project, responsibility, or result you are proud of.`,
    }
  }
  if (!profile.availability) {
    return {
      category: 'availability',
      complete: false,
      prompt:
        'What work schedule can you support (day, mid, or night shift), and are you available full-time remotely?',
    }
  }
  if (!profile.startDate) {
    return {
      category: 'availability',
      complete: false,
      prompt: 'When would you be able to start if selected? (e.g. immediately, two weeks, or a specific date.)',
    }
  }
  if (!profile.phone) {
    return {
      category: 'personal',
      complete: false,
      prompt: 'Please share a phone number where Talent Acquisition may reach you if needed.',
    }
  }
  if (!profile.additional) {
    return {
      category: 'additional',
      complete: false,
      prompt:
        'Is there anything else we should know — preferred location, equipment readiness, or other notes for your application?',
    }
  }
  return {
    category: 'complete',
    complete: true,
    prompt:
      'Thank you. I have the required application information. You can start the live 30-question assessment when you are ready. This assessment is evaluated by Recruitment AVA; a score of at least 26 out of 30 (85%) is required to pass.',
  }
}

export function isProfileCompleteForAssessment(profile: ProfileSnapshot): boolean {
  return Boolean(
    profile.experienceYears &&
      profile.experienceSummary &&
      profile.education &&
      profile.skills &&
      profile.skills.length >= 2 &&
      profile.positionSpecific &&
      profile.availability &&
      profile.startDate,
  )
}
