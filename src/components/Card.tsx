'use client'

import { ReactNode } from 'react'
import { motion } from 'motion/react'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  glow?: 'none' | 'red' | 'gold'
  accent?: 'none' | 'red' | 'gold'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children,
  className = '',
  interactive = false,
  glow = 'none',
  accent = 'none',
  padding = 'md',
}: CardProps) {
  const glowClass =
    glow === 'red' ? 'ring-1 ring-red-600/30' : glow === 'gold' ? 'ring-1 ring-gold-400/40' : ''

  const hasAccent = accent !== 'none'
  const accentBarColor = accent === 'red' ? 'bg-red-600' : accent === 'gold' ? 'bg-gold-400' : ''

  const baseClasses = `card-surface relative ${hasAccent ? 'overflow-hidden' : ''} ${paddingClasses[padding]} ${glowClass} ${className}`

  const content = (
    <>
      {hasAccent && <span className={`absolute inset-x-0 top-0 h-1 ${accentBarColor}`} />}
      {children}
    </>
  )

  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`${baseClasses} cursor-pointer`}
      >
        {content}
      </motion.div>
    )
  }

  return <div className={baseClasses}>{content}</div>
}