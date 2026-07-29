// components/decorative/FloatingIcons.tsx
"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Trophy,
  Shield,
  Medal,
  Flag,
  Star,
  Timer,
  Flame,
  Target,
  Activity,
  Users,
  Award,
  Zap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// 🎨 POOL D'ICÔNES — Modifiez cette liste pour changer les icônes affichées.
// Chaque entrée possède une icône Lucide et une couleur CSS variable.
// Couleurs disponibles : "var(--primary)", "var(--secondary)", "var(--accent)"
// ─────────────────────────────────────────────────────────────────────────────
const iconPool: { icon: LucideIcon; hue: string }[] = [
  { icon: Trophy,   hue: "var(--secondary)" }, // Trophée — rouge CUFO
  { icon: Shield,   hue: "var(--primary)"   }, // Bouclier/Écusson — bleu navy
  { icon: Medal,    hue: "var(--accent)"    }, // Médaille — or
  { icon: Flag,     hue: "var(--secondary)" }, // Drapeau de touche
  { icon: Star,     hue: "var(--accent)"    }, // Joueur étoile
  { icon: Timer,    hue: "var(--primary)"   }, // Chronomètre / temps de jeu
  { icon: Flame,    hue: "var(--secondary)" }, // Match en feu
  { icon: Target,   hue: "var(--primary)"   }, // But / Cible
  { icon: Activity, hue: "var(--accent)"    }, // Stats / Intensité du match
  { icon: Users,    hue: "var(--primary)"   }, // Équipes / Supporters
  { icon: Award,    hue: "var(--secondary)" }, // Récompense / Titre
  { icon: Zap,      hue: "var(--accent)"    }, // Action rapide / Contre
];

// ─────────────────────────────────────────────────────────────────────────────
// ⚙️  PARAMÈTRES DE DENSITÉ & COMPORTEMENT — Les seules valeurs à modifier
//    pour contrôler la quantité et le rythme des icônes flottantes.
// ─────────────────────────────────────────────────────────────────────────────
const CONFIG = {
  /** Nombre d'icônes affichées au démarrage. Augmentez pour plus de densité. */
  initialCount: 9,

  /** Nombre maximum d'icônes simultanées à l'écran (les plus anciennes disparaissent). */
  maxIcons: 12,

  /** Intervalle (ms) entre chaque ajout d'une nouvelle icône. 
   *  Moins = plus fréquent. Min recommandé : 800ms. */
  spawnInterval: 2000,

  /** Plage de taille (px) des icônes. [min, max] */
  sizeRange: [16, 40] as [number, number],

  /** Plage de durée d'animation (s) — contrôle la vitesse de dérive. [min, max] */
  durationRange: [14, 22] as [number, number],

  /** Plage de délai initial (s) avant que l'animation démarre. [min, max] */
  delayRange: [0, 4] as [number, number],

  /** Plage d'opacité des icônes. [min, max] — garder < 0.5 pour ne pas distraire. */
  opacityRange: [0.04, 0.18] as [number, number],

  /** Zone de placement — pourcentage de l'écran. [top min/max, left min/max] */
  placement: { top: [4, 88], left: [2, 94] } as {
    top: [number, number];
    left: [number, number];
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Interne — ne pas modifier en dessous de cette ligne sauf si vous savez
// ce que vous faites.
// ─────────────────────────────────────────────────────────────────────────────

interface FloatingIconItem {
  id: number;
  icon: LucideIcon;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  hue: string;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createIcon(id: number): FloatingIconItem {
  // Sélection aléatoire d'une entrée dans le pool d'icônes
  const entry = iconPool[Math.floor(Math.random() * iconPool.length)];

  return {
    id,
    icon: entry.icon,
    top:      randomBetween(...CONFIG.placement.top),
    left:     randomBetween(...CONFIG.placement.left),
    size:     randomBetween(...CONFIG.sizeRange),
    duration: randomBetween(...CONFIG.durationRange),
    delay:    randomBetween(...CONFIG.delayRange),
    opacity:  randomBetween(...CONFIG.opacityRange),
    hue:      entry.hue,
  };
}

export function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIconItem[]>([]);

  useEffect(() => {
    // Génération du lot initial d'icônes côté client (évite l'hydratation SSR)
    const initial = Array.from(
      { length: CONFIG.initialCount },
      (_, i) => createIcon(i + 1)
    );
    setIcons(initial);

    // Injection périodique d'une nouvelle icône ; les plus anciennes sont supprimées
    const interval = window.setInterval(() => {
      setIcons((current) => {
        const next = [...current, createIcon(Date.now())];
        return next.slice(-CONFIG.maxIcons); // conserve uniquement les N plus récentes
      });
    }, CONFIG.spawnInterval);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {icons.map((item) => {
        const Icon = item.icon;
        return (
          <span
            key={item.id}
            className="floating-ambient absolute block"
            style={{
              top:               `${item.top}%`,
              left:              `${item.left}%`,
              opacity:           item.opacity,
              color:             item.hue,
              animationDuration: `${item.duration}s`,
              animationDelay:    `${item.delay}s`,
            }}
          >
            <Icon size={item.size} strokeWidth={1.5} />
          </span>
        );
      })}
    </div>
  );
}
