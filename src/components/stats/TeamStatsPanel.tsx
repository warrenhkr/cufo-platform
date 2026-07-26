import type { TeamStat } from "@/lib/stats-types";
import { teamStatLabel } from "@/lib/stats-types";

interface TeamStatsPanelProps {
  teamStats: TeamStat[];
}

/** Doc 8.3 — Bloc "Équipes", stats agrégées */
export function TeamStatsPanel({ teamStats }: TeamStatsPanelProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {teamStats.map((stat) => (
        <div key={stat.category} className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {teamStatLabel[stat.category]}
          </p>
          <p className="mt-1 font-heading text-lg font-bold text-foreground">{stat.teamName}</p>
          <p className="text-sm text-secondary">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}