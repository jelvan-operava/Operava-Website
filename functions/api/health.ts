interface Env {
  RESEND_API_KEY?: string
  OTP_SECRET?: string
  AI?: unknown
  RESUMES_BUCKET?: unknown
  SUBMISSIONS_DB?: unknown
  RECRUITMENT_SUPABASE_URL?: string
  RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY?: string
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const recruitmentUrl =
    env.RECRUITMENT_SUPABASE_URL && String(env.RECRUITMENT_SUPABASE_URL).trim().startsWith('http')
  const recruitmentKey =
    env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY &&
    String(env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY).trim().length > 20

  const body = {
    status: 'ok',
    platform: 'Cloudflare Pages Functions',
    service: 'OPERAVA Global Solutions Edge API',
    timestamp: new Date().toISOString(),
    bindings: {
      resendConfigured: Boolean(env.RESEND_API_KEY && String(env.RESEND_API_KEY).length > 8),
      otpSecretConfigured: Boolean(env.OTP_SECRET && String(env.OTP_SECRET).length > 8),
      aiBound: Boolean(env.AI),
      resumesBucketBound: Boolean(env.RESUMES_BUCKET),
      submissionsDbBound: Boolean(env.SUBMISSIONS_DB),
      recruitmentSupabaseConfigured: Boolean(recruitmentUrl && recruitmentKey),
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
