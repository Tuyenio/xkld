export type DashboardNavItem = {
  href: string
  label: string
  description: string
  key: 'overview' | 'profile' | 'resume' | 'notifications' | 'security' | 'settings' | 'saved'
}

export const dashboardNavItems: DashboardNavItem[] = [
  {
    href: '/dashboard',
    label: 'Overview',
    description: 'Applications and recommendations',
    key: 'overview',
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    description: 'Identity, skills, and history',
    key: 'profile',
  },
  {
    href: '/dashboard/resume',
    label: 'Resume',
    description: 'Manage CV and versions',
    key: 'resume',
  },
  {
    href: '/dashboard/notifications',
    label: 'Notifications',
    description: 'Interview and recruiter updates',
    key: 'notifications',
  },
  {
    href: '/dashboard/security',
    label: 'Security',
    description: '2FA, sessions, and password policy',
    key: 'security',
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    description: 'Preferences and privacy',
    key: 'settings',
  },
  {
    href: '/dashboard/saved-jobs',
    label: 'Saved Jobs',
    description: 'Bookmarked opportunities',
    key: 'saved',
  },
]

export type ProfileCompletionItem = {
  id: string
  label: string
  done: boolean
}

export const profileCompletionItems: ProfileCompletionItem[] = [
  { id: 'basic', label: 'Basic profile info', done: true },
  { id: 'avatar', label: 'Professional avatar', done: true },
  { id: 'skills', label: 'Skills and language levels', done: true },
  { id: 'work', label: 'Work history', done: true },
  { id: 'education', label: 'Education history', done: true },
  { id: 'cv', label: 'Resume uploaded', done: false },
]

export const getProfileCompletionScore = (items: ProfileCompletionItem[]) => {
  if (!items.length) return 0
  const done = items.filter((item) => item.done).length
  return Math.round((done / items.length) * 100)
}
