// components/news/NewsCard.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card } from "@/components/ui/Card";
import type { NewsArticleDetail } from "@/lib/news-mock-data";

interface NewsCardProps {
  article: NewsArticleDetail;
  index?: number;
  featured?: boolean;
}

/** Doc 11.2 — carte article, variante "featured" pour l'article à la une desktop (11.7) */
export function NewsCard({ article, index = 0, featured = false }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.05 }}
      className={featured ? "sm:col-span-2 lg:col-span-3" : ""}
    >
      <Link href={`/actualites/${article.slug}`} className="block h-full">
        <Card
          className={`flex h-full gap-4 p-4 shadow-sm transition-shadow duration-200 hover:shadow-xl ${
            featured ? "flex-col sm:flex-row" : "flex-col"
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 ${
              featured ? "h-48 sm:h-auto sm:w-2/5" : "h-32 w-full"
            }`}
          >
            <span className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
              FootUCAO
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {article.category}
            </span>
            <p className={`font-heading font-semibold leading-tight text-foreground ${featured ? "text-2xl" : "text-lg"}`}>
              {article.title}
            </p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
            <span className="mt-auto text-xs text-muted-foreground/80">{article.publishedLabel}</span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}