const ALLOWED_TAGS = new Set([
  'p',
  'br',
  'strong',
  'em',
  'u',
  'ul',
  'ol',
  'li',
  'a',
  'img',
  'h2',
  'h3',
  'blockquote',
  'code',
  'pre',
])

const GLOBAL_ALLOWED_ATTRIBUTES = new Set(['class'])
const TAG_ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt']),
}

const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:']

const isSafeUrl = (value: string): boolean => {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true

  try {
    const parsed = new URL(trimmed, 'https://safe.local')
    return SAFE_PROTOCOLS.includes(parsed.protocol)
  } catch {
    return false
  }
}

const sanitizeElement = (element: Element) => {
  const tagName = element.tagName.toLowerCase()

  if (!ALLOWED_TAGS.has(tagName)) {
    element.replaceWith(...Array.from(element.childNodes))
    return
  }

  const allowedAttrs = new Set([
    ...GLOBAL_ALLOWED_ATTRIBUTES,
    ...(TAG_ALLOWED_ATTRIBUTES[tagName] || []),
  ])

  for (const attr of Array.from(element.attributes)) {
    const key = attr.name.toLowerCase()
    const value = attr.value

    if (key.startsWith('on')) {
      element.removeAttribute(attr.name)
      continue
    }

    if (!allowedAttrs.has(key)) {
      element.removeAttribute(attr.name)
      continue
    }

    if ((key === 'href' || key === 'src') && !isSafeUrl(value)) {
      element.removeAttribute(attr.name)
      continue
    }

    if (key === 'target') {
      element.setAttribute(attr.name, value === '_blank' ? '_blank' : '_self')
      continue
    }

    if (key === 'rel' && !value.trim()) {
      element.setAttribute(attr.name, 'noreferrer noopener')
    }
  }
}

export function sanitizeHtml(input: string): string {
  if (!input) return ''

  if (typeof window === 'undefined') {
    return input
      .replace(/<\/?(script|style|iframe|object|embed|link|meta|svg|math)[^>]*>/gi, '')
      .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/<\/?(?!p|br|strong|em|u|ul|ol|li|a|img|h2|h3|blockquote|code|pre)\w+[^>]*>/gi, '')
  }

  const parser = new DOMParser()
  const document = parser.parseFromString(input, 'text/html')

  document.querySelectorAll('script, style, iframe, object, embed, link, meta, svg, math').forEach((node) => node.remove())
  document.querySelectorAll('*').forEach((element) => sanitizeElement(element))

  return document.body.innerHTML
}
