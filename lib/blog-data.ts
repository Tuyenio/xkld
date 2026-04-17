export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: number
  status: 'Published' | 'Draft'
  views: number
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'top-10-tips-ace-taiwan-job-interview',
    title: 'Top 10 Tips to Ace Your Taiwan Job Interview',
    excerpt:
      'Learn the secrets to impressing Taiwan employers and landing your dream job with these proven interview tips.',
    content:
      'Preparing for a job interview in Taiwan requires understanding both the position and the cultural nuances of Taiwanese businesses...',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    category: 'Career Tips',
    image: '🎯',
    readTime: 5,
    status: 'Published',
    views: 1240,
  },
  {
    id: 2,
    slug: 'guide-finding-accommodation-taipei',
    title: 'Guide to Finding Accommodation in Taipei',
    excerpt:
      "Everything you need to know about finding the perfect place to live in Taiwan's bustling capital city.",
    content:
      'Finding accommodation in Taipei can seem daunting, but with the right approach and resources, you can find a great place...',
    author: 'Mike Chen',
    date: '2024-03-10',
    category: 'Living in Taiwan',
    image: '🏠',
    readTime: 8,
    status: 'Published',
    views: 856,
  },
  {
    id: 3,
    slug: 'salary-negotiation-taiwan-what-you-need-know',
    title: 'Salary Negotiation in Taiwan: What You Need to Know',
    excerpt:
      "Master the art of negotiating your salary and benefits package in the Taiwan job market.",
    content:
      "Salary negotiation can be intimidating, but it's an important part of securing a good employment package...",
    author: 'Lisa Wong',
    date: '2024-03-05',
    category: 'Salary & Benefits',
    image: '💰',
    readTime: 6,
    status: 'Draft',
    views: 0,
  },
  {
    id: 4,
    slug: 'cultural-guide-taiwanese-business-etiquette',
    title: 'Cultural Guide: Understanding Taiwanese Business Etiquette',
    excerpt:
      'Learn the cultural norms and business etiquette practices that will help you succeed in Taiwan.',
    content:
      'Understanding cultural norms is crucial when working in Taiwan. Here are the key points to remember...',
    author: 'David Lee',
    date: '2024-02-28',
    category: 'Culture',
    image: '🤝',
    readTime: 7,
    status: 'Published',
    views: 620,
  },
  {
    id: 5,
    slug: 'tech-industry-boom-taiwan-job-opportunities',
    title: "Tech Industry Boom in Taiwan: Job Opportunities You Shouldn't Miss",
    excerpt:
      "Discover why Taiwan's tech sector is booming and what opportunities await Vietnamese engineers.",
    content:
      'Taiwan has become a global hub for semiconductor manufacturing and software development...',
    author: 'John Park',
    date: '2024-02-20',
    category: 'Industry News',
    image: '💻',
    readTime: 9,
    status: 'Published',
    views: 740,
  },
  {
    id: 6,
    slug: 'essential-documents-taiwan-work-visa',
    title: 'Essential Documents for Your Taiwan Work Visa Application',
    excerpt:
      "Complete checklist of documents you'll need for a smooth visa application process.",
    content:
      'Preparing the right documents is essential for a successful Taiwan work visa application...',
    author: 'Emily Zhang',
    date: '2024-02-15',
    category: 'Visa & Immigration',
    image: '📋',
    readTime: 6,
    status: 'Published',
    views: 510,
  },
]

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug)

