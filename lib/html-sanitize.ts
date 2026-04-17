const BLOCKED_TAGS = ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta']

export function sanitizeHtml(input: string): string {
  if (!input) return ''
  if (typeof window === 'undefined') {
    return input
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
      .replace(/javascript:/gi, '')
  }

  const parser = new DOMParser()
  const document = parser.parseFromString(input, 'text/html')

  BLOCKED_TAGS.forEach((tag) => {
    document.querySelectorAll(tag).forEach((node) => node.remove())
  })

  document.querySelectorAll('*').forEach((element) => {
    for (const attr of Array.from(element.attributes)) {
      const key = attr.name.toLowerCase()
      const value = attr.value.toLowerCase()
      if (key.startsWith('on')) {
        element.removeAttribute(attr.name)
        continue
      }
      if ((key === 'href' || key === 'src') && value.startsWith('javascript:')) {
        element.removeAttribute(attr.name)
      }
    }
  })

  return document.body.innerHTML
}

