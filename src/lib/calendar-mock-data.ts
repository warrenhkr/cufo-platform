// lib/calendar-mock-data.ts
import { teams } from "./mock-data";
import type { UpcomingFixture } from "./calendar-types";

export const upcomingFixtures: UpcomingFixture[] = [
  {
    id: "fx-1",
    matchday: 6,
    homeTeam: teams.pantheres,
    awayTeam: teams.faucons,
    dayLabel: "Samedi 26 juillet",
    timeLabel: "16h00",
    venue: "Terrain principal",
    badge: "today",
  },
  {
    id: "fx-2",
    matchday: 6,
    homeTeam: teams.requins,
    awayTeam: teams.guepards,
    dayLabel: "Dimanche 27 juillet",
    timeLabel: "10h00",
    venue: "Terrain annexe",
    badge: "soon",
  },
  {
    id: "fx-3",
    matchday: 7,
    homeTeam: teams.lions,
    awayTeam: teams.griffons,
    dayLabel: "Mercredi 30 juillet",
    timeLabel: "16h00",
    venue: "Terrain principal",
  },
  {
    id: "fx-4",
    matchday: 7,
    homeTeam: teams.aigles,
    awayTeam: teams.taureaux,
    dayLabel: "Mercredi 30 juillet",
    timeLabel: "18h00",
    venue: "Terrain principal",
  },
  {
    id: "fx-5",
    matchday: 7,
    homeTeam: teams.pantheres,
    awayTeam: teams.requins,
    dayLabel: "Jeudi 31 juillet",
    timeLabel: "16h00",
    venue: "Terrain annexe",
  },
];