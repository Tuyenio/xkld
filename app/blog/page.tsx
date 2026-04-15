'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { ScrollReveal } from '@/components/scroll-reveal'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Search, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useMemo, useState } from 'react'

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Tips to Ace Your Taiwan Job Interview',
    excerpt: 'Learn the secrets to impressing Taiwan employers and landing your dream job with these proven interview tips.',
    content: 'Preparing for a job interview in Taiwan requires understanding both the position and the cultural nuances of Taiwanese businesses...',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    category: 'Career Tips',
    image: '🎯',
    readTime: 5,
  },
  {
    id: 2,
    title: 'Guide to Finding Accommodation in Taipei',
    excerpt: 'Everything you need to know about finding the perfect place to live in Taiwan\'s bustling capital city.',
    content: 'Finding accommodation in Taipei can seem daunting, but with the right approach and resources, you can find a great place...',
    author: 'Mike Chen',
    date: '2024-03-10',
    category: 'Living in Taiwan',
    image: '🏠',
    readTime: 8,
  },
  {
    id: 3,
    title: 'Salary Negotiation in Taiwan: What You Need to Know',
    excerpt: 'Master the art of negotiating your salary and benefits package in the Taiwan job market.',
    content: 'Salary negotiation can be intimidating, but it\'s an important part of securing a good employment package...',
    author: 'Lisa Wong',
    date: '2024-03-05',
    category: 'Salary & Benefits',
    image: '💰',
    readTime: 6,
  },
  {
    id: 4,
    title: 'Cultural Guide: Understanding Taiwanese Business Etiquette',
    excerpt: 'Learn the cultural norms and business etiquette practices that will help you succeed in Taiwan.',
    content: 'Understanding cultural norms is crucial when working in Taiwan. Here are the key points to remember...',
    author: 'David Lee',
    date: '2024-02-28',
    category: 'Culture',
    image: '🤝',
    readTime: 7,
  },
  {
    id: 5,
    title: 'Tech Industry Boom in Taiwan: Job Opportunities You Shouldn\'t Miss',
    excerpt: 'Discover why Taiwan\'s tech sector is booming and what opportunities await Vietnamese engineers.',
    content: 'Taiwan has become a global hub for semiconductor manufacturing and software development...',
    author: 'John Park',
    date: '2024-02-20',
    category: 'Industry News',
    image: '💻',
    readTime: 9,
  },
  {
    id: 6,
    title: 'Essential Documents for Your Taiwan Work Visa Application',
    excerpt: 'Complete checklist of documents you\'ll need for a smooth visa application process.',
    content: 'Preparing the right documents is essential for a successful Taiwan work visa application...',
    author: 'Emily Zhang',
    date: '2024-02-15',
    category: 'Visa & Immigration',
    image: '📋',
    readTime: 6,
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const searchablePosts = blogPosts.slice(1)
  const categories = useMemo(
    () => ['All Posts', ...new Set(searchablePosts.map((post) => post.category))],
    [searchablePosts]
  )

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return searchablePosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory
      const matchesQuery =
        query.length === 0 ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [searchQuery, selectedCategory, searchablePosts])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Posts')
    setCurrentPage(1)
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Career & Life <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Expert guides, industry trends, and practical tips for your journey to Taiwan employment
            </p>
          </ScrollReveal>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles..."
                className="pl-12 bg-background/50 backdrop-blur-md border border-border/50"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <PremiumButton variant="primary" onClick={() => setCurrentPage(1)}>
              Search
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-border/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <PremiumButton
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </PremiumButton>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <GlassCard className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-transparent p-12 flex items-center justify-center min-h-96 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-9xl block">{blogPosts[0].image}</span>
                  </div>
                  <span className="text-9xl relative">{blogPosts[0].image}</span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="bg-accent/20 text-accent text-xs font-bold px-4 py-1.5 rounded-full border border-accent/30">
                        ✨ Featured
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{blogPosts[0].category}</span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight group-hover:text-accent transition-colors">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                      {blogPosts[0].excerpt}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-accent" />
                        <span className="font-medium">{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-accent" />
                        <span>{new Date(blogPosts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="text-accent font-medium">{blogPosts[0].readTime} min read</div>
                    </div>
                    <Link href={`/blog/${blogPosts[0].id}`}>
                      <PremiumButton variant="primary" icon={<ArrowRight size={18} />} className="w-full md:w-auto">
                        Read Full Article
                      </PremiumButton>
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <TrendingUp className="w-6 h-6 text-accent" />
                <h2 className="text-3xl font-bold text-foreground">Latest Articles</h2>
                <span className="text-sm text-muted-foreground">
                  {filteredPosts.length} results
                </span>
            </div>
          </ScrollReveal>

            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPosts.map((post, index) => (
                    <ScrollReveal key={post.id} delay={index * 0.1}>
                      <Link href={`/blog/${post.id}`}>
                        <GlassCard className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                          <div className="flex items-start justify-between mb-4">
                            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                              {post.image}
                            </span>
                            <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-medium border border-accent/30">
                              {post.readTime}m
                            </span>
                          </div>

                          <div className="space-y-3 flex-grow flex flex-col">
                            <p className="text-xs text-accent font-bold uppercase tracking-wide">{post.category}</p>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">{post.excerpt}</p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="font-medium">{post.author}</span>
                              <span className="text-muted-foreground/60">
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
                          </div>
                        </GlassCard>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <PremiumButton
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </PremiumButton>
                    <span className="text-sm text-muted-foreground px-2">
                      Page {currentPage} / {totalPages}
                    </span>
                    <PremiumButton
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </PremiumButton>
                  </div>
                )}
              </>
            ) : (
              <GlassCard className="p-10 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try another keyword or reset filters to see all available insights.
                </p>
                <PremiumButton variant="primary" onClick={clearFilters}>
                  Clear filters
                </PremiumButton>
              </GlassCard>
            )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Stay Updated with Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              Subscribe to get early access to articles, job opportunities, and exclusive career tips delivered to your inbox.
            </p>
            
            <GlassCard className="p-1 flex flex-col sm:flex-row gap-1 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-background/50 border-0"
              />
              <PremiumButton variant="primary" size="lg" className="whitespace-nowrap">
                Subscribe
              </PremiumButton>
            </GlassCard>

            <p className="text-xs text-muted-foreground mt-4">
              ✓ No spam. Unsubscribe anytime. Your privacy is protected.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
