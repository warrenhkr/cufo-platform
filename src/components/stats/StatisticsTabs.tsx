"use client";

import { useState } from "react";
import { PlayerRankingList } from "./PlayerRankingList";
import { TeamStatsPanel } from "./TeamStatsPanel";
import type { StatisticsData } from "@/lib/stats-types";

interface StatisticsTabsProps {
  data: StatisticsData;
}

const TABS = ["Meilleurs buteurs", "Meilleurs passeurs", "Cartons", "Équipes"] as const;
type Tab = (typeof TABS)[number];

/** Doc 8.1 — Onglets. Sur desktop, buteurs/passeurs restent visibles ensemble
 * (8.6 : "possibilité d'afficher 2 classements côte à côte") — même logique
 * que le 2-colonnes de Match en direct (4.10). */
export function StatisticsTabs({ data }: StatisticsTabsProps) {
  const [active, setActive] = useState<Tab>("Meilleurs buteurs");
  const isScorersOrAssists = active === "Meilleurs buteurs" || active === "Meilleurs passeurs";

  return (
    <div>
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === tab
                ? "border-secondary text-secondary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isScorersOrAssists && (
        <div className="grid gap-4 lg:grid-cols-2">
          <PlayerRankingList title="Meilleurs buteurs" players={data.topScorers} unit="buts" />
          <div className="hidden lg:block">
            <PlayerRankingList title="Meilleurs passeurs" players={data.topAssists} unit="passes déc." />
          </div>
        </div>
      )}
      {active === "Meilleurs passeurs" && (
        <div className="lg:hidden">
          <PlayerRankingList title="Meilleurs passeurs" players={data.topAssists} unit="passes déc." />
        </div>
      )}
      {active === "Cartons" && (
        <PlayerRankingList title="Cartons" players={data.topCards} unit="cartons" />
      )}
      {active === "Équipes" && <TeamStatsPanel teamStats={data.teamStats} />}
    </div>
  );
}