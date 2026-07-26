export interface PlayerStat {
  id: string;
  name: string;
  teamName: string;
  value: number;
}

export type TeamStatCategory = "attack" | "defense" | "cards";

export interface TeamStat {
  category: TeamStatCategory;
  teamName: string;
  description: string; // texte déjà formaté, ex. "24 buts" (même convention que MatchEvent.label)
}

export interface StatisticsData {
  matchdayLabel: string; // "journée 6" — pour "Mis à jour après la journée 6" (8.7)
  topScorers: PlayerStat[];
  topAssists: PlayerStat[];
  topCards: PlayerStat[];
  teamStats: TeamStat[];
}

export const teamStatLabel: Record<TeamStatCategory, string> = {
  attack: "Meilleure attaque",
  defense: "Meilleure défense",
  cards: "Plus de cartons",
};