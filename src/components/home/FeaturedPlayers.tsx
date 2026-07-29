// components/home/FeaturedPlayers.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
      <motion.div
        whileHover={reduceMotion ? undefined : { scale: 1.02, y: -4 }}
        transition={reduceMotion ? undefined : { type: "spring" as const, stiffness: 400, damping: 25 }}
        className="h-full group"
      >
        <Card className="flex h-full flex-col items-center gap-3 px-4 py-5 text-center shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30 bg-card/80 backdrop-blur-md">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-110">
            <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
            <span className="relative z-10">{initials}</span>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold uppercase text-foreground transition-colors group-hover:text-primary">
              {player.name}
            </p>
            <p className="text-sm text-muted-foreground">{player.statLabel}</p>
          </div>
          <div className="transition-transform duration-300 group-hover:translate-y-[-2px]">
            <Badge variant="player" className="group-hover:shadow-lg group-hover:shadow-secondary/20">{player.badgeLabel}</Badge>
          </div>
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
      <RevealGroup className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-6 pt-2 -mt-2 px-2 -mx-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-3">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </RevealGroup>
    </section>
  );
}