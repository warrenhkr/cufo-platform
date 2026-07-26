import type { StatisticsData } from "./stats-types";

export const statisticsData: StatisticsData = {
  matchdayLabel: "journée 6",
  topScorers: [
    { id: "s1", name: "Junior Adjovi", teamName: "Lions du Campus", value: 9 },
    { id: "s2", name: "Théo Aplogan", teamName: "Aigles Noirs", value: 7 },
    { id: "s3", name: "Wilfried Gnonlonfoun", teamName: "Lions du Campus", value: 6 },
    { id: "s4", name: "Nazaire Kpossou", teamName: "Panthères FC", value: 5 },
    { id: "s5", name: "Kokou Mensah", teamName: "Aigles Noirs", value: 4 },
  ],
  topAssists: [
    { id: "a1", name: "Ismaël Bocco", teamName: "Lions du Campus", value: 6 },
    { id: "a2", name: "Roland Djossou", teamName: "Aigles Noirs", value: 5 },
    { id: "a3", name: "Corentin Aïhou", teamName: "Lions du Campus", value: 4 },
    { id: "a4", name: "Yannick Sènou", teamName: "Aigles Noirs", value: 3 },
    { id: "a5", name: "Mahamadou Baba", teamName: "Panthères FC", value: 3 },
  ],
  topCards: [
    { id: "c1", name: "Franck Agbodjan", teamName: "Lions du Campus", value: 4 },
    { id: "c2", name: "Malick Sossou", teamName: "Lions du Campus", value: 3 },
    { id: "c3", name: "Bruno Ahouansou", teamName: "Aigles Noirs", value: 3 },
    { id: "c4", name: "Séraphin Houngbo", teamName: "Panthères FC", value: 2 },
  ],
  teamStats: [
    { category: "attack", teamName: "Lions du Campus", description: "24 buts" },
    { category: "defense", teamName: "Aigles Noirs", description: "4 buts encaissés" },
    { category: "cards", teamName: "Panthères FC", description: "11" },
  ],
};