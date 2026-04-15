import type { Metadata } from 'next'

const SITE_NAME = 'XKLD VietDai'
const SITE_URL = 'https://xkldvietdai.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

type BuildMetadataInput = {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

export function buildPageMetadata({ title, description, path, noIndex = false }: BuildMetadataInput): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const fullTitle = `${title} | ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
      creator: '@xkldvietdai',
    },
  }
}

type BuildPrivateMetadataInput = {
  title: string
  description: string
  path: string
}

export function buildPrivateMetadata({ title, description, path }: BuildPrivateMetadataInput): Metadata {
  const base = buildPageMetadata({
    title,
    description,
    path,
    noIndex: true,
  })

  const isProduction = process.env.NODE_ENV === 'production'

  return {
    ...base,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        nosnippet: !isProduction,
        noarchive: true,
        'max-image-preview': 'none',
        'max-snippet': isProduction ? 0 : -1,
        'max-video-preview': -1,
      },
    },
  }
}
