// components/home/CompetitionSummary.tsx
"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCountUp } from "@/lib/useCountUp";
import type { CompetitionSummaryStats } from "@/lib/types";

interface CompetitionSummaryProps {
  stats: CompetitionSummaryStats;
}

function StatTile({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const { ref, value: animatedValue } = useCountUp<HTMLSpanElement>(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      className="h-full"
    >
      <Card
        as="div"
        className="flex h-full flex-col items-center justify-center gap-1.5 px-4 py-8 text-center bg-card/80 backdrop-blur-lg transition-colors hover:bg-card/90 border-border/50 hover:border-border"
      >
        <span
          ref={ref}
          className="font-heading text-4xl font-bold tabular-nums text-foreground sm:text-5xl"
        >
          {animatedValue}
          <span className="text-primary/70">{suffix}</span>
        </span>
        <span className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wider">{label}</span>
      </Card>
    </motion.div>
  );
}

/** Doc 3.3 — "Où en est le championnat" */
export function CompetitionSummary({ stats }: CompetitionSummaryProps) {
  return (
    <section>
      <SectionHeader
        title="Où en est le championnat"
        href="/competition/classement"
        linkLabel="Voir le classement complet →"
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatTile
          value={stats.currentMatchday}
          suffix={` / ${stats.totalMatchdays}`}
          label="Journée en cours"
          delay={0.1}
        />
        <StatTile value={stats.teamsCount} label="Équipes engagées" delay={0.2} />
        <StatTile value={stats.totalGoals} label="Buts marqués" delay={0.3} />
        <StatTile value={stats.matchesThisWeek} label="Matchs cette semaine" delay={0.4} />
      </div>
    </section>
  );
}