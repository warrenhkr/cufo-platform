// components/home/MatchStatusCard.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/Button";
import { LiveStatusBadge } from "@/components/ui/LiveStatusBadge";
import type { MatchHighlight } from "@/lib/types";

interface MatchStatusCardProps {
  match: MatchHighlight;
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
      <div
        className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-md sm:h-12 sm:w-12"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      <span className="max-w-21 text-center text-xs font-medium leading-tight text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

function AnimatedScore({ score }: { score: number }) {
  return (
    <div className="relative inline-flex h-[1.1em] w-[0.6em] items-center justify-center overflow-hidden align-top">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={score}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute tabular-nums"
        >
          {score}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/** Doc 3.2 — version light : Card tone="elevated" (opaque, ombre marquée) plutôt que le glass sombre d'origine */
export function MatchStatusCard({ match }: MatchStatusCardProps) {
  if (match.status === "upcoming") {
    return (
      <Card tone="elevated" className="p-5 sm:p-6 transition-colors hover:border-border/80">
        <Badge variant="player">Prochain coup d&rsquo;envoi</Badge>

        <div className="mt-5 flex items-center justify-between gap-2">
          <TeamBadge name={match.homeTeam.name} color={match.homeTeam.primaryColor} />
          <span className="px-2 font-heading text-2xl font-semibold text-muted-foreground/60">
            VS
          </span>
          <TeamBadge name={match.awayTeam.name} color={match.awayTeam.primaryColor} />
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {match.dayLabel} à {match.timeLabel}
        </p>

        <Link href="/matchs/calendrier" className={`mt-6 flex w-full ${buttonClassName("primary", "md")}`}>
          Voir le calendrier
        </Link>
      </Card>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-0.5 rounded-[1.1rem] bg-secondary/30 animate-pulse-ring" />
      <Card tone="elevated" className="relative p-5 sm:p-6 premium-glow border-secondary/20 bg-card/95 backdrop-blur-xl">
        <LiveStatusBadge status={match.status} />

        <div className="mt-5 flex items-center justify-between gap-2">
          <TeamBadge name={match.homeTeam.name} color={match.homeTeam.primaryColor} />
          <div className="flex flex-col items-center gap-1 px-2">
            <div className="font-heading text-4xl font-bold text-foreground sm:text-5xl flex items-center gap-1">
              <AnimatedScore score={match.homeScore} />
              <span className="opacity-50 mx-1">–</span>
              <AnimatedScore score={match.awayScore} />
            </div>
            <span className="text-xs font-medium text-secondary animate-pulse">
              {match.minute}e minute
            </span>
          </div>
          <TeamBadge name={match.awayTeam.name} color={match.awayTeam.primaryColor} />
        </div>

        <Link href="/matchs/direct" className={`mt-6 flex w-full ${buttonClassName("live", "md")} shadow-lg shadow-secondary/20`}>
          Suivre en direct
        </Link>
      </Card>
    </div>
  );
}