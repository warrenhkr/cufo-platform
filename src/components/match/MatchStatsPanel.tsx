// components/match/MatchStatsPanel.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MatchStatsDetail } from "@/lib/match-types";

interface MatchStatsPanelProps {
  stats: MatchStatsDetail;
  homeTeamName: string;
  awayTeamName: string;
}

function StatRow({
  label,
  values,
  suffix = "",
}: {
  label: string;
  values: [number, number];
  suffix?: string;
}) {
  const [home, away] = values;
  const total = home + away || 1;
  const homePct = (home / total) * 100;
  const reduceMotion = useReducedMotion();

  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
        <span className="tabular-nums">
          {home}
          {suffix}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
          {label}
        </span>
        <span className="tabular-nums">
          {away}
          {suffix}
        </span>
      </div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/50 p-0.5">
        <motion.div
          initial={reduceMotion ? { width: `${homePct}%` } : { width: 0 }}
          whileInView={{ width: `${homePct}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", bounce: 0.25, duration: 1 }}
          className="rounded-full bg-primary premium-glow"
        />
        <motion.div
          initial={reduceMotion ? { width: `${100 - homePct}%` } : { width: 0 }}
          whileInView={{ width: `${100 - homePct}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", bounce: 0.25, duration: 1 }}
          className="rounded-full bg-secondary premium-glow"
        />
      </div>
    </div>
  );
}

/** Doc 4.3 — Onglet Stats : Possession, Tirs cadrés, Corners, Fautes */
export function MatchStatsPanel({ stats, homeTeamName, awayTeamName }: MatchStatsPanelProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <span>{homeTeamName}</span>
        <span>{awayTeamName}</span>
      </div>
      <div className="flex flex-col gap-6">
        <StatRow label="Possession" values={stats.possession} suffix="%" />
        <StatRow label="Tirs cadrés" values={stats.shotsOnTarget} />
        <StatRow label="Corners" values={stats.corners} />
        <StatRow label="Fautes" values={stats.fouls} />
      </div>
    </div>
  );
}