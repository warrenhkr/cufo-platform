// components/home/LatestNews.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { hoverElevate } from "@/lib/motion";
import type { NewsArticle } from "@/lib/types";

interface LatestNewsProps {
  articles: NewsArticle[];
}

function NewsCard({ article }: { article: NewsArticle }) {
  const reduceMotion = useReducedMotion();

  return (
    <RevealItem className="w-65 shrink-0 snap-start sm:w-auto">
      <motion.div {...hoverElevate(!!reduceMotion)} className="h-full">
        <Link href={`/actualites/${article.slug}`} className="block h-full">
          <Card className="flex h-full flex-col gap-3 p-4 shadow-sm transition-shadow duration-200 hover:shadow-xl">
            <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/70">
              <span className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                FootUCAO
              </span>
            </div>
            <Badge variant="neutral" className="w-fit">
              {article.category}
            </Badge>
            <p className="font-heading text-lg font-semibold leading-tight text-foreground">
              {article.title}
            </p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
            <span className="mt-auto text-xs text-muted-foreground/80">
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
      <RevealGroup className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </RevealGroup>
    </section>
  );
}