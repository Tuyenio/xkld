'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { clearSession, getSession } from '@/lib/session'

type RouteGuardProps = {
  children: ReactNode
  redirectTo?: string
  requiredRole?: string
}

export function RouteGuard({ children, redirectTo = '/login', requiredRole }: RouteGuardProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const session = getSession({ allowExpired: true })
    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : ''
    if (!session) {
      router.replace(`${redirectTo}${next}`)
      return
    }

    void apiClient.auth
      .me(session.accessToken)
      .then((user) => {
        if (requiredRole && user.role !== requiredRole) {
          router.replace('/dashboard')
        }
      })
      .catch(() => {
        clearSession()
        router.replace(`${redirectTo}${next}`)
      })
  }, [pathname, redirectTo, requiredRole, router])

  const session = getSession({ allowExpired: true })
  if (!session || (requiredRole && session.user.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}


