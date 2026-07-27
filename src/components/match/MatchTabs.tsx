"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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

const swipeVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -24 }),
};

/** Doc 4.3 + 4.10 — Onglets en mobile (swipe animé), layout 2 colonnes permanent en desktop */
export function MatchTabs({ match }: MatchTabsProps) {
  const [active, setActive] = useState<Tab>("Résumé");
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const prevIndex = useRef(0);

  function handleTabChange(tab: Tab) {
    const nextIndex = TABS.indexOf(tab);
    setDirection(nextIndex > prevIndex.current ? 1 : -1);
    prevIndex.current = nextIndex;
    setActive(tab);
  }

  function renderPanel(tab: Tab) {
    switch (tab) {
      case "Résumé":
        return <EventTimeline events={match.events} />;
      case "Composition":
        return (
          <LineupList
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
            lineups={match.lineups}
          />
        );
      case "Stats":
        return (
          <MatchStatsPanel
            stats={match.stats}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
        );
      case "Face-à-face":
        return (
          <HeadToHeadPanel
            data={match.headToHead}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
        );
    }
  }

  return (
    <div>
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border md:hidden">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
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

      <div className="overflow-hidden md:hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={swipeVariants}
            initial={reduceMotion ? "center" : "enter"}
            animate="center"
            exit={reduceMotion ? "center" : "exit"}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {renderPanel(active)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hidden md:grid md:grid-cols-[1fr_360px] md:items-start md:gap-6">
        <EventTimeline events={match.events} />
        <div className="flex flex-col gap-8">
          <LineupList
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
            lineups={match.lineups}
          />
          <MatchStatsPanel
            stats={match.stats}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
          <HeadToHeadPanel
            data={match.headToHead}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
          />
        </div>
      </div>
    </div>
  );
}