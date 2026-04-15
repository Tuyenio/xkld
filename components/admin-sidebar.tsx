'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Briefcase, Users, FileText, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: FileText, label: 'Reports', href: '/admin/reports' },
    { icon: Briefcase, label: 'Jobs', href: '/admin/jobs' },
    { icon: Users, label: 'Candidates', href: '/admin/candidates' },
    { icon: FileText, label: 'Applications', href: '/admin/applications' },
    { icon: FileText, label: 'Blog', href: '/admin/blog' },
    { icon: FileText, label: 'Media', href: '/admin/media' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 right-4 z-40 p-2 bg-primary text-primary-foreground rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-primary text-primary-foreground pt-16 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:top-auto md:h-screen z-30`}
      >
        <div className="p-6 border-b border-primary-foreground/20 mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 border-t border-primary-foreground/20 pt-4">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-primary-foreground/70 hover:bg-primary-foreground/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
