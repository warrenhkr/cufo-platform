// components/match/MatchStatsPanel.tsx
import type { MatchStatsDetail } from "@/lib/match-types";

interface MatchStatsPanelProps {
  stats: MatchStatsDetail;
  homeTeamName: string;
  awayTeamName: string;
}

function StatRow({
  label,
  values,
  suffix = "",
}: {
  label: string;
  values: [number, number];
  suffix?: string;
}) {
  const [home, away] = values;
  const total = home + away || 1;
  const homePct = (home / total) * 100;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-foreground">
        <span className="tabular-nums">
          {home}
          {suffix}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="tabular-nums">
          {away}
          {suffix}
        </span>
      </div>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="bg-primary" style={{ width: `${homePct}%` }} />
        <div className="bg-secondary" style={{ width: `${100 - homePct}%` }} />
      </div>
    </div>
  );
}

/** Doc 4.3 — Onglet Stats : Possession, Tirs cadrés, Corners, Fautes */
export function MatchStatsPanel({ stats, homeTeamName, awayTeamName }: MatchStatsPanelProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>{homeTeamName}</span>
        <span>{awayTeamName}</span>
      </div>
      <div className="flex flex-col gap-5">
        <StatRow label="Possession" values={stats.possession} suffix="%" />
        <StatRow label="Tirs cadrés" values={stats.shotsOnTarget} />
        <StatRow label="Corners" values={stats.corners} />
        <StatRow label="Fautes" values={stats.fouls} />
      </div>
    </div>
  );
}