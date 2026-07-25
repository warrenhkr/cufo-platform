// lib/types.ts
// Types partagés pour la plateforme publique FootUCAO.

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string | null;
  primaryColor: string;
}

export type MatchStatus = "live" | "upcoming" | "finished" | "halftime";

export interface LiveMatchSummary {
  status: "live" | "halftime";
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  minute: number;
}

export interface UpcomingMatchSummary {
  status: "upcoming";
  homeTeam: Team;
  awayTeam: Team;
  dayLabel: string;
  timeLabel: string;
}

export type MatchHighlight = LiveMatchSummary | UpcomingMatchSummary;

export interface CompetitionSummaryStats {
  currentMatchday: number;
  totalMatchdays: number;
  teamsCount: number;
  totalGoals: number;
  matchesThisWeek: number;
}

export interface FeaturedPlayer {
  id: string;
  name: string;
  team: string;
  badgeLabel: string;
  statLabel: string;
  photoUrl: string | null;
}

export type NewsCategory =
  | "Résumé de match"
  | "Communiqué officiel"
  | "Coulisses"
  | "Annonce";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedLabel: string;
  imageUrl: string | null;
}

// --- Match en direct (doc UX/UI section 4) ---

export type MatchEventType =
  | "kickoff"
  | "goal"
  | "yellowCard"
  | "redCard"
  | "substitution"
  | "corner"
  | "halftime"
  | "fulltime";

export interface MatchEvent {
  id: string;
  minute: number;
  type: MatchEventType;
  team?: "home" | "away";
  player?: string;
  playerIn?: string;
  playerOut?: string;
}

export interface LineupPlayer {
  number: number;
  name: string;
  position: string;
}

export interface MatchStats {
  possessionHome: number;
  possessionAway: number;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  cornersHome: number;
  cornersAway: number;
  foulsHome: number;
  foulsAway: number;
}

export interface HeadToHead {
  totalMeetings: number;
  homeWins: number;
  awayWins: number;
  draws: number;
}

export interface MatchDetail {
  id: string;
  status: MatchStatus;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  minute: number | null;
  matchday: number;
  kickoffLabel?: string;
  events: MatchEvent[];
  lineupHome: LineupPlayer[];
  lineupAway: LineupPlayer[];
  stats: MatchStats;
  headToHead: HeadToHead;
  mvpVoteDeadline?: string;
}