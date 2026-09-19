import { FormEvent, useState } from 'react'
import { Search, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react'
import { verificationEmail, verificationPortalUrl } from '../data/contacts'
import { normalizeReferenceId } from '../data/documentVerifications'

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | {
      status: 'verified'
      referenceId: string
      title?: string
      issuedAt?: string
    }
  | { status: 'not_found'; referenceId: string }
  | { status: 'error'; message: string }

export default function Verification() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<LookupState>({ status: 'idle' })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const id = normalizeReferenceId(query)
    if (!id) {
      setResult({ status: 'error', message: 'Enter a document reference ID.' })
      return
    }
    setResult({ status: 'loading' })
    try {
      const res = await fetch(`/api/verification/lookup?id=${encodeURIComponent(id)}`)
      const data = (await res.json()) as {
        ok?: boolean
        verified?: boolean
        referenceId?: string
        title?: string
        issuedAt?: string
        message?: string
      }
      if (!res.ok) {
        setResult({ status: 'error', message: data.message || 'Lookup failed. Try again.' })
        return
      }
      if (data.verified && data.referenceId) {
        setResult({
          status: 'verified',
          referenceId: data.referenceId,
          title: data.title,
          issuedAt: data.issuedAt,
        })
      } else {
        setResult({ status: 'not_found', referenceId: id })
      }
    } catch {
      setResult({ status: 'error', message: 'Network error. Please try again.' })
    }
  }

  return (
    <main className="relative min-h-[100dvh] flex flex-col">
      <div
        className="fixed inset-0 z-0 bg-gradient-to-br from-violet-950 via-violet-900 to-fuchsia-900"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(217,70,239,0.25), transparent 45%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-24 sm:py-28">
        <div className="w-full max-w-xl text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            OPERAVA Verification Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Document verification
          </h1>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed">
            Enter the reference ID issued by OPERAVA Global Solutions to confirm whether the ID is
            verified in our registry.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 p-4 sm:p-5"
        >
          <label htmlFor="doc-id" className="block text-left text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Document reference ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="doc-id"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. OPERAVA-DOC-00000001"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base font-mono"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={result.status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-700 text-white text-sm font-semibold hover:bg-violet-800 disabled:opacity-60 transition-colors shrink-0"
            >
              {result.status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Verify
            </button>
          </div>
        </form>

        <div className="w-full max-w-xl mt-6">
          {result.status === 'verified' && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-left shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-900">Verified</p>
                  <p className="text-sm text-emerald-800 mt-0.5">The document is verified.</p>
                </div>
              </div>
              <p className="text-sm text-emerald-900 font-mono font-semibold mb-2">
                {result.referenceId}
              </p>
              {result.title && (
                <p className="text-sm text-emerald-800 mb-1">Record: {result.title}</p>
              )}
              {result.issuedAt && (
                <p className="text-xs text-emerald-700 mb-4">Issued: {result.issuedAt}</p>
              )}
              <p className="text-xs text-emerald-900/90 leading-relaxed border-t border-emerald-200 pt-3">
                Note: this ID is verified and issued by <strong>OPERAVA GLOBAL SOLUTIONS</strong>.
                Document content may be updated or changed over time. This verification confirms only
                the reference ID provided. For the correct specific content of a document, email the
                OPERAVA Verification Team:{' '}
                <a
                  href={`mailto:${verificationEmail}`}
                  className="font-semibold underline underline-offset-2"
                >
                  {verificationEmail}
                </a>
                .
              </p>
            </div>
          )}

          {result.status === 'not_found' && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 text-left shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-900">Not found</p>
                  <p className="text-sm text-amber-800 mt-0.5">
                    No verified record for <span className="font-mono font-semibold">{result.referenceId}</span>.
                  </p>
                </div>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Double-check the ID. If you believe this is an error, contact{' '}
                <a href={`mailto:${verificationEmail}`} className="font-semibold underline">
                  {verificationEmail}
                </a>
                .
              </p>
            </div>
          )}

          {result.status === 'error' && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
              {result.message}
            </div>
          )}
        </div>

        <p className="mt-10 text-center text-xs text-white/60 max-w-md leading-relaxed">
          Portal: {verificationPortalUrl.replace(/^https?:\/\//, '')} · Also available at{' '}
          www.operavaglobal.com/verification
        </p>
      </div>
    </main>
  )
}
