// lib/results-mock-data.ts
import { teams } from "./mock-data";
import type { MatchResult } from "./results-types";

export const pastResults: MatchResult[] = [
  { id: "res-1", matchday: 5, homeTeam: teams.lions, awayTeam: teams.aigles, homeScore: 3, awayScore: 1, dateLabel: "19 juillet", articleSlug: "lions-aigles-journee-5" },
  { id: "res-2", matchday: 5, homeTeam: teams.pantheres, awayTeam: teams.requins, homeScore: 2, awayScore: 2, dateLabel: "19 juillet" },
  { id: "res-3", matchday: 5, homeTeam: teams.faucons, awayTeam: teams.guepards, homeScore: 0, awayScore: 1, dateLabel: "18 juillet" },
  { id: "res-4", matchday: 4, homeTeam: teams.griffons, awayTeam: teams.taureaux, homeScore: 2, awayScore: 0, dateLabel: "12 juillet" },
  { id: "res-5", matchday: 4, homeTeam: teams.lions, awayTeam: teams.requins, homeScore: 4, awayScore: 1, dateLabel: "12 juillet" },
  { id: "res-6", matchday: 4, homeTeam: teams.aigles, awayTeam: teams.pantheres, homeScore: 1, awayScore: 1, dateLabel: "11 juillet" },
];