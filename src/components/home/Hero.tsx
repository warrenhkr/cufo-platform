// components/home/Hero.tsx
"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClassName } from "@/components/ui/Button";
import { MatchStatusCard } from "./MatchStatusCard";
import { PitchMotif } from "@/components/decorative/PitchMotif";
import { competitionSummary, featuredPlayers } from "@/lib/mock-data";
import type { MatchHighlight } from "@/lib/types";

interface HeroProps {
  match: MatchHighlight;
}

/**
 * Doc 3.1 + 3.2 + 3.10 — version "light" (inspiration Campus Market /
 * Figma Make) : fond clair, badge pilule, dégradés diffus discrets,
 * rangée de stats sous séparateur. Texte identique à la doc, casse
 * MAJUSCULE conservée (cohérence avec SectionHeader/PageHeader/MatchHeader).
 */
export function Hero({ match }: HeroProps) {
  const isLive = match.status === "live";
  const topScorer = featuredPlayers[0];
  const topScorerGoals = topScorer.statLabel.split(" ")[0]; // "9 buts" -> "9"

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-background sm:min-h-[640px] lg:min-h-[700px]">
      {/* Motif terrain animé — joué une fois par session */}
      <PitchMotif />

      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 top-48 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-300 gap-12 px-4 py-16 sm:gap-14 sm:px-6 sm:py-20 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16 lg:py-28">
        <Reveal distance={12}>
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold text-secondary">
            <Zap size={13} />
            Championnat CUFO UCAO-UUC
          </span>

          <h1 className="font-heading text-[2.75rem] font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
            Le championnat
            <br />
            <span className="text-secondary">universitaire vit ici</span>
          </h1>

          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
            Scores en direct, classement, effectifs — tout le CUFO UCAO-UUC
            dans ta poche.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={isLive ? "/matchs/direct" : "/matchs/calendrier"}
              className={buttonClassName(isLive ? "live" : "secondary", "lg")}
            >
              {isLive ? "Suivre le direct" : "Voir le prochain match"}
            </Link>
            <Link href="/equipes" className={buttonClassName("outline", "lg")}>
              Découvrir les équipes
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-border pt-6">
            <div>
              <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {competitionSummary.teamsCount}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">équipes engagées</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {competitionSummary.totalGoals}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">buts marqués</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-secondary sm:text-3xl">
                {topScorerGoals}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                buts — {topScorer.name.split(" ")[0]}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal distance={12} delay={0.1}>
          <MatchStatusCard match={match} />
        </Reveal>
      </div>
    </section>
  );
}