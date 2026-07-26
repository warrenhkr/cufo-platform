"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, Trophy, Users, Newspaper, Info, ChevronDown,
  Radio, Calendar, History, Medal, BarChart3, FileText,
  Building2, Handshake, Mail, Menu, X, MessageCircle,
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

/**
 * Détecte le montage côté client sans setState dans un effet
 * (évite le warning react-hooks/set-state-in-effect) — pattern
 * recommandé par React pour ce cas précis de garde SSR/portal.
 */
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function DesktopItem({ item, pathname }: { item: (typeof desktopNav)[number]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useIsMounted();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
    }
  }, [open]);

  if (!item.children) {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href!}
        className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
          isActive
            ? "text-secondary"
            : "text-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  const isChildActive = item.children.some((c) => pathname === c.href);

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
          isChildActive
            ? "text-secondary"
            : "text-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                style={{ position: "absolute", top: coords.top, left: coords.left }}
                className="z-9999 min-w-50 rounded-2xl border border-border bg-popover py-2 shadow-lg"
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
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function MobileLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
  indent = false,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onNavigate: () => void;
  indent?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
        indent ? "ml-4" : ""
      } ${
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon size={18} className={active ? "text-primary" : "text-muted-foreground"} />
      {label}
    </Link>
  );
}

function MobileMenuGroup({
  item,
  pathname,
  onNavigate,
}: {
  item: (typeof desktopNav)[number];
  pathname: string;
  onNavigate: () => void;
}) {
  if (!item.children) {
    return (
      <MobileLink
        href={item.href!}
        label={item.label}
        icon={item.icon}
        active={pathname === item.href}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <item.icon size={14} />
        {item.label}
      </div>
      <div className="flex flex-col gap-1">
        {item.children.map((child) => (
          <MobileLink
            key={child.href}
            href={child.href}
            label={child.label}
            icon={child.icon}
            active={pathname === child.href}
            onNavigate={onNavigate}
            indent
          />
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Desktop (≥1024px) */}
      <header className="relative z-60 hidden items-center justify-between border-b border-border bg-card/80 px-8 py-4 backdrop-blur-xl lg:flex">
        <h1 className="font-heading text-lg font-extrabold uppercase text-foreground">
          CUFO <span className="text-secondary">UCAO-UUC</span>
        </h1>
        <nav className="flex items-center gap-1">
          {desktopNav.map((item) => (
            <DesktopItem key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>
      </header>

      {/* Barre du haut mobile / tablette (<1024px) — seul point d'entrée nav */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-card/90 p-4 backdrop-blur-xl lg:hidden">
        <h1 className="font-heading text-lg font-extrabold uppercase text-foreground">
          CUFO <span className="text-secondary">UCAO-UUC</span>
        </h1>
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Ouvrir le menu"
          className="p-2 text-foreground"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menu plein écran mobile/tablette — remplace la tab bar basse */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-card p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center justify-between px-2">
                <h1 className="font-heading text-lg font-extrabold uppercase text-foreground">
                  CUFO <span className="text-secondary">UCAO-UUC</span>
                </h1>
                <button
                  onClick={closeMenu}
                  aria-label="Fermer le menu"
                  className="p-2 text-muted-foreground"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-2 overflow-y-auto py-2">
                {desktopNav.map((item) => (
                  <MobileMenuGroup
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    onNavigate={closeMenu}
                  />
                ))}

                <div className="my-2 border-t border-border" />

                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Autres accès
                </div>
                <MobileLink
                  href="/suggestions"
                  label="Boîte à suggestions"
                  icon={MessageCircle}
                  active={pathname === "/suggestions"}
                  onNavigate={closeMenu}
                />
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}