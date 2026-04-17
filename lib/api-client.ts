import type { ApiErrorShape } from '@/lib/api-errors'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

export type AuthUser = {
  id: string
  email: string
  fullName: string
}

export type AuthResponse = {
  accessToken: string
  expiresInSeconds: number
  user: AuthUser
}

export type AdminJob = {
  id: string
  title: string
  company: string
  location: string
  status: string
  applications: number
  posted: string
  type?: string
  salary?: string
  description?: string
  requirements?: string
  responsibilities?: string
  application?: string
}

export type AdminApplication = {
  id: string
  candidate: string
  job: string
  status: string
  appliedDate: string
  score: number | null
}

export type AdminUser = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: string
  verified: boolean
  joinedAt: string
}

export type AdminMediaAsset = {
  id: string
  fileName: string
  fileUrl: string
  storageProvider?: string
  storageKey?: string
  mimeType: string
  sizeBytes: string
  category: string
  altText: string | null
  createdAt: string
}

export type AdminReport = {
  id: string
  name: string
  period: string
  status: string
  generatedAt: string | null
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body
      ? isFormData
        ? (options.body as FormData)
        : JSON.stringify(options.body)
      : undefined,
  })

  const payload = (await response.json().catch(() => null)) as (T & ApiErrorShape) | null

  if (!response.ok) {
    throw {
      code: payload?.code || 'API_ERROR',
      message: payload?.message || 'Request failed.',
      fieldErrors: payload?.fieldErrors,
    } as ApiErrorShape
  }

  return payload as T
}

export const apiClient = {
  auth: {
    login: (input: { email: string; password: string }) =>
      request<AuthResponse>('/auth/login', { method: 'POST', body: input }),
    register: (input: {
      firstName: string
      lastName: string
      email: string
      password: string
      confirmPassword: string
    }) => request<AuthResponse>('/auth/register', { method: 'POST', body: input }),
    forgotPassword: (input: { email: string }) =>
      request<{ message: string }>('/auth/forgot-password', { method: 'POST', body: input }),
    resetPassword: (input: { token: string; password: string; confirmPassword: string }) =>
      request<{ message: string }>('/auth/reset-password', { method: 'POST', body: input }),
  },
  contact: {
    submit: (input: { name: string; email: string; subject: string; message: string }) =>
      request<{ ticketId: string; message: string }>('/contact', { method: 'POST', body: input }),
  },
  admin: {
    listJobs: () => request<AdminJob[]>('/admin/jobs'),
    createJob: (input: Partial<AdminJob>) =>
      request<AdminJob>('/admin/jobs', { method: 'POST', body: input }),
    updateJob: (id: string, input: Partial<AdminJob>) =>
      request<AdminJob>(`/admin/jobs/${id}`, { method: 'PATCH', body: input }),
    deleteJob: (id: string) =>
      request<{ deleted: true }>(`/admin/jobs/${id}`, { method: 'DELETE' }),

    listApplications: () => request<AdminApplication[]>('/admin/applications'),
    updateApplicationStatus: (id: string, status: string) =>
      request<AdminApplication>(`/admin/applications/${id}/status`, {
        method: 'PATCH',
        body: { status },
      }),
    deleteApplication: (id: string) =>
      request<{ deleted: true }>(`/admin/applications/${id}`, { method: 'DELETE' }),

    listUsers: () => request<AdminUser[]>('/admin/users'),
    createUser: (input: {
      name: string
      email: string
      phone?: string
      role?: string
      status?: string
      verified?: boolean
      password?: string
    }) => request<AdminUser>('/admin/users', { method: 'POST', body: input }),
    updateUser: (id: string, input: Partial<AdminUser>) =>
      request<AdminUser>(`/admin/users/${id}`, { method: 'PATCH', body: input }),
    deleteUser: (id: string) =>
      request<{ deleted: true }>(`/admin/users/${id}`, { method: 'DELETE' }),

    listMedia: () => request<AdminMediaAsset[]>('/admin/media'),
    createMediaUpload: (input: { file: File; category?: string; altText?: string }) => {
      const formData = new FormData()
      formData.append('file', input.file)
      if (input.category) formData.append('category', input.category)
      if (input.altText) formData.append('altText', input.altText)
      return request<AdminMediaAsset>('/admin/media', { method: 'POST', body: formData })
    },
    deleteMedia: (id: string) =>
      request<{ deleted: true }>(`/admin/media/${id}`, { method: 'DELETE' }),

    listReports: () => request<AdminReport[]>('/admin/reports'),
    createReport: (input: { name: string; period: string; payload?: Record<string, unknown> }) =>
      request<AdminReport>('/admin/reports', { method: 'POST', body: input }),
    updateReport: (id: string, input: Partial<AdminReport>) =>
      request<AdminReport>(`/admin/reports/${id}`, { method: 'PATCH', body: input }),
    deleteReport: (id: string) =>
      request<{ deleted: true }>(`/admin/reports/${id}`, { method: 'DELETE' }),
  },
}

