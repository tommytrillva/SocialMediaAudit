'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 font-medium rounded-xl
      transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      focus:outline-none focus:ring-2 focus:ring-accent/20
    `

    const variants = {
      primary: `
        bg-gradient-luxury text-background
        hover:shadow-glow hover:scale-[1.02]
        active:scale-[0.98]
      `,
      secondary: `
        bg-background-elevated text-foreground border border-border
        hover:border-accent/50 hover:bg-background-tertiary
        active:scale-[0.98]
      `,
      ghost: `
        text-foreground-muted
        hover:text-foreground hover:bg-background-elevated
        active:scale-[0.98]
      `,
      danger: `
        bg-error text-white
        hover:bg-error/90 hover:shadow-lg
        active:scale-[0.98]
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps }
