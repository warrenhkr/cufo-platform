"use client";

import { motion } from "motion/react";

interface TeamHaloProps {
  color: string;
}

/**
 * Halo radial coloré animé en fond de la fiche équipe.
 * Entrée en fondu (opacity 0 → 1) + légère montée (y 16 → 0).
 * Utilise la couleur primaire de l'équipe passée en prop.
 */
export default function TeamHalo({ color }: TeamHaloProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 -top-16 z-0 h-80"
      style={{
        background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${color}2e, transparent 70%)`,
      }}
      aria-hidden="true"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    />
  );
}
