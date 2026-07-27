// components/ui/Reveal.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { easeEntrance, staggerContainer, staggerItem } from "@/lib/motion";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** delay en secondes (ex. 0.1, 0.2) pour décaler plusieurs sections */
  delay?: number;
  /** direction de l'apparition — "fade" = pas de déplacement, juste l'opacité */
  direction?: RevealDirection;
  /** distance parcourue en px (défaut 24) */
  distance?: number;
}

const axisSign: Record<Exclude<RevealDirection, "fade">, { axis: "x" | "y"; sign: 1 | -1 }> = {
  up: { axis: "y", sign: 1 },
  down: { axis: "y", sign: -1 },
  left: { axis: "x", sign: 1 },
  right: { axis: "x", sign: -1 },
};

/**
 * Apparition au scroll d'une section (usage simple, non staggé).
 * Comportement par défaut inchangé (up, 24px) — pour une cascade
 * d'enfants (grille de cartes), utiliser RevealGroup + RevealItem.
 */
export function Reveal({ children, className = "", delay = 0, direction = "up", distance = 24 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const skip = reduceMotion || direction === "fade";
  const offset = skip ? {} : { [axisSign[direction].axis]: axisSign[direction].sign * distance };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...easeEntrance, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Conteneur de cascade — les enfants doivent être des <RevealItem>.
 * Ex. grille de cartes joueurs, liste d'actus : le parent orchestre le
 * délai entre chaque enfant (60ms par défaut, cf. lib/motion.ts).
 */
export function RevealGroup({
  children,
  className = "",
  staggerDelay = 0.06,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(!!reduceMotion, staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}