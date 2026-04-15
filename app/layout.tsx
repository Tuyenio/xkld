import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import FloatingContactBar from '@/components/floating-contact-bar'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'xkld-vietdai | Premium Vietnam to Taiwan Job Portal',
  description: 'Discover premium job opportunities in Taiwan for Vietnamese professionals. Connect with 50+ top employers, access 500+ jobs, and build your career. Free profile creation.',
  generator: 'v0.app',
  keywords: ['Taiwan jobs', 'Vietnamese professionals', 'overseas recruitment', 'career abroad', 'Taiwan work visa'],
  authors: [{ name: 'XKLD VietDai' }],
  creator: 'XKLD VietDai',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://xkldvietdai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xkldvietdai.com',
    siteName: 'XKLD VietDai',
    title: 'xkld-vietdai | Premium Vietnam to Taiwan Job Portal',
    description: 'Find premium job opportunities in Taiwan for Vietnamese professionals',
    images: [
      {
        url: 'https://xkldvietdai.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xkld-vietdai | Premium Vietnam to Taiwan Job Portal',
    description: 'Find premium job opportunities in Taiwan for Vietnamese professionals',
    creator: '@xkldvietdai',
    images: ['https://xkldvietdai.com/twitter-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <FloatingContactBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
