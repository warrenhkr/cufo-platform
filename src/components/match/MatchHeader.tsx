// components/match/MatchHeader.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LiveStatusBadge } from "@/components/ui/LiveStatusBadge";
import type { MatchDetail } from "@/lib/match-types";

interface MatchHeaderProps {
  match: MatchDetail;
}

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Doc 4.1 — En-tête du match : score et chrono très lisibles, "je suis au stade" */
export function MatchHeader({ match }: MatchHeaderProps) {
  const isUpcoming = match.status === "upcoming";
  const reduceMotion = useReducedMotion();

  // Références pour tracker les scores précédents
  const prevHomeScoreRef = useRef(match.homeScore);
  const prevAwayScoreRef = useRef(match.awayScore);

  const [homeScoreAnimKey, setHomeScoreAnimKey] = useState(0);
  const [awayScoreAnimKey, setAwayScoreAnimKey] = useState(0);
  const [lastGoalTeam, setLastGoalTeam] = useState<"home" | "away" | null>(null);

  // Détecte les changements de score et déclenche l'animation uniquement pour le score modifié
  useEffect(() => {
    if (match.homeScore > prevHomeScoreRef.current) {
      setHomeScoreAnimKey((k) => k + 1);
      setLastGoalTeam("home");
      prevHomeScoreRef.current = match.homeScore;
    }
    if (match.awayScore > prevAwayScoreRef.current) {
      setAwayScoreAnimKey((k) => k + 1);
      setLastGoalTeam("away");
      prevAwayScoreRef.current = match.awayScore;
    }
  }, [match.homeScore, match.awayScore]);

  // Réinitialiser le flash après un court délai
  useEffect(() => {
    if (lastGoalTeam) {
      const t = setTimeout(() => setLastGoalTeam(null), 1000);
      return () => clearTimeout(t);
    }
  }, [lastGoalTeam]);

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/60 backdrop-blur-2xl transition-colors relative overflow-hidden">
      {/* Flash animation on goal */}
      <AnimatePresence>
        {lastGoalTeam && !reduceMotion && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 z-0 bg-secondary/20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-col items-center gap-3 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex">
            <LiveStatusBadge status={match.status} />
          </span>
          <span className="inline-flex sm:hidden">
            <LiveStatusBadge status={match.status} compact />
          </span>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{match.matchdayLabel}</span>
        </div>

        <div className="grid w-full max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-2">
          <span className="truncate text-right font-heading text-lg font-semibold uppercase text-foreground sm:text-xl">
            {match.homeTeam.name}
          </span>

          <div className="flex flex-col items-center px-3">
            {isUpcoming ? (
              <span className="font-heading text-2xl font-semibold text-muted-foreground">VS</span>
            ) : (
              <div className="flex items-center gap-1 font-heading text-4xl font-bold tabular-nums text-foreground sm:text-5xl">
                <motion.span
                  key={`home-${homeScoreAnimKey}`}
                  initial={reduceMotion ? {} : { scale: 1.4, color: "var(--secondary)" }}
                  animate={reduceMotion ? {} : { scale: 1, color: "var(--foreground)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={reduceMotion ? "" : "inline-block"}
                  style={reduceMotion ? {} : { filter: "drop-shadow(0 0 16px color-mix(in oklch, var(--secondary) 70%, transparent))" }}
                >
                  {match.homeScore}
                </motion.span>
                <span className="text-foreground/50 mx-1">–</span>
                <motion.span
                  key={`away-${awayScoreAnimKey}`}
                  initial={reduceMotion ? {} : { scale: 1.4, color: "var(--secondary)" }}
                  animate={reduceMotion ? {} : { scale: 1, color: "var(--foreground)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={reduceMotion ? "" : "inline-block"}
                  style={reduceMotion ? {} : { filter: "drop-shadow(0 0 16px color-mix(in oklch, var(--secondary) 70%, transparent))" }}
                >
                  {match.awayScore}
                </motion.span>
              </div>
            )}
            {(match.status === "live" || match.status === "halftime") && (
              <span className="mt-1 font-heading text-sm font-semibold tabular-nums text-secondary animate-pulse">
                {formatClock(match.clockSeconds)}
              </span>
            )}
            {isUpcoming && (
              <span className="mt-1 text-sm font-medium text-muted-foreground">
                {match.kickoffLabel ?? "Coup d'envoi à venir"}
              </span>
            )}
          </div>

          <span className="truncate text-left font-heading text-lg font-semibold uppercase text-foreground sm:text-xl">
            {match.awayTeam.name}
          </span>
        </div>
      </div>
    </div>
  );
}