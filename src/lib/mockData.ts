import { Equipe, Match, Joueur, Actualite } from './types'

export const mockEquipes: Equipe[] = [
  { id: '1', nom: 'Équipe A', points: 12, matchsJoues: 4, victoires: 4, nuls: 0, defaites: 0, butsPour: 10, butsContre: 3 },
  { id: '2', nom: 'Équipe C', points: 9, matchsJoues: 4, victoires: 3, nuls: 0, defaites: 1, butsPour: 7, butsContre: 4 },
  { id: '3', nom: 'Équipe D', points: 6, matchsJoues: 4, victoires: 2, nuls: 0, defaites: 2, butsPour: 5, butsContre: 6 },
  { id: '4', nom: 'Équipe B', points: 3, matchsJoues: 4, victoires: 1, nuls: 0, defaites: 3, butsPour: 2, butsContre: 9 },
]

export const mockMatchEnCours: Match = {
  id: '99',
  equipeA: 'Équipe A',
  equipeB: 'Équipe B',
  scoreA: 2,
  scoreB: 1,
  date: 'En ce moment',
  statut: 'en_cours',
  minute: 63,
  evenements: [
    { id: 'ev1', minute: 12, type: 'but', equipe: 'Équipe A', joueur: 'Junior Adjovi' },
    { id: 'ev2', minute: 29, type: 'carton_jaune', equipe: 'Équipe B', joueur: 'Kévin Houngbo' },
    { id: 'ev3', minute: 41, type: 'but', equipe: 'Équipe B', joueur: 'Marc Dossou' },
    { id: 'ev4', minute: 58, type: 'but', equipe: 'Équipe A', joueur: 'Junior Adjovi' },
  ],
}

export const mockMatchsAVenir: Match[] = [
  { id: '1', equipeA: 'Équipe A', equipeB: 'Équipe B', scoreA: null, scoreB: null, date: "Aujourd'hui, 16h00", statut: 'a_venir' },
  { id: '2', equipeA: 'Équipe C', equipeB: 'Équipe D', scoreA: null, scoreB: null, date: 'Demain, 10h00', statut: 'a_venir' },
]

export const mockMeilleurButeur: Joueur = {
  id: '1',
  nom: 'Junior Adjovi',
  equipe: 'Équipe A',
  buts: 9,
}

export const mockActualites: Actualite[] = [
  {
    id: '1',
    titre: 'Équipe A s\'impose 3-1 face à Équipe B',
    description: 'Résumé du choc de la journée, avec le triplé de Junior Adjovi.',
    etiquette: 'Résumé de match',
    date: '19 juillet',
  },
]