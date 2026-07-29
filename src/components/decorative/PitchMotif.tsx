"use client";

import { motion } from "motion/react";
import { usePlayOnce } from "@/lib/hooks/use-play-once";

/**
 * Motif terrain de football en filigrane — affiché en fond du Hero (Accueil).
 * Joué une seule fois par session via usePlayOnce.
 * z-0 : sous le contenu (qui doit avoir z-10 ou relative).
 * preserveAspectRatio="xMidYMid meet" : le terrain entier est visible,
 * centré, sans rognage — préférable à "slice" qui coupe les surfaces de but.
 */
export function PitchMotif() {
  const shouldAnimate = usePlayOnce("motif-pitch-home");

  return (
    <svg
      viewBox="0 0 800 500"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.10]"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Bordure extérieure */}
      <motion.rect
        x="20"
        y="20"
        width="760"
        height="460"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Ligne médiane */}
      <motion.line
        x1="400"
        y1="20"
        x2="400"
        y2="480"
        stroke="currentColor"
        strokeWidth="2"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Cercle central */}
      <motion.circle
        cx="400"
        cy="250"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Surface de réparation gauche */}
      <motion.rect
        x="20"
        y="140"
        width="140"
        height="220"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Surface de réparation droite */}
      <motion.rect
        x="640"
        y="140"
        width="140"
        height="220"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Petit rectangle gauche (surface de but) */}
      <motion.rect
        x="20"
        y="195"
        width="55"
        height="110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Petit rectangle droit */}
      <motion.rect
        x="725"
        y="195"
        width="55"
        height="110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* Point central */}
      <motion.circle
        cx="400"
        cy="250"
        r="4"
        fill="currentColor"
        initial={shouldAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />
    </svg>
  );
}
