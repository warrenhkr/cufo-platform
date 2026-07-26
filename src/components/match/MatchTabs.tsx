// components/match/MatchTabs.tsx
"use client";

import { useState } from "react";
import { EventTimeline } from "./EventTimeline";
import { LineupList } from "./LineupList";
import { MatchStatsPanel } from "./MatchStatsPanel";
import { HeadToHeadPanel } from "./HeadToHeadPanel";
import type { MatchDetail } from "@/lib/match-types";

interface MatchTabsProps {
  match: MatchDetail;
}

const TABS = ["Résumé", "Composition", "Stats", "Face-à-face"] as const;
type Tab = (typeof TABS)[number];

/** Doc 4.3 + 4.10 — Onglets en mobile, layout 2 colonnes permanent en desktop */
export function MatchTabs({ match }: MatchTabsProps) {
  const [active, setActive] = useState<Tab>("Résumé");

  return (
    <div>
      {/* Onglets — mobile uniquement */}
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border md:hidden">
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

      <div className="md:grid md:grid-cols-[1fr_360px] md:items-start md:gap-6">
        {/* Fil d'événements — toujours visible en desktop */}
        <div className={active === "Résumé" ? "block" : "hidden md:block"}>
          <EventTimeline events={match.events} />
        </div>

        {/* Composition / Stats / Face-à-face — empilés en permanence en desktop */}
        <div className="mt-8 flex flex-col gap-8 md:mt-0">
          <div className={active === "Composition" ? "block" : "hidden md:block"}>
            <LineupList
              homeTeamName={match.homeTeam.name}
              awayTeamName={match.awayTeam.name}
              lineups={match.lineups}
            />
          </div>
          <div className={active === "Stats" ? "block" : "hidden md:block"}>
            <MatchStatsPanel
              stats={match.stats}
              homeTeamName={match.homeTeam.name}
              awayTeamName={match.awayTeam.name}
            />
          </div>
          <div className={active === "Face-à-face" ? "block" : "hidden md:block"}>
            <HeadToHeadPanel
              data={match.headToHead}
              homeTeamName={match.homeTeam.name}
              awayTeamName={match.awayTeam.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}