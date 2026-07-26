// lib/match-mock-data.ts
import { teams } from "./mock-data";
import type { MatchDetail } from "./match-types";

export const matchDetail: MatchDetail = {
  status: "live",
  matchdayLabel: "Journée 6 · Championnat CUFO",
  homeTeam: teams.lions,
  awayTeam: teams.aigles,
  homeScore: 2,
  awayScore: 1,
  clockSeconds: 67 * 60 + 23, // 67:23

  events: [
    { id: "e1", minute: 0, type: "kickoff", team: "home", label: "Coup d'envoi" },
    { id: "e2", minute: 12, type: "corner", team: "away", label: "Corner pour Aigles Noirs" },
    { id: "e3", minute: 23, type: "goal", team: "away", label: "But de Malick Sossou (Aigles Noirs)" },
    { id: "e4", minute: 34, type: "goal", team: "home", label: "But de Junior Adjovi (Lions du Campus)" },
    { id: "e5", minute: 41, type: "yellow_card", team: "away", label: "Carton jaune pour Malick Sossou" },
    { id: "e6", minute: 45, type: "halftime", team: "home", label: "Mi-temps — 1-1" },
    { id: "e7", minute: 58, type: "red_card", team: "away", label: "Carton rouge pour Franck Agbodjan" },
    { id: "e8", minute: 60, type: "substitution", team: "home", label: "Rachidi Alao entre, Prudence Houngbédji sort" },
    { id: "e9", minute: 63, type: "goal", team: "home", label: "But de Junior Adjovi (Lions du Campus)" },
  ],

  lineups: {
    home: [
      { id: "h1", number: 1, name: "Élie Kponou", position: "Gardien" },
      { id: "h2", number: 2, name: "Prudence Houngbédji", position: "Défenseur" },
      { id: "h3", number: 4, name: "Samuel Zannou", position: "Défenseur" },
      { id: "h4", number: 5, name: "David Tchobo", position: "Défenseur" },
      { id: "h5", number: 6, name: "Yannick Gbaguidi", position: "Milieu" },
      { id: "h6", number: 7, name: "Cyrille Fanou", position: "Milieu" },
      { id: "h7", number: 8, name: "Bertin Sonon", position: "Milieu" },
      { id: "h8", number: 9, name: "Junior Adjovi", position: "Attaquant" },
      { id: "h9", number: 10, name: "Kévin Dossou", position: "Attaquant" },
      { id: "h10", number: 11, name: "Armand Houénou", position: "Attaquant" },
      { id: "h11", number: 3, name: "Fabrice Ahouansou", position: "Défenseur" },
    ],
    away: [
      { id: "a1", number: 1, name: "Ismaël Bio", position: "Gardien" },
      { id: "a2", number: 2, name: "Franck Agbodjan", position: "Défenseur" },
      { id: "a3", number: 3, name: "Rodrigue Amoussou", position: "Défenseur" },
      { id: "a4", number: 4, name: "Wilfried Sagbo", position: "Défenseur" },
      { id: "a5", number: 5, name: "Constant Hounkpe", position: "Défenseur" },
      { id: "a6", number: 6, name: "Malick Sossou", position: "Milieu" },
      { id: "a7", number: 7, name: "Bruno Kacou", position: "Milieu" },
      { id: "a8", number: 8, name: "Serge Adande", position: "Milieu" },
      { id: "a9", number: 9, name: "Théo Lokossou", position: "Attaquant" },
      { id: "a10", number: 10, name: "Nathan Aholou", position: "Attaquant" },
      { id: "a11", number: 11, name: "Éric Dansou", position: "Attaquant" },
    ],
  },

  stats: {
    possession: [58, 42],
    shotsOnTarget: [7, 4],
    corners: [5, 3],
    fouls: [8, 11],
  },

  headToHead: {
    totalMatches: 5,
    homeWins: 2,
    awayWins: 1,
    draws: 2,
  },

  mvpVote: {
    isOpen: false,
    remainingSeconds: 12 * 60,
    candidates: [
      { id: "h8", name: "Junior Adjovi", team: "home" },
      { id: "a6", name: "Malick Sossou", team: "away" },
      { id: "h9", name: "Kévin Dossou", team: "home" },
    ],
  },
};