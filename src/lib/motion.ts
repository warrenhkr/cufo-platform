// src/lib/motion.ts
import type { Variants, Transition } from "motion/react";

/**
 * Système d'animation centralisé — variants Framer Motion réutilisables.
 */

// --- Transitions standard ---------------------------------------------

export const easePremium: Transition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1],
};

export const easeEntrance: Transition = {
  duration: 0.5,
  ease: "easeOut",
};

export const springSheet: Transition = {
  type: "spring",
  damping: 28,
  stiffness: 320,
};

// --- Variants ------------------------------------------------------------

export function fadeUp(reduceMotion = false): Variants {
  return {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: easeEntrance,
    },
  };
}

export function fadeIn(reduceMotion = false): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion ? { duration: 0.15 } : easeEntrance,
    },
  };
}

export function scaleIn(reduceMotion = false): Variants {
  return {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };
}

type SlideDirection = "up" | "down" | "left" | "right";

const slideOffsets: Record<SlideDirection, { x?: string | number; y?: string | number }> = {
  up: { y: "100%" },
  down: { y: "-100%" },
  left: { x: "100%" },
  right: { x: "-100%" },
};

export function slideIn(direction: SlideDirection = "up", reduceMotion = false): Variants {
  const offset = reduceMotion ? {} : slideOffsets[direction];
  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: springSheet,
    },
  };
}

// --- Stagger ---------------------------------------------------------------

export function staggerContainer(reduceMotion = false, staggerDelay = 0.06): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: staggerDelay, delayChildren: 0.05 },
    },
  };
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeEntrance,
  },
};

// --- Micro-interactions (hover / tap) réutilisables -------------------

export function hoverElevate(reduceMotion = false) {
  if (reduceMotion) return {};
  return {
    whileHover: { y: -4, scale: 1.01 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15, ease: "easeOut" } as Transition,
  };
}

export function hoverPress(reduceMotion = false) {
  if (reduceMotion) return {};
  return {
    whileTap: { scale: 0.96 },
    transition: { duration: 0.12 },
  };
}