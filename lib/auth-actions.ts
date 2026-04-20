'use client'

import { apiClient } from '@/lib/api-client'
import { clearSession, getSession } from '@/lib/session'

export async function signOut() {
  const session = getSession()
  try {
    await apiClient.auth.logout({ refreshToken: session?.refreshToken })
  } catch {
    // Ignore network/logout errors and always clear local session state.
  } finally {
    clearSession()
  }
}

