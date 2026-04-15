import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  compact?: boolean
  className?: string
  textClassName?: string
  href?: string
}

export function BrandLogo({ compact = false, className, textClassName, href = '/' }: BrandLogoProps) {
  const content = (
    <>
      <Image
        src="/logo-traenco.svg"
        alt="TRAENCO"
        width={compact ? 36 : 44}
        height={compact ? 36 : 44}
        className={cn('rounded-full object-contain bg-white/95 p-0.5 ring-1 ring-border/70', compact ? 'h-9 w-9' : 'h-11 w-11')}
        priority
      />
      <span className={cn('font-bold text-foreground', compact ? 'text-lg' : 'text-xl', textClassName)}>TRAENCO</span>
    </>
  )

  return (
    <Link href={href} className={cn('inline-flex items-center gap-2.5', className)}>
      {content}
    </Link>
  )
}
