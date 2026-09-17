import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X, Shield, Settings2 } from 'lucide-react'

const STORAGE_KEY = 'operava_cookie_consent'
const STORAGE_VERSION = '1'

type ConsentChoice = 'accepted' | 'essential' | null

interface StoredConsent {
  choice: 'accepted' | 'essential'
  version: string
  at: string
}

function readConsent(): ConsentChoice {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed?.version !== STORAGE_VERSION) return null
    if (parsed.choice === 'accepted' || parsed.choice === 'essential') return parsed.choice
    return null
  } catch {
    return null
  }
}

function writeConsent(choice: 'accepted' | 'essential') {
  const payload: StoredConsent = {
    choice,
    version: STORAGE_VERSION,
    at: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  // Notify any listeners (analytics init, etc.)
  window.dispatchEvent(new CustomEvent('operava:consent', { detail: payload }))
}

/**
 * OPERAVA cookie & cache acknowledgment banner.
 * Matches site theme (white / violet). Persists choice in localStorage.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Delay slightly so it doesn't compete with first paint / HomeMediaLoader
    const t = window.setTimeout(() => {
      if (readConsent() === null) setVisible(true)
    }, 900)
    return () => window.clearTimeout(t)
  }, [])

  const dismiss = (choice: 'accepted' | 'essential') => {
    writeConsent(choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[10000] p-4 sm:p-5 pointer-events-none"
      role="dialog"
      aria-modal="false"
      aria-labelledby="operava-cookie-title"
      aria-describedby="operava-cookie-desc"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-3xl rounded-2xl border border-gray-200/90 bg-white shadow-2xl shadow-violet-900/10 overflow-hidden animate-fade-in">
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-700" />

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 items-center justify-center">
              <Cookie className="w-5 h-5 text-violet-700" aria-hidden />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h2
                  id="operava-cookie-title"
                  className="text-base sm:text-lg font-bold text-gray-900 tracking-tight"
                >
                  Cookies & cache
                </h2>
                <button
                  type="button"
                  onClick={() => dismiss('essential')}
                  className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close and keep essential only"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p
                id="operava-cookie-desc"
                className="mt-2 text-sm text-gray-600 leading-relaxed"
              >
                We use cookies and browser storage (including cache) so the site works reliably —
                security, session continuity, preferences, and performance. Optional analytics help us
                improve OPERAVA. See our{' '}
                <Link
                  to="/privacy#section-15"
                  className="font-semibold text-violet-700 hover:text-violet-900 underline underline-offset-2"
                >
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>

              {showDetails && (
                <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/80 p-4 space-y-3 text-sm text-gray-600">
                  <div className="flex gap-2.5">
                    <Shield className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Essential</p>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        Required for security, load balancing, form sessions, and remembering this
                        consent. Includes necessary browser cache for page assets.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <Settings2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Preferences & performance</p>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        Optional cookies and local storage for analytics, performance measurement, and
                        improved navigation. Not required to use the site.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowDetails((v) => !v)}
                  className="text-xs sm:text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors text-left"
                >
                  {showDetails ? 'Hide details' : 'Manage preferences'}
                </button>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => dismiss('essential')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    Essential only
                  </button>
                  <button
                    type="button"
                    onClick={() => dismiss('accepted')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-700 hover:bg-violet-800 shadow-md shadow-violet-700/20 active:scale-[0.98] transition-all"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Optional helper for other modules (e.g. analytics bootstrap). */
export function getCookieConsent(): ConsentChoice {
  return readConsent()
}
