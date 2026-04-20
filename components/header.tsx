'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumButton } from './premium-button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandLogo } from '@/components/brand-logo'
import { getSession } from '@/lib/session'
import { signOut } from '@/lib/auth-actions'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dashboardHref, setDashboardHref] = useState('/dashboard')
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (!session) {
      setIsAuthenticated(false)
      setDashboardHref('/dashboard')
      return
    }

    setIsAuthenticated(true)
    setDashboardHref(session.user.role === 'admin' ? '/admin' : '/dashboard')
  }, [])

  const handleLogout = async () => {
    await signOut()
    setIsAuthenticated(false)
    setMobileMenuOpen(false)
    router.push('/login')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/jobs', label: 'Jobs' },
    { href: '/about', label: 'About' },
    { href: '/guide', label: 'Guide' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-dark shadow-premium'
          : 'bg-white/50 backdrop-blur-md'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <BrandLogo className="group" textClassName="hidden sm:inline" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href={dashboardHref}>
                  <PremiumButton variant="ghost" size="md">
                    Dashboard
                  </PremiumButton>
                </Link>
                <PremiumButton variant="outline" size="md" onClick={() => void handleLogout()}>
                  Sign Out
                </PremiumButton>
              </>
            ) : (
              <>
                <Link href="/login">
                  <PremiumButton variant="ghost" size="md">
                    Sign In
                  </PremiumButton>
                </Link>
                <Link href="/signup">
                  <PremiumButton variant="primary" size="md">
                    Apply Now
                  </PremiumButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-foreground hover:text-primary py-2 px-2 rounded-lg hover:bg-primary/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              {isAuthenticated ? (
                <>
                  <Link href={dashboardHref} className="w-full">
                    <PremiumButton variant="outline" size="md" className="w-full">
                      Dashboard
                    </PremiumButton>
                  </Link>
                  <PremiumButton
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => void handleLogout()}
                  >
                    Sign Out
                  </PremiumButton>
                </>
              ) : (
                <>
                  <Link href="/login" className="w-full">
                    <PremiumButton variant="outline" size="md" className="w-full">
                      Sign In
                    </PremiumButton>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <PremiumButton variant="primary" size="md" className="w-full">
                      Apply Now
                    </PremiumButton>
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
