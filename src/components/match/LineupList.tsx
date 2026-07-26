// components/match/LineupList.tsx
import type { LineupPlayer, MatchDetail } from "@/lib/match-types";

interface LineupListProps {
  homeTeamName: string;
  awayTeamName: string;
  lineups: MatchDetail["lineups"];
}

function Column({ teamName, players }: { teamName: string; players: LineupPlayer[] }) {
  return (
    <div className="flex-1">
      <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {teamName}
      </p>
      <ul className="flex flex-col gap-2">
        {players.map((player) => (
          <li
            key={player.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-3 py-2"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {player.number}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{player.name}</p>
              <p className="text-xs text-muted-foreground">{player.position}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Doc 4.3 — Onglet Composition : "Les 11 titulaires" */
export function LineupList({ homeTeamName, awayTeamName, lineups }: LineupListProps) {
  return (
    <div>
      <h2 className="mb-4 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
        Les 11 titulaires
      </h2>
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
        <Column teamName={homeTeamName} players={lineups.home} />
        <Column teamName={awayTeamName} players={lineups.away} />
      </div>
    </div>
  );
}