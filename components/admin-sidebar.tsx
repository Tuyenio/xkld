'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Briefcase, Users, FileText, Settings, LogOut, Menu, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const saved = window.localStorage.getItem('admin-sidebar-collapsed')
    if (saved === '1') setIsCollapsed(true)
  }, [])

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      window.localStorage.setItem('admin-sidebar-collapsed', next ? '1' : '0')
      return next
    })
  }

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
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 right-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg"
        aria-label="Toggle admin menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-primary text-primary-foreground transition-all duration-300 transform z-40 lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto lg:shrink-0 lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-72 lg:w-20' : 'w-72'}`}
      >
        <div className="flex h-full min-h-dvh flex-col">
          <div className="px-4 py-5 border-b border-primary-foreground/20">
            <div className={`flex items-start ${isCollapsed ? 'lg:justify-center' : 'justify-between'} gap-2`}>
              <div className={isCollapsed ? 'lg:hidden' : ''}>
                <h2 className="text-3xl lg:text-2xl font-bold tracking-tight">Admin Panel</h2>
                <p className="text-sm text-primary-foreground/70 mt-2">Operations Console</p>
              </div>
              <button
                type="button"
                onClick={toggleCollapsed}
                className="hidden lg:inline-flex p-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center ${isCollapsed ? 'lg:justify-center lg:px-2' : 'gap-3 px-4'} py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
                >
                  <item.icon size={20} />
                  <span className={`font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="px-4 py-4 border-t border-primary-foreground/20 space-y-1">
            <Link
              href="/admin/settings"
              title={isCollapsed ? 'Settings' : undefined}
              className={`flex items-center w-full py-3 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl transition-colors ${isCollapsed ? 'lg:justify-center lg:px-2' : 'gap-3 px-4'}`}
            >
              <Settings size={20} />
              <span className={`font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>Settings</span>
            </Link>
            <button
              title={isCollapsed ? 'Logout' : undefined}
              className={`flex items-center w-full py-3 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl transition-colors ${isCollapsed ? 'lg:justify-center lg:px-2' : 'gap-3 px-4'}`}
            >
              <LogOut size={20} />
              <span className={`font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
