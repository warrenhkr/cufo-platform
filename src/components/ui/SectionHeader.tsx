// components/ui/SectionHeader.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

/** En-tête de bloc de contenu, avec fade-in au scroll pour uniformiser
 * l'apparition des sections de l'Accueil. */
export function SectionHeader({ title, href, linkLabel }: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-4 flex items-end justify-between gap-4 sm:mb-6"
    >
      <h2 className="font-heading text-2xl font-semibold uppercase tracking-wide text-foreground sm:text-3xl">
        {title}
      </h2>
      {href && linkLabel && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-secondary/80"
        >
          {linkLabel.replace(" →", "")}
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </motion.div>
  );
}