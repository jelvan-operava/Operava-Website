interface Env {
  RESEND_API_KEY?: string
  OTP_SECRET?: string
  AI?: unknown
  RESUMES_BUCKET?: unknown
  SUBMISSIONS_DB?: unknown
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
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
