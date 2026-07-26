// lib/regulation-mock-data.ts

export interface RegulationSection {
  id: string;
  title: string;
  content: string;
}

/** Doc 9.1 — contenu basé sur le règlement officiel COFU (saison 2026-2027) */
export const regulationSections: RegulationSection[] = [
  {
    id: "format-equipes",
    title: "Format des équipes",
    content:
      "Chaque filière inscrit une seule équipe au tournoi Inter-Filières, obligatoirement composée de 8 joueurs. La composition finale de chaque équipe est validée par l'organisation, sous la supervision de l'Organisateur Général Roland HOUNSOU et du Vice-organisateur Charbel QUENUM.",
  },
  {
    id: "inscriptions",
    title: "Inscriptions & engagement",
    content:
      "Le tournoi Inter-Filières est plafonné à 16 équipes. Le dossier joueur coûte 2 000 FCFA, mais ne garantit pas une place : seul le paiement intégral des frais de participation (20 000 FCFA en Inter-Filières, 50 000 FCFA en Inter-Écoles & Facultés) valide définitivement l'engagement. Les places sont attribuées par ordre de paiement, dans la limite des 16 premières équipes à jour. Aucun frais n'est remboursable après signature du contrat d'engagement.",
  },
  {
    id: "ponctualite",
    title: "Présence & ponctualité",
    content:
      "La présence de toutes les équipes engagées est obligatoire sur les installations sportives à chaque journée de compétition, qu'elles jouent ou non. Une tolérance de 15 minutes est accordée sur l'heure de coup d'envoi. Passé ce délai, l'équipe en retard perd par forfait technique (3-0) et écope d'une amende de 2 000 FCFA (Inter-Filières) ou 5 000 FCFA (Inter-Écoles & Facultés).",
  },
  {
    id: "discipline",
    title: "Absences & discipline",
    content:
      "Toute absence non justifiée par écrit au moins 24h à l'avance auprès du Président ou du Vice-président entraîne un forfait (3-0), un retrait d'1 point au classement de la poule, et une amende de 5 000 FCFA (Inter-Filières) ou 10 000 FCFA (Inter-Écoles & Facultés). En cas de récidive (2 absences non justifiées), l'équipe est disqualifiée définitivement — ses frais d'engagement restent acquis au COFU.",
  },
];