// components/ui/Reveal.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** delay en secondes (ex. 0.1, 0.2) pour décaler plusieurs sections */
  delay?: number;
}

/**
 * Composant réutilisable pour l'apparition au scroll des sections.
 * Animation : y: 24 → 0, opacity: 0 → 1, durée 0.5s, ease "easeOut".
 * Désactivé automatiquement si prefers-reduced-motion est actif.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
