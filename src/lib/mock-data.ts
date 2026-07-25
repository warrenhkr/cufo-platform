// lib/mock-data.ts
import type {
  CompetitionSummaryStats,
  FeaturedPlayer,
  MatchHighlight,
  NewsArticle,
  Team,
  MatchDetail,
} from "./types";

export const teams: Record<string, Team> = {
  lions: {
    id: "lions",
    name: "Lions du Campus",
    shortName: "LDC",
    logoUrl: null,
    primaryColor: "#E12D39",
  },
  aigles: {
    id: "aigles",
    name: "Aigles Noirs",
    shortName: "AGN",
    logoUrl: null,
    primaryColor: "#16305F",
  },
  pantheres: {
    id: "pantheres",
    name: "Panthères FC",
    shortName: "PFC",
    logoUrl: null,
    primaryColor: "#7C3AED",
  },
  faucons: {
    id: "faucons",
    name: "Faucons de Droit",
    shortName: "FDD",
    logoUrl: null,
    primaryColor: "#0F766E",
  },
};

const HAS_LIVE_MATCH = true;

export const matchHighlight: MatchHighlight = HAS_LIVE_MATCH
  ? {
      status: "live",
      homeTeam: teams.lions,
      awayTeam: teams.aigles,
      homeScore: 2,
      awayScore: 1,
      minute: 45,
    }
  : {
      status: "upcoming",
      homeTeam: teams.pantheres,
      awayTeam: teams.faucons,
      dayLabel: "Samedi 26 juillet",
      timeLabel: "16h00",
    };

export const competitionSummary: CompetitionSummaryStats = {
  currentMatchday: 6,
  totalMatchdays: 14,
  teamsCount: 8,
  totalGoals: 142,
  matchesThisWeek: 3,
};

export const featuredPlayers: FeaturedPlayer[] = [
  {
    id: "junior-adjovi",
    name: "Junior Adjovi",
    team: "Lions du Campus",
    badgeLabel: "Top buteur",
    statLabel: "9 buts",
    photoUrl: null,
  },
  {
    id: "malick-sossou",
    name: "Malick Sossou",
    team: "Aigles Noirs",
    badgeLabel: "Meilleur passeur",
    statLabel: "6 passes décisives",
    photoUrl: null,
  },
  {
    id: "rachidi-alao",
    name: "Rachidi Alao",
    team: "Panthères FC",
    badgeLabel: "Révélation",
    statLabel: "5 buts en 4 matchs",
    photoUrl: null,
  },
];

export const latestNews: NewsArticle[] = [
  {
    id: "news-1",
    slug: "lions-aigles-journee-5",
    title: "Les Lions du Campus s'imposent 3-1 face aux Aigles Noirs",
    excerpt: "Résumé du choc de la journée 5, avec le triplé de Junior Adjovi.",
    category: "Résumé de match",
    publishedLabel: "Publié le 19 juillet",
    imageUrl: null,
  },
  {
    id: "news-2",
    slug: "communique-arbitrage",
    title: "Nouveau protocole d'arbitrage vidéo pour les demi-finales",
    excerpt: "Le comité CUFO précise les règles d'usage de l'assistance vidéo à partir des phases finales.",
    category: "Communiqué officiel",
    publishedLabel: "Publié le 17 juillet",
    imageUrl: null,
  },
  {
    id: "news-3",
    slug: "coulisses-entrainement-pantheres",
    title: "Dans les coulisses de la préparation des Panthères FC",
    excerpt: "Une semaine avec l'effectif qui affiche la meilleure dynamique du moment.",
    category: "Coulisses",
    publishedLabel: "Publié le 15 juillet",
    imageUrl: null,
  },
];

// --- Match en direct : détail complet (doc UX/UI section 4) ---
export const matchDetail: MatchDetail = {
  id: "lions-aigles-j6",
  status: "live",
  homeTeam: teams.lions,
  awayTeam: teams.aigles,
  homeScore: 2,
  awayScore: 1,
  minute: 67,
  matchday: 6,
  events: [
    { id: "e1", minute: 0, type: "kickoff" },
    { id: "e2", minute: 12, type: "corner", team: "home" },
    { id: "e3", minute: 34, type: "goal", team: "home", player: "Junior Adjovi" },
    { id: "e4", minute: 41, type: "yellowCard", team: "away", player: "Malick Sossou" },
    { id: "e5", minute: 45, type: "halftime" },
    { id: "e6", minute: 52, type: "goal", team: "away", player: "Aristide Kindjinou" },
    { id: "e7", minute: 61, type: "goal", team: "home", player: "Junior Adjovi" },
    { id: "e8", minute: 65, type: "substitution", team: "home", playerIn: "Prudence Houngbédji", playerOut: "Franck Agbodjan" },
  ],
  lineupHome: [
    { number: 1, name: "Bruno Kakpo", position: "Gardien" },
    { number: 2, name: "Fabrice Dossou", position: "Défenseur" },
    { number: 3, name: "Ismaël Tossou", position: "Défenseur" },
    { number: 4, name: "Régis Amoussou", position: "Défenseur" },
    { number: 5, name: "Wilfried Zannou", position: "Défenseur" },
    { number: 6, name: "Cyrille Hounkpé", position: "Milieu" },
    { number: 7, name: "Junior Adjovi", position: "Attaquant" },
    { number: 8, name: "Franck Agbodjan", position: "Milieu" },
    { number: 9, name: "Steve Aholou", position: "Attaquant" },
    { number: 10, name: "David Gbaguidi", position: "Milieu" },
    { number: 11, name: "Prudence Houngbédji", position: "Attaquant" },
  ],
  lineupAway: [
    { number: 1, name: "Alain Vodounou", position: "Gardien" },
    { number: 2, name: "Bertin Klotoè", position: "Défenseur" },
    { number: 3, name: "Judicaël Adéyemi", position: "Défenseur" },
    { number: 4, name: "Rufin Dansou", position: "Défenseur" },
    { number: 5, name: "Éric Houndjo", position: "Défenseur" },
    { number: 6, name: "Salifou Baba", position: "Milieu" },
    { number: 7, name: "Malick Sossou", position: "Milieu" },
    { number: 8, name: "Landry Chabi", position: "Milieu" },
    { number: 9, name: "Aristide Kindjinou", position: "Attaquant" },
    { number: 10, name: "Théophile Agossou", position: "Attaquant" },
    { number: 11, name: "Osée Migan", position: "Attaquant" },
  ],
  stats: {
    possessionHome: 54,
    possessionAway: 46,
    shotsOnTargetHome: 6,
    shotsOnTargetAway: 3,
    cornersHome: 5,
    cornersAway: 2,
    foulsHome: 8,
    foulsAway: 11,
  },
  headToHead: {
    totalMeetings: 5,
    homeWins: 2,
    awayWins: 1,
    draws: 2,
  },
};