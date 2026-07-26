// app/actualites/[slug]/page.tsx
"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsCard } from "@/components/news/NewsCard";
import { newsArticles } from "@/lib/news-mock-data";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Doc 11.3 — Détail article : contenu, partage, "À lire aussi" (3 suggestions) */
export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) notFound();

  const related = newsArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Container className="py-8 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {article.category}
        </span>
        <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{article.publishedLabel}</span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary/80"
          >
            <Share2 size={15} />
            Partager
          </button>
        </div>

        <div className="mt-6 flex h-56 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 sm:h-72">
          <span className="font-heading text-base font-semibold uppercase tracking-wide text-primary-foreground/70">
            FootUCAO
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-12 max-w-5xl">
          <h2 className="mb-4 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
            À lire aussi
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((a, index) => (
              <NewsCard key={a.id} article={a} index={index} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}