'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}: PremiumButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90 active:scale-95',
    secondary: 'bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:bg-secondary/90 active:scale-95',
    accent: 'bg-accent text-accent-foreground shadow-md hover:shadow-lg hover:bg-accent/90 active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 hover:shadow-md active:scale-95',
    ghost: 'text-primary hover:bg-primary/10 active:scale-95',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {children}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  )
}
