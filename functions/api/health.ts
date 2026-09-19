interface Env {
  RESEND_API_KEY?: string
  OTP_SECRET?: string
  AI?: unknown
  RESUMES_BUCKET?: unknown
  SUBMISSIONS_DB?: unknown
  RECRUITMENT_SUPABASE_URL?: string
  RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY?: string
  MEGA_EMAIL?: string
  MEGA_PASSWORD?: string
  MEGA_BACKUP_URL?: string
  MEGA_BACKUP_SECRET?: string
  BACKUP_SHARED_SECRET?: string
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const recruitmentUrl =
    env.RECRUITMENT_SUPABASE_URL && String(env.RECRUITMENT_SUPABASE_URL).trim().startsWith('http')
  const recruitmentKey =
    env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY &&
    String(env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY).trim().length > 20
  const megaEmail = env.MEGA_EMAIL && String(env.MEGA_EMAIL).trim()
  const megaPassword = env.MEGA_PASSWORD && String(env.MEGA_PASSWORD).trim().length >= 4
  const megaUrl = env.MEGA_BACKUP_URL && String(env.MEGA_BACKUP_URL).trim().startsWith('http')
  const megaSecret =
    (env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim().length >= 16) ||
    (env.BACKUP_SHARED_SECRET && String(env.BACKUP_SHARED_SECRET).trim().length >= 16)

  const otpLen = env.OTP_SECRET ? String(env.OTP_SECRET).trim().length : 0

  const body = {
    status: 'ok',
    platform: 'Cloudflare Pages Functions',
    service: 'OPERAVA Global Solutions Edge API',
    timestamp: new Date().toISOString(),
    bindings: {
      resendConfigured: Boolean(env.RESEND_API_KEY && String(env.RESEND_API_KEY).length > 8),
      /** True only when OTP_SECRET meets production minimum (32+ chars). */
      otpSecretConfigured: otpLen >= 32,
      aiBound: Boolean(env.AI),
      resumesBucketBound: Boolean(env.RESUMES_BUCKET),
      submissionsDbBound: Boolean(env.SUBMISSIONS_DB),
      recruitmentSupabaseConfigured: Boolean(recruitmentUrl && recruitmentKey),
      megaCredentialsConfigured: Boolean(megaEmail && megaPassword),
      megaBackupWebhookConfigured: Boolean(megaUrl && megaSecret),
    },
  }

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
