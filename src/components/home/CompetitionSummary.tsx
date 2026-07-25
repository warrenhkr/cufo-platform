// components/home/CompetitionSummary.tsx
"use client";

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
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const { ref, value: animatedValue } = useCountUp<HTMLSpanElement>(value);

  return (
    <Card
      as="div"
      className="flex flex-col items-center justify-center gap-1 px-4 py-6 text-center"
    >
      <span
        ref={ref}
        className="font-heading text-4xl font-bold tabular-nums text-foreground sm:text-5xl"
      >
        {animatedValue}
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </Card>
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
        />
        <StatTile value={stats.teamsCount} label="Équipes engagées" />
        <StatTile value={stats.totalGoals} label="Buts marqués" />
        <StatTile value={stats.matchesThisWeek} label="Matchs cette semaine" />
      </div>
    </section>
  );
}