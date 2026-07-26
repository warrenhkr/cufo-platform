// lib/calendar-types.ts
import type { Team } from "./types";

export interface UpcomingFixture {
  id: string;
  matchday: number;
  homeTeam: Team;
  awayTeam: Team;
  dayLabel: string; // ex. "Samedi 26 juillet"
  timeLabel: string; // ex. "16h00"
  venue: string; // ex. "Terrain principal"
  /** J-1 ou jour même — pilote le badge "Bientôt"/"Aujourd'hui" (doc 5.2) */
  badge?: "soon" | "today";
}