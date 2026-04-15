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
        src: '/logo-traenco.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  }
}
