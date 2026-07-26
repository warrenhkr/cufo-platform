// lib/news-mock-data.ts
import type { NewsArticle, NewsCategory } from "./types";

export interface NewsArticleDetail extends NewsArticle {
  body: string[];
}

export const newsArticles: NewsArticleDetail[] = [
  {
    id: "news-1",
    slug: "lions-aigles-journee-5",
    title: "Les Lions du Campus s'imposent 3-1 face aux Aigles Noirs",
    excerpt: "Résumé du choc de la journée 5, avec le triplé de Junior Adjovi.",
    category: "Résumé de match",
    publishedLabel: "Publié le 19 juillet",
    imageUrl: null,
    body: [
      "Devant un Terrain principal plein à craquer, les Lions du Campus ont fait respecter leur rang face aux Aigles Noirs, s'imposant 3 buts à 1 dans le choc de la journée 5.",
      "Le héros du jour se nomme Junior Adjovi, auteur d'un triplé qui le propulse en tête du classement des buteurs du championnat avec 9 réalisations.",
      "Les Lions restent ainsi seuls en tête du classement, avec trois points d'avance sur leurs poursuivants directs avant la journée 6.",
    ],
  },
  {
    id: "news-2",
    slug: "communique-arbitrage",
    title: "Nouveau protocole d'arbitrage vidéo pour les demi-finales",
    excerpt: "Le comité CUFO précise les règles d'usage de l'assistance vidéo à partir des phases finales.",
    category: "Communiqué officiel",
    publishedLabel: "Publié le 17 juillet",
    imageUrl: null,
    body: [
      "Le comité étudiant du CUFO annonce la mise en place d'un protocole d'assistance vidéo limité pour les demi-finales et la finale du championnat.",
      "Ce dispositif ne sera utilisé que pour les décisions litigieuses concernant les buts et les cartons rouges, afin de ne pas ralentir le rythme des matchs.",
      "Les modalités précises seront communiquées aux équipes qualifiées dans les prochaines semaines.",
    ],
  },
  {
    id: "news-3",
    slug: "coulisses-entrainement-pantheres",
    title: "Dans les coulisses de la préparation des Panthères FC",
    excerpt: "Une semaine avec l'effectif qui affiche la meilleure dynamique du moment.",
    category: "Coulisses",
    publishedLabel: "Publié le 15 juillet",
    imageUrl: null,
    body: [
      "Invaincues depuis quatre journées, les Panthères FC traversent la meilleure période de leur saison. On a suivi une semaine d'entraînement type.",
      "Le staff insiste particulièrement sur la récupération et l'analyse vidéo des adversaires, une approche encore rare à ce niveau du championnat universitaire.",
      "Prochain rendez-vous pour l'équipe : un déplacement chez les Requins de Médecine, l'occasion de confirmer cette dynamique.",
    ],
  },
  {
    id: "news-4",
    slug: "ouverture-billetterie-demi-finales",
    title: "Ouverture de la billetterie pour les demi-finales",
    excerpt: "Les places pour les demi-finales du CUFO seront disponibles dès la semaine prochaine.",
    category: "Annonce",
    publishedLabel: "Publié le 14 juillet",
    imageUrl: null,
    body: [
      "L'organisation du CUFO annonce l'ouverture prochaine de la billetterie pour les demi-finales du championnat, prévues au Terrain principal.",
      "Les étudiants de l'UCAO-UUC bénéficieront d'un accès prioritaire sur présentation de leur carte étudiante.",
      "Plus de détails suivront via les canaux officiels du championnat.",
    ],
  },
];

export const newsCategories: NewsCategory[] = [
  "Résumé de match",
  "Communiqué officiel",
  "Coulisses",
  "Annonce",
];