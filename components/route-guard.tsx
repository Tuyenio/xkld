'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getSession } from '@/lib/session'

type RouteGuardProps = {
  children: ReactNode
  redirectTo?: string
}

export function RouteGuard({ children, redirectTo = '/login' }: RouteGuardProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const session = getSession()
    if (!session) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : ''
      router.replace(`${redirectTo}${next}`)
    }
  }, [pathname, redirectTo, router])

  if (!getSession()) {
    return null
  }

  return <>{children}</>
}


