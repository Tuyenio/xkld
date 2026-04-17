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

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
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
  },
  contact: {
    submit: (input: { name: string; email: string; subject: string; message: string }) =>
      request<{ ticketId: string; message: string }>('/contact', { method: 'POST', body: input }),
  },
}

