'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Briefcase, Users, FileText, Settings, LogOut, Menu, X, PanelLeftClose, PanelLeftOpen, ClipboardList } from 'lucide-react'
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

  const isItemActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname === href || pathname.startsWith(`${href}/`)
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
    { icon: ClipboardList, label: 'QA Checklist', href: '/admin/qa' },
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
        className={`fixed inset-y-0 left-0 z-40 bg-primary text-primary-foreground shadow-2xl transition-all duration-300 transform lg:relative lg:inset-auto lg:translate-x-0 lg:z-auto lg:shrink-0 lg:h-svh lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-72 lg:w-[5.25rem]' : 'w-72'}`}
      >
        <div className="flex h-full min-h-svh flex-col">
          <div className="shrink-0 border-b border-primary-foreground/20 px-3 py-4 lg:px-4 lg:py-5">
            <div className={`flex items-start ${isCollapsed ? 'lg:justify-center' : 'justify-between'} gap-2`}>
              <div className={isCollapsed ? 'lg:hidden' : ''}>
                <h2 className="text-[1.7rem] leading-tight lg:text-2xl font-bold tracking-tight">Admin Panel</h2>
                <p className="mt-1 text-xs font-medium text-primary-foreground/70 lg:text-sm">Operations Console</p>
              </div>
              <button
                type="button"
                onClick={toggleCollapsed}
                className="hidden lg:inline-flex rounded-lg p-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </button>
            </div>
          </div>

          <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-3 lg:px-4 lg:py-4">
            {navItems.map((item) => {
              const isActive = isItemActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex items-center ${isCollapsed ? 'lg:justify-center lg:px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${
                    isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
                >
                  <item.icon size={18} className="transition-transform duration-200 group-hover:scale-105" />
                  <span className={`text-[0.95rem] font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="shrink-0 space-y-1 border-t border-primary-foreground/20 px-3 py-3 lg:px-4 lg:py-4">
            <Link
              href="/admin/settings"
              title={isCollapsed ? 'Settings' : undefined}
              className={`flex items-center w-full rounded-xl py-2.5 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${isCollapsed ? 'lg:justify-center lg:px-2' : 'gap-3 px-3'}`}
            >
              <Settings size={18} />
              <span className={`text-[0.95rem] font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>Settings</span>
            </Link>
            <button
              title={isCollapsed ? 'Logout' : undefined}
              className={`flex items-center w-full rounded-xl py-2.5 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${isCollapsed ? 'lg:justify-center lg:px-2' : 'gap-3 px-3'}`}
            >
              <LogOut size={18} />
              <span className={`text-[0.95rem] font-medium ${isCollapsed ? 'lg:hidden' : ''}`}>Logout</span>
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
