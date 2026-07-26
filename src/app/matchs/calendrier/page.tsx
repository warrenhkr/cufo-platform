// app/matchs/calendrier/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CalendarFilters } from "@/components/calendar/CalendarFilters";
import { FixtureCard } from "@/components/calendar/FixtureCard";
import { upcomingFixtures } from "@/lib/calendar-mock-data";
import { teams } from "@/lib/mock-data";

/** Doc section 5 — Calendrier des matchs */
export default function CalendarPage() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMatchday, setSelectedMatchday] = useState("");

  const teamOptions = useMemo(
    () => Object.values(teams).map((t) => ({ id: t.id, name: t.name })),
    [],
  );

  const matchdayOptions = useMemo(
    () => [...new Set(upcomingFixtures.map((f) => f.matchday))].sort((a, b) => a - b),
    [],
  );

  const filtered = upcomingFixtures.filter((fixture) => {
    const matchesTeam =
      !selectedTeam ||
      fixture.homeTeam.id === selectedTeam ||
      fixture.awayTeam.id === selectedTeam;
    const matchesMatchday =
      !selectedMatchday || fixture.matchday === Number(selectedMatchday);
    return matchesTeam && matchesMatchday;
  });

  return (
    <Container className="py-8 sm:py-10">
      <PageHeader
        title="Calendrier des matchs"
        subtitle="Toutes les rencontres à venir, journée par journée"
      />

      <CalendarFilters
        teamOptions={teamOptions}
        matchdayOptions={matchdayOptions}
        selectedTeam={selectedTeam}
        selectedMatchday={selectedMatchday}
        onTeamChange={setSelectedTeam}
        onMatchdayChange={setSelectedMatchday}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card/80 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Aucun match programmé
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Le calendrier de cette journée n&rsquo;est pas encore publié.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((fixture, index) => (
            <FixtureCard key={fixture.id} fixture={fixture} index={index} />
          ))}
        </div>
      )}
    </Container>
  );
}