// app/actualites/page.tsx
"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsCard } from "@/components/news/NewsCard";
import { newsArticles, newsCategories } from "@/lib/news-mock-data";
import type { NewsCategory } from "@/lib/types";

/** Doc section 11 — Actualités : article à la une en grand (desktop), grille pour le reste */
export default function NewsListPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "Toutes">("Toutes");

  const filtered =
    activeCategory === "Toutes"
      ? newsArticles
      : newsArticles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <Container className="py-8 sm:py-10">
      <PageHeader title="Actualités" subtitle="Toute l'actu du championnat CUFO" />

      <div className="mb-6 flex flex-wrap gap-2">
        {(["Toutes", ...newsCategories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card/80 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-foreground">Rien à annoncer pour l&rsquo;instant</h2>
          <p className="mt-2 text-sm text-muted-foreground">Les prochaines actus arrivent bientôt.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured && <NewsCard article={featured} featured />}
          {rest.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index + 1} />
          ))}
        </div>
      )}
    </Container>
  );
}