// app/page.tsx
import { Hero } from "@/components/home/Hero";
import { CompetitionSummary } from "@/components/home/CompetitionSummary";
import { FeaturedPlayers } from "@/components/home/FeaturedPlayers";
import { LatestNews } from "@/components/home/LatestNews";
import { SuggestionTeaser } from "@/components/home/SuggestionTeaser";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import {
  competitionSummary,
  featuredPlayers,
  latestNews,
  matchHighlight,
} from "@/lib/mock-data";

/**
 * Accueil — doc UX/UI section 3.
 * Objectif : donner en 3 secondes l'info la plus chaude, donner envie
 * d'explorer, montrer que le tournoi est vivant.
 *
 * Le hero ne doit jamais être vide (3.12) : `matchHighlight` porte déjà
 * le fallback "prochain match" quand aucun match n'est en direct — voir
 * lib/mock-data.ts pour la logique, à remplacer par la donnée temps réel.
 */
export default function HomePage() {
  return (
    <main>
      <Hero match={matchHighlight} />

      <Container className="flex flex-col gap-12 py-10 sm:gap-16 sm:py-14">
        <Reveal>
          <CompetitionSummary stats={competitionSummary} />
        </Reveal>
        <Reveal delay={0.05}>
          <FeaturedPlayers players={featuredPlayers} />
        </Reveal>
        <Reveal delay={0.1}>
          <LatestNews articles={latestNews} />
        </Reveal>
        <Reveal delay={0.15}>
          <SuggestionTeaser />
        </Reveal>
      </Container>
    </main>
  );
}