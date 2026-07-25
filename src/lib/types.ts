export type StatutMatch = 'a_venir' | 'en_cours' | 'termine'

export interface Equipe {
  id: string
  nom: string
  points: number
  matchsJoues: number
  victoires: number
  nuls: number
  defaites: number
  butsPour: number
  butsContre: number
}

export type TypeEvenement = 'but' | 'carton_jaune' | 'carton_rouge'

export interface EvenementMatch {
  id: string
  minute: number
  type: TypeEvenement
  equipe: string
  joueur: string
}

export interface Match {
  id: string
  equipeA: string
  equipeB: string
  scoreA: number | null
  scoreB: number | null
  date: string
  statut: StatutMatch
  minute?: number | null
  evenements?: EvenementMatch[]
}

export interface Joueur {
  id: string
  nom: string
  equipe: string
  buts: number
}

export interface Actualite {
  id: string
  titre: string
  description: string
  etiquette: string
  date: string
}