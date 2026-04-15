import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TRAENCO Jobs Portal',
    short_name: 'TRAENCO',
    description: 'TRAENCO - Premium Vietnam to Taiwan job portal',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2a53a4',
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
