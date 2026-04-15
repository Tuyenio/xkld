import AdminSidebar from '@/components/admin-sidebar'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { ImagePlus } from 'lucide-react'

export default function AdminMediaPage() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 p-6">
        <h1 className="text-4xl font-bold text-foreground mb-6">Media Library</h1>
        <GlassCard className="p-8 text-center border-dashed border-2 border-border/70">
          <ImagePlus size={28} className="mx-auto mb-3 text-accent" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Manage campaign and content assets</h2>
          <p className="text-muted-foreground mb-5">Upload logos, banners, article thumbnails, and employer gallery media.</p>
          <PremiumButton variant="primary">Upload New Media</PremiumButton>
        </GlassCard>
      </main>
    </div>
  )
}
