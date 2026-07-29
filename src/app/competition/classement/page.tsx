// app/competition/classement/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { standings, currentMatchday, totalMatchdays } from "@/lib/mock-data";
import type { StandingEntry, StandingZone } from "@/lib/types";

const zoneBorder: Record<StandingZone, string> = {
  qualification: "border-l-emerald-500",
  playoff: "border-l-amber-500",
  relegation: "border-l-destructive",
  none: "border-l-transparent",
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
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
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
  index,
}: {
  entry: StandingEntry;
  expanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const goalDifference = entry.goalsFor - entry.goalsAgainst;
  const points = entry.won * 3 + entry.drawn;
  const border = zoneBorder[entry.zone];

  const rowInitial = reduceMotion ? { opacity: 0 } : { opacity: 0, x: 50 };
  const rowAnimate = reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 };
  const rowTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    delay: reduceMotion ? 0 : index * 0.05,
  };

  const hoverClass = "transition-all duration-300 hover:bg-primary/5 hover:border-primary/20 hover:premium-glow hover:z-10 relative cursor-pointer sm:cursor-default";

  return (
    <>
      {/* Ligne desktop : tableau complet, toujours visible */}
      <motion.tr
        initial={rowInitial}
        whileInView={rowAnimate}
        viewport={{ once: true, margin: "-50px" }}
        transition={rowTransition}
        className={`hidden border-l-4 sm:table-row ${border} ${hoverClass}`}
      >
        <td className="py-4 pl-4 text-sm font-semibold text-foreground/80">{entry.position}</td>
        <td className="py-4">
          <div className="flex items-center gap-3">
            <TeamCrest name={entry.team.name} color={entry.team.primaryColor} />
            <span className="text-sm font-bold text-foreground">{entry.team.name}</span>
          </div>
        </td>
        <td className="py-4 text-center text-sm font-medium text-muted-foreground">{entry.played}</td>
        <td className="py-4 text-center text-sm font-medium text-muted-foreground">{entry.won}</td>
        <td className="py-4 text-center text-sm font-medium text-muted-foreground">{entry.drawn}</td>
        <td className="py-4 text-center text-sm font-medium text-muted-foreground">{entry.lost}</td>
        <td className="py-4 text-center text-sm font-medium text-muted-foreground">{entry.goalsFor}</td>
        <td className="py-4 text-center text-sm font-medium text-muted-foreground">{entry.goalsAgainst}</td>
        <td className="py-4 text-center text-sm font-semibold text-foreground">
          {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
        </td>
        <td className="py-4 pr-4 text-center text-sm font-black text-primary">{points}</td>
      </motion.tr>

      {/* Ligne mobile condensée : Pos / équipe / Pts visibles, reste au tap (doc 7.9) */}
      <motion.tr
        initial={rowInitial}
        whileInView={rowAnimate}
        viewport={{ once: true, margin: "-50px" }}
        transition={rowTransition}
        className={`table-row border-l-4 sm:hidden ${border} ${hoverClass} ${expanded ? "bg-primary/5" : ""}`}
      >
        <td colSpan={10} className="py-0">
          <button
            onClick={onToggle}
            className="flex w-full items-center gap-3 py-4 pl-4 pr-4 text-left outline-none"
            aria-expanded={expanded}
          >
            <span className="w-5 text-sm font-semibold text-foreground/80">{entry.position}</span>
            <TeamCrest name={entry.team.name} color={entry.team.primaryColor} />
            <span className="flex-1 truncate text-sm font-bold text-foreground">
              {entry.team.name}
            </span>
            <span className="text-sm font-black text-primary">{points} Pts</span>
          </button>
          
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-4 gap-2 border-t border-border/40 px-4 pb-4 pt-4 text-center bg-card/30">
                  {[
                    ["J", entry.played],
                    ["G", entry.won],
                    ["N", entry.drawn],
                    ["P", entry.lost],
                    ["BP", entry.goalsFor],
                    ["BC", entry.goalsAgainst],
                    ["Diff.", goalDifference > 0 ? `+${goalDifference}` : goalDifference],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </td>
      </motion.tr>
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
        <div className="rounded-3xl border border-border bg-card/40 p-8 text-center backdrop-blur-md">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Classement pas encore disponible
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Il apparaîtra dès le premier match joué.
          </p>
        </div>
      ) : (
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl shadow-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="hidden border-b border-border/40 sm:table-row bg-background/50">
                  <th className="py-4 pl-4 text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    Pos.
                  </th>
                  <th className="py-4 text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    Équipe
                  </th>
                  <th className="py-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    J
                  </th>
                  <th className="py-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    G
                  </th>
                  <th className="py-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    N
                  </th>
                  <th className="py-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    P
                  </th>
                  <th className="py-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    BP
                  </th>
                  <th className="py-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    BC
                  </th>
                  <th className="py-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    Diff.
                  </th>
                  <th className="py-4 pr-4 text-center text-[11px] font-bold uppercase tracking-widest text-primary">
                    Pts
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 sm:[&>tr]:divide-y-0">
                {standings.map((entry, index) => (
                  <StandingRow
                    key={entry.team.id}
                    entry={entry}
                    index={index}
                    expanded={expandedId === entry.team.id}
                    onToggle={() =>
                      setExpandedId(expandedId === entry.team.id ? null : entry.team.id)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      )}

      <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="zone-qualification" className="shadow-sm">Qualification directe</Badge>
          <Badge variant="zone-playoff" className="shadow-sm">Barrage</Badge>
          <Badge variant="zone-relegation" className="shadow-sm">Relégation</Badge>
        </div>
        <p className="font-medium">Classement mis à jour automatiquement après chaque match.</p>
      </div>
    </Container>
  );
}