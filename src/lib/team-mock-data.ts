// lib/team-mock-data.ts
// Les attributs de Junior Adjovi reprennent l'exemple littéral de la doc (10.3).
import type { Player } from "./team-types";

export const players: Player[] = [
  // Lions du Campus
  { id: "junior-adjovi", teamId: "lions", name: "Junior Adjovi", number: 9, position: "Attaquant", badge: "Top buteur", photoUrl: null,
    attributes: { speed: 84, shooting: 89, passing: 71, dribbling: 80, defense: 42, physical: 76 } },
  { id: "franck-agbodjan", teamId: "lions", name: "Franck Agbodjan", number: 8, position: "Milieu", photoUrl: null,
    attributes: { speed: 74, shooting: 66, passing: 81, dribbling: 75, defense: 63, physical: 70 } },
  { id: "steve-aholou", teamId: "lions", name: "Steve Aholou", number: 7, position: "Attaquant", photoUrl: null,
    attributes: { speed: 79, shooting: 75, passing: 68, dribbling: 77, defense: 38, physical: 72 } },
  { id: "david-gbaguidi", teamId: "lions", name: "David Gbaguidi", number: 10, position: "Milieu", photoUrl: null,
    attributes: { speed: 71, shooting: 70, passing: 84, dribbling: 78, defense: 60, physical: 65 } },
  { id: "prudence-houngbedji", teamId: "lions", name: "Prudence Houngbédji", number: 11, position: "Attaquant", photoUrl: null,
    attributes: { speed: 82, shooting: 73, passing: 65, dribbling: 79, defense: 35, physical: 68 } },
  { id: "bruno-kakpo", teamId: "lions", name: "Bruno Kakpo", number: 1, position: "Gardien", photoUrl: null,
    attributes: { speed: 55, shooting: 20, passing: 58, dribbling: 40, defense: 82, physical: 78 } },

  // Aigles Noirs
  { id: "malick-sossou", teamId: "aigles", name: "Malick Sossou", number: 7, position: "Milieu", badge: "Meilleur passeur", photoUrl: null,
    attributes: { speed: 76, shooting: 68, passing: 87, dribbling: 79, defense: 58, physical: 69 } },
  { id: "aristide-kindjinou", teamId: "aigles", name: "Aristide Kindjinou", number: 9, position: "Attaquant", photoUrl: null,
    attributes: { speed: 80, shooting: 83, passing: 66, dribbling: 76, defense: 40, physical: 74 } },
  { id: "theophile-agossou", teamId: "aigles", name: "Théophile Agossou", number: 10, position: "Attaquant", photoUrl: null,
    attributes: { speed: 77, shooting: 78, passing: 70, dribbling: 74, defense: 37, physical: 71 } },
  { id: "salifou-baba", teamId: "aigles", name: "Salifou Baba", number: 8, position: "Milieu", photoUrl: null,
    attributes: { speed: 72, shooting: 62, passing: 79, dribbling: 73, defense: 61, physical: 67 } },
  { id: "alain-vodounou", teamId: "aigles", name: "Alain Vodounou", number: 1, position: "Gardien", photoUrl: null,
    attributes: { speed: 52, shooting: 18, passing: 55, dribbling: 38, defense: 80, physical: 76 } },

  // Panthères FC
  { id: "rachidi-alao", teamId: "pantheres", name: "Rachidi Alao", number: 11, position: "Attaquant", badge: "Révélation", photoUrl: null,
    attributes: { speed: 85, shooting: 77, passing: 64, dribbling: 81, defense: 33, physical: 70 } },
  { id: "yannick-hounsou", teamId: "pantheres", name: "Yannick Hounsou", number: 6, position: "Milieu", photoUrl: null,
    attributes: { speed: 70, shooting: 60, passing: 78, dribbling: 72, defense: 66, physical: 73 } },
  { id: "bienvenu-adisso", teamId: "pantheres", name: "Bienvenu Adisso", number: 4, position: "Défenseur", photoUrl: null,
    attributes: { speed: 66, shooting: 35, passing: 62, dribbling: 55, defense: 81, physical: 79 } },

  // Faucons de Droit
  { id: "carlos-mensah", teamId: "faucons", name: "Carlos Mensah", number: 9, position: "Attaquant", photoUrl: null,
    attributes: { speed: 78, shooting: 74, passing: 63, dribbling: 75, defense: 36, physical: 71 } },
  { id: "hermann-dako", teamId: "faucons", name: "Hermann Dako", number: 5, position: "Défenseur", photoUrl: null,
    attributes: { speed: 64, shooting: 32, passing: 60, dribbling: 52, defense: 79, physical: 77 } },

  // Requins de Médecine
  { id: "gilbert-noudogbessi", teamId: "requins", name: "Gilbert Noudogbessi", number: 9, position: "Attaquant", photoUrl: null,
    attributes: { speed: 75, shooting: 72, passing: 61, dribbling: 70, defense: 34, physical: 69 } },
  { id: "arnaud-sekloka", teamId: "requins", name: "Arnaud Sekloka", number: 6, position: "Milieu", photoUrl: null,
    attributes: { speed: 68, shooting: 58, passing: 74, dribbling: 69, defense: 63, physical: 68 } },

  // Guépards d'Économie
  { id: "isaac-tokpanou", teamId: "guepards", name: "Isaac Tokpanou", number: 10, position: "Milieu", photoUrl: null,
    attributes: { speed: 71, shooting: 63, passing: 75, dribbling: 71, defense: 58, physical: 66 } },
  { id: "boris-ahouandjinou", teamId: "guepards", name: "Boris Ahouandjinou", number: 3, position: "Défenseur", photoUrl: null,
    attributes: { speed: 63, shooting: 30, passing: 58, dribbling: 50, defense: 77, physical: 75 } },

  // Griffons d'Ingénierie
  { id: "florent-akakpo", teamId: "griffons", name: "Florent Akakpo", number: 9, position: "Attaquant", photoUrl: null,
    attributes: { speed: 73, shooting: 69, passing: 60, dribbling: 68, defense: 33, physical: 67 } },

  // Taureaux de Gestion
  { id: "michael-koudjo", teamId: "taureaux", name: "Michael Koudjo", number: 7, position: "Milieu", photoUrl: null,
    attributes: { speed: 66, shooting: 55, passing: 70, dribbling: 65, defense: 55, physical: 64 } },
];

export function playersByTeam(teamId: string): Player[] {
  return players.filter((p) => p.teamId === teamId);
}