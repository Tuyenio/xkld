import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { ScrollProgressBar } from '@/components/scroll-progress-bar'
import { ArrowRight, Calendar, Share2, User } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/blog-data'

const SITE_URL = 'https://xkldvietdai.com'

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Article Not Found | XKLD VietDai',
      description: 'The requested article is not available.',
      robots: { index: false, follow: false },
    }
  }

  const canonical = `/blog/${post.slug}`
  const title = `${post.title} | XKLD VietDai Blog`

  return {
    title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title,
      description: post.excerpt,
      siteName: 'XKLD VietDai',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
      images: [`${SITE_URL}/og-image.png`],
      creator: '@xkldvietdai',
    },
  }
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'XKLD VietDai',
    },
    description: post.excerpt,
    mainEntityOfPage: `https://xkldvietdai.com/blog/${params.slug}`,
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xkldvietdai.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://xkldvietdai.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://xkldvietdai.com/blog/${params.slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <ScrollProgressBar />
      <Header />
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            <p className="badge-premium mb-4">{post.category}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1"><User size={14} />{post.author}</span>
              <span className="inline-flex items-center gap-1"><Calendar size={14} />{post.date}</span>
            </div>

            <GlassCard className="p-8 space-y-5 leading-relaxed text-muted-foreground">
              <p>
                This article section is structured for long-form editorial content. It includes readable typography,
                semantic hierarchy, and conversion-focused CTA blocks for premium recruitment content strategy.
              </p>
              <p>
                Continue with migration guides, role-specific interview prep, compensation benchmarking, and legal
                onboarding checklists to maximize user trust and SEO depth.
              </p>
              <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
                <h3 className="font-bold text-foreground mb-2">Key Takeaway</h3>
                <p>Consistency in profile quality and interview preparation is the highest-leverage conversion driver.</p>
              </div>
            </GlassCard>

            <div className="mt-8 flex flex-wrap gap-3">
              <PremiumButton variant="outline" icon={<Share2 size={16} />}>Share</PremiumButton>
              <Link href="/blog">
                <PremiumButton variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">Read More Articles</PremiumButton>
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <GlassCard className="p-5">
                <h3 className="font-bold text-foreground mb-3">Table of Contents</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Introduction</li>
                  <li>Preparation Checklist</li>
                  <li>Common Mistakes</li>
                  <li>Final Strategy</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-5">
                <h3 className="font-bold text-foreground mb-2">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">Get weekly hiring insights and market intelligence.</p>
                <Link href="/contact">
                  <PremiumButton variant="secondary" size="sm" className="w-full">Subscribe</PremiumButton>
                </Link>
              </GlassCard>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  )
}
