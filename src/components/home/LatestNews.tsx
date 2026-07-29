// components/home/LatestNews.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { NewsArticle } from "@/lib/types";

interface LatestNewsProps {
  articles: NewsArticle[];
}

function NewsCard({ article }: { article: NewsArticle }) {
  const reduceMotion = useReducedMotion();


  return (
    <RevealItem className="w-65 shrink-0 snap-start sm:w-auto">
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={reduceMotion ? undefined : { type: "spring" as const, stiffness: 400, damping: 25 }}
        className="h-full group"
      >
        <Link href={`/actualites/${article.slug}`} className="block h-full outline-none">
          <Card className="flex h-full flex-col gap-4 p-4 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/20 bg-card/80 backdrop-blur-md">
            <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary/80 to-primary/40">
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <motion.div
                className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-primary/70 transition-transform duration-500 ease-out group-hover:scale-105"
              >
                <span className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
                  FootUCAO
                </span>
              </motion.div>
            </div>
            
            <div className="flex flex-col gap-2.5 grow">
              <Badge variant="neutral" className="w-fit transition-colors group-hover:bg-secondary/10 group-hover:text-secondary">
                {article.category}
              </Badge>
              <p className="font-heading text-xl font-bold leading-tight text-foreground relative inline-block w-fit">
                {article.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </p>
              <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
            </div>
            
            <span className="mt-auto text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
              {article.publishedLabel}
            </span>
          </Card>
        </Link>
      </motion.div>
    </RevealItem>
  );
}

/** Doc 3.5 — "Les dernières nouvelles" */
export function LatestNews({ articles }: LatestNewsProps) {
  return (
    <section>
      <SectionHeader
        title="Les dernières nouvelles"
        href="/actualites"
        linkLabel="Toutes les actualités →"
      />
      <RevealGroup className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pt-2 -mt-2 px-2 -mx-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </RevealGroup>
    </section>
  );
}