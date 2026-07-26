// components/match/MatchHeader.tsx
"use client";

import { motion } from "motion/react";
import type { MatchDetail } from "@/lib/match-types";

interface MatchHeaderProps {
  match: MatchDetail;
}

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const statusBadge: Record<MatchDetail["status"], { label: string; pulse: boolean }> = {
  live: { label: "🔴 EN DIRECT", pulse: true },
  halftime: { label: "⏸ MI-TEMPS", pulse: false },
  finished: { label: "✅ TERMINÉ", pulse: false },
  upcoming: { label: "🕐 À VENIR", pulse: false },
};

/** Doc 4.1 — En-tête du match : score et chrono très lisibles, "je suis au stade" */
export function MatchHeader({ match }: MatchHeaderProps) {
  const badge = statusBadge[match.status];
  const isUpcoming = match.status === "upcoming";

  return (
    <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-3 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          {badge.pulse ? (
            <motion.span
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground"
            >
              {badge.label}
            </motion.span>
          ) : (
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
              {badge.label}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{match.matchdayLabel}</span>
        </div>

        <div className="grid w-full max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-2">
          <span className="truncate text-right font-heading text-lg font-semibold uppercase text-foreground sm:text-xl">
            {match.homeTeam.name}
          </span>

          <div className="flex flex-col items-center px-3">
            {isUpcoming ? (
              <span className="font-heading text-2xl font-semibold text-muted-foreground">VS</span>
            ) : (
              <span className="font-heading text-4xl font-bold tabular-nums text-foreground sm:text-5xl">
                {match.homeScore} – {match.awayScore}
              </span>
            )}
            {(match.status === "live" || match.status === "halftime") && (
              <span className="mt-1 font-heading text-sm font-semibold tabular-nums text-secondary">
                {formatClock(match.clockSeconds)}
              </span>
            )}
            {isUpcoming && (
              <span className="mt-1 text-sm font-medium text-muted-foreground">
                {match.kickoffLabel ?? "Coup d'envoi à venir"}
              </span>
            )}
          </div>

          <span className="truncate text-left font-heading text-lg font-semibold uppercase text-foreground sm:text-xl">
            {match.awayTeam.name}
          </span>
        </div>
      </div>
    </div>
  );
}