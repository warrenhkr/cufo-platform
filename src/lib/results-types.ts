// lib/results-types.ts
import type { Team } from "./types";

export interface MatchResult {
  id: string;
  matchday: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  dateLabel: string;
  /** Si un article couvre ce match, on montre le CTA "Voir le résumé" */
  articleSlug?: string;
}