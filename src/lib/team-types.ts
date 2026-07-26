// lib/team-types.ts

export interface PlayerAttributes {
  speed: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  physical: number;
}

export interface Player {
  id: string;
  teamId: string;
  name: string;
  number: number;
  position: string;
  badge?: string; // ex. "Top buteur"
  attributes: PlayerAttributes;
  photoUrl: string | null;
}