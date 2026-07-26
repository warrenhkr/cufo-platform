// components/home/Hero.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MatchStatusCard } from "./MatchStatusCard";
import type { MatchHighlight } from "@/lib/types";

interface HeroProps {
  match: MatchHighlight;
}

/**
 * Doc 3.1 + 3.2 + 3.10 — Bandeau d'ouverture "stade en nocturne".
 * Le overflow-hidden est déplacé sur un <div> interne (background +
 * halos décoratifs) plutôt que sur la <section> racine, pour ne jamais
 * créer de contexte de clipping au niveau de la section elle-même.
 */
export function Hero({ match }: HeroProps) {
  const isLive = match.status === "live";

  return (
    <section className="relative z-0">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-b-3xl bg-linear-to-b from-[color-mix(in_oklch,var(--primary)_85%,black)] via-primary to-[color-mix(in_oklch,var(--primary)_75%,white)]">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-accent/20 blur-[110px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-70 w-70 rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-300 gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[2fr_1fr] lg:items-center lg:gap-10 lg:py-20">
    <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="font-heading text-[2.75rem] font-bold uppercase leading-[0.95] tracking-tight text-primary-foreground sm:text-6xl lg:text-[4.25rem]">
            Le championnat
            <br />
            universitaire vit ici
          </h1>

          <p className="mt-5 max-w-md text-base text-primary-foreground/75 sm:text-lg">
            Scores en direct, classement, effectifs — tout le CUFO UCAO-UUC
            dans ta poche.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={isLive ? "/matchs/direct" : "/matchs/calendrier"}
              className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 sm:text-base"
            >
              {isLive ? "Suivre le direct" : "Voir le prochain match"}
            </Link>
            <Link
              href="/equipes"
              className="rounded-full border border-primary-foreground/25 bg-primary-foreground/5 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur-md transition-colors hover:bg-primary-foreground/10 sm:text-base"
            >
              Découvrir les équipes
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <MatchStatusCard match={match} />
        </motion.div>
      </div>
    </section>
  );
}