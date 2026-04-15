import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { AnimatedCounter } from '@/components/animated-counter'
import { PremiumButton } from '@/components/premium-button'
import Link from 'next/link'
import { Award, Users, Target, Globe, Zap, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            About <span className="gradient-text">XKLD VietDai</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Transforming careers by connecting Vietnamese professionals with premium opportunities in Taiwan
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <GlassCard className="p-8 flex flex-col justify-center">
              <Target className="w-12 h-12 text-accent mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower Vietnamese professionals by providing access to premium job opportunities in Taiwan, while helping Taiwan&apos;s leading companies find exceptional talent. We bridge cultures and create lasting career transformations.
              </p>
            </GlassCard>

            <GlassCard className="p-8 flex flex-col justify-center">
              <Globe className="w-12 h-12 text-accent mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the most trusted recruitment platform connecting ASEAN talent with global opportunities. We envision a world where professional borders disappear and talent flows freely.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center text-balance">
            By The <span className="gradient-text">Numbers</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 1000, suffix: '+', label: 'Successful Placements' },
              { number: 500, suffix: '+', label: 'Active Job Listings' },
              { number: 50, suffix: '+', label: 'Partner Companies' },
              { number: 98, suffix: '%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  <AnimatedCounter end={stat.number} duration={2000} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center text-balance">
            Our Core <span className="gradient-text">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Award size={32} className="text-accent" />,
                title: 'Excellence',
                description: 'We maintain the highest standards in everything we do, from job curation to candidate support.',
              },
              {
                icon: <Heart size={32} className="text-accent" />,
                title: 'Care',
                description: 'We genuinely care about our candidates&apos; success and well-being throughout their journey.',
              },
              {
                icon: <Zap size={32} className="text-accent" />,
                title: 'Innovation',
                description: 'We constantly improve our platform with cutting-edge technology and user experience.',
              },
              {
                icon: <Users size={32} className="text-accent" />,
                title: 'Community',
                description: 'We build a supportive community where professionals connect and grow together.',
              },
              {
                icon: <Globe size={32} className="text-accent" />,
                title: 'Diversity',
                description: 'We celebrate diverse backgrounds and perspectives in our team and professional network.',
              },
              {
                icon: <Target size={32} className="text-accent" />,
                title: 'Transparency',
                description: 'We believe in honest communication and clear expectations with all stakeholders.',
              },
            ].map((value, i) => (
              <GlassCard key={i} className="p-8">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center text-balance">
            Meet Our <span className="gradient-text">Leadership</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Văn Anh',
                role: 'Founder & CEO',
                bio: '15+ years in recruitment and talent management. Passionate about connecting talent with opportunity.',
                avatar: 'N',
              },
              {
                name: 'Trần Thị Bình',
                role: 'Head of Operations',
                bio: 'Expert in process optimization and scaling. Ensures seamless experience for all users.',
                avatar: 'T',
              },
              {
                name: 'Hoàng Minh Chí',
                role: 'Chief Technology Officer',
                bio: 'Full-stack developer with passion for user experience. Building the future of recruitment.',
                avatar: 'H',
              },
            ].map((member, i) => (
              <GlassCard key={i} className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-3xl shadow-premium">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-accent font-semibold mb-4">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Whether you&apos;re a job seeker or employer, let&apos;s build something amazing together.
          </p>
          <Link href="/signup">
            <PremiumButton variant="secondary" size="lg">
              Get Started Today
            </PremiumButton>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
