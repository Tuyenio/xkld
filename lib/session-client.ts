import type { AuthUser } from '@/lib/auth-types'

const SESSION_KEY = 'xkld_session'
const AUTH_HINT_COOKIE_KEY = 'xkld_auth_hint'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30

export type AppSession = {
  accessToken: string
  refreshToken: string
  expiresAt: number
  user: AuthUser
}

function setAuthHintCookie(session: AppSession) {
  if (typeof document === 'undefined') return
  const payload = {
    expiresAt: session.expiresAt,
    role: session.user.role,
  }
  const encoded = encodeURIComponent(JSON.stringify(payload))
  const maxAgeSeconds = Math.max(
    1,
    Math.floor((session.expiresAt - Date.now()) / 1000),
  )
  document.cookie = `${AUTH_HINT_COOKIE_KEY}=${encoded}; path=/; max-age=${maxAgeSeconds}; samesite=lax`
}

function clearAuthHintCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${AUTH_HINT_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`
}

export function saveSession(input: {
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
  user: AuthUser
}) {
  if (typeof window === 'undefined') return

  const session: AppSession = {
    accessToken: input.accessToken,
    refreshToken: input.refreshToken,
    // Keep a longer browser session window so access-token expiry can be recovered via refresh.
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
    user: input.user,
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  setAuthHintCookie(session)
}

export function getSession(options?: { allowExpired?: boolean }): AppSession | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as AppSession
    if (
      !parsed.accessToken ||
      !parsed.refreshToken ||
      !parsed.expiresAt ||
      !parsed.user
    ) {
      window.localStorage.removeItem(SESSION_KEY)
      clearAuthHintCookie()
      return null
    }

    if (parsed.expiresAt <= Date.now() && !options?.allowExpired) {
      return null
    }

    setAuthHintCookie(parsed)
    return parsed
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    clearAuthHintCookie()
    return null
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SESSION_KEY)
  clearAuthHintCookie()
}

export function isAuthenticated() {
  return Boolean(getSession())
}


