'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Radio, Calendar, Trophy, Users, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/live', label: 'En Direct', icon: Radio },
  { href: '/planning', label: 'Planning & Résultats', icon: Calendar },
  { href: '/classement', label: 'Classement & Stats', icon: Trophy },
  { href: '/equipes', label: 'Actualités & Équipes', icon: Users },
]

function Logo() {
  return (
    <div className="mb-8">
      <h1 className="font-heading font-extrabold text-xl text-navy-950 uppercase tracking-wide">
        CUSA <span className="text-red-600">UCAO</span>
      </h1>
      <div className="flex items-center gap-1 mt-1">
        <span className="w-8 h-0.5 bg-red-600 inline-block" />
        <span className="w-1.5 h-1.5 bg-gold-400 inline-block" />
      </div>
    </div>
  )
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <>
      <Logo />
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
              isActive
                ? 'bg-navy-950 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-navy-950'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        )
      })}
    </>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <div className="md:hidden fixed inset-x-0 top-0 z-40 flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h1 className="font-heading font-extrabold text-lg text-navy-950 uppercase">
          CUSA <span className="text-red-600">UCAO</span>
        </h1>
        <button onClick={() => setIsOpen(true)} className="text-navy-950 p-2">
          <Menu size={24} />
        </button>
      </div>

      <aside className="w-64 hidden md:flex flex-col gap-2 p-6 bg-white border-r border-gray-200">
        <NavLinks pathname={pathname} onNavigate={closeMenu} />
      </aside>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />
          <aside className="relative w-72 flex flex-col gap-2 p-6 bg-white border-r border-gray-200">
            <button onClick={closeMenu} className="text-gray-500 self-end mb-4">
              <X size={22} />
            </button>
            <NavLinks pathname={pathname} onNavigate={closeMenu} />
          </aside>
        </div>
      )}
    </>
  )
}