// app/competition/classement/page.tsx
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { standings, currentMatchday, totalMatchdays } from "@/lib/mock-data";
import type { StandingEntry, StandingZone } from "@/lib/types";

const zoneStyles: Record<StandingZone, { border: string; dot: string }> = {
  qualification: { border: "border-l-emerald-500", dot: "bg-emerald-500" },
  playoff: { border: "border-l-amber-500", dot: "bg-amber-500" },
  relegation: { border: "border-l-destructive", dot: "bg-destructive" },
  none: { border: "border-l-transparent", dot: "bg-transparent" },
};

function TeamCrest({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function StandingRow({
  entry,
  expanded,
  onToggle,
}: {
  entry: StandingEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const goalDifference = entry.goalsFor - entry.goalsAgainst;
  const points = entry.won * 3 + entry.drawn;
  const zone = zoneStyles[entry.zone];

  return (
    <>
      {/* Ligne desktop : tableau complet, toujours visible */}
      <tr className={`hidden border-l-4 sm:table-row ${zone.border}`}>
        <td className="py-3 pl-4 text-sm font-semibold text-foreground">{entry.position}</td>
        <td className="py-3">
          <div className="flex items-center gap-3">
            <TeamCrest name={entry.team.name} color={entry.team.primaryColor} />
            <span className="text-sm font-medium text-foreground">{entry.team.name}</span>
          </div>
        </td>
        <td className="py-3 text-center text-sm text-muted-foreground">{entry.played}</td>
        <td className="py-3 text-center text-sm text-muted-foreground">{entry.won}</td>
        <td className="py-3 text-center text-sm text-muted-foreground">{entry.drawn}</td>
        <td className="py-3 text-center text-sm text-muted-foreground">{entry.lost}</td>
        <td className="py-3 text-center text-sm text-muted-foreground">{entry.goalsFor}</td>
        <td className="py-3 text-center text-sm text-muted-foreground">{entry.goalsAgainst}</td>
        <td className="py-3 text-center text-sm font-medium text-foreground">
          {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
        </td>
        <td className="py-3 pr-4 text-center text-sm font-bold text-foreground">{points}</td>
      </tr>

      {/* Ligne mobile condensée : Pos / équipe / Pts visibles, reste au tap (doc 7.9) */}
      <tr className={`table-row border-l-4 sm:hidden ${zone.border}`}>
        <td colSpan={10} className="py-0">
          <button
            onClick={onToggle}
            className="flex w-full items-center gap-3 py-3 pl-4 pr-4 text-left"
            aria-expanded={expanded}
          >
            <span className="w-5 text-sm font-semibold text-foreground">{entry.position}</span>
            <TeamCrest name={entry.team.name} color={entry.team.primaryColor} />
            <span className="flex-1 truncate text-sm font-medium text-foreground">
              {entry.team.name}
            </span>
            <span className="text-sm font-bold text-foreground">{points} Pts</span>
          </button>
          {expanded && (
            <div className="grid grid-cols-4 gap-2 border-t border-border/60 px-4 pb-3 pt-3 text-center">
              {[
                ["J", entry.played],
                ["G", entry.won],
                ["N", entry.drawn],
                ["P", entry.lost],
                ["BP", entry.goalsFor],
                ["BC", entry.goalsAgainst],
                ["Diff.", goalDifference > 0 ? `+${goalDifference}` : goalDifference],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default function ClassementPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Container className="py-8 sm:py-10">
      <PageHeader
        title="Classement"
        subtitle={`Championnat CUFO UCAO-UUC — Journée ${currentMatchday} / ${totalMatchdays}`}
      />

      {standings.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card/80 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Classement pas encore disponible
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Il apparaîtra dès le premier match joué.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/80">
          <table className="w-full border-collapse">
            <thead>
              <tr className="hidden border-b border-border/60 sm:table-row">
                <th className="py-3 pl-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Pos.
                </th>
                <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Équipe
                </th>
                <th className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  J
                </th>
                <th className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  G
                </th>
                <th className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  N
                </th>
                <th className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  P
                </th>
                <th className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  BP
                </th>
                <th className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  BC
                </th>
                <th className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Diff.
                </th>
                <th className="py-3 pr-4 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 sm:[&>tr]:divide-y-0">
              {standings.map((entry) => (
                <StandingRow
                  key={entry.team.id}
                  entry={entry}
                  expanded={expandedId === entry.team.id}
                  onToggle={() =>
                    setExpandedId(expandedId === entry.team.id ? null : entry.team.id)
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>🟢 Qualification directe · 🟠 Barrage · 🔴 Relégation</p>
        <p>Classement mis à jour automatiquement après chaque match.</p>
      </div>
    </Container>
  );
}