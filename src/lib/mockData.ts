import { Equipe, Match } from './types'

export const mockEquipes: Equipe[] = [
  { id: '1', nom: 'Équipe A', points: 12, matchsJoues: 4 },
  { id: '2', nom: 'Équipe C', points: 9, matchsJoues: 4 },
  { id: '3', nom: 'Équipe D', points: 6, matchsJoues: 4 },
  { id: '4', nom: 'Équipe B', points: 3, matchsJoues: 4 },
]

export const mockMatchEnCours: Match = {
  id: '99',
  equipeA: 'Équipe A',
  equipeB: 'Équipe B',
  scoreA: 2,
  scoreB: 1,
  date: 'En ce moment',
  statut: 'en_cours',
}

export const mockMatchsAVenir: Match[] = [
  { id: '1', equipeA: 'Équipe A', equipeB: 'Équipe B', scoreA: null, scoreB: null, date: "Aujourd'hui, 16h00", statut: 'a_venir' },
  { id: '2', equipeA: 'Équipe C', equipeB: 'Équipe D', scoreA: null, scoreB: null, date: 'Demain, 10h00', statut: 'a_venir' },
]