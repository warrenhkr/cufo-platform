// components/results/ResultCard.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card } from "@/components/ui/Card";
import type { MatchResult } from "@/lib/results-types";

interface ResultCardProps {
  result: MatchResult;
  index: number;
}

function TeamCrest({ name, color }: { name: string; color: string }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

/** Doc 6.2 + 6.6 — carte résultat, équipe gagnante en gras (pas juste par la couleur, accessibilité) */
export function ResultCard({ result, index }: ResultCardProps) {
  const homeWins = result.homeScore > result.awayScore;
  const awayWins = result.awayScore > result.homeScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.04 }}
    >
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            Journée {result.matchday}
          </span>

          <div className="flex items-center gap-2">
            <TeamCrest name={result.homeTeam.name} color={result.homeTeam.primaryColor} />
            <span className={`text-sm ${homeWins ? "font-bold text-foreground" : "font-medium text-muted-foreground"}`}>
              {result.homeTeam.name}
            </span>
            <span className="font-heading text-lg font-bold tabular-nums text-foreground">
              {result.homeScore} – {result.awayScore}
            </span>
            <span className={`text-sm ${awayWins ? "font-bold text-foreground" : "font-medium text-muted-foreground"}`}>
              {result.awayTeam.name}
            </span>
            <TeamCrest name={result.awayTeam.name} color={result.awayTeam.primaryColor} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1">
          <div className="text-right">
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
              Terminé
            </span>
            <p className="mt-1 text-xs text-muted-foreground">{result.dateLabel}</p>
          </div>
          {result.articleSlug && (
            <Link
              href={`/actualites/${result.articleSlug}`}
              className="text-xs font-semibold text-secondary hover:text-secondary/80"
            >
              Voir le résumé →
            </Link>
          )}
        </div>
      </Card>
    </motion.div>
  );
}