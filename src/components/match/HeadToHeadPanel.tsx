// components/match/HeadToHeadPanel.tsx
import type { HeadToHead } from "@/lib/match-types";

interface HeadToHeadPanelProps {
  data: HeadToHead;
  homeTeamName: string;
  awayTeamName: string;
}

/** Doc 4.3 — Onglet Face-à-face */
export function HeadToHeadPanel({ data, homeTeamName, awayTeamName }: HeadToHeadPanelProps) {
  return (
    <div>
      <h2 className="mb-3 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
        Historique des confrontations
      </h2>
      <p className="text-sm text-muted-foreground">
        {data.totalMatches} confrontations · {data.homeWins} victoire
        {data.homeWins > 1 ? "s" : ""} {homeTeamName} · {data.awayWins} victoire
        {data.awayWins > 1 ? "s" : ""} {awayTeamName} · {data.draws} nul
        {data.draws > 1 ? "s" : ""}
      </p>
    </div>
  );
}