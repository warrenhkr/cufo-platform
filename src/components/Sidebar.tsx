'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  Home, Trophy, Users, Newspaper, Info, ChevronDown,
  Radio, Calendar, History, Medal, BarChart3, FileText,
  Building2, Handshake, Mail, Menu, X, Bell, Download, Goal,
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const desktopNav = [
  { label: 'Accueil', href: '/', icon: Home },
  {
    label: 'Matchs',
    icon: Goal,
    children: [
      { label: 'Match en direct', href: '/matchs/direct', icon: Radio },
      { label: 'Calendrier', href: '/matchs/calendrier', icon: Calendar },
      { label: 'Résultats', href: '/matchs/resultats', icon: History },
    ],
  },
  {
    label: 'Compétition',
    icon: Trophy,
    children: [
      { label: 'Classement', href: '/competition/classement', icon: Medal },
      { label: 'Statistiques', href: '/competition/statistiques', icon: BarChart3 },
      { label: 'Règlement', href: '/competition/reglement', icon: FileText },
    ],
  },
  { label: 'Équipes', href: '/equipes', icon: Users },
  { label: 'Actualités', href: '/actualites', icon: Newspaper },
  {
    label: 'À propos',
    icon: Info,
    children: [
      { label: 'Le CUFO', href: '/a-propos', icon: Building2 },
      { label: 'Partenaires', href: '/a-propos#partenaires', icon: Handshake },
      { label: 'Contact', href: '/a-propos#contact', icon: Mail },
    ],
  },
]

const mobileTabs = [
  { label: 'Accueil', href: '/', icon: Home },
  { label: 'Matchs', href: '/matchs/direct', icon: Goal },
  { label: 'Compétition', href: '/competition/classement', icon: Trophy },
  { label: 'Actualités', href: '/actualites', icon: Newspaper },
]

function DesktopDropdown({ item, pathname }: { item: typeof desktopNav[number]; pathname: string }) {
  const [open, setOpen] = useState(false)
  if (!item.children) {
    const isActive = pathname === item.href
    return (
      <Link
        href={item.href!}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
          isActive ? 'text-red-500' : 'text-white/80 hover:text-red-500'
        }`}
      >
        {item.label}
      </Link>
    )
  }

  const isChildActive = item.children.some((c) => pathname === c.href)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
          isChildActive ? 'text-red-500' : 'text-white/80 hover:text-red-500'
        }`}
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg py-2 min-w-50 z-50"
          >
            {item.children.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 text-sm text-navy-950 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Nav desktop en haut */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-navy-950 border-b border-white/10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-red-600/15 text-red-500 shadow-md shadow-red-600/10">
            <Goal size={20} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">officiel</p>
            <h1 className="font-heading font-black text-white uppercase">CUFO <span className="text-red-500">UCAO-UUC</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            {desktopNav.map((item) => (
              <DesktopDropdown key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Barre du haut mobile */}
      <div className="md:hidden fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 bg-navy-950 border-b border-white/10 text-white">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">CUFO</p>
          <h1 className="font-heading font-black text-base uppercase">UCAO-UUC</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2 rounded-full bg-white/10">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Tab bar mobile en bas */}
      <nav
        aria-label="Navigation principale"
        className="md:hidden fixed inset-x-0 bottom-0 z-40 flex items-center justify-around bg-navy-950 border-t border-white/10 py-2"
      >
        {mobileTabs.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href.split('/').slice(0, 2).join('/'))
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-3 py-1 relative text-white">
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-2 w-8 h-0.5 bg-red-500 rounded-full"
                />
              )}
              <Icon size={20} className={isActive ? 'text-red-500' : 'text-white/60'} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-red-500' : 'text-white/60'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Menu secondaire mobile (overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-navy-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 dark:text-white/60 mb-6">
                <X size={22} />
              </button>
              <Link href="/a-propos" className="flex items-center gap-3 py-3 text-navy-950 dark:text-white font-medium">
                <Info size={18} />
                À propos
              </Link>
              <Link href="/suggestions" className="flex items-center gap-3 py-3 text-navy-950 dark:text-white font-medium">
                <Mail size={18} />
                Boîte à suggestions
              </Link>
              <button className="flex items-center gap-3 py-3 text-navy-950 dark:text-white font-medium text-left w-full">
                <Bell size={18} />
                Notifications
              </button>
              <button className="flex items-center gap-3 py-3 text-navy-950 dark:text-white font-medium text-left w-full">
                <Download size={18} />
                Installer l&apos;app
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}