'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Radio, Calendar, Trophy, Users } from 'lucide-react'

const navItems = [
  { href: '/live', label: 'En Direct', icon: Radio },
  { href: '/planning', label: 'Planning & Résultats', icon: Calendar },
  { href: '/classement', label: 'Classement & Stats', icon: Trophy },
  { href: '/equipes', label: 'Actualités & Équipes', icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 hidden md:flex flex-col gap-2 p-6 backdrop-blur-xl bg-white/[0.08] border-r border-white/10">
      <h1 className="text-amber-400 text-xl font-bold mb-8">CUSA UCAO</h1>

      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
              isActive
                ? 'bg-white/[0.12] text-amber-400'
                : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        )
      })}
    </aside>
  )
}