// components/home/MatchStatusCard.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { MatchHighlight, LiveMatchSummary } from "@/lib/types";

interface MatchStatusCardProps {
  match: MatchHighlight;
}

function isLiveOrHalftime(match: MatchHighlight): match is LiveMatchSummary {
  return match.status === "live" || match.status === "halftime";
}

function TeamBadge({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Couleur d'équipe : donnée dynamique par équipe (mock-data), pas
         un token du thème — chaque club garde sa propre couleur. */}
      <div
        className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white sm:h-12 sm:w-12"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      <span className="max-w-21 text-center text-xs font-medium leading-tight text-primary-foreground/85">
        {name}
      </span>
    </div>
  );
}

/**
 * Doc 3.2 — Carte "Match en direct" (ou fallback "Prochain match" si
 * aucun match en cours). Rendue sur fond navy pour cohérence avec le
 * bandeau hero (voir Hero.tsx).
 */
export function MatchStatusCard({ match }: MatchStatusCardProps) {
  // Narrowing direct sur match.status (et non sur un booléen intermédiaire)
  // pour que TypeScript restreigne correctement l'union MatchHighlight dans
  // chaque branche. Mi-temps est traité comme "en direct, en pause" plutôt
  // que comme "à venir".
  if (isLiveOrHalftime(match)) {
    const isHalftime = match.status === "halftime";

    return (
      <div className="relative overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 backdrop-blur-xl sm:p-6">
        <div className="flex items-center gap-2">
          <motion.span
            animate={isHalftime ? undefined : { opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground"
          >
            {isHalftime ? "⏸ MI-TEMPS" : "🔴 EN DIRECT"}
          </motion.span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          <TeamBadge name={match.homeTeam.name} color={match.homeTeam.primaryColor} />
          <div className="flex flex-col items-center gap-1 px-2">
            <span className="font-heading text-4xl font-bold tabular-nums text-primary-foreground sm:text-5xl">
              {match.homeScore} – {match.awayScore}
            </span>
            <span className="text-xs font-medium text-primary-foreground/70">
              {isHalftime ? "Mi-temps" : `${match.minute}e minute`}
            </span>
          </div>
          <TeamBadge name={match.awayTeam.name} color={match.awayTeam.primaryColor} />
        </div>

        <Link
          href="/matchs/direct"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          Suivre en direct
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 backdrop-blur-xl sm:p-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-accent">
        Prochain coup d&rsquo;envoi
      </span>

      <div className="mt-5 flex items-center justify-between gap-2">
        <TeamBadge name={match.homeTeam.name} color={match.homeTeam.primaryColor} />
        <span className="px-2 font-heading text-2xl font-semibold text-primary-foreground/60">
          VS
        </span>
        <TeamBadge name={match.awayTeam.name} color={match.awayTeam.primaryColor} />
      </div>

      <p className="mt-5 text-center text-sm text-primary-foreground/80">
        {match.dayLabel} à {match.timeLabel}
      </p>

      <Link
        href="/matchs/calendrier"
        className="mt-6 flex w-full items-center justify-center rounded-full bg-primary-foreground px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90"
      >
        Voir le calendrier
      </Link>
    </div>
  );
}