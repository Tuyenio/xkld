import type { AuthUser } from '@/lib/api-client'

const SESSION_KEY = 'xkld_session'

export type AppSession = {
  accessToken: string
  expiresAt: number
  user: AuthUser
}

export function saveSession(input: { accessToken: string; expiresInSeconds: number; user: AuthUser }) {
  if (typeof window === 'undefined') return

  const session: AppSession = {
    accessToken: input.accessToken,
    expiresAt: Date.now() + input.expiresInSeconds * 1000,
    user: input.user,
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession(): AppSession | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as AppSession
    if (!parsed.accessToken || !parsed.expiresAt || !parsed.user) {
      window.localStorage.removeItem(SESSION_KEY)
      return null
    }

    if (parsed.expiresAt <= Date.now()) {
      window.localStorage.removeItem(SESSION_KEY)
      return null
    }

    return parsed
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated() {
  return Boolean(getSession())
}

