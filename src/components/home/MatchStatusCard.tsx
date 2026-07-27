// components/home/MatchStatusCard.tsx
"use client";

import Link from "next/link";
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
        className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white sm:h-12 sm:w-12"
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

/** Doc 3.2 — version light : Card tone="elevated" (opaque, ombre marquée) plutôt que le glass sombre d'origine */
export function MatchStatusCard({ match }: MatchStatusCardProps) {
  if (match.status === "upcoming") {
    return (
      <Card tone="elevated" className="p-5 sm:p-6">
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
    <Card tone="elevated" className="p-5 sm:p-6">
      <LiveStatusBadge status={match.status} />

      <div className="mt-5 flex items-center justify-between gap-2">
        <TeamBadge name={match.homeTeam.name} color={match.homeTeam.primaryColor} />
        <div className="flex flex-col items-center gap-1 px-2">
          <span
            key={`${match.homeScore}-${match.awayScore}`}
            className="animate-score-bump font-heading text-4xl font-bold tabular-nums text-foreground sm:text-5xl"
          >
            {match.homeScore} – {match.awayScore}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {match.minute}e minute
          </span>
        </div>
        <TeamBadge name={match.awayTeam.name} color={match.awayTeam.primaryColor} />
      </div>

      <Link href="/matchs/direct" className={`mt-6 flex w-full ${buttonClassName("live", "md")}`}>
        Suivre en direct
      </Link>
    </Card>
  );
}