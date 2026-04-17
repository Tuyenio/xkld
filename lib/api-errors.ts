export type ApiFieldErrors = Record<string, string>

export type ApiErrorShape = {
  code?: string
  message?: string
  fieldErrors?: ApiFieldErrors
}

export function toApiErrorMessage(error: unknown, fallback = 'Unexpected error. Please try again.'): string {
  if (!error) return fallback

  if (typeof error === 'string') return error

  if (typeof error === 'object') {
    const maybeError = error as { message?: unknown }
    if (typeof maybeError.message === 'string' && maybeError.message.trim()) {
      return maybeError.message
    }
  }

  return fallback
}

