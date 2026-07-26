// components/calendar/CalendarFilters.tsx
"use client";

interface CalendarFiltersProps {
  teamOptions: { id: string; name: string }[];
  matchdayOptions: number[];
  selectedTeam: string;
  selectedMatchday: string;
  onTeamChange: (value: string) => void;
  onMatchdayChange: (value: string) => void;
}

/** Doc 5.1 — Filtres par équipe et par journée (le filtre "sport" est
 * omis : le championnat est mono-sport football pour l'instant) */
export function CalendarFilters({
  teamOptions,
  matchdayOptions,
  selectedTeam,
  selectedMatchday,
  onTeamChange,
  onMatchdayChange,
}: CalendarFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <select
        value={selectedTeam}
        onChange={(e) => onTeamChange(e.target.value)}
        className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
      >
        <option value="">Filtrer par équipe</option>
        {teamOptions.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      <select
        value={selectedMatchday}
        onChange={(e) => onMatchdayChange(e.target.value)}
        className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
      >
        <option value="">Toutes les journées</option>
        {matchdayOptions.map((day) => (
          <option key={day} value={day}>
            Journée {day}
          </option>
        ))}
      </select>
    </div>
  );
}