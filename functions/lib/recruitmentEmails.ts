/**
 * Recruitment AVA confirmation emails — mandatory OPERAVA shell only.
 */

import {
  escapeHtml,
  resolveFromEnv,
  renderEmailTemplate,
  sendResend,
  type FormEnv,
} from './formCore'
import { recruitmentPoolConfirmationTemplate } from './emailTemplates'

export function recruitmentPoolConfirmationHtml(opts: {
  name: string
  applicationId: string
  positionTitle: string
  scorePercent: number
  correctCount: number
  total: number
}): string {
  const score =
    escapeHtml(String(opts.correctCount)) +
    ' / ' +
    escapeHtml(String(opts.total)) +
    ' (' +
    escapeHtml(String(opts.scorePercent)) +
    '%)'
  return renderEmailTemplate(recruitmentPoolConfirmationTemplate, {
    NAME: escapeHtml(opts.name),
    APPLICATION_ID: escapeHtml(opts.applicationId),
    POSITION: escapeHtml(opts.positionTitle),
    SCORE: score,
  })
}

export function recruitmentPoolConfirmationText(opts: {
  name: string
  applicationId: string
  positionTitle: string
  scorePercent: number
  correctCount: number
  total: number
}): string {
  return (
    'Hi ' +
    opts.name +
    ',\n\n' +
    'You have passed the OPERAVA Recruitment AVA assessment and are eligible for the Recruitment Pool (subject to review).\n\n' +
    'Application number: ' +
    opts.applicationId +
    '\n' +
    'Full name: ' +
    opts.name +
    '\n' +
    'Position: ' +
    opts.positionTitle +
    '\n' +
    'Score: ' +
    opts.correctCount +
    '/' +
    opts.total +
    ' (' +
    opts.scorePercent +
    '%)\n\n' +
    'Operava Team,\n' +
    'Note: This is an email generated email, please do not reply.\n\n' +
    'www.operavaglobal.com'
  )
}

/** Applicant confirmation + BCC talents@ after pass / pool confirmation. */
export async function sendRecruitmentPoolEmails(
  env: FormEnv & { TALENT_INBOX?: string },
  opts: {
    name: string
    email: string
    applicationId: string
    positionTitle: string
    scorePercent: number
    correctCount: number
    total: number
  },
): Promise<void> {
  const talent = env.TALENT_INBOX || 'talents@operavaglobal.com'
  const from = resolveFromEnv(env)
  const subject =
    'OPERAVA Recruitment Pool — ' + opts.applicationId + ' — ' + opts.name
  const html = recruitmentPoolConfirmationHtml(opts)
  const text = recruitmentPoolConfirmationText(opts)

  await sendResend(env, {
    from,
    to: [opts.email],
    bcc: [talent],
    subject,
    html,
    text,
  })
}
