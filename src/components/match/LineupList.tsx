// components/match/LineupList.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { LineupPlayer, MatchDetail } from "@/lib/match-types";

interface LineupListProps {
  homeTeamName: string;
  awayTeamName: string;
  lineups: MatchDetail["lineups"];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

function Column({ teamName, players }: { teamName: string; players: LineupPlayer[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex-1">
      <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {teamName}
      </p>
      <motion.ul
        variants={reduceMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-2"
      >
        {players.map((player) => (
          <motion.li
            key={player.id}
            variants={reduceMotion ? undefined : itemVariants}
            className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 backdrop-blur-md px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-card"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shadow-sm shadow-primary/10">
              {player.number}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{player.name}</p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">{player.position}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
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
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
        <Column teamName={homeTeamName} players={lineups.home} />
        <Column teamName={awayTeamName} players={lineups.away} />
      </div>
    </div>
  );
}