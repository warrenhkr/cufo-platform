// components/home/FeaturedPlayers.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FeaturedPlayer } from "@/lib/types";

interface FeaturedPlayersProps {
  players: FeaturedPlayer[];
}

function PlayerCard({ player, index }: { player: FeaturedPlayer; index: number }) {
  const reduceMotion = useReducedMotion();
  const initials = player.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduceMotion ? {} : { y: -6, scale: 1.03 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className="w-[168px] shrink-0 snap-start sm:w-auto"
    >
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
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">
          {player.badgeLabel}
        </span>
      </Card>
    </motion.div>
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
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-3">
        {players.map((player, index) => (
          <PlayerCard key={player.id} player={player} index={index} />
        ))}
      </div>
    </section>
  );
}