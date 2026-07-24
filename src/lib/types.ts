export interface Equipe {
  id: string
  nom: string
  points: number
  matchsJoues: number
}

export interface Match {
  id: string
  equipeA: string
  equipeB: string
  scoreA: number | null
  scoreB: number | null
  date: string
  statut: 'a_venir' | 'en_cours' | 'termine'
}