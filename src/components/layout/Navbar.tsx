"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, Trophy, Users, Newspaper, Info, ChevronDown,
  Radio, Calendar, History, Medal, BarChart3, FileText,
  Building2, Handshake, Mail, Menu, X,
} from "lucide-react";

const desktopNav = [
  { label: "Accueil", href: "/", icon: Home },
  {
    label: "Matchs",
    icon: Trophy,
    children: [
      { label: "Match en direct", href: "/matchs/direct", icon: Radio },
      { label: "Calendrier", href: "/matchs/calendrier", icon: Calendar },
      { label: "Résultats", href: "/matchs/resultats", icon: History },
    ],
  },
  {
    label: "Compétition",
    icon: Medal,
    children: [
      { label: "Classement", href: "/competition/classement", icon: Medal },
      { label: "Statistiques", href: "/competition/statistiques", icon: BarChart3 },
      { label: "Règlement", href: "/competition/reglement", icon: FileText },
    ],
  },
  { label: "Équipes", href: "/equipes", icon: Users },
  { label: "Actualités", href: "/actualites", icon: Newspaper },
  {
    label: "À propos",
    icon: Info,
    children: [
      { label: "Le CUFO", href: "/a-propos", icon: Building2 },
      { label: "Partenaires", href: "/a-propos#partenaires", icon: Handshake },
      { label: "Contact", href: "/a-propos#contact", icon: Mail },
    ],
  },
];

const mobileTabs = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Matchs", href: "/matchs/direct", icon: Trophy },
  { label: "Compétition", href: "/competition/classement", icon: Medal },
  { label: "Actualités", href: "/actualites", icon: Newspaper },
];

function DesktopItem({ item, pathname }: { item: (typeof desktopNav)[number]; pathname: string }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href!}
        className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
          isActive ? "text-secondary" : "text-foreground hover:text-secondary"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  const isChildActive = item.children.some((c) => pathname === c.href);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
          isChildActive ? "text-secondary" : "text-foreground hover:text-secondary"
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
            className="glass absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-2xl py-2 shadow-lg"
          >
            {item.children.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <header className="hidden items-center justify-between border-b border-border bg-card/80 px-8 py-4 backdrop-blur-xl md:flex">
        <h1 className="font-heading text-lg font-extrabold uppercase text-foreground">
          CUFO <span className="text-secondary">UCAO-UUC</span>
        </h1>
        <nav className="flex items-center gap-1">
          {desktopNav.map((item) => (
            <DesktopItem key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>
      </header>

      {/* Barre du haut mobile */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-card/90 p-4 backdrop-blur-xl md:hidden">
        <h1 className="font-heading text-lg font-extrabold uppercase text-foreground">
          CUFO <span className="text-secondary">UCAO-UUC</span>
        </h1>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-foreground">
          <Menu size={24} />
        </button>
      </div>

      {/* Tab bar mobile en bas */}
      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around bg-sidebar py-2 md:hidden"
      >
        {mobileTabs.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith("/" + href.split("/")[1]);
          return (
            <Link key={href} href={href} className="relative flex flex-col items-center gap-1 px-3 py-1">
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-2 h-0.5 w-8 rounded-full bg-sidebar-primary"
                />
              )}
              <Icon size={20} className={isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"} />
              <span className={`text-[10px] font-medium ${isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Menu secondaire mobile (overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-72 bg-card p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setMobileMenuOpen(false)} className="mb-6 text-muted-foreground">
                <X size={22} />
              </button>
              <Link href="/a-propos" className="block py-3 font-medium text-foreground">À propos</Link>
              <Link href="/suggestions" className="block py-3 font-medium text-foreground">Boîte à suggestions</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}