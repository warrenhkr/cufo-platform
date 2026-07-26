// components/home/MatchStatusCard.tsx
"use client";

import Link from "next/link";
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

export function MatchStatusCard({ match }: MatchStatusCardProps) {
  if (match.status === "upcoming") {
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

  // Ici, TypeScript sait que match est forcément LiveMatchSummary
  // (statut "live" ou "halftime") puisque "upcoming" a été exclu au-dessus.
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 backdrop-blur-xl sm:p-6">
      <LiveStatusBadge status={match.status} />

      <div className="mt-5 flex items-center justify-between gap-2">
        <TeamBadge name={match.homeTeam.name} color={match.homeTeam.primaryColor} />
        <div className="flex flex-col items-center gap-1 px-2">
          <span
            key={`${match.homeScore}-${match.awayScore}`}
            className="animate-score-bump font-heading text-4xl font-bold tabular-nums text-primary-foreground sm:text-5xl"
          >
            {match.homeScore} – {match.awayScore}
          </span>
          <span className="text-xs font-medium text-primary-foreground/70">
            {match.minute}e minute
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