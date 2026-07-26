// lib/match-types.ts
import type { Team } from "./types";

export type MatchEventType =
  | "kickoff"
  | "goal"
  | "yellow_card"
  | "red_card"
  | "substitution"
  | "corner"
  | "halftime"
  | "fulltime";

export interface MatchEvent {
  id: string;
  minute: number;
  type: MatchEventType;
  team: "home" | "away";
  label: string; // texte déjà formaté, ex. "But de Junior Adjovi (Lions du Campus)"
}

export interface LineupPlayer {
  id: string;
  number: number;
  name: string;
  position: string;
}

export interface MatchStatsDetail {
  possession: [number, number]; // %
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
}

export interface HeadToHead {
  totalMatches: number;
  homeWins: number;
  awayWins: number;
  draws: number;
}

export interface MvpCandidate {
  id: string;
  name: string;
  team: "home" | "away";
}

export type LiveMatchDetailStatus = "live" | "halftime" | "finished" | "upcoming";

export interface MatchDetail {
  status: LiveMatchDetailStatus;
  matchdayLabel: string; // "Journée 6 · Championnat CUFO"
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  clockSeconds: number; // pour le format mm:ss
  kickoffLabel?: string; // utilisé si status === "upcoming"
  events: MatchEvent[];
  lineups: {
    home: LineupPlayer[];
    away: LineupPlayer[];
  };
  stats: MatchStatsDetail;
  headToHead: HeadToHead;
  mvpVote: {
    isOpen: boolean;
    remainingSeconds: number;
    candidates: MvpCandidate[];
  };
}