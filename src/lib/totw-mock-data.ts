// lib/totw-mock-data.ts

export interface TotwPlayer {
  id: string;
  name: string;
  team: string;
  statLabel: string;
  /** Position en % sur le terrain portrait (0 = haut/but adverse, 100 = bas/gardien) */
  x: number;
  y: number;
}

export const totwMatchdayLabel = "journée 6";

/** Formation 4-3-3, positions approximatives sur un terrain vertical */
export const totwPlayers: TotwPlayer[] = [
  { id: "gk", name: "Bruno Kakpo", team: "Lions du Campus", statLabel: "Gardien · 2 arrêts décisifs", x: 50, y: 92 },
  { id: "df1", name: "Fabrice Dossou", team: "Lions du Campus", statLabel: "Défenseur", x: 15, y: 74 },
  { id: "df2", name: "Rufin Dansou", team: "Aigles Noirs", statLabel: "Défenseur", x: 38, y: 78 },
  { id: "df3", name: "Wilfried Zannou", team: "Lions du Campus", statLabel: "Défenseur", x: 62, y: 78 },
  { id: "df4", name: "Ismaël Tossou", team: "Lions du Campus", statLabel: "Défenseur", x: 85, y: 74 },
  { id: "mf1", name: "Cyrille Hounkpé", team: "Lions du Campus", statLabel: "Milieu · Passe décisive", x: 25, y: 54 },
  { id: "mf2", name: "Malick Sossou", team: "Aigles Noirs", statLabel: "Milieu · 2 passes décisives", x: 50, y: 50 },
  { id: "mf3", name: "David Gbaguidi", team: "Lions du Campus", statLabel: "Milieu", x: 75, y: 54 },
  { id: "fw1", name: "Junior Adjovi", team: "Lions du Campus", statLabel: "Attaquant · Doublé", x: 20, y: 24 },
  { id: "fw2", name: "Steve Aholou", team: "Lions du Campus", statLabel: "Attaquant · But", x: 50, y: 16 },
  { id: "fw3", name: "Aristide Kindjinou", team: "Aigles Noirs", statLabel: "Attaquant · But", x: 80, y: 24 },
];