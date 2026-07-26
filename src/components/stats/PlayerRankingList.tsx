import type { PlayerStat } from "@/lib/stats-types";

interface PlayerRankingListProps {
  title: string;
  players: PlayerStat[];
  unit: string; // "buts", "passes décisives", "cartons"
}

const medal = ["🥇 1er", "🥈 2e", "🥉 3e"];

/** Doc 8.2 + 8.6 — top 3 mis en avant (fond teinté), état vide en 8.4 */
export function PlayerRankingList({ title, players, unit }: PlayerRankingListProps) {
  if (players.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="font-heading text-lg font-semibold text-foreground">Pas encore de statistiques</p>
        <p className="mt-1 text-sm text-muted-foreground">Les chiffres arrivent dès le premier match.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card">
      <h3 className="border-b border-border px-4 py-3 font-heading text-base font-semibold text-foreground">
        {title}
      </h3>
      <ul>
        {players.map((player, i) => (
          <li
            key={player.id}
            className={`flex items-center justify-between gap-3 px-4 py-3 ${
              i < 3 ? "bg-accent/10" : ""
            } ${i < players.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-xs font-semibold text-muted-foreground">
                {i < 3 ? medal[i] : `${i + 1}e`}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.teamName}</p>
              </div>
            </div>
            <span className="shrink-0 font-heading text-lg font-bold tabular-nums text-foreground">
              {player.value} <span className="text-xs font-normal text-muted-foreground">{unit}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}