import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_HINT_COOKIE_KEY = 'xkld_auth_hint'

type AuthHint = {
  expiresAt?: number
  role?: string
}

function parseAuthHint(value: string | undefined): AuthHint | null {
  if (!value) return null

  try {
	return JSON.parse(decodeURIComponent(value)) as AuthHint
  } catch {
	return null
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const authHint = parseAuthHint(request.cookies.get(AUTH_HINT_COOKIE_KEY)?.value)
  const isLoggedIn = Boolean(authHint?.expiresAt && authHint.expiresAt > Date.now())

  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) && !isLoggedIn) {
	const redirectUrl = request.nextUrl.clone()
	redirectUrl.pathname = '/login'
	redirectUrl.searchParams.set('next', pathname)
	return NextResponse.redirect(redirectUrl)
  }

  if (pathname.startsWith('/admin') && isLoggedIn && authHint?.role !== 'admin') {
	const redirectUrl = request.nextUrl.clone()
	redirectUrl.pathname = '/dashboard'
	redirectUrl.search = ''
	return NextResponse.redirect(redirectUrl)
  }

  if ((pathname === '/login' || pathname === '/signup') && isLoggedIn) {
	const redirectUrl = request.nextUrl.clone()
	redirectUrl.pathname = authHint?.role === 'admin' ? '/admin' : '/dashboard'
	redirectUrl.search = ''
	return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export default middleware

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/signup'],
}

