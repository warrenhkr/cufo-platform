// components/home/FeaturedPlayers.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { hoverElevate } from "@/lib/motion";
import type { FeaturedPlayer } from "@/lib/types";

interface FeaturedPlayersProps {
  players: FeaturedPlayer[];
}

function PlayerCard({ player }: { player: FeaturedPlayer }) {
  const reduceMotion = useReducedMotion();
  const initials = player.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <RevealItem className="w-42 shrink-0 snap-start sm:w-auto">
      <motion.div {...hoverElevate(!!reduceMotion)} className="h-full">
        <Card className="flex h-full flex-col items-center gap-3 px-4 py-5 text-center shadow-sm transition-shadow duration-200 hover:shadow-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            {initials}
          </div>
          <div>
            <p className="font-heading text-lg font-semibold uppercase text-foreground">
              {player.name}
            </p>
            <p className="text-sm text-muted-foreground">{player.statLabel}</p>
          </div>
          <Badge variant="player">{player.badgeLabel}</Badge>
        </Card>
      </motion.div>
    </RevealItem>
  );
}

/** Doc 3.4 — "Ils font le spectacle" */
export function FeaturedPlayers({ players }: FeaturedPlayersProps) {
  return (
    <section>
      <SectionHeader
        title="Ils font le spectacle"
        href="/equipes/cartes"
        linkLabel="Voir toutes les cartes joueurs →"
      />
      <RevealGroup className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-3">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </RevealGroup>
    </section>
  );
}