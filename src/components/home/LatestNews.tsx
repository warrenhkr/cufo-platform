// components/home/LatestNews.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { NewsArticle } from "@/lib/types";

interface LatestNewsProps {
  articles: NewsArticle[];
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className="w-[260px] shrink-0 snap-start sm:w-auto"
    >
      <Link href={`/actualites/${article.slug}`} className="block h-full">
        <Card className="flex h-full flex-col gap-3 p-4 shadow-sm transition-shadow duration-200 hover:shadow-xl">
          <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70">
            <span className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
              FootUCAO
            </span>
          </div>
          <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {article.category}
          </span>
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
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-3">
        {articles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}