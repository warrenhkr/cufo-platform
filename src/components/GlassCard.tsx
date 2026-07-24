import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/8 border border-white/10 rounded-3xl shadow-lg shadow-black/20 ${className}`}
    >
      {children}
    </div>
  )
}