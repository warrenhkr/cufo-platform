"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResultCard } from "@/components/results/ResultCard";
import { NetMotif } from "@/components/decorative/NetMotif";
import { pastResults } from "@/lib/results-mock-data";
import { teams } from "@/lib/mock-data";

/** Doc section 6 — Résultats. NB : l'onglet "Mon équipe" (6.1) est omis,
 * il suppose un système de compte/équipe suivie pas encore en place. */
export default function ResultsPage() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMatchday, setSelectedMatchday] = useState("");

  const teamOptions = useMemo(
    () => Object.values(teams).map((t) => ({ id: t.id, name: t.name })),
    [],
  );

  const matchdayOptions = useMemo(
    () => [...new Set(pastResults.map((r) => r.matchday))].sort((a, b) => b - a),
    [],
  );

  const filtered = pastResults.filter((result) => {
    const matchesTeam =
      !selectedTeam || result.homeTeam.id === selectedTeam || result.awayTeam.id === selectedTeam;
    const matchesMatchday = !selectedMatchday || result.matchday === Number(selectedMatchday);
    return matchesTeam && matchesMatchday;
  });

  return (
    <div className="relative overflow-hidden">
      <NetMotif />

      <Container className="relative z-10 py-8 sm:py-10">
        <PageHeader title="Résultats" subtitle="Tous les matchs joués, journée par journée" />

        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
          >
            <option value="">Filtrer par équipe</option>
            {teamOptions.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <select
            value={selectedMatchday}
            onChange={(e) => setSelectedMatchday(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
          >
            <option value="">Toutes les journées</option>
            {matchdayOptions.map((day) => (
              <option key={day} value={day}>Journée {day}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card/80 p-8 text-center">
            <h2 className="font-heading text-xl font-semibold text-foreground">Pas encore de résultats</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les premiers scores apparaîtront ici dès le coup d&rsquo;envoi de la saison.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}