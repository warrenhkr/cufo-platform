// components/teams/TeamDetailTabs.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { PlayerFifaCard } from "./PlayerFifaCard";
import type { Team, StandingEntry } from "@/lib/types";
import type { Player } from "@/lib/team-types";

interface TeamDetailTabsProps {
  team: Team;
  entry: StandingEntry;
  roster: Player[];
}

const TABS = ["Effectif", "Résultats", "Statistiques"] as const;
type Tab = (typeof TABS)[number];

export function TeamDetailTabs({ team, entry, roster }: TeamDetailTabsProps) {
  const [active, setActive] = useState<Tab>("Effectif");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

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

      {active === "Effectif" && (
        roster.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="font-heading font-bold text-foreground">Effectif en cours de validation</p>
            <p className="mt-1 text-sm text-muted-foreground">
              La liste des joueurs sera visible dès validation par l&apos;organisation.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {roster.map((player) => (
              <Card key={player.id} className="flex flex-col items-center gap-2 p-4 text-center">
                <span className="font-heading text-xl font-bold text-primary">N°{player.number}</span>
                <p className="font-heading text-sm font-semibold uppercase text-foreground">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.position}</p>
                <button
                  onClick={() => setSelectedPlayer(player)}
                  className="mt-2 text-xs font-semibold text-secondary hover:text-secondary/80"
                >
                  Voir la carte complète
                </button>
              </Card>
            ))}
          </div>
        )
      )}

      {active === "Résultats" && (
        <Card className="p-6 text-sm text-muted-foreground">
          Résultats de {team.name} — à connecter une fois la page Résultats construite.
        </Card>
      )}

      {active === "Statistiques" && (
        <Card className="p-6 text-sm text-muted-foreground">
          {entry.goalsFor} buts marqués sur {entry.played} matchs cette saison. Détail par joueur à venir.
        </Card>
      )}

      {selectedPlayer && (
        <PlayerFifaCard
          player={selectedPlayer}
          team={team}
          open={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}