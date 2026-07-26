// lib/types.ts
// Types partagés pour la plateforme publique FootUCAO.

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string | null;
  primaryColor: string;
}

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

// --- Compétition : Classement (doc UX/UI section 7) ---

/** Zone du tableau qui déclenche un badge (doc 7.2). "none" = milieu de tableau, pas de badge. */
export type StandingZone = "qualification" | "playoff" | "relegation" | "none";

export interface StandingEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  zone: StandingZone;
}