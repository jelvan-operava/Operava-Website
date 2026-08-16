interface Env {
  GEMINI_API_KEY?: string
}

export const onRequestGet: PagesFunction<Env> = async () => {
  return new Response(
    JSON.stringify({
      status: 'ok',
      platform: 'Cloudflare Pages Functions',
      service: 'OPERAVA Global Solutions Edge API',
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    }
  )
}
